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
    temperature: 0.7,
    maxTokens: 2000
  };

  private readonly MAX_MESSAGE_LENGTH = 2000;
  private readonly BANNED_WORDS = ['hack', 'exploit', 'crack', 'illegal', 'fraud'];
  private readonly DEEPSEEK_API_URL: string;
  private readonly DEEPSEEK_API_KEY: string;

  constructor() {
    this.DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
    this.DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions';
    
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

      if (!this.DEEPSEEK_API_KEY) {
        return { error: 'DeepSeek API key is not configured' };
      }

      const systemMessage = this.getSystemPrompt(category, language);

      console.log('Query:', message);
      console.log('Category:', category);
      console.log('Language:', language);

      // Get local FAQ context with performance optimization
      const faqContextPromise = faqCacheService.getFAQContextFast({
        query: message,
        category,
        language,
        maxItems: 6, // Reduced for faster processing
        maxLength: 1200 // Reduced for faster processing
      });
      
      // Start FAQ context retrieval (don't await yet for parallel processing)
      const faqContext = await faqContextPromise;
      
      const responseTime = faqContext.metadata?.responseTime || 0;
      const fromCache = faqContext.metadata?.fromCache || false;
      
      console.log(`⚡ FAQ context: ${faqContext.relevantFAQs.length > 0 ? `Found ${faqContext.relevantFAQs.length} items (${fromCache ? 'cache hit' : 'database'}, ${responseTime}ms)` : 'No data found'}`);
      
      // Enhanced system message with optimized FAQ data
      const enhancedSystemMessage = faqContext.contextText 
        ? `${systemMessage}\n\nOFFICIAL FAQ CONTEXT (${fromCache ? 'cached' : 'fresh'}):\n${faqContext.contextText}\n\nUse this official information when relevant.`
        : systemMessage;

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
        temperature: this.modelConfig.temperature,
        max_tokens: Math.min(this.modelConfig.maxTokens, 1500), // Reduce for faster response
        top_p: 0.8, // Slightly more focused for speed
        stream: false,
        frequency_penalty: 0.1, // Reduce repetition
        presence_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000 // Reduced timeout for faster failure detection
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
      return { 
        error: error instanceof Error ? error.message : 'Failed to get response from DeepSeek service' 
      };
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

      if (!this.DEEPSEEK_API_KEY) {
        yield { error: 'DeepSeek API key is not configured' };
        return;
      }

      const systemMessage = this.getSystemPrompt(category, language);

      // Get local FAQ context for streaming (optimized)
      const faqContext = await faqCacheService.getFAQContextFast({
        query: message,
        category,
        language,
        maxItems: 5, // Reduced for streaming performance
        maxLength: 1000
      });
      
      const enhancedSystemMessage = faqContext.contextText 
        ? `${systemMessage}\n\nOFFICIAL FAQ CONTEXT:\n${faqContext.contextText}\n\nUse this information when relevant.`
        : systemMessage;

      // Prepare messages for DeepSeek API
      const messages = [
        { role: 'system', content: enhancedSystemMessage },
        ...history.slice(-10).map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: 'user', content: message }
      ];

      console.log('Starting stream request to DeepSeek API...');
      
      // For now, use non-streaming approach and simulate streaming
      // This avoids the complexity of async generator + event emitters
      const response = await axios.post(this.DEEPSEEK_API_URL, {
        model: 'deepseek-chat',
        messages: messages,
        temperature: this.modelConfig.temperature,
        max_tokens: Math.min(this.modelConfig.maxTokens, 1200), // Reduced for streaming
        top_p: 0.8,
        stream: false,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 18000 // Faster timeout for streaming
      });

      if (response.data?.choices?.[0]?.message?.content) {
        const content = this.cleanResponse(response.data.choices[0].message.content);
        // Simulate streaming by yielding chunks
        const words = content.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
          yield { content: chunk };
          // Small delay to simulate streaming
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } else {
        yield { error: 'Unexpected response format from DeepSeek API' };
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
      
    const basePrompt = `${languageInstruction}You are a specialized AI legal assistant for the Bahrain community.
    You provide accurate, helpful information about Bahrain's legal system, focusing on:
    - Labour law and employee rights
    - Company formation and business registration
    - Visa services and immigration
    - LMRA (Labour Market Regulatory Authority) procedures
    - Sijilat registration processes
    - Grace period extensions
    - Legal compliance requirements

    Always provide accurate, up-to-date information based on Bahrain law and regulations.
    If you're unsure about specific legal details, recommend consulting with official authorities or legal professionals.
    Be helpful, professional, and culturally sensitive to the Bahrain context.
    
    IMPORTANT FORMATTING: Please respond with clean, readable text. Do not use markdown formatting like asterisks (*) or underscores (_) for emphasis. Instead, use clear paragraph breaks and simple formatting that reads naturally.
    
    SECURITY NOTICE: This is a secure backend service. All API keys and sensitive information are protected server-side.`;

    const categorySpecificPrompts: Record<LegalCategory, string> = {
      'labour-law': 'Focus on Bahrain labour law, employee rights, employer obligations, and workplace regulations.',
      'company-formation': 'Provide guidance on business registration, company formation procedures in Bahrain, and Sijilat processes.',
      'visa-services': 'Help with visa applications, requirements, and procedures for Bahrain.',
      'grace-period': 'Assist with grace period extensions and related visa procedures.',
      'lmra': 'Provide information about LMRA services, work permits, and labour market regulations.',
      'sijilat': 'Help with Sijilat registration, business licensing, and related procedures.',
      'general-legal': 'Provide general legal guidance relevant to Bahrain law.',
      'other': 'Assist with various legal queries related to living and working in Bahrain.'
    };

    return category ? `${basePrompt}\n\n${categorySpecificPrompts[category]}` : basePrompt;
  }

}

export const aiService = new AiService();
