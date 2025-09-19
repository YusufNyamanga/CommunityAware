import { Request, Response } from 'express';
import { aiService } from '../services/aiService';
import { ChatRequest } from '../types';

interface ExtendedChatRequest extends Request {
  body: {
    message: string;
    language?: string;
    conversationHistory?: any[];
    stream?: boolean;
  };
}

export const aiController = {
  async handleChat(req: ExtendedChatRequest, res: Response) {
    const { message, language, conversationHistory, stream = false } = req.body;

    if (!message) {
      console.log('Message is missing in request');
      return res.status(400).json({ error: 'Message is required' });
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      try {
        for await (const chunk of aiService.streamMessage(
          message,
          language || 'en',
          conversationHistory
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
    try {
      const response = await aiService.sendMessage(
        message,
        language || 'en',
        conversationHistory
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
