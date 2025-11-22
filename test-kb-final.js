const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbFile = fs.readFileSync(path.join(__dirname, 'src/data/knowledgeBase.ts'), 'utf8');

// Find the array boundaries more precisely
const arrayStartMatch = kbFile.match(/export const bahrainLabourLawKB: KnowledgeBaseEntry\[\] = \[/);
const arrayEndMatch = kbFile.match(/\];\s*\n\/\/ Search function for knowledge base/);

if (!arrayStartMatch || !arrayEndMatch) {
  console.log('Could not find array boundaries');
  process.exit(1);
}

const arrayStart = arrayStartMatch.index;
const arrayEnd = arrayEndMatch.index + arrayEndMatch[0].indexOf('];') + 2;

console.log(`Array boundaries: ${arrayStart} to ${arrayEnd}`);

// Extract the array content
const arrayContent = kbFile.substring(arrayStart, arrayEnd);

// Search for specific entries
const culturalGuidelines = kbFile.indexOf('cultural-guidelines-1');
const mentalHealth = kbFile.indexOf('mental-health-support-1');

console.log('Entry positions:');
console.log(`- cultural-guidelines-1: ${culturalGuidelines}`);
console.log(`- mental-health-support-1: ${mentalHealth}`);

// Check if entries are within array bounds
if (culturalGuidelines > arrayStart && culturalGuidelines < arrayEnd) {
  console.log('✓ cultural-guidelines-1 is within the array');
} else {
  console.log('✗ cultural-guidelines-1 is NOT within the array');
}

if (mentalHealth > arrayStart && mentalHealth < arrayEnd) {
  console.log('✓ mental-health-support-1 is within the array');
} else {
  console.log('✗ mental-health-support-1 is NOT within the array');
}

// Extract all categories from the array content
const categoryMatches = arrayContent.match(/category:\s*'([^']+)'/g);
if (categoryMatches) {
  const categories = categoryMatches.map(match => {
    const matchResult = match.match(/category:\s*'([^']+)'/);
    return matchResult ? matchResult[1] : null;
  }).filter(Boolean);

  const uniqueCategories = [...new Set(categories)];
  
  console.log('\nAvailable categories in knowledge base:');
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
}