// Simple test to check if the knowledge base entries are working
const fs = require('fs');

// Create a simple test file that imports the knowledge base
const testContent = `
import { bahrainLabourLawKB } from './src/data/knowledgeBase';

console.log('Total entries:', bahrainLabourLawKB.length);

const categories = [...new Set(bahrainLabourLawKB.map(entry => entry.category))];
console.log('Available categories:', categories.sort());

const culturalEntries = bahrainLabourLawKB.filter(entry => entry.category === 'cultural-guidelines');
console.log('Cultural guidelines entries:', culturalEntries.length);

const mentalEntries = bahrainLabourLawKB.filter(entry => entry.category === 'mental-health');
console.log('Mental health entries:', mentalEntries.length);

if (culturalEntries.length > 0) {
  console.log('Cultural guidelines titles:');
  culturalEntries.forEach(entry => console.log('-', entry.title));
}

if (mentalEntries.length > 0) {
  console.log('Mental health titles:');
  mentalEntries.forEach(entry => console.log('-', entry.title));
}
`;

fs.writeFileSync('test-kb-import.ts', testContent);
console.log('Created test file. Now running it with ts-node...');

// Run the test
const { execSync } = require('child_process');
try {
  const result = execSync('npx ts-node test-kb-import.ts', { encoding: 'utf8' });
  console.log(result);
} catch (error) {
  console.error('Error running test:', error.message);
}