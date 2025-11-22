// Test script to check knowledge base categories
const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbContent = fs.readFileSync('./src/data/knowledgeBase.ts', 'utf8');

// Extract categories using regex
const categoryMatches = kbContent.match(/category:\s*['"]([^'"]+)['"]/g);
const categories = categoryMatches ? categoryMatches.map(match => 
  match.replace(/category:\s*['"]([^'"]+)['"]/, '$1')
) : [];

// Get unique categories
const uniqueCategories = [...new Set(categories)];

console.log('All categories found:', categories);
console.log('Unique categories:', uniqueCategories);
console.log('Total unique categories:', uniqueCategories.length);