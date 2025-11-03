import axios from 'axios';
import { ChatMessage, LegalCategory } from '../types';

// Secure backend API service - all AI calls go through backend
class BackendApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
    console.log('🔒 Backend API Service initialized (Secure mode)');
    console.log('Backend URL:', this.baseURL);
  }

  async sendMessage(
    message: string, 
    conversationHistory: ChatMessage[] = [],
    category?: LegalCategory,
    onChunk?: (chunk: string) => void,
    language: string = 'en'
  ): Promise<string> {
    try {
      // Prepare history in the format expected by backend
      const history = conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const requestData = {
        message,
        history,
        category,
        language,
        stream: !!onChunk
      };

      if (onChunk) {
        // For now, use simulated streaming with regular POST
        // Real streaming would require Server-Sent Events or WebSocket implementation
        return this.fallbackToPost(requestData, onChunk);
      } else {
        // Non-streaming implementation
        const response = await axios.post(`${this.baseURL}/api/chat`, requestData, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        });

        if (response.data?.error) {
          throw new Error(response.data.error);
        }

        return response.data?.content || 'No response received';
      }
    } catch (error: any) {
      console.error('Backend API Error:', error);
      
      // Provide user-friendly error messages
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your credentials.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error occurred. Please try again in a moment.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to backend server. Please ensure the backend is running.');
      }
      
      throw new Error(error.message || 'Failed to get response from backend service');
    }
  }

  // Fallback method for when EventSource streaming fails
  private async fallbackToPost(requestData: any, onChunk?: (chunk: string) => void): Promise<string> {
    console.log('Falling back to POST request...');
    
    const response = await axios.post(`${this.baseURL}/api/chat`, {
      ...requestData,
      stream: false // Force non-streaming for fallback
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    if (response.data?.error) {
      throw new Error(response.data.error);
    }

    const content = response.data?.content || '';
    
    // Simulate streaming for fallback
    if (onChunk && content) {
      const words = content.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
        onChunk(chunk);
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    return content;
  }

  // Method to categorize user queries (now handled by backend)
  categorizeQuery(message: string): LegalCategory {
    // This is now done by the backend, but we keep this for compatibility
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

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: 5000
      });
      return response.status === 200;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }

  // Test connection method
  async testConnection(): Promise<string> {
    try {
      const response = await axios.post(`${this.baseURL}/api/chat`, {
        message: 'Hello, this is a connection test.',
        language: 'en',
        category: 'general-legal',
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      return response.data?.content || 'Connection test successful!';
    } catch (error: any) {
      console.error('Connection test failed:', error);
      throw new Error(error.message || 'Connection test failed');
    }
  }
}

export const backendApiService = new BackendApiService();