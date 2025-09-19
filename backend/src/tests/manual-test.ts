import { aiService } from '../services/aiService';

async function runTests() {
  console.log('Starting Z.ai API Manual Tests...\n');

  // Test 1: Basic Query
  console.log('Test 1: Basic Query');
  try {
    const response = await aiService.sendMessage(
      'What are the requirements for a business visa in Bahrain?',
      [],
      'VISA',
      'en'
    );
    console.log('Response:', response);
    console.log('Test 1: ✅ Success\n');
  } catch (error) {
    console.error('Test 1: ❌ Failed:', error);
  }

  // Test 2: Arabic Query
  console.log('Test 2: Arabic Query');
  try {
    const response = await aiService.sendMessage(
      'ما هي متطلبات تأشيرة العمل؟',
      [],
      'VISA',
      'ar'
    );
    console.log('Response:', response);
    console.log('Test 2: ✅ Success\n');
  } catch (error) {
    console.error('Test 2: ❌ Failed:', error);
  }

  // Test 3: Conversation Context
  console.log('Test 3: Conversation Context');
  try {
    const history = [
      { role: 'user' as const, content: 'What types of visas are available in Bahrain?' },
      { role: 'assistant' as const, content: 'There are several types of visas including business, tourist, and work visas.' }
    ];
    const response = await aiService.sendMessage(
      'Which one do I need for starting a business?',
      history,
      'VISA',
      'en'
    );
    console.log('Response:', response);
    console.log('Test 3: ✅ Success\n');
  } catch (error) {
    console.error('Test 3: ❌ Failed:', error);
  }

  // Test 4: Streaming Response
  console.log('Test 4: Streaming Response');
  try {
    const messageStream = aiService.streamMessage(
      'Explain the labor laws in Bahrain',
      [],
      'LABOR',
      undefined,
      'en'
    );

    console.log('Streaming response:');
    for await (const chunk of messageStream) {
      process.stdout.write(chunk.content || '');
    }
    console.log('\nTest 4: ✅ Success\n');
  } catch (error) {
    console.error('Test 4: ❌ Failed:', error);
  }
}

// Run the tests
runTests().catch(console.error);
