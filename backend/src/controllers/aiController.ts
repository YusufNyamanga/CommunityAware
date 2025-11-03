import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

// Extended language support to match frontend
type Language = 'en' | 'ar' | 'zh' | 'zh-tw' | 'es' | 'fr' | 'pt' | 'ru' | 'hi' | 'th' | 'id' | 'ms' | 'tr' | 'ur' | 'bn' | 'ta' | 'te' | 'ml' | 'pa' | 'ne' | 'am' | 'sw' | 'yo' | 'lg' | 'tl';
type LegalCategory = 'labour-law' | 'company-formation' | 'visa-services' | 'grace-period' | 'lmra' | 'sijilat' | 'general-legal' | 'other';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  category?: LegalCategory;
}

interface ChatRequest {
  message: string;
  language?: Language;
  category?: LegalCategory;
  stream?: boolean;
  history?: ChatMessage[];
}

const validateChatRequest = (req: Request): ChatRequest => {
  const { message, language = 'en' as Language, category, stream = false, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    throw new Error('Message is required and must be a string');
  }

  // Support all languages now handled by DeepSeek
  const supportedLanguages = ['en', 'ar', 'zh', 'zh-tw', 'es', 'fr', 'pt', 'ru', 'hi', 'th', 'id', 'ms', 'tr', 'ur', 'bn', 'ta', 'te', 'ml', 'pa', 'ne', 'am', 'sw', 'yo', 'lg', 'tl'];
  if (language && !supportedLanguages.includes(language)) {
    throw new Error(`Unsupported language. Supported languages: ${supportedLanguages.join(', ')}`);
  }

  if (history && !Array.isArray(history)) {
    throw new Error('History must be an array');
  }

  return { message, language, category, stream, history };
};

export const aiController = {
  async testConnection(req: Request, res: Response) {
    try {
      const response = await aiService.sendMessage(
        'Hello, this is a test message.',
        [],
        'general-legal',
        'en'
      );
      res.json(response);
    } catch (error) {
      console.error('AI Test Error:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to connect to AI service'
      });
    }
  },
  async handleChat(req: Request, res: Response) {
    try {
      const { message, language, category, stream, history } = validateChatRequest(req);
      
      // Auto-categorize if category is not provided
      const queryCategory = category || aiService.categorizeQuery(message);

      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');

        try {
          // Filter out system messages and cast to correct type
          const filteredHistory = (history || []).filter(
            msg => msg.role !== 'system'
          ) as Array<{ role: 'user' | 'assistant'; content: string }>;

          for await (const chunk of aiService.streamMessage(
            message,
            filteredHistory,
            queryCategory
          )) {
            if (chunk.error) {
              res.write(`data: ${JSON.stringify({ error: chunk.error })}\n\n`);
              break;
            }
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
          }
          res.write('data: [DONE]\n\n');
          res.end();
        } catch (error) {
          console.error('Streaming Error:', error);
          res.write(`data: ${JSON.stringify({
            error: error instanceof Error ? error.message : 'An error occurred while streaming'
          })}\n\n`);
          res.end();
        }
        return;
      }

      // Non-streaming response
      // Filter out system messages and cast to correct type
      const filteredHistory = (history || []).filter(
        msg => msg.role !== 'system'
      ) as Array<{ role: 'user' | 'assistant'; content: string }>;

      const response = await aiService.sendMessage(
        message,
        filteredHistory,
        queryCategory,
        language
      );

      if (response.error) {
        console.error('AI service returned error:', response.error);
        return res.status(500).json({ error: response.error });
      }

      res.json(response);
    } catch (error) {
      console.error('Chat Controller Error:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An error occurred while processing your request'
      });
    }
  }
};
