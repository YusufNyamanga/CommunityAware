const fs = require('fs');

// Read the knowledge base file
const kbFile = fs.readFileSync('./src/data/knowledgeBase.ts', 'utf8');

// Simple search for the exact strings
const hasCultural = kbFile.includes("cultural-guidelines");
const hasMental = kbFile.includes("mental-health");

console.log('Simple string search:');
console.log(`- Contains 'cultural-guidelines': ${hasCultural}`);
console.log(`- Contains 'mental-health': ${hasMental}`);

// Check specific lines
const lines = kbFile.split('\n');
console.log('\nSearching for specific lines:');
for (let i = 280; i < Math.min(300, lines.length); i++) {
  if (lines[i].includes('cultural-guidelines') || lines[i].includes('mental-health')) {
    console.log(`Line ${i + 1}: ${lines[i].trim()}`);
  }
}

// Count total occurrences
const culturalCount = (kbFile.match(/cultural-guidelines/g) || []).length;
const mentalCount = (kbFile.match(/mental-health/g) || []).length;

console.log(`\nOccurrence counts:`);
console.log(`- cultural-guidelines appears ${culturalCount} times`);
console.log(`- mental-health appears ${mentalCount} times`);