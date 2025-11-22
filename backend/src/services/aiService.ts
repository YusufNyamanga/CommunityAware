import axios from 'axios';
import { faqCacheService } from './faqCacheService';

interface ModelConfig {
  temperature?: number;
  maxTokens?: number;
}

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

interface MessageResponse {
  content?: string;
  error?: string;
}

// Extended types to match frontend expectations
type LegalCategory = 'labour-law' | 'company-formation' | 'visa-services' | 'grace-period' | 'lmra' | 'sijilat' | 'general-legal' | 'other';
type Language = 'en' | 'ar' | 'zh' | 'zh-tw' | 'es' | 'fr' | 'pt' | 'ru' | 'hi' | 'th' | 'id' | 'ms' | 'tr' | 'ur' | 'bn' | 'ta' | 'te' | 'ml' | 'pa' | 'ne' | 'am' | 'sw' | 'yo' | 'lg' | 'tl';

class AiService {
  private modelConfig: ModelConfig = {
    temperature: 0.35,
    maxTokens: 2000
  };

  private readonly MAX_MESSAGE_LENGTH = 2000;
  private readonly BANNED_WORDS = ['hack', 'exploit', 'crack', 'illegal', 'fraud'];
  private readonly DEEPSEEK_API_URL: string;
  private readonly DEEPSEEK_API_KEY: string;
  private readonly MOONSHOT_API_URL: string;
  private readonly MOONSHOT_API_KEY: string;
  private readonly CONTEXT_CACHE_TTL_MS = 300000;
  private providerContextCache = new Map<string, { msg: string, exp: number }>();
  private getContextCacheKey(provider: string, message: string, category: LegalCategory, language: Language): string {
    const m = (message || '').toLowerCase().slice(0, 500);
    return provider + '|' + category + '|' + language + '|' + m;
  }

  constructor() {
    this.DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
    this.DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions';
    this.MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY || '';
    this.MOONSHOT_API_URL = process.env.MOONSHOT_API_URL || 'https://api.moonshot.cn/v1/chat/completions';
    
    if (!this.DEEPSEEK_API_KEY) {
      console.warn('⚠️ DeepSeek API KEY NOT FOUND! Check your backend .env file.');
    } else {
      console.log('✅ DeepSeek API Service initialized successfully - Enhanced multilingual support active');
    }
  }

