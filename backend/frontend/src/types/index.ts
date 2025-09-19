export type LegalCategory =
  | 'labour-law'
  | 'company-formation'
  | 'visa-services'
  | 'grace-period'
  | 'lmra'
  | 'sijilat'
  | 'general-legal'
  | 'other';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  category?: LegalCategory;
}

export interface AIServiceResponse {
  content: string;
  category?: LegalCategory;
  error?: string;
}

export interface ChatRequest {
  message: string;
  language?: string;
  category?: LegalCategory;
  conversationHistory?: ChatMessage[];
}
