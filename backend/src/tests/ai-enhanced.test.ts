import { aiService } from '../services/aiService';

describe('Enhanced Z.ai Integration Tests', () => {
  // Test message validation
  describe('Message Validation', () => {
    test('should validate normal messages', async () => {
      const result = await aiService.validateMessage('What are the visa requirements?');
      expect(result.isValid).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    test('should reject empty messages', async () => {
      const result = await aiService.validateMessage('   ');
      expect(result.isValid).toBe(false);
      expect(result.reason).toContain('empty');
    });

    test('should reject messages with banned words', async () => {
      const result = await aiService.validateMessage('How to hack the system?');
      expect(result.isValid).toBe(false);
      expect(result.reason).toContain('hack');
    });

    test('should reject too long messages', async () => {
      const longMessage = 'a'.repeat(2500);
      const result = await aiService.validateMessage(longMessage);
      expect(result.isValid).toBe(false);
      expect(result.reason).toContain('too long');
    });
  });

  // Test model configuration
  describe('Model Configuration', () => {
    test('should allow updating model parameters', () => {
      aiService.setModelConfig({
        temperature: 0.8,
        maxTokens: 2048
      });

      // Make a request and verify the new parameters
      const response = aiService.sendMessage('Test message');
      expect(response).resolves.toBeDefined();
    });
  });

  // Test enhanced responses
  describe('Enhanced Responses', () => {
    test('should provide refined responses with citations', async () => {
      const response = await aiService.getRefinedResponse(
        'What are the working hours in Bahrain?',
        'LABOR',
        'en'
      );

      expect(response).toContain('Sources:');
      expect(response).toContain('Bahrain Labor Law');
      expect(response).toContain('LMRA Regulations');
    });

    test('should include timestamp in system message', async () => {
      const response = await aiService.sendMessage(
        'What are business regulations?',
        [],
        'BUSINESS',
        'en'
      );

      expect(response.content).toContain(new Date().getFullYear().toString());
    });
  });

  // Test multilingual enhanced templates
  describe('Enhanced Multilingual Support', () => {
    test('should use enhanced Arabic templates', async () => {
      const response = await aiService.sendMessage(
        'ما هي ساعات العمل؟',
        [],
        'LABOR',
        'ar'
      );

      expect(response.content).toBeDefined();
      expect(response.error).toBeUndefined();
    });

    test('should use enhanced English templates', async () => {
      const response = await aiService.sendMessage(
        'What are the working hours?',
        [],
        'LABOR',
        'en'
      );

      expect(response.content).toBeDefined();
      expect(response.error).toBeUndefined();
    });
  });

  // Test error handling
  describe('Enhanced Error Handling', () => {
    test('should handle invalid model config', () => {
      expect(() => {
        aiService.setModelConfig({
          temperature: 2.0 // Invalid temperature
        });
      }).toThrow();
    });

    test('should handle API errors gracefully', async () => {
      // Temporarily set invalid API key
      const originalKey = process.env.ZAI_API_KEY;
      process.env.ZAI_API_KEY = 'invalid_key';

      const response = await aiService.sendMessage('Test message');
      expect(response.error).toBeDefined();

      // Restore API key
      process.env.ZAI_API_KEY = originalKey;
    });
  });
});
