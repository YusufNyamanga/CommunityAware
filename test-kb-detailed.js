const fs = require('fs');
const path = require('path');

// Read the knowledge base file and extract the data
const kbFile = fs.readFileSync(path.join(__dirname, 'src/data/knowledgeBase.ts'), 'utf8');

// Extract the array data using regex - handle template literals properly
const arrayMatch = kbFile.match(/export const bahrainLabourLawKB: KnowledgeBaseEntry\[\] = \[([\s\S]*?)\];\s*\n\/\//);
if (!arrayMatch) {
  console.log('Could not find knowledge base array');
  process.exit(1);
}

const arrayContent = arrayMatch[1];
console.log('Found array content, length:', arrayContent.length);

// Extract category entries - look for the exact pattern
const categoryMatches = arrayContent.match(/category:\s*'([^']+)'/g);
if (!categoryMatches) {
  console.log('No categories found');
  process.exit(1);
}

console.log('Found category matches:', categoryMatches.length);

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
  const culturalMatches = arrayContent.match(/{[\s\S]*?category:\s*'cultural-guidelines'[\s\S]*?}/g);
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
  const mentalMatches = arrayContent.match(/{[\s\S]*?category:\s*'mental-health'[\s\S]*?}/g);
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