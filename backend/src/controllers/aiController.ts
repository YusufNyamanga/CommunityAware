import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

// Extended language support to match frontend
type Language = 'en' | 'ar' | 'zh' | 'zh-tw' | 'es' | 'fr' | 'pt' | 'ru' | 'hi' | 'th' | 'id' | 'ms' | 'tr' | 'ur' | 'bn' | 'ta' | 'te' | 'ml' | 'pa' | 'ne' | 'am' | 'sw' | 'yo' | 'lg' | 'tl';
type LegalCategory = 'labour-law' | 'company-formation' | 'visa-services' | 'grace-period' | 'lmra' | 'sijilat' | 'general-legal' | 'other';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  role?: 'user' | 'assistant' | 'system';
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
          // Filter out system messages and map to correct type
          const filteredHistory = (history || [])
            .filter(msg => msg.role !== 'system')
            .map(msg => ({
              role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
              content: msg.content
            }));

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
      // Filter out system messages and map to correct type
      const filteredHistory = (history || [])
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: msg.content
        }));

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
  ,
  async handleChatStreamGet(req: Request, res: Response) {
    try {
      const messageParam = req.query.message;
      if (!messageParam || typeof messageParam !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }
      const languageParam = (req.query.language as Language) || 'en';
      const categoryParam = req.query.category as LegalCategory | undefined;
      const historyParam = req.query.history as string | undefined;

      const supportedLanguages = ['en', 'ar', 'zh', 'zh-tw', 'es', 'fr', 'pt', 'ru', 'hi', 'th', 'id', 'ms', 'tr', 'ur', 'bn', 'ta', 'te', 'ml', 'pa', 'ne', 'am', 'sw', 'yo', 'lg', 'tl'];
      if (languageParam && !supportedLanguages.includes(languageParam)) {
        return res.status(400).json({ error: `Unsupported language` });
      }

      const queryCategory = categoryParam || aiService.categorizeQuery(messageParam);

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');

      let filteredHistory: Array<{ role: 'user' | 'assistant', content: string }> = [];
      if (historyParam) {
        try {
          const parsed = JSON.parse(historyParam);
          if (Array.isArray(parsed)) {
            filteredHistory = parsed
              .filter((msg: any) => msg && msg.role !== 'system')
              .map((msg: any) => ({
                role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
                content: msg.content
              }))
              .slice(-10);
          }
        } catch {}
      }

      try {
        for await (const chunk of aiService.streamMessage(
          messageParam,
          filteredHistory,
          queryCategory,
          languageParam
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
        res.write(`data: ${JSON.stringify({ error: 'Streaming error' })}\n\n`);
        res.end();
      }
    } catch (error) {
      console.error('Chat Stream GET Error:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  }
};
