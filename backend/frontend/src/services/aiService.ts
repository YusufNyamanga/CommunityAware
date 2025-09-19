import axios from 'axios';
import { AIResponse, ChatRequest, LegalCategory } from '../types';

const Z_AI_API_KEY = process.env.ZAI_API_KEY || '';
// Z.AI API configuration
const Z_AI_API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';
const Z_AI_MODEL = 'glm-4.5-flash';
const Z_AI_MAX_TOKENS = 2048; // Maximum tokens for the Flash model

interface APIRequestConfig {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

class AIService {
  private zApiKey: string;
  private zApiUrl: string;

  constructor() {
    this.zApiKey = Z_AI_API_KEY;
    this.zApiUrl = Z_AI_API_URL;

    console.log('AI Service initialized with Z AI configuration');
  }

  private getSystemPrompt(category?: LegalCategory, language: string = 'en'): string {
    const prompts = {
      'labour-law': `You are an expert labour law assistant specializing in Bahrain's employment laws and regulations. 
      Provide accurate, helpful information about:
      - Employment contracts and rights
      - Working hours and overtime
      - Leave policies and benefits
      - Termination procedures
      - Workplace safety regulations
      - Dispute resolution
      
      IMPORTANT:
      1. Always cite relevant Bahrain Labour Law articles when possible
      2. Base responses on official LMRA and Ministry of Labour regulations
      3. If unsure about specific details, recommend consulting with a qualified legal professional
      4. Keep responses clear, concise, and focused on Bahrain law`,

      'visa-services': `You are an expert visa and immigration consultant specializing in Bahrain's visa regulations.
      Provide accurate information about:
      - Visa types and requirements
      - Application procedures
      - Documentation needed
      - Processing times
      - Fees and charges
      - Residence permits
      
      IMPORTANT:
      1. Base responses on current NPRA (Nationality, Passports & Residence Affairs) regulations
      2. Always note when information might need verification due to policy changes
      3. Provide clear step-by-step procedures when applicable
      4. Include relevant authority contact information when appropriate`,

      'company-formation': `You are an expert business consultant specializing in Bahrain company formation.
      Provide accurate information about:
      - Types of legal entities
      - Registration procedures
      - Required documents
      - Licensing requirements
      - Fees and timeline
      - Corporate governance
      
      IMPORTANT:
      1. Base responses on current Ministry of Industry and Commerce regulations
      2. Include Sijilat (Commercial Registration) requirements when applicable
      3. Reference specific governmental requirements and procedures
      4. Recommend consulting with licensed professionals for specific cases`,

      'default': `You are a specialized AI legal assistant for the Bahrain community.
      Your role is to provide accurate information about:
      - Labour law and employee rights (Private Sector)
      - Company formation and business registration
      - Visa services and immigration
      - LMRA procedures
      - Legal compliance requirements
      
      IMPORTANT:
      1. Base responses on official Bahrain laws and regulations
      2. Provide accurate, up-to-date information
      3. Recommend professional consultation when necessary
      4. Include relevant authority references`
    };

    const selectedPrompt = category ? prompts[category] : prompts.default;
    const languagePrompt = language === 'ar' ? '\n\nIMPORTANT: Provide your response in Arabic.' : '';

    return selectedPrompt + languagePrompt;
  }

  private createRequestConfig(message: string, language: string = 'en', conversationHistory: any[] = [], stream: boolean = false, category?: LegalCategory): APIRequestConfig {
    return {
      model: Z_AI_MODEL,
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt(category, language)
        },
        ...conversationHistory.slice(-5).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent legal advice
      max_tokens: Z_AI_MAX_TOKENS,
      top_p: 0.95,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
      stream
    };
  }

async *streamMessage(
    message: string,
    language: string = 'en',
    conversationHistory: any[] = [],
    category?: LegalCategory
  ): AsyncGenerator<AIResponse> {
    try {
      const response = await axios.post(
        this.zApiUrl,
        this.createRequestConfig(message, language, conversationHistory, true, category),
        {
          headers: {
            'Authorization': `Bearer ${this.zApiKey}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US,en'
          },
          responseType: 'stream'
        }
      );

      for await (const chunk of response.data) {
        const lines = chunk
          .toString()
          .split('\n')
          .filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.includes('[DONE]')) continue;
          
          try {
            const parsed = JSON.parse(line.replace(/^data: /, ''));
            if (!parsed.choices?.[0]?.delta?.content) continue;
            
            yield { content: parsed.choices[0].delta.content };
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    } catch (error) {
      yield {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async sendMessage(
    message: string,
    language: string = 'en',
    conversationHistory: any[] = [],
    category?: LegalCategory
  ): Promise<AIResponse> {
    try {
      const response = await axios.post(
        this.zApiUrl,
        this.createRequestConfig(message, language, conversationHistory, false, category),
        {
          headers: {
            'Authorization': `Bearer ${this.zApiKey}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US,en'
          },
          responseType: 'json'
        }
      );

      if (response.data?.choices?.[0]?.message?.content) {
        return { content: response.data.choices[0].message.content };
      }

      throw new Error('Response from Z AI is empty');
    } catch (error) {
      console.error('Z AI Service Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export const aiService = new AIService();
