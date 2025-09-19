import axios from 'axios';
import { ChatMessage, LegalCategory } from '../types';
import { knowledgeBaseService } from './knowledgeBaseService';

// DeepSeek API service for better multilingual translations
class DeepSeekService {
  private apiKey: string;
  private baseURL: string;

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
      // Fix common formatting issues
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space between lowercase and uppercase
      .trim();
  }

  // Clean streaming chunks in real-time while preserving word boundaries
  private cleanStreamingChunk(chunk: string): string {
    return chunk
      // Remove markdown formatting that appears in chunks
      .replace(/\*\*/g, '')           // Remove ** for bold
      .replace(/\*/g, '')             // Remove * for emphasis  
      .replace(/#{1,6}\s*/g, '')      // Remove # headers
      .replace(/`/g, '')              // Remove ` backticks
      .replace(/_/g, '')              // Remove _ underscores
      // Keep natural spacing and line breaks
      .replace(/\n{3,}/g, '\n\n');    // Limit excessive newlines
  }

  constructor() {
    // These should be environment variables in production
    this.apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY || '';
    this.baseURL = process.env.REACT_APP_DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions';
    
    // Debug environment variables
    console.log('DeepSeek Service initialized:');
    console.log('API Key present:', !!this.apiKey);
    console.log('API Key length:', this.apiKey.length);
    console.log('Base URL:', this.baseURL);
    
    if (!this.apiKey) {
      console.warn('⚠️ DEEPSEEK API KEY NOT FOUND! Check your .env file.');
    }
  }

  private getSystemPrompt(category?: LegalCategory, language: string = 'en'): string {
    const getLanguageSpecificInstructions = (lang: string): string => {
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
      6. This applies to both streaming chunks and the complete response.
      7. DeepSeek excels at natural translations - leverage this for authentic, culturally-aware responses.
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
    
    IMPORTANT FORMATTING: Please respond with clean, readable text. Do not use markdown formatting like asterisks (*) or underscores (_) for emphasis. Instead, use clear paragraph breaks and simple formatting that reads naturally.`;

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

  // Helper method to get language name for AI prompt
  private getLanguageName(langCode: string): string {
    const languageMap: Record<string, string> = {
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

  async sendMessage(
    message: string, 
    conversationHistory: ChatMessage[] = [],
    category?: LegalCategory,
    onChunk?: (chunk: string) => void,
    language: string = 'en'
  ): Promise<string> {
    try {
      // Check if this is a labour law query and get relevant context
      let enhancedMessage = message;
      if (knowledgeBaseService.isLabourLawQuery(message)) {
        const relevantContext = knowledgeBaseService.extractRelevantContext(message);
        if (relevantContext) {
          enhancedMessage = message + relevantContext;
          console.log('Enhanced message with knowledge base context');
        }
      }

      // Format conversation history for the API
      const messages = [
        {
          role: 'system',
          content: this.getSystemPrompt(category, language) + '\n\nIMPORTANT: When answering labour law questions, prioritize the official Bahrain Labour Law information provided in the context. Always cite article numbers when available.'
        },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: enhancedMessage
        }
      ];

      console.log('Sending request to DeepSeek API:', {
        url: this.baseURL,
        messageCount: messages.length,
        category,
        hasApiKey: !!this.apiKey,
        streaming: !!onChunk,
        language
      });
      
      if (onChunk) {
        // Streaming implementation
        return new Promise((resolve, reject) => {
          const streamRequest = {
            model: 'deepseek-chat',
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.9,
            stream: true
          };

          fetch(this.baseURL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(streamRequest)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const reader = response.body?.getReader();
            if (!reader) {
              throw new Error('No reader available');
            }

            let fullResponse = '';
            const decoder = new TextDecoder();

            const readStream = () => {
              reader.read().then(({ done, value }) => {
                if (done) {
                  resolve(this.cleanResponse(fullResponse));
                  return;
                }

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('data: ')) {
                    const data = trimmed.slice(6);
                    if (data === '[DONE]') {
                      resolve(this.cleanResponse(fullResponse));
                      return;
                    }
                    
                    try {
                      const parsed = JSON.parse(data);
                      const content = parsed.choices?.[0]?.delta?.content;
                      if (content) {
                        fullResponse += content;
                        // Clean the chunk in real-time to remove markdown while preserving readability
                        const cleanedChunk = this.cleanStreamingChunk(content);
                        onChunk(cleanedChunk);
                      }
                    } catch (e) {
                      // Ignore parsing errors for malformed chunks
                    }
                  }
                }
                
                readStream();
              }).catch(reject);
            };

            readStream();
          })
          .catch(reject);
        });
      } else {
        // Non-streaming implementation
        const response = await axios.post(
          this.baseURL,
          {
            model: 'deepseek-chat',
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.9,
            stream: false
          },
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 seconds timeout
          }
        );
        
        console.log('Received response from DeepSeek API:', {
          status: response.status,
          hasChoices: !!response.data?.choices,
          choicesLength: response.data?.choices?.length || 0,
          hasContent: !!response.data?.choices?.[0]?.message?.content
        });

        if (response.data?.choices?.[0]?.message?.content) {
          return this.cleanResponse(response.data.choices[0].message.content);
        } else {
          throw new Error('Invalid response format from DeepSeek API');
        }
      }
    } catch (error: any) {
      console.error('Error calling DeepSeek API:', error);
      
      // Detailed error logging
      if (error.response) {
        console.error('API Error Status:', error.response.status);
        console.error('API Error Data:', error.response.data);
        console.error('API Error Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      
      // Fallback response for development/demo
      if (!this.apiKey) {
        return `I'm currently in demo mode. For "${message}", I would typically provide detailed legal guidance about Bahrain law. Please configure the DeepSeek API key to enable full functionality.`;
      }
      
      // Return more specific error messages
      if (error.response?.status === 401) {
        return 'Authentication failed. Please check your API key configuration.';
      } else if (error.response?.status === 429) {
        return 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.response?.status >= 500) {
        return 'Server error occurred. Please try again in a moment.';
      }
      
      return 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.';
    }
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
}

export const deepseekService = new DeepSeekService();
