import { bahrainLabourLawKB } from './src/data/knowledgeBase';

function getKnowledgeCategories(): string[] {
  const categories = Array.from(new Set(bahrainLabourLawKB.map(entry => entry.category)));
  return categories.sort();
}

console.log('Available categories in knowledge base:');
const categories = getKnowledgeCategories();
categories.forEach(category => {
  const count = bahrainLabourLawKB.filter(entry => entry.category === category).length;
  console.log(`- ${category}: ${count} entries`);
});

console.log('\nCultural-guidelines entries:');
const culturalEntries = bahrainLabourLawKB.filter(entry => entry.category === 'cultural-guidelines');
culturalEntries.forEach(entry => {
  console.log(`- ${entry.title} (${entry.id})`);
});

console.log('\nMental-health entries:');
const mentalEntries = bahrainLabourLawKB.filter(entry => entry.category === 'mental-health');
mentalEntries.forEach(entry => {
  console.log(`- ${entry.title} (${entry.id})`);
});