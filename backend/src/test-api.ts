import { config } from 'dotenv';
import { aiService } from './services/aiService';

// Load environment variables
config();

async function testAPI() {
  console.log('Starting Z.ai API test...');
  
  try {
    const response = await aiService.sendMessage(
      'What are the requirements for a business visa in Bahrain?',
      [],
      'VISA',
      'en'
    );
    console.log('API Response:', response);
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

// Run the test
testAPI();
