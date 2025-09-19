export interface ChatRequest {
  message: string;
  language?: string;
  conversationHistory?: Array<{
    sender: 'user' | 'assistant';
    content: string;
  }>;
}

export interface AIResponse {
  content?: string;
  error?: string;
}
