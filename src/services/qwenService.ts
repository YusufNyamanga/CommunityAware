import axios from 'axios';
import { ChatMessage, LegalCategory, MoonshotAPIResponse } from '../types';
import { knowledgeBaseService } from './knowledgeBaseService';
import { bahrainGlossaryService } from './bahrainGlossaryService';

// Note: In production, this should be handled through a backend service
// to keep API keys secure. This is a simplified implementation.
class QwenService {
  private apiKey: string;
  private baseURL: string;

  // Validate response against knowledge base context
  private validateResponse(response: string, originalMessage: string, hasKnowledgeBaseContext: boolean): string {
    if (!hasKnowledgeBaseContext) {
      return response; // No validation needed for non-labour law queries
    }

    // Check for common signs of hallucination or speculation
    const problematicPhrases = [
      'typically',
      'usually',
      'generally',
      'often',
      'might',
      'could be',
      'may be',
      'in my experience',
      'based on common practice'
    ];

    let hasProblematicContent = false;
    const lowerResponse = response.toLowerCase();
    
    problematicPhrases.forEach(phrase => {
      if (lowerResponse.includes(phrase) && !lowerResponse.includes('based on the available official information')) {
        hasProblematicContent = true;
      }
    });

    // Check if response cites specific articles (good sign)
    const hasArticleCitations = /article \d+/i.test(response) || /articles \d+/i.test(response);
    
    // If response seems speculative and lacks article citations, add disclaimer
    if (hasProblematicContent && !hasArticleCitations) {
      response += '\n\nNote: For the most accurate and up-to-date information, please consult the official Bahrain Labour Law or contact LMRA directly.';
    }

    return response;
  }

  // Clean AI response by removing markdown formatting artifacts and correcting Bahrain terminology
  private cleanResponse(response: string, originalMessage: string = '', hasKnowledgeBaseContext: boolean = false): string {
    let cleanedResponse = response
      // Remove asterisks used for bold/emphasis
      .replace(/\*\*(.*?)\*\*/g, '$1')  // **text** -> text
      .replace(/\*(.*?)\*/g, '$1')      // *text* -> text
      // Remove underscores used for emphasis
      .replace(/__(.*?)__/g, '$1')     // __text__ -> text
      .replace(/_(.*?)_/g, '$1')       // _text_ -> text
      // Clean up excessive whitespace while preserving paragraphs
      .replace(/\n{3,}/g, '\n\n')      // Multiple newlines -> double newline
      .replace(/[ \t]{2,}/g, ' ')      // Multiple spaces/tabs -> single space
      // Ensure proper sentence spacing
      .replace(/([.!?])([A-Z])/g, '$1 $2')  // Add space after sentence endings
      // Fix common formatting issues
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space between lowercase and uppercase
      .trim();
    
    // Apply Bahrain-specific terminology corrections
    cleanedResponse = bahrainGlossaryService.enhanceResponseWithBahrainContext(cleanedResponse);
    
    // Validate response against knowledge base
    cleanedResponse = this.validateResponse(cleanedResponse, originalMessage, hasKnowledgeBaseContext);
    
    return cleanedResponse;
  }

  constructor() {
    // These should be environment variables in production
    this.apiKey = process.env.REACT_APP_QWEN_API_KEY || '';
    this.baseURL = process.env.REACT_APP_QWEN_API_URL || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions';
    
    // Debug environment variables
    console.log('Qwen Service initialized:');
    console.log('API Key present:', !!this.apiKey);
    console.log('API Key length:', this.apiKey.length);
    console.log('Base URL:', this.baseURL);
    
    if (!this.apiKey) {
      console.warn('⚠️ QWEN API KEY NOT FOUND! Check your .env file.');
    }
  }

