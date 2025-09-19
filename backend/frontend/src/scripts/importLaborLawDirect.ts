import { importLaborLaw } from '../services/importService';
import path from 'path';

async function main() {
  try {
    const filePath = path.join(__dirname, '../../data/uploads/labour_law.txt');
    console.log('Starting import from:', filePath);
    
    const result = await importLaborLaw(filePath);
    
    console.log('Import completed successfully');
    console.log('Results:', {
      totalArticles: result.totalArticles,
      successfulImports: result.successfulImports,
      failedImports: result.failedImports
    });
    
    if (result.errors.length > 0) {
      console.log('Errors:', result.errors);
    }
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

main();
