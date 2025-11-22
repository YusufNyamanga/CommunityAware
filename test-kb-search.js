const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbFile = fs.readFileSync(path.join(__dirname, 'src/data/knowledgeBase.ts'), 'utf8');

// Search for the exact string
const searchString = "Cultural Guidelines for Muslim Countries";
const index = kbFile.indexOf(searchString);

console.log(`Searching for: "${searchString}"`);
console.log(`Found at position: ${index}`);

if (index !== -1) {
  // Show context around the found string
  const start = Math.max(0, index - 100);
  const end = Math.min(kbFile.length, index + searchString.length + 100);
  const context = kbFile.substring(start, end);
  console.log('\nContext:');
  console.log(context);
  
  // Check if it's within the array
  const arrayStart = kbFile.indexOf('export const bahrainLabourLawKB: KnowledgeBaseEntry[] = [');
  const arrayEnd = kbFile.lastIndexOf('];');
  
  console.log(`\nArray starts at: ${arrayStart}`);
  console.log(`Array ends at: ${arrayEnd}`);
  console.log(`Entry is within array: ${index > arrayStart && index < arrayEnd}`);
} else {
  console.log('String not found in file');
  
  // Let's see what's actually in the file around line 284
  const lines = kbFile.split('\n');
  console.log('\nLines around 284:');
  for (let i = 280; i <= 290; i++) {
    if (i < lines.length) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  }
}