  validateMessage(text: string): ValidationResult {
    if (!text || text.trim().length === 0) {
      return {
        isValid: false,
        reason: 'Message cannot be empty'
      };
    }

    if (text.length > this.MAX_MESSAGE_LENGTH) {
      return {
        isValid: false,
        reason: `Message too long (max ${this.MAX_MESSAGE_LENGTH} characters)`
      };
    }

    const bannedWord = this.BANNED_WORDS.find(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
    if (bannedWord) {
      return {
        isValid: false,
        reason: `Message contains inappropriate content (${bannedWord})`
      };
    }

    return { isValid: true };
  }

  setModelConfig(config: ModelConfig) {
    if (config.temperature !== undefined && (config.temperature < 0 || config.temperature > 1)) {
      throw new Error('Temperature must be between 0 and 1');
    }

    this.modelConfig = {
      ...this.modelConfig,
      ...config
    };
  }

  async sendMessage(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): Promise<MessageResponse> {
    try {
      const validation = this.validateMessage(message);
      if (!validation.isValid) {
        return { error: validation.reason };
      }

      const deepSeekAvailable = this.DEEPSEEK_API_KEY && this.DEEPSEEK_API_KEY.length > 0;
      const moonshotAvailable = this.MOONSHOT_API_KEY && this.MOONSHOT_API_KEY.length > 0;

      if (!deepSeekAvailable && !moonshotAvailable) {
        const fallback = await this.generateFallbackAnswer(message, history, category, language);
        return { content: fallback };
      }

      const preferMoonshot = moonshotAvailable && (language === 'zh' || language === 'zh-tw');

      if (preferMoonshot) {
        if (moonshotAvailable) {
          const moonResp = await this.sendMessageWithMoonshot(message, history, category, language);
          if (!moonResp.error && moonResp.content) {
            return moonResp;
          }
          if (!deepSeekAvailable) {
            return { error: moonResp.error || 'Moonshot failed and DeepSeek is not available' };
          }
        }
        return await this.sendMessageWithDeepSeek(message, history, category, language);
      } else {
        if (deepSeekAvailable) {
          const dsResp = await this.sendMessageWithDeepSeek(message, history, category, language);
          if (!dsResp.error && dsResp.content) {
            return dsResp;
          }
          if (!moonshotAvailable) {
            const fallback = await this.generateFallbackAnswer(message, history, category, language);
            return { content: fallback };
          }
        }
        const moonResp = await this.sendMessageWithMoonshot(message, history, category, language);
        if (!moonResp.error && moonResp.content) {
          return moonResp;
        }
        const fallback = await this.generateFallbackAnswer(message, history, category, language);
        return { content: fallback };
      }

    } catch (error) {
      console.error('AI Service Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to process message' 
      };
    }
  }

  // Send message with DeepSeek API
  private async sendMessageWithDeepSeek(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): Promise<MessageResponse> {
    try {
      const systemMessage = this.getSystemPrompt(category, language);

      console.log('Query:', message);
      console.log('Category:', category);
      console.log('Language:', language);

      const key = this.getContextCacheKey('deepseek', message, category, language);
      const cached = this.providerContextCache.get(key);
      let enhancedSystemMessage: string;
      if (cached && cached.exp > Date.now()) {
        enhancedSystemMessage = cached.msg;
      } else {
        const faqContext = await faqCacheService.getFAQContextFast({
          query: message,
          category,
          language,
          maxItems: 6,
          maxLength: 1200
        });
        const responseTime = faqContext.metadata?.responseTime || 0;
        const fromCache = faqContext.metadata?.fromCache || false;
        console.log(`⚡ FAQ context: ${faqContext.relevantFAQs.length > 0 ? `Found ${faqContext.relevantFAQs.length} items (${fromCache ? 'cache hit' : 'database'}, ${responseTime}ms)` : 'No data found'}`);
        enhancedSystemMessage = faqContext.contextText 
          ? `${systemMessage}\n\nOFFICIAL FAQ CONTEXT (${fromCache ? 'cached' : 'fresh'}):\n${faqContext.contextText}\n\nUse this official information when relevant.`
          : systemMessage;
        this.providerContextCache.set(key, { msg: enhancedSystemMessage, exp: Date.now() + this.CONTEXT_CACHE_TTL_MS });
      }

      // Prepare messages for DeepSeek API
      const messages = [
        { role: 'system', content: enhancedSystemMessage },
        ...history.slice(-10).map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: 'user', content: message }
      ];

      console.log('Making request to DeepSeek API...');
      
      const response = await axios.post(this.DEEPSEEK_API_URL, {
        model: 'deepseek-chat',
        messages: messages,
        temperature: this.getEffectiveTemperature(category),
        max_tokens: Math.min(this.modelConfig.maxTokens || 2000, 1500),
        top_p: 0.8,
        stream: false,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000
      });

      if (response.data?.choices?.[0]?.message?.content) {
        const cleanContent = this.cleanResponse(response.data.choices[0].message.content);
        return { content: cleanContent };
      } else {
        console.error('Unexpected DeepSeek API response:', response.data);
        return { error: 'Unexpected response format from DeepSeek API' };
      }
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;
        
        if (status === 401) {
          return { error: 'Authentication failed. Please check API key configuration.' };
        } else if (status === 429) {
          return { error: 'Rate limit exceeded. Please wait a moment and try again.' };
        } else if (status && status >= 500) {
          return { error: 'Server error occurred. Please try again in a moment.' };
        }
        
        return { 
          error: `DeepSeek API Error (${status} ${statusText}): ${data?.error?.message || error.message}` 
        };
      }
      throw error; // Re-throw to trigger fallback
    }
  }

  // Send message with Moonshot Kimi-K2-0905 API
  private async sendMessageWithMoonshot(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): Promise<MessageResponse> {
    try {
      const systemMessage = this.getSystemPrompt(category, language);
      const key = this.getContextCacheKey('moonshot', message, category, language);
      const cached = this.providerContextCache.get(key);
      let enhancedSystemMessage: string;
      if (cached && cached.exp > Date.now()) {
        enhancedSystemMessage = cached.msg;
      } else {
        const faqContext = await faqCacheService.getFAQContextFast({
          query: message,
          category,
          language,
          maxItems: 6,
          maxLength: 1200
        });
        const fromCache = faqContext.metadata?.fromCache || false;
        enhancedSystemMessage = faqContext.contextText
          ? `${systemMessage}\n\nOFFICIAL FAQ CONTEXT (${fromCache ? 'cached' : 'fresh'}):\n${faqContext.contextText}\n\nUse this official information when relevant.`
          : systemMessage;
        this.providerContextCache.set(key, { msg: enhancedSystemMessage, exp: Date.now() + this.CONTEXT_CACHE_TTL_MS });
      }
      const messages = [
        { role: 'system', content: enhancedSystemMessage },
        ...history.slice(-10).map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: message }
      ];
      const response = await axios.post(this.MOONSHOT_API_URL, {
        model: 'kimi-k2-0905',
        messages: messages,
        temperature: this.getEffectiveTemperature(category),
        max_tokens: Math.min(this.modelConfig.maxTokens || 2000, 1500),
        top_p: 0.8,
        stream: false,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${this.MOONSHOT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000
      });
      if (response.data?.choices?.[0]?.message?.content) {
        const cleanContent = this.cleanResponse(response.data.choices[0].message.content);
        return { content: cleanContent };
      }
      return { error: 'Unexpected response format from Moonshot API' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;
        return { error: `Moonshot API Error (${status} ${statusText}): ${data?.error?.message || error.message}` };
      }
      return { error: error instanceof Error ? error.message : 'Failed to get response from Moonshot service' };
    }
  }

  async *streamMessage(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): AsyncGenerator<MessageResponse> {
    try {
      const validation = this.validateMessage(message);
      if (!validation.isValid) {
        yield { error: validation.reason };
        return;
      }

      const deepSeekAvailable = this.DEEPSEEK_API_KEY && this.DEEPSEEK_API_KEY.length > 0;
      const moonshotAvailable = this.MOONSHOT_API_KEY && this.MOONSHOT_API_KEY.length > 0;

      if (!deepSeekAvailable && !moonshotAvailable) {
        const fallback = await this.generateFallbackAnswer(message, history, category, language);
        const words = fallback.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
          yield { content: chunk };
          await new Promise(r => setTimeout(r, 10));
        }
        return;
      }

      const preferMoonshot = language === 'zh' || language === 'zh-tw';

      if (preferMoonshot) {
        if (moonshotAvailable) {
          try {
            yield* this.streamMessageWithMoonshot(message, history, category, language);
            return;
          } catch (error) {
            console.warn('Moonshot failed, falling back to DeepSeek:', error);
            if (!deepSeekAvailable) {
              yield { error: 'Moonshot failed and DeepSeek is not available' };
              return;
            }
          }
        }
        yield* this.streamMessageWithDeepSeek(message, history, category, language);
      } else {
        if (deepSeekAvailable) {
          try {
            yield* this.streamMessageWithDeepSeek(message, history, category, language);
            return;
          } catch (error) {
            console.warn('DeepSeek failed, falling back to Moonshot:', error);
            if (!moonshotAvailable) {
              yield { error: 'DeepSeek failed and Moonshot is not available' };
              return;
            }
          }
        }
        try {
          yield* this.streamMessageWithMoonshot(message, history, category, language);
        } catch (error) {
          console.warn('Moonshot failed during stream, using local fallback:', error);
          const fb = await this.generateFallbackAnswer(message, history, category, language);
          const words = fb.split(' ');
          for (let i = 0; i < words.length; i++) {
            const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
            yield { content: chunk };
            await new Promise(r => setTimeout(r, 10));
          }
        }
      }

    } catch (error) {
      console.error('AI Service Streaming Error:', error);
      yield { 
        error: error instanceof Error ? error.message : 'Failed to stream message' 
      };
    }
  }

  private async generateFallbackAnswer(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): Promise<string> {
    try {
      const systemMessage = this.getSystemPrompt(category, language);
      const faqContext = await faqCacheService.getFAQContextFast({
        query: message,
        category,
        language,
        maxItems: 4,
        maxLength: 800
      });
      const contextText = faqContext.contextText ? `Here is official context relevant to your query:\n${faqContext.contextText}\n` : '';
      const previous = history.slice(-2).map(h => (h.role === 'user' ? `You asked: ${h.content}` : `Assistant said: ${h.content}`)).join('\n');
      const guidance = `Based on Bahrain regulations, consider the following points. For precise cases, contact LMRA at 995 or consult qualified professionals.`;
      const answer = `${systemMessage}\n${previous ? previous + '\n' : ''}${contextText}${guidance}\n\nYour question: ${message}\n\nKey considerations:\n- Verify your permit and residency status\n- Check applicable notice and transfer rules\n- Keep documentation of contracts and payments\n- Use official channels for disputes and mediation`;
      return this.cleanResponse(answer);
    } catch (e) {
      return 'I could not reach the AI provider right now. Please try again shortly or provide more details, and I will use local guidance to assist you.';
    }
  }

  // Stream message with DeepSeek API
  private async *streamMessageWithDeepSeek(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): AsyncGenerator<MessageResponse> {
    try {

      const systemMessage = this.getSystemPrompt(category, language);

      const keyMoon = this.getContextCacheKey('moonshot', message, category, language);
      const cachedMoon = this.providerContextCache.get(keyMoon);
      let enhancedSystemMessage: string;
      if (cachedMoon && cachedMoon.exp > Date.now()) {
        enhancedSystemMessage = cachedMoon.msg;
      } else {
        const faqContextMoon = await faqCacheService.getFAQContextFast({
          query: message,
          category,
          language,
          maxItems: 3,
          maxLength: 800
        });
        enhancedSystemMessage = faqContextMoon.contextText 
          ? `${systemMessage}\n\nOFFICIAL FAQ CONTEXT:\n${faqContextMoon.contextText}\n\nUse this information when relevant.`
          : systemMessage;
        this.providerContextCache.set(keyMoon, { msg: enhancedSystemMessage, exp: Date.now() + this.CONTEXT_CACHE_TTL_MS });
      }

      // Prepare messages for DeepSeek API
      const messages = [
        { role: 'system', content: enhancedSystemMessage },
        ...history.slice(-10).map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: 'user', content: message }
      ];

      console.log('Starting TRUE stream request to DeepSeek API...');
      const response = await axios.post(this.DEEPSEEK_API_URL, {
        model: 'deepseek-chat',
        messages: messages,
        temperature: this.getEffectiveTemperature(category),
        max_tokens: Math.min(this.modelConfig.maxTokens || 2000, 1200),
        top_p: 0.8,
        stream: true,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        responseType: 'stream',
        timeout: 18000
      });

      let buffer = '';
      for await (const chunk of response.data as any) {
        buffer += chunk.toString('utf8');
        let idx;
        while ((idx = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, idx).trim();
          buffer = buffer.slice(idx + 1);
          if (!line) continue;
          if (line === 'data: [DONE]') {
            return;
          }
          if (line.startsWith('data: ')) {
            const payloadText = line.substring(6);
            try {
              const payload = JSON.parse(payloadText);
              const delta = payload?.choices?.[0]?.delta?.content
                ?? payload?.choices?.[0]?.message?.content
                ?? payload?.content
                ?? '';
              if (delta) {
                yield { content: String(delta) };
              }
            } catch {}
          }
        }
      }

    } catch (error) {
      console.error('DeepSeek Streaming Error:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;
        yield { 
          error: `DeepSeek Streaming Error (${status} ${statusText}): ${data?.error?.message || error.message}` 
        };
      } else {
        yield { 
          error: error instanceof Error ? error.message : 'Failed to stream from DeepSeek service' 
        };
      }
    }
  }

  // Stream message with Moonshot Kimi-K2-0905 API
  private async *streamMessageWithMoonshot(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: LegalCategory = 'general-legal',
    language: Language = 'en'
  ): AsyncGenerator<MessageResponse> {
    try {
      console.log('Using Moonshot Kimi-K2-0905 as fallback...');

      const systemMessage = this.getSystemPrompt(category, language);

      // Get local FAQ context for streaming (optimized)
      const faqContext = await faqCacheService.getFAQContextFast({
        query: message,
        category,
        language,
        maxItems: 3,
        maxLength: 800
      });
      
      const enhancedSystemMessage = faqContext.contextText 
        ? `${systemMessage}\n\nOFFICIAL FAQ CONTEXT:\n${faqContext.contextText}\n\nUse this information when relevant.`
        : systemMessage;

      // Prepare messages for Moonshot API
      const messages = [
        { role: 'system', content: enhancedSystemMessage },
        ...history.slice(-10).map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: 'user', content: message }
      ];

      console.log('Starting TRUE stream request to Moonshot API...');
      const responseMoon = await axios.post(this.MOONSHOT_API_URL, {
        model: 'kimi-k2-0905',
        messages: messages,
        temperature: this.getEffectiveTemperature(category),
        max_tokens: Math.min(this.modelConfig.maxTokens || 2000, 1200),
        top_p: 0.8,
        stream: true,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${this.MOONSHOT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        responseType: 'stream',
        timeout: 18000
      });

      let bufferMoon = '';
      for await (const chunk of responseMoon.data as any) {
        bufferMoon += chunk.toString('utf8');
        let idx;
        while ((idx = bufferMoon.indexOf('\n')) !== -1) {
          const line = bufferMoon.slice(0, idx).trim();
          bufferMoon = bufferMoon.slice(idx + 1);
          if (!line) continue;
          if (line === 'data: [DONE]') {
            return;
          }
          if (line.startsWith('data: ')) {
            const payloadText = line.substring(6);
            try {
              const payload = JSON.parse(payloadText);
              const delta = payload?.choices?.[0]?.delta?.content
                ?? payload?.choices?.[0]?.message?.content
                ?? payload?.content
                ?? '';
              if (delta) {
                yield { content: String(delta) };
              }
            } catch {}
          }
        }
      }

    } catch (error) {
      console.error('Moonshot Streaming Error:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;
        yield { 
          error: `Moonshot Streaming Error (${status} ${statusText}): ${data?.error?.message || error.message}` 
        };
      } else {
        yield { 
          error: error instanceof Error ? error.message : 'Failed to stream from Moonshot service' 
        };
      }
    }
  }

  // Clean AI response by removing markdown formatting artifacts
  private cleanResponse(response: string): string {
    return response
      // Remove asterisks used for bold/emphasis
      .replace(/\*\*(.*?)\*\*/g, '$1')  // **text** -> text
      .replace(/\*(.*?)\*/g, '$1')      // *text* -> text
      // Remove underscores used for emphasis
      .replace(/__(.*?)__/g, '$1')     // __text__ -> text
      .replace(/_(.*?)_/g, '$1')       // _text_ -> text
      // Remove hash symbols for headers
      .replace(/^#{1,6}\s+/gm, '')     // # Header -> Header
      // Remove backticks for code
      .replace(/`([^`]+)`/g, '$1')     // `code` -> code
      .replace(/```[\s\S]*?```/g, '')  // Remove code blocks
      // Clean up excessive whitespace while preserving paragraphs
      .replace(/\n{3,}/g, '\n\n')      // Multiple newlines -> double newline
      .replace(/[ \t]{2,}/g, ' ')      // Multiple spaces/tabs -> single space
      // Ensure proper sentence spacing
      .replace(/([.!?])([A-Z])/g, '$1 $2')  // Add space after sentence endings
      .trim();
  }

  // Method to categorize user queries automatically
  categorizeQuery(message: string): LegalCategory {
    const keywords: Record<LegalCategory, string[]> = {
      'labour-law': ['labour', 'employee', 'salary', 'working hours', 'termination', 'contract', 'overtime', 'vacation'],
      'company-formation': ['company', 'business', 'registration', 'license', 'startup', 'partnership', 'corporation'],
      'visa-services': ['visa', 'residence', 'permit', 'entry', 'tourist', 'business visa'],
      'grace-period': ['grace period', 'extension', 'overstay', 'renewal'],
      'lmra': ['lmra', 'work permit', 'labour market'],
      'sijilat': ['sijilat', 'commercial registration', 'business license'],
      'general-legal': ['law', 'legal', 'court', 'attorney', 'lawyer'],
      'other': []
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [category, categoryKeywords] of Object.entries(keywords)) {
      if (categoryKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return category as LegalCategory;
      }
    }
    
    return 'other';
  }

  // Helper method to get language name for AI prompt
  private getLanguageName(langCode: Language): string {
    const languageMap: Record<Language, string> = {
      'en': 'English',
      'zh': 'Chinese (Simplified)',
      'zh-tw': 'Chinese (Traditional)',
      'ar': 'Arabic',
      'es': 'Spanish',
      'fr': 'French',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'hi': 'Hindi',
      'th': 'Thai',
      'id': 'Indonesian',
      'ms': 'Malay',
      'tr': 'Turkish',
      'ur': 'Urdu',
      'bn': 'Bengali',
      'ta': 'Tamil',
      'te': 'Telugu',
      'ml': 'Malayalam',
      'pa': 'Punjabi',
      'ne': 'Nepali',
      'am': 'Amharic',
      'sw': 'Swahili',
      'yo': 'Yoruba',
      'lg': 'Luganda',
      'tl': 'Tagalog'
    };
    return languageMap[langCode] || 'English';
  }

  // Comprehensive system prompt with cultural awareness and security
  private getSystemPrompt(category?: LegalCategory, language: Language = 'en'): string {
    const tz = 'Asia/Bahrain';
    const timeStr = new Intl.DateTimeFormat('en-GB', { timeZone: tz, dateStyle: 'full', timeStyle: 'short', hour12: true }).format(new Date());
    const getLanguageSpecificInstructions = (lang: Language): string => {
      const culturalInstructions: Record<string, string> = {
        'ar': 'Respond in natural, formal Arabic as a native speaker would. Use appropriate Islamic greetings and cultural references. Be respectful of Gulf Arab culture and business customs. Use formal Arabic (Fusha) but ensure it flows naturally. Pay attention to proper Arabic grammar and sentence structure.',
        'zh': 'Respond in natural Simplified Chinese as a native speaker would. Use appropriate Chinese business terminology and cultural context. Be respectful of Chinese cultural values and communication style. Ensure proper Chinese grammar and natural flow.',
        'zh-tw': 'Respond in natural Traditional Chinese as a native speaker would. Use appropriate Chinese business terminology and cultural context. Be respectful of Chinese cultural values and communication style. Ensure proper Traditional Chinese characters and grammar.',
        'es': 'Respond in natural, professional Spanish as a native speaker would. Use appropriate Latin American or Spanish business terminology. Be culturally sensitive to Hispanic business customs. Ensure proper Spanish grammar and natural expression.',
        'fr': 'Respond in natural, professional French as a native speaker would. Use appropriate French business terminology and cultural context. Be respectful of Francophone cultural values. Pay attention to proper French grammar and formal/informal register.',
        'pt': 'Respond in natural, professional Portuguese as a native speaker would. Use appropriate Portuguese or Brazilian business terminology and cultural context. Ensure proper Portuguese grammar and natural expression.',
        'ru': 'Respond in natural, professional Russian as a native speaker would. Use appropriate Russian business terminology and cultural context. Be respectful of Russian cultural values. Ensure proper Russian grammar and declensions.',
        'hi': 'Respond in natural, professional Hindi as a native speaker would. Use appropriate Indian business terminology and cultural context. Be respectful of Indian cultural values and business customs. Use proper Hindi grammar and Devanagari script.',
        'th': 'Respond in natural, respectful Thai as a native speaker would. Use appropriate Thai honorifics and business terminology. Be respectful of Thai cultural values and hierarchy. Ensure proper Thai script and grammar.',
        'id': 'Respond in natural, professional Bahasa Indonesia as a native speaker would. Use appropriate Indonesian business terminology and cultural context. Ensure proper Indonesian grammar and formal language structure.',
        'ms': 'Respond in natural, professional Bahasa Melayu as a native speaker would. Use appropriate Malaysian business terminology and cultural context. Ensure proper Malay grammar and formal expression.',
        'tr': 'Respond in natural, professional Turkish as a native speaker would. Use appropriate Turkish business terminology and cultural context. Be respectful of Turkish cultural values. Pay attention to Turkish grammar and proper word order.',
        'ur': 'Respond in natural, professional Urdu as a native speaker would. Use appropriate Islamic greetings and Pakistani/Indian cultural references. Be respectful of South Asian cultural values. Use proper Urdu script and grammar.',
        'bn': 'Respond in natural, professional Bengali as a native speaker would. Use appropriate Bengali business terminology and cultural context. Be respectful of Bengali cultural values. Ensure proper Bengali script and grammar.',
        'ta': 'Respond in natural, professional Tamil as a native speaker would. Use appropriate Tamil business terminology and cultural context. Be respectful of Tamil cultural values. Use proper Tamil script and grammar.',
        'te': 'Respond in natural, professional Telugu as a native speaker would. Use appropriate Telugu business terminology and cultural context. Be respectful of Telugu cultural values. Use proper Telugu script and grammar.',
        'ml': 'Respond in natural, professional Malayalam as a native speaker would. Use appropriate Malayalam business terminology and cultural context. Be respectful of Kerala cultural values. Use proper Malayalam script and grammar.',
        'pa': 'Respond in natural, professional Punjabi as a native speaker would. Use appropriate Punjabi business terminology and cultural context. Be respectful of Punjabi cultural values. Use proper Punjabi script (Gurmukhi) and grammar.',
        'ne': 'Respond in natural, professional Nepali as a native speaker would. Use appropriate Nepali business terminology and cultural context. Be respectful of Nepali cultural values. Use proper Devanagari script for Nepali.',
        'am': 'Respond in natural, professional Amharic as a native speaker would. Use appropriate Ethiopian business terminology and cultural context. Be respectful of Ethiopian cultural values. Use proper Ethiopic script (Ge\'ez script).',
        'sw': 'Respond in natural, professional Swahili as a native speaker would. Use appropriate East African business terminology and cultural context. Be respectful of Swahili cultural values. Ensure proper Swahili grammar and syntax.',
        'yo': 'Respond in natural, professional Yoruba as a native speaker would. Use appropriate Nigerian business terminology and cultural context. Be respectful of Yoruba cultural values. Use proper Yoruba grammar and tonal markers where necessary.',
        'lg': 'Respond in natural, professional Luganda as a native speaker would. Use appropriate Ugandan business terminology and cultural context. Be respectful of Buganda cultural values. Use proper Luganda grammar and structure.',
        'tl': 'Respond in natural, professional Tagalog/Filipino as a native speaker would. Use appropriate Filipino business terminology and cultural context. Be respectful of Filipino cultural values. Ensure proper Tagalog grammar and sentence structure.'
      };
      return culturalInstructions[lang] || '';
    };

    const languageInstruction = language !== 'en' 
      ? `CRITICAL LANGUAGE AND CULTURAL REQUIREMENT: 
      1. You MUST respond ENTIRELY in ${this.getLanguageName(language)} language - absolutely no English words, phrases, or mixing.
      2. ${getLanguageSpecificInstructions(language)}
      3. Write naturally as a native speaker would, not as a mechanical translation.
      4. Use culturally appropriate expressions, greetings, and business terminology.
      5. Maintain professional tone while being culturally sensitive.
      6. This applies to the complete response.
      7. Leverage advanced multilingual capabilities for authentic, culturally-aware responses.
      8. Ensure grammatical correctness and natural flow in the target language.
      \n\n`
      : '';
      
    const basePrompt = `${languageInstruction}You are a specialized AI community awareness assistant for the Bahrain community.
    You provide accurate, helpful information about Bahrain's legal system, focusing on:
    - Labour law and employee rights
    - Company formation and business registration
    - Visa services and immigration
    - LMRA (Labour Market Regulatory Authority) procedures
    - Sijilat registration processes
    - Grace period extensions
    - Legal compliance requirements

    IMPORTANT LMRA CONTACT INFORMATION:
    - General inquiries: Call 995
    - Emergencies (abuse, fear of harm): Call 999
    - Employees and domestic workers can contact LMRA directly for assistance

    Always provide accurate, up-to-date information based on Bahrain law and regulations.
    If you're unsure about specific legal details, recommend consulting with official authorities or legal professionals.
    Be helpful, professional, and culturally sensitive to the Bahrain context.
    
    SPECIAL CASE HANDLING:
    - If a user asks about a "runaway" or "absconding" case without specifying where it was filed, ALWAYS explain BOTH scenarios:
      1) LMRA runaway case process — handled at the LMRA Sehla branch.
      2) Police runaway/absconding case process — outline reporting, investigation steps, and immigration consequences.
    - For Police-filed runaway cases: do not state that a travel ban is imposed. Clarify that once a criminal order is issued, a deportation order is issued to remove the person from Bahrain. Make clear that a new work permit is not possible while the case is active, and legal status becomes irregular upon filing.
    - Clearly distinguish procedures, required documents, and responsible authorities for each path.
    - Work permit transfer under LMRA Mobility (when visa/residence is still valid):
      a) Employee resigns via email or physical letter (or a PDF attached to an email). If the current employer accepts, they issue an NOC.
      b) New employer applies for Mobility transfer in their system and attaches the resignation letter and NOC for LMRA review.
      c) After LMRA review, the old employer receives a notification to approve the transfer. Once they approve, the application moves to Immigration for payment of the new work permit.
      d) After payment, the work permit is transferred to the new employer.
      If the current employer refuses to accept the resignation: the employee should resign via the Post Office; the new employer applies Mobility and attaches the resignation letter plus the Post Office pink card; LMRA reviews, then the application goes to the old employer for approval, and finally to Immigration for payment. Once paid, the work permit is transferred.
    
    IMPORTANT FORMATTING: Please respond with clean, readable text. Do not use markdown formatting like asterisks (*) or underscores (_) for emphasis. Instead, use clear paragraph breaks and simple formatting that reads naturally.
    
    SECURITY NOTICE: This is a secure backend service. All API keys and sensitive information are protected server-side.`;
    const greetingPolicy = `
