// Test script to check knowledge base categories in browser console
(function() {
  // Wait for the page to load
  setTimeout(() => {
    try {
      // Check if knowledge base functions are available
      if (typeof window !== 'undefined' && window.require) {
        const { getKnowledgeCategories, getKnowledgeByCategory } = window.require('./src/data/knowledgeBase');
        
        console.log('=== KNOWLEDGE BASE TEST ===');
        
        const categories = getKnowledgeCategories();
        console.log('Available categories:', categories.sort());
        
        const hasCulturalGuidelines = categories.includes('cultural-guidelines');
        const hasMentalHealth = categories.includes('mental-health');
        
        console.log('New categories status:');
        console.log(`- cultural-guidelines: ${hasCulturalGuidelines ? 'FOUND' : 'MISSING'}`);
        console.log(`- mental-health: ${hasMentalHealth ? 'FOUND' : 'MISSING'}`);
        
        if (hasCulturalGuidelines) {
          const culturalEntries = getKnowledgeByCategory('cultural-guidelines');
          console.log(`Cultural guidelines entries: ${culturalEntries.length}`);
          culturalEntries.forEach(entry => console.log(`- ${entry.title} (${entry.id})`));
        }
        
        if (hasMentalHealth) {
          const mentalEntries = getKnowledgeByCategory('mental-health');
          console.log(`Mental health entries: ${mentalEntries.length}`);
          mentalEntries.forEach(entry => console.log(`- ${entry.title} (${entry.id})`));
        }
        
        console.log('=== TEST COMPLETE ===');
      } else {
        console.log('Knowledge base functions not available in global scope');
      }
    } catch (error) {
      console.error('Error testing knowledge base:', error);
    }
  }, 3000);
})();