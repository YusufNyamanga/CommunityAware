import axios from 'axios';

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

type Category = 'VISA' | 'BUSINESS' | 'LABOR' | 'GENERAL';
type Language = 'en' | 'ar';

// ZAI API configuration
const ZAI_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

class AiService {
  private modelConfig: ModelConfig = {
    temperature: 0.7,
    maxTokens: 4096
  };

  private readonly MAX_MESSAGE_LENGTH = 2000;
  private readonly BANNED_WORDS = ['hack', 'exploit', 'crack'];

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
    category: Category = 'GENERAL',
    language: Language = 'en'
  ): Promise<MessageResponse> {
    try {
      const validation = this.validateMessage(message);
      if (!validation.isValid) {
        return { error: validation.reason };
      }

      if (!process.env.ZAI_API_KEY || process.env.ZAI_API_KEY === 'invalid_key') {
        return { error: 'ZAI API key is not configured or invalid' };
      }

      const systemMessage = this.getSystemMessage(category, language);

      console.log('Query:', message);
      console.log('Category:', category);
      console.log('Language:', language);

      // Prepare messages for ZAI API
      const messages = [
        { role: 'system', content: systemMessage },
        ...history.map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: 'user', content: message }
      ];

      console.log('Making request to ZAI GLM 4.5 Flash...');
      
      const response = await axios.post(ZAI_API_URL, {
        model: 'glm-4-flash',
        messages: messages,
        temperature: this.modelConfig.temperature,
        max_tokens: this.modelConfig.maxTokens,
        stream: false
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      if (response.data?.choices?.[0]?.message?.content) {
        return { content: response.data.choices[0].message.content };
      } else {
        console.error('Unexpected ZAI API response:', response.data);
        return { error: 'Unexpected response format from ZAI API' };
      }
    } catch (error) {
      console.error('ZAI API Error:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;
        return { 
          error: `ZAI API Error (${status} ${statusText}): ${data?.error?.message || error.message}` 
        };
      }
      return { 
        error: error instanceof Error ? error.message : 'Failed to get response from ZAI service' 
      };
    }
  }

  async *streamMessage(
    message: string,
    history: Array<{ role: 'user' | 'assistant', content: string }> = [],
    category: Category = 'GENERAL',
    language: Language = 'en'
  ): AsyncGenerator<MessageResponse> {
    try {
      const validation = this.validateMessage(message);
      if (!validation.isValid) {
        yield { error: validation.reason };
        return;
      }

      if (!process.env.ZAI_API_KEY || process.env.ZAI_API_KEY === 'invalid_key') {
        yield { error: 'ZAI API key is not configured or invalid' };
        return;
      }

      const systemMessage = this.getSystemMessage(category, language);

      // Prepare messages for ZAI API
      const messages = [
        { role: 'system', content: systemMessage },
        ...history.map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: 'user', content: message }
      ];

      console.log('Starting stream request to ZAI GLM 4.5 Flash...');
      
      // For now, use non-streaming approach and simulate streaming
      // This avoids the complexity of async generator + event emitters
      const response = await axios.post(ZAI_API_URL, {
        model: 'glm-4-flash',
        messages: messages,
        temperature: this.modelConfig.temperature,
        max_tokens: this.modelConfig.maxTokens,
        stream: false
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      if (response.data?.choices?.[0]?.message?.content) {
        const content = response.data.choices[0].message.content;
        // Simulate streaming by yielding chunks
        const words = content.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
          yield { content: chunk };
          // Small delay to simulate streaming
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } else {
        yield { error: 'Unexpected response format from ZAI API' };
      }

    } catch (error) {
      console.error('ZAI Streaming Error:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;
        yield { 
          error: `ZAI Streaming Error (${status} ${statusText}): ${data?.error?.message || error.message}` 
        };
      } else {
        yield { 
          error: error instanceof Error ? error.message : 'Failed to stream from ZAI service' 
        };
      }
    }
  }

  async getRefinedResponse(
    query: string,
    category: Category,
    language: Language = 'en'
  ): Promise<string> {
    const response = await this.sendMessage(query, [], category, language);
    if (response.error) {
      throw new Error(response.error);
    }

    return `${response.content}\n\nNote: For official and up-to-date information, please consult LMRA (www.lmra.bh) or a legal professional.`;
  }

  private getSystemMessage(category: Category, language: Language): string {
    const date = new Date();
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    if (language === 'ar') {
      return `مساعد افتراضي يقدم معلومات عامة عن ${this.getCategoryNameAr(category)}. يرجى مراجعة المواقع الرسمية للحصول على أحدث المعلومات.\nتاريخ المعلومات: ${dateStr}`;
    }

    return `Virtual assistant providing general information about ${this.getCategoryName(category)}. Please refer to official websites for the most up-to-date information.\nInformation as of ${dateStr}`;
  }

  private getCategoryName(category: Category): string {
    switch (category) {
      case 'VISA': return 'visas in Bahrain';
      case 'BUSINESS': return 'business registration in Bahrain';
      case 'LABOR': return 'labor regulations in Bahrain';
      default: return 'regulations in Bahrain';
    }
  }

  private getCategoryNameAr(category: Category): string {
    switch (category) {
      case 'VISA': return 'التأشيرات في البحرين';
      case 'BUSINESS': return 'تسجيل الأعمال في البحرين';
      case 'LABOR': return 'قوانين العمل في البحرين';
      default: return 'القوانين في البحرين';
    }
  }

}

export const aiService = new AiService();