Greeting policy:
- Do NOT use time-of-day greetings like "Good morning" or "Good evening".
- If there is NO previous assistant message in the conversation history, begin the FIRST reply with: Hallo habibi.
- For all subsequent replies in the same chat, do not greet; continue the conversation immediately.`;
    const timeContext = `\nCurrent local time in Bahrain: ${timeStr} (${tz}). Be culturally sensitive, but avoid time-of-day greetings.`;

    const categorySpecificPrompts: Record<LegalCategory, string> = {
      'labour-law': 'Focus on Bahrain labour law, employee rights, employer obligations, and workplace regulations.',
      'company-formation': 'Provide guidance on business registration, company formation procedures in Bahrain, and Sijilat processes.',
      'visa-services': 'Help with visa applications, requirements, and procedures for Bahrain.',
      'grace-period': 'Assist with grace period extensions and related visa procedures.',
      'lmra': 'Provide information about LMRA services, work permits, and labour market regulations.',
      'sijilat': 'Help with Sijilat registration, business licensing, and related procedures.',
      'general-legal': 'Provide general legal guidance relevant to Bahrain law.',
      'cultural-guidelines': 'Provide comprehensive guidance on cultural expectations, Muslim country etiquette, decency laws, Ramadan guidelines, prayer times awareness, appropriate dress codes, and public behavior standards in Bahrain. Emphasize respect for Islamic culture and traditions.',
      'mental-health': 'Provide information about mental health support services, counseling resources, stress management techniques, community support networks, and emergency mental health contacts available for expatriates in Bahrain. Include culturally sensitive approaches to mental wellness.',
      'other': 'Assist with various legal queries related to living and working in Bahrain.'
    };

    return category ? `${basePrompt}${greetingPolicy}${timeContext}\n\n${categorySpecificPrompts[category]}` : `${basePrompt}${greetingPolicy}${timeContext}`;
  }

  private getEffectiveTemperature(category: LegalCategory): number {
    const base = this.modelConfig.temperature ?? 0.35;
    switch (category) {
      case 'labour-law':
      case 'company-formation':
      case 'visa-services':
      case 'sijilat':
        return Math.min(base, 0.35);
      case 'lmra':
      case 'general-legal':
        return Math.min(base, 0.4);
      default:
        return Math.max(base, 0.5);
    }
  }
}

export const aiService = new AiService();
