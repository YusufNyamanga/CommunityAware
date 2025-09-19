import express from 'express';
import { config } from 'dotenv';
import { aiService } from './services/aiService';

// Load environment variables
config();

const app = express();
app.use(express.json());

// Test endpoint
app.post('/test', async (req, res) => {
  console.log('Testing Z.ai API...');
  try {
    const response = await aiService.sendMessage(
      'What are the requirements for a business visa in Bahrain?',
      [],
      'VISA',
      'en'
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

// Start server
const port = 3333;
const host = '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
