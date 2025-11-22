// Simple test to check if the knowledge base entries are working
import { bahrainLabourLawKB } from './src/data/knowledgeBase';

console.log('Total entries:', bahrainLabourLawKB.length);

const categoriesSet = new Set(bahrainLabourLawKB.map(entry => entry.category));
const categories = Array.from(categoriesSet);
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