  private getSystemPrompt(category?: LegalCategory, language: string = 'en'): string {
    const getLanguageSpecificInstructions = (lang: string): string => {
      const culturalInstructions: Record<string, string> = {
        'ar': 'Respond in natural, formal Arabic as a native speaker would. Use appropriate Islamic greetings and cultural references. Be respectful of Gulf Arab culture and business customs. Use formal Arabic (Fusha) but ensure it flows naturally.',
        'zh': 'Respond in natural Simplified Chinese as a native speaker would. Use appropriate Chinese business terminology and cultural context. Be respectful of Chinese cultural values and communication style.',
        'zh-tw': 'Respond in natural Traditional Chinese as a native speaker would. Use appropriate Chinese business terminology and cultural context. Be respectful of Chinese cultural values and communication style.',
        'es': 'Respond in natural, professional Spanish as a native speaker would. Use appropriate Latin American or Spanish business terminology. Be culturally sensitive to Hispanic business customs.',
        'fr': 'Respond in natural, professional French as a native speaker would. Use appropriate French business terminology and cultural context. Be respectful of Francophone cultural values.',
        'pt': 'Respond in natural, professional Portuguese as a native speaker would. Use appropriate Portuguese or Brazilian business terminology and cultural context.',
        'ru': 'Respond in natural, professional Russian as a native speaker would. Use appropriate Russian business terminology and cultural context. Be respectful of Russian cultural values.',
        'hi': 'Respond in natural, professional Hindi as a native speaker would. Use appropriate Indian business terminology and cultural context. Be respectful of Indian cultural values and business customs.',
        'th': 'Respond in natural, respectful Thai as a native speaker would. Use appropriate Thai honorifics and business terminology. Be respectful of Thai cultural values and hierarchy.',
        'id': 'Respond in natural, professional Bahasa Indonesia as a native speaker would. Use appropriate Indonesian business terminology and cultural context.',
        'ms': 'Respond in natural, professional Bahasa Melayu as a native speaker would. Use appropriate Malaysian business terminology and cultural context.',
        'tr': 'Respond in natural, professional Turkish as a native speaker would. Use appropriate Turkish business terminology and cultural context. Be respectful of Turkish cultural values.',
        'ur': 'Respond in natural, professional Urdu as a native speaker would. Use appropriate Islamic greetings and Pakistani/Indian cultural references. Be respectful of South Asian cultural values.',
        'bn': 'Respond in natural, professional Bengali as a native speaker would. Use appropriate Bengali business terminology and cultural context. Be respectful of Bengali cultural values.',
        'ta': 'Respond in natural, professional Tamil as a native speaker would. Use appropriate Tamil business terminology and cultural context. Be respectful of Tamil cultural values.',
        'te': 'Respond in natural, professional Telugu as a native speaker would. Use appropriate Telugu business terminology and cultural context. Be respectful of Telugu cultural values.',
        'ml': 'Respond in natural, professional Malayalam as a native speaker would. Use appropriate Malayalam business terminology and cultural context. Be respectful of Kerala cultural values.',
        'pa': 'Respond in natural, professional Punjabi as a native speaker would. Use appropriate Punjabi business terminology and cultural context. Be respectful of Punjabi cultural values.',
        'ne': 'Respond in natural, professional Nepali as a native speaker would. Use appropriate Nepali business terminology and cultural context. Be respectful of Nepali cultural values.',
        'am': 'Respond in natural, professional Amharic as a native speaker would. Use appropriate Ethiopian business terminology and cultural context. Be respectful of Ethiopian cultural values.',
        'sw': 'Respond in natural, professional Swahili as a native speaker would. Use appropriate East African business terminology and cultural context. Be respectful of Swahili cultural values.',
        'yo': 'Respond in natural, professional Yoruba as a native speaker would. Use appropriate Nigerian business terminology and cultural context. Be respectful of Yoruba cultural values.',
        'lg': 'Respond in natural, professional Luganda as a native speaker would. Use appropriate Ugandan business terminology and cultural context. Be respectful of Buganda cultural values.',
        'tl': 'Respond in natural, professional Tagalog/Filipino as a native speaker would. Use appropriate Filipino business terminology and cultural context. Be respectful of Filipino cultural values.'
      };
      return culturalInstructions[lang] || '';
    };

    const languageInstruction = language !== 'en' 
      ? `CRITICAL LANGUAGE AND CULTURAL REQUIREMENT: 
      1. You MUST respond ENTIRELY in ${this.getLanguageName(language)} language - no English words or phrases.
      2. ${getLanguageSpecificInstructions(language)}
      3. Write naturally as a native speaker would, not as a mechanical translation.
      4. Use culturally appropriate expressions, greetings, and business terminology.
      5. Maintain professional tone while being culturally sensitive.
      6. This applies to both streaming chunks and the complete response.
      \n\n`
      : '';
      
    const basePrompt = `${languageInstruction}You are a specialized AI legal assistant for the Bahrain community.
    
    CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE RULES:
    
    1. KNOWLEDGE BASE PRIORITY: If official Bahrain Labour Law information is provided in the context below, you MUST base your response primarily on that information. DO NOT add information not found in the provided context.
    
    2. ARTICLE CITATIONS: Always cite the specific article numbers provided in the knowledge base context (e.g., "according to Article 55-58 of Bahrain Labour Law").
    
    3. RESPONSE BOUNDARIES: Only provide information that can be verified from:
       - The provided official knowledge base context
       - Well-established, official Bahrain legal sources
       - LMRA official procedures and regulations
    
    4. UNCERTAINTY HANDLING: If a question cannot be answered with the provided knowledge base information, you MUST:
       - State clearly: "Based on the available official information..."
       - Recommend consulting LMRA, official authorities, or qualified legal professionals
       - Do NOT invent, assume, or speculate about legal requirements
    
    5. BAHRAIN-SPECIFIC TERMS: Use only correct Bahrain-specific terminology:
       - WLL (not LLC)
       - End of Service Benefits (not Severance Pay)
       - Work Permit (not Work Visa)
       - LMRA (not Department of Labor)
    
    6. VERIFICATION REQUIREMENT: Before providing any legal information, ensure it matches the official Bahrain Labour Law context provided.
    
    You provide accurate, helpful information about Bahrain's legal system, focusing on:
    - Labour law and employee rights (Private Sector)
    - Company formation and business registration
    - Visa services and immigration
    - LMRA (Labour Market Regulatory Authority) procedures
    - Sijilat registration processes
    - Grace period extensions
    - Legal compliance requirements
    
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
      let hasKnowledgeBaseContext = false;
      if (knowledgeBaseService.isLabourLawQuery(message)) {
        const relevantContext = knowledgeBaseService.extractRelevantContext(message);
        if (relevantContext) {
          enhancedMessage = message + relevantContext;
          hasKnowledgeBaseContext = true;
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

      console.log('Sending request to Qwen API:', {
        url: this.baseURL,
        messageCount: messages.length,
        category,
        hasApiKey: !!this.apiKey,
        streaming: !!onChunk
      });
      
      if (onChunk) {
        // Streaming implementation
        return new Promise((resolve, reject) => {
          const streamRequest = {
            model: 'qwen-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1500,
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
                  resolve(this.cleanResponse(fullResponse, message, hasKnowledgeBaseContext));
                  return;
                }

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('data: ')) {
                    const data = trimmed.slice(6);
                    if (data === '[DONE]') {
                      resolve(this.cleanResponse(fullResponse, message, hasKnowledgeBaseContext));
                      return;
                    }
                    
                    try {
                      const parsed = JSON.parse(data);
                      const content = parsed.choices?.[0]?.delta?.content;
                      if (content) {
                        fullResponse += content;
                        // Send raw content during streaming to maintain readability
                        // Final cleaning will be applied to the complete response
                        onChunk(content);
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
            model: 'qwen-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1500,
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
        
        console.log('Received response from Qwen API:', {
          status: response.status,
          hasChoices: !!response.data?.choices,
          choicesLength: response.data?.choices?.length || 0,
          hasContent: !!response.data?.choices?.[0]?.message?.content
        });

        if (response.data?.choices?.[0]?.message?.content) {
          return this.cleanResponse(response.data.choices[0].message.content, message, hasKnowledgeBaseContext);
        } else {
          throw new Error('Invalid response format from Qwen API');
        }
      }
    } catch (error: any) {
      console.error('Error calling Qwen API:', error);
      
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
        return `I'm currently in demo mode. For "${message}", I would typically provide detailed legal guidance about Bahrain law. Please configure the Qwen API key to enable full functionality.`;
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
      'labour-law': ['labour', 'labor', 'employee', 'worker', 'salary', 'wage', 'working hours', 'termination', 'contract', 'overtime', 'vacation', 'leave', 'benefits', 'rights', 'workplace', 'employment'],
      'visa-services': ['visa', 'residence', 'permit', 'entry', 'tourist', 'business visa', 'work visa'],
      'lmra': ['lmra', 'work permit', 'labour market', 'labor market', 'employment permit'],
      'sijilat': ['sijilat', 'commercial registration', 'business license'],
      'grace-period': ['grace period', 'extension', 'overstay', 'renewal'],
      'general-legal': ['law', 'legal', 'court', 'attorney', 'lawyer'],
      'company-formation': ['company registration', 'business formation', 'corporate setup'],
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

export const qwenService = new QwenService();
