import axios from 'axios';
import { ChatMessage, LegalCategory } from '../types';

// Secure backend API service - all AI calls go through backend
class BackendApiService {
  private baseURL: string;

  constructor() {
    const w = typeof window !== 'undefined' ? window.location : { protocol: 'http:', hostname: 'localhost', port: '5000' } as any;
    const defaultDev = `${w.protocol}//${w.hostname}:5000`;
    const defaultProd = `${w.protocol}//${w.hostname}`;
    const devPorts = new Set(['3000','3001','3002','3003']);
    const inferred = devPorts.has(w.port) ? defaultDev : defaultProd;
    // Prefer same-origin relative path in production if env not set
    const preferRelative = (!devPorts.has(w.port));
    this.baseURL = process.env.REACT_APP_BACKEND_URL || (preferRelative ? '' : inferred);
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
          await new Promise(r => setTimeout(r, 50));
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
      const inferredCategory: LegalCategory | undefined = category || this.categorizeQuery(message);
      return this.buildOfflineFallback(message, inferredCategory, language);
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
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    return content;
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

  categorizeQuery(message: string): LegalCategory {
    const q = (message || '').toLowerCase();
    if (/sijilat|company|register|cr\b|commercial\s+registration/.test(q)) return 'company-formation';
    if (/visa|residence|permit|work\s*permit|grace\s*period|overstay/.test(q)) return 'visa-services';
    if (/labou?r|salary|wage|overtime|termination|end\s*of\s*service|contract/.test(q)) return 'labour-law';
    if (/lmra|work\s*permit|transfer/.test(q)) return 'lmra';
    return 'general-legal';
  }

  private buildOfflineFallback(message: string, category?: LegalCategory, language: string = 'en'): string {
    const q = message?.trim();
    const heading = 'I could not reach the AI service right now.';
    const intro = q ? `Your question: ${q}` : '';
    const lmraLine = 'LMRA Call Centre (employers): +973 17506055. Toll‑free 995. Emergencies 999.';
    const common = 'Keep copies of contracts, payments and official correspondence.';

    switch (category) {
      case 'company-formation':
      case 'sijilat':
        return `${heading}\n\n${intro}\n\nCompany registration via Sijilat – quick steps:\n1) Determine legal form (WLL/Single Person Company/Establishment).\n2) Reserve name and prepare memorandum/articles as applicable.\n3) Submit application on Sijilat with shareholders’ IDs, address, activity list and capital.\n4) Obtain activity-specific approvals (municipality, health, industry) if required.\n5) Pay fees and receive commercial registration (CR) issuance.\n6) Register for LMRA and immigration if hiring staff.\n\nTip: choose the correct activity codes; some require prior approvals.\n${lmraLine}`;

      case 'visa-services':
      case 'grace-period':
        return `${heading}\n\n${intro}\n\nVisa essentials in Bahrain:\n1) Employer initiates LMRA work permit; employee submits passport, photos, medical where applicable.\n2) After permit approval, immigration issues visa/residency.\n3) Grace period/overstay: request extension promptly and settle fines if any.\n${lmraLine}`;

      case 'labour-law':
        return `${heading}\n\n${intro}\n\nCore labour law points:\n1) Written contract stating wage, role and hours.\n2) Standard working hours with overtime rules; weekly rest day.\n3) End‑of‑service and termination procedures follow statutory notice and entitlements.\n4) Disputes: use official mediation channels.\n${common}\n${lmraLine}`;

      case 'lmra':
        return `${heading}\n\n${intro}\n\nLMRA processes:\n1) Employer accounts manage permits, renewals and transfers.\n2) Employees/domestic workers may contact LMRA for assistance.\n${lmraLine}`;

      case 'general-legal':
      default:
        return `${heading}\n\n${intro}\n\nGeneral guidance:\n1) Verify your status and applicable rules for your case.\n2) Use official portals (Sijilat, LMRA) for applications and updates.\n3) Keep documentation organized; escalate via formal channels for disputes.\n${lmraLine}`;
    }
  }
}

export const backendApiService = new BackendApiService();