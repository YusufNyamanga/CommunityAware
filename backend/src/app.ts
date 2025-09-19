import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { validateToken, checkUserRateLimit, validateRequestToken } from './middleware/auth';
import { aiController } from './controllers/aiController';
import { aiService } from './services/aiService';
import { authController } from './controllers/authController';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 5000;

// Basic CORS configuration - allow all origins for testing
app.use(cors());

// Body parsing
app.use(express.json());

// Debug endpoint to check environment variables
app.get('/api/debug-env', (req, res) => {
  res.json({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ZAI_API_KEY_EXISTS: !!process.env.ZAI_API_KEY,
    ZAI_API_KEY_LENGTH: process.env.ZAI_API_KEY?.length || 0,
    ZAI_API_KEY_PREFIX: process.env.ZAI_API_KEY?.substring(0, 10) + '...',
  });
});

// Simple test endpoint
app.post('/api/test-ai-direct', async (req, res) => {
  console.log('Testing Z.ai API...');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('ZAI_API_KEY exists:', !!process.env.ZAI_API_KEY);
  console.log('ZAI_API_KEY length:', process.env.ZAI_API_KEY?.length || 0);
  try {
    const { message, category = 'VISA', language = 'en' } = req.body;
    const response = await aiService.sendMessage(
      message,
      [],
      category,
      language
    );
    console.log('AI Response:', response);
    res.json(response);
  } catch (error) {
    console.error('AI Test Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to connect to AI service'
    });
  }
});

// API routes with authentication and rate limiting
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/test-ai', validateToken, aiController.testConnection);

// Protected routes
app.use('/api/chat', validateToken, checkUserRateLimit, validateRequestToken, aiController.handleChat);

// Health check

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
