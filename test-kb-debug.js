const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbFile = fs.readFileSync(path.join(__dirname, 'src/data/knowledgeBase.ts'), 'utf8');

// Get the exact lines
const lines = kbFile.split('\n');

console.log('Lines around 284:');
for (let i = 280; i <= 290; i++) {
  if (i < lines.length) {
    console.log(`${i + 1}: "${lines[i]}"`);
  }
}

// Check if the entries are actually in the file
const hasCultural = kbFile.includes('cultural-guidelines-1');
const hasMental = kbFile.includes('mental-health-support-1');

console.log(`\nDirect search results:`);
console.log(`- cultural-guidelines-1 found: ${hasCultural}`);
console.log(`- mental-health-support-1 found: ${hasMental}`);

// Try to find the exact pattern
const culturalPattern = /id:\s*'cultural-guidelines-1'/;
const mentalPattern = /id:\s*'mental-health-support-1'/;

const culturalMatch = kbFile.match(culturalPattern);
const mentalMatch = kbFile.match(mentalPattern);

console.log(`\nPattern search results:`);
console.log(`- cultural-guidelines-1 pattern match: ${culturalMatch ? culturalMatch[0] : 'null'}`);
console.log(`- mental-health-support-1 pattern match: ${mentalMatch ? mentalMatch[0] : 'null'}`);