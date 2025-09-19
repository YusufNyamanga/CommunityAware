export type LegalCategory = 
  | 'VISA'
  | 'BUSINESS'
  | 'LABOR'
  | 'GENERAL';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  language?: string;
  conversationHistory?: ChatMessage[];
  category?: LegalCategory;
}

export interface AIModelConfig {
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface AIResponse {
  content?: string;
  error?: string;
  category?: LegalCategory;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ZAIResponse {
  id: string;
  request_id: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      reasoning_content?: string;
      tool_calls?: {
        function: {
          name: string;
          arguments: any;
        };
        id: string;
        type: string;
      }[];
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
