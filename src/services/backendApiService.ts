import axios from 'axios';
import { ChatMessage, LegalCategory } from '../types';

// Secure backend API service - all AI calls go through backend
class BackendApiService {
  private baseURL: string;

  constructor() {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000';
    const defaultURL = origin.includes(':3000') ? 'http://localhost:5000' : origin;
    this.baseURL = process.env.REACT_APP_BACKEND_URL || defaultURL;
    console.log('🔒 Backend API Service initialized (Secure mode)');
    console.log('Backend URL:', this.baseURL);
  }

  async sendMessage(
    message: string,
    conversationHistory: ChatMessage[] = [],
    category?: LegalCategory,
    onChunk?: (chunk: string) => void,
    language: string = 'en',
    onStatus?: (status: 'retrying' | 'fallback') => void
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
        const tryEventSource = (): Promise<string | null> => {
          try {
            const historyPayload = JSON.stringify(history.slice(-6));
            const url = `${this.baseURL}/api/chat/stream?message=${encodeURIComponent(message)}&language=${encodeURIComponent(language)}${category ? `&category=${encodeURIComponent(category)}` : ''}&history=${encodeURIComponent(historyPayload)}`;
            return new Promise((resolve) => {
              let full = '';
              const es = new EventSource(url);
              es.onmessage = (e) => {
                if (e.data === '[DONE]') {
                  es.close();
                  resolve(full || 'No response received');
                  return;
                }
                try {
                  const payload = JSON.parse(e.data);
                  if (payload.error) {
                    es.close();
                    resolve(null);
                    return;
                  }
                  if (payload.content) {
                    full += payload.content;
                    onChunk?.(payload.content);
                  }
                } catch {
                }
              };
              es.onerror = () => {
                es.close();
                resolve(null);
              };
            });
          } catch {
            return Promise.resolve(null);
          }
        };

        const attemptStream = async (): Promise<{ content: string | null, ok: boolean }> => {
          const response = await fetch(`${this.baseURL}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...requestData, stream: true })
          });
          if (!response.ok) {
            return { content: null, ok: false };
          }
          const contentType = response.headers.get('content-type') || '';
          if (!contentType.includes('text/event-stream')) {
            return { content: null, ok: false };
          }
          const reader = response.body?.getReader();
          const decoder = new TextDecoder('utf-8');
          let fullContent = '';
          let buffer = '';
          if (!reader) {
            return { content: null, ok: false };
          }
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunkText = decoder.decode(value, { stream: true });
            buffer += chunkText;
            while (true) {
              const sepIndex = buffer.indexOf('\n\n');
              if (sepIndex === -1) break;
              const evt = buffer.slice(0, sepIndex).trim();
              buffer = buffer.slice(sepIndex + 2);
              if (!evt) continue;
              if (evt === 'data: [DONE]') {
                buffer = '';
                break;
              }
              if (evt.startsWith('data: ')) {
                const payloadText = evt.substring(6);
                try {
                  const payload = JSON.parse(payloadText);
                  if (payload.error) {
                    throw new Error(payload.error);
                  }
                  if (payload.content) {
                    fullContent += payload.content;
                    onChunk?.(payload.content);
                  }
                } catch {}
              }
            }
          }
          return { content: fullContent || 'No response received', ok: true };
        };

        try {
          const esResult = await tryEventSource();
          if (esResult) {
            return esResult;
          }
          const first = await attemptStream();
          if (first.ok && first.content) {
            return first.content;
          }
          onStatus?.('retrying');
          await new Promise(r => setTimeout(r, 300));
          const second = await attemptStream();
          if (second.ok && second.content) {
            return second.content;
          }
          onStatus?.('fallback');
          const fallbackContent = await this.fallbackToPost(requestData, onChunk);
          return fallbackContent;
        } catch {
          onStatus?.('fallback');
          const fallbackContent = await this.fallbackToPost(requestData, onChunk);
          return fallbackContent;
        }
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