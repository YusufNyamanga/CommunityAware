// Test the actual getKnowledgeCategories function
const { getKnowledgeCategories, getKnowledgeByCategory } = require('./src/data/knowledgeBase.ts');

console.log('Testing getKnowledgeCategories function...');

try {
  const categories = getKnowledgeCategories();
  console.log('Available categories:', categories.sort());
  
  const hasCulturalGuidelines = categories.includes('cultural-guidelines');
  const hasMentalHealth = categories.includes('mental-health');
  
  console.log('\nNew categories status:');
  console.log(`- cultural-guidelines: ${hasCulturalGuidelines ? 'FOUND' : 'MISSING'}`);
  console.log(`- mental-health: ${hasMentalHealth ? 'FOUND' : 'MISSING'}`);
  
  if (hasCulturalGuidelines) {
    const culturalEntries = getKnowledgeByCategory('cultural-guidelines');
    console.log(`\nCultural guidelines entries: ${culturalEntries.length}`);
    culturalEntries.forEach(entry => console.log(`- ${entry.title} (${entry.id})`));
  }
  
  if (hasMentalHealth) {
    const mentalEntries = getKnowledgeByCategory('mental-health');
    console.log(`\nMental health entries: ${mentalEntries.length}`);
    mentalEntries.forEach(entry => console.log(`- ${entry.title} (${entry.id})`));
  }
} catch (error) {
  console.error('Error testing knowledge base:', error.message);
}