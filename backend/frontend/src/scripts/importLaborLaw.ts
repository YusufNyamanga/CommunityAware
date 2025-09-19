import fs from 'fs/promises';
import path from 'path';
import pdf2json from 'pdf2json';

interface LawArticle {
  id: string;
  articleNumber: string;
  title: string;
  content: string;
  arabicTitle?: string;
  arabicContent?: string;
  chapter: string;
  section?: string;
  relatedArticles: string[];
  lastUpdated: Date;
  tags: string[];
}

async function extractTextFromPDF(pdfPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new pdf2json();
    
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      const text = decodeURIComponent(pdfData.Pages.map((page: any) => 
        page.Texts.map((text: any) => text.R[0].T).join(' ')
      ).join('\n'));
      resolve(text);
    });

    pdfParser.on('pdfParser_dataError', (errMsg: { parserError: Error }) => {
      reject(errMsg.parserError);
    });

    pdfParser.loadPDF(pdfPath);
  });
}

function parseArticles(text: string): LawArticle[] {
  const articles: LawArticle[] = [];
  const articleRegex = /Article\s+(\d+)[:\s]+([\s\S]+?)(?=Article\s+\d+|$)/gi;
  let match;

  while ((match = articleRegex.exec(text)) !== null) {
    const articleNumber = match[1];
    const content = match[2].trim();
    
    // Extract title from first sentence or use generic title
    const title = content.split('.')[0].trim();
    
    articles.push({
      id: `law-${Date.now()}-${articleNumber}`,
      articleNumber,
      title: title || `Labor Law Article ${articleNumber}`,
      content,
      chapter: 'Labor Law',
      section: 'General Provisions',
      relatedArticles: [],
      lastUpdated: new Date(),
      tags: ['labor law', 'employment law', 'Bahrain law']
    });
  }

  return articles;
}

async function updateKnowledgeBase(articles: LawArticle[]) {
  const lawsPath = path.join(__dirname, '../../data/laws.json');
  const updatesPath = path.join(__dirname, '../../data/updates.json');

  // Read existing laws
  const existingLaws = JSON.parse(await fs.readFile(lawsPath, 'utf-8'));
  const existingUpdates = JSON.parse(await fs.readFile(updatesPath, 'utf-8'));

  // Add new articles
  const updatedLaws = [...existingLaws];
  const newUpdates = [...existingUpdates];

  for (const article of articles) {
    // Check if article already exists
    const existingIndex = updatedLaws.findIndex(law => law.articleNumber === article.articleNumber);
    if (existingIndex !== -1) {
      updatedLaws[existingIndex] = article;
    } else {
      updatedLaws.push(article);
    }

    // Add update record
    newUpdates.push({
      id: `update-${Date.now()}-${article.articleNumber}`,
      type: 'law',
      content: {
        id: article.id,
        title: article.title,
        articleNumber: article.articleNumber
      },
      updateDate: new Date(),
      updatedBy: 'system',
      changeDescription: `Updated Labor Law Article ${article.articleNumber}`
    });
  }

  // Save updated files
  await fs.writeFile(lawsPath, JSON.stringify(updatedLaws, null, 2));
  await fs.writeFile(updatesPath, JSON.stringify(newUpdates, null, 2));

  console.log(`Imported ${articles.length} articles`);
}

async function main() {
  try {
    console.log('Starting labor law import...');
    const pdfPath = path.join(__dirname, '../../data/labour_law.pdf');
    
    console.log('Extracting text from PDF...');
    const text = await extractTextFromPDF(pdfPath);
    
    console.log('Parsing articles...');
    const articles = parseArticles(text);
    
    console.log('Updating knowledge base...');
    await updateKnowledgeBase(articles);
    
    console.log('Import completed successfully');
  } catch (error) {
    console.error('Error during import:', error);
    process.exit(1);
  }
}

main();
