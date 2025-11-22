const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbFile = fs.readFileSync(path.join(__dirname, 'src/data/knowledgeBase.ts'), 'utf8');

// Search for the specific entries
const culturalGuidelines = kbFile.indexOf('cultural-guidelines-1');
const mentalHealth = kbFile.indexOf('mental-health-support-1');

console.log('Search results:');
console.log(`- cultural-guidelines-1 found at position: ${culturalGuidelines}`);
console.log(`- mental-health-support-1 found at position: ${mentalHealth}`);

// Check if the entries are in the array
const arrayStart = kbFile.indexOf('export const bahrainLabourLawKB: KnowledgeBaseEntry[] = [');
const arrayEnd = kbFile.indexOf('];\n\n// Search function for knowledge base');

console.log(`\nArray boundaries:`);
console.log(`- Array starts at: ${arrayStart}`);
console.log(`- Array ends at: ${arrayEnd}`);

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