import { aiService } from '../services/aiService';

describe('Z.ai Integration Tests', () => {
  // Test basic message sending
  test('should send a message and get a response', async () => {
    const response = await aiService.sendMessage(
      'What are the requirements for a business visa in Bahrain?',
      [],
      'VISA',
      'en'
    );
    
    expect(response).toHaveProperty('content');
    expect(response.content).toBeTruthy();
    expect(response).toHaveProperty('usage');
    expect(response.error).toBeUndefined();
  });

  // Test automatic categorization
  test('should correctly categorize messages', () => {
    expect(aiService.categorizeQuery('How do I get a work visa?')).toBe('VISA');
    expect(aiService.categorizeQuery('How do I start a business?')).toBe('BUSINESS');
    expect(aiService.categorizeQuery('What are employee rights?')).toBe('LABOR');
    expect(aiService.categorizeQuery('Tell me about Bahrain')).toBe('GENERAL');
  });

  // Test Arabic language support
  test('should handle Arabic messages', async () => {
    const response = await aiService.sendMessage(
      'ما هي متطلبات تأشيرة العمل؟',
      [],
      'VISA',
      'ar'
    );
    
    expect(response).toHaveProperty('content');
    expect(response.content).toBeTruthy();
    expect(response.error).toBeUndefined();
  });

  // Test conversation history
  test('should maintain conversation context', async () => {
    const history = [
      { role: 'user', content: 'What types of visas are available?' },
      { role: 'assistant', content: 'There are several types of visas including business, tourist, and work visas.' }
    ];
    
    const response = await aiService.sendMessage(
      'Which one do I need for starting a business?',
      history,
      'VISA',
      'en'
    );
    
    expect(response).toHaveProperty('content');
    expect(response.content).toBeTruthy();
    expect(response.error).toBeUndefined();
  });

  // Test streaming functionality
  test('should stream responses', async () => {
    const messageStream = aiService.streamMessage(
      'What are the labor laws in Bahrain?',
      [],
      'LABOR',
      undefined,
      'en'
    );

    const chunks = [];
    for await (const chunk of messageStream) {
      chunks.push(chunk);
      expect(chunk).toHaveProperty('content');
      expect(chunk.error).toBeUndefined();
    }

    expect(chunks.length).toBeGreaterThan(0);
  });

  // Test error handling
  test('should handle API errors gracefully', async () => {
    // Temporarily invalidate API key
    const originalKey = process.env.ZAI_API_KEY;
    process.env.ZAI_API_KEY = 'invalid_key';

    const response = await aiService.sendMessage(
      'Test message',
      [],
      'GENERAL',
      'en'
    );

    expect(response).toHaveProperty('error');
    expect(response.content).toBe('');

    // Restore API key
    process.env.ZAI_API_KEY = originalKey;
  });

  // Test message types handling
  test('should handle different message types', async () => {
    const messages = [
      'How to register a company?',
      'What are the working hours regulations?',
      'Tell me about residence permits',
    ];

    for (const message of messages) {
      const response = await aiService.sendMessage(message);
      expect(response).toHaveProperty('content');
      expect(response.content).toBeTruthy();
      expect(response.error).toBeUndefined();
    }
  });
});
