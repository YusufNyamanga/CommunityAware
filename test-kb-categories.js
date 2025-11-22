const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbFile = fs.readFileSync(path.join(__dirname, 'src/data/knowledgeBase.ts'), 'utf8');

// Find all category occurrences
const categoryMatches = kbFile.match(/category:\s*'([^']+)'/g);
if (categoryMatches) {
  const categories = categoryMatches.map(match => {
    const matchResult = match.match(/category:\s*'([^']+)'/);
    return matchResult ? matchResult[1] : null;
  }).filter(Boolean);

  const uniqueCategories = [...new Set(categories)];
  
  console.log('Available categories in knowledge base:');
  uniqueCategories.sort().forEach(category => {
    const count = categories.filter(cat => cat === category).length;
    console.log(`- ${category}: ${count} entries`);
  });

  // Check for our new categories
  const hasCulturalGuidelines = uniqueCategories.includes('cultural-guidelines');
  const hasMentalHealth = uniqueCategories.includes('mental-health');

  console.log('\nNew categories status:');
  console.log(`- cultural-guidelines: ${hasCulturalGuidelines ? 'FOUND' : 'MISSING'}`);
  console.log(`- mental-health: ${hasMentalHealth ? 'FOUND' : 'MISSING'}`);
  
  if (hasCulturalGuidelines) {
    console.log('\nCultural-guidelines entries found:');
    const culturalMatches = kbFile.match(/{[\s\S]*?category:\s*'cultural-guidelines'[\s\S]*?}/g);
    if (culturalMatches) {
      culturalMatches.forEach(match => {
        const titleMatch = match.match(/title:\s*'([^']+)'/);
        const idMatch = match.match(/id:\s*'([^']+)'/);
        if (titleMatch && idMatch) {
          console.log(`- ${titleMatch[1]} (${idMatch[1]})`);
        }
      });
    }
  }

  if (hasMentalHealth) {
    console.log('\nMental-health entries found:');
    const mentalMatches = kbFile.match(/{[\s\S]*?category:\s*'mental-health'[\s\S]*?}/g);
    if (mentalMatches) {
      mentalMatches.forEach(match => {
        const titleMatch = match.match(/title:\s*'([^']+)'/);
        const idMatch = match.match(/id:\s*'([^']+)'/);
        if (titleMatch && idMatch) {
          console.log(`- ${titleMatch[1]} (${idMatch[1]})`);
        }
      });
    }
  }
} else {
  console.log('No categories found');
}