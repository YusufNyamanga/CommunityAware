const fs = require('fs');
const path = require('path');

// Try different paths
const possiblePaths = [
  './src/data/knowledgeBase.ts',
  'src/data/knowledgeBase.ts',
  path.join(__dirname, 'src/data/knowledgeBase.ts')
];

let kbFile = null;
let usedPath = null;

for (const filePath of possiblePaths) {
  try {
    if (fs.existsSync(filePath)) {
      kbFile = fs.readFileSync(filePath, 'utf8');
      usedPath = filePath;
      console.log(`Successfully read file from: ${filePath}`);
      break;
    }
  } catch (error) {
    console.log(`Failed to read from ${filePath}: ${error.message}`);
  }
}

if (!kbFile) {
  console.log('Could not read the knowledge base file from any path');
  process.exit(1);
}

console.log(`\nFile size: ${kbFile.length} characters`);

// Check specific lines around 284
const lines = kbFile.split('\n');
console.log('\nLines around 284:');
for (let i = 280; i < Math.min(295, lines.length); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

// Search for the entries
const hasCultural = kbFile.includes("cultural-guidelines");
const hasMental = kbFile.includes("mental-health");

console.log(`\nSearch results:`);
console.log(`- Contains 'cultural-guidelines': ${hasCultural}`);
console.log(`- Contains 'mental-health': ${hasMental}`);

if (hasCultural) {
  const culturalLine = lines.findIndex(line => line.includes('cultural-guidelines'));
  console.log(`- cultural-guidelines found at line: ${culturalLine + 1}`);
}

if (hasMental) {
  const mentalLine = lines.findIndex(line => line.includes('mental-health'));
  console.log(`- mental-health found at line: ${mentalLine + 1}`);
}