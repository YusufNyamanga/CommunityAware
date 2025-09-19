import fs from 'fs/promises';
import path from 'path';
import pdf2json from 'pdf2json';
import { LawArticle } from '../types/knowledge';

interface ImportResult {
  totalArticles: number;
  successfulImports: number;
  failedImports: number;
  errors: string[];
}

async function extractText(filePath: string): Promise<string> {
  if (filePath.endsWith('.txt')) {
    return fs.readFile(filePath, 'utf-8');
  }

  // For PDF files
  return new Promise((resolve, reject) => {
    const pdfParser = new pdf2json();
    
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      try {
        const text = decodeURIComponent(pdfData.Pages.map((page: any) => 
          page.Texts.map((text: any) => text.R[0].T).join(' ')
        ).join('\n'));
        resolve(text);
      } catch (error) {
        reject(new Error('Failed to decode PDF content'));
      }
    });

    pdfParser.on('pdfParser_dataError', (errMsg: { parserError: Error }) => {
      reject(errMsg.parserError);
    });

    pdfParser.loadPDF(filePath);
  });
}

function identifyChapterAndSection(content: string): { chapter: string; section: string } {
  // Default values
  let chapter = 'General Provisions';
  let section = '';

  // Try to identify chapter from content
  const chapterMatch = content.match(/Chapter\s+(\d+|[IVX]+)[\s-:]+([^\n.]+)/i);
  if (chapterMatch) {
    chapter = chapterMatch[2].trim();
  }

  // Try to identify section
  const sectionMatch = content.match(/Section\s+(\d+|[IVX]+)[\s-:]+([^\n.]+)/i);
  if (sectionMatch) {
    section = sectionMatch[2].trim();
  }

  return { chapter, section };
}

function parseArticles(text: string): LawArticle[] {
  const articles: LawArticle[] = [];
  const articleRegex = /Article\s+(\d+)[:\s]+([^Article]*)(?=Article\s+\d+|$)/gi;
  let match;

  while ((match = articleRegex.exec(text)) !== null) {
    const articleNumber = match[1];
    const content = match[2].trim();
    
    // Extract title from first sentence
    const title = content.split(/[.!?][\s\n]/)[0].trim();
    
    // Identify chapter and section
    const { chapter, section } = identifyChapterAndSection(content);

    // Find related articles mentioned in the content
    const relatedArticles = Array.from(
      content.matchAll(/Article[s]?\s+(\d+)/gi),
      m => m[1]
    ).filter(num => num !== articleNumber);

    articles.push({
      id: `law-${Date.now()}-${articleNumber}`,
      articleNumber,
      title: title || `Labor Law Article ${articleNumber}`,
      content,
      chapter,
      section,
      relatedArticles: [...new Set(relatedArticles)],
      lastUpdated: new Date(),
      tags: ['labor law', 'employment law', 'Bahrain law']
    });
  }

  return articles;
}

async function updateKnowledgeBase(articles: LawArticle[]): Promise<ImportResult> {
  const result: ImportResult = {
    totalArticles: articles.length,
    successfulImports: 0,
    failedImports: 0,
    errors: []
  };

  try {
    const lawsPath = path.join(__dirname, '../../data/laws.json');
    const updatesPath = path.join(__dirname, '../../data/updates.json');

    const existingLaws = JSON.parse(await fs.readFile(lawsPath, 'utf-8'));
    const existingUpdates = JSON.parse(await fs.readFile(updatesPath, 'utf-8'));

    const updatedLaws = [...existingLaws];
    const newUpdates = [...existingUpdates];

    for (const article of articles) {
      try {
        const existingIndex = updatedLaws.findIndex(
          law => law.articleNumber === article.articleNumber
        );

        if (existingIndex !== -1) {
          updatedLaws[existingIndex] = article;
        } else {
          updatedLaws.push(article);
        }

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

        result.successfulImports++;
      } catch (error) {
        result.failedImports++;
        result.errors.push(
          `Failed to import Article ${article.articleNumber}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    }

    await fs.writeFile(lawsPath, JSON.stringify(updatedLaws, null, 2));
    await fs.writeFile(updatesPath, JSON.stringify(newUpdates, null, 2));

  } catch (error) {
    throw new Error(
      `Failed to update knowledge base: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }

  return result;
}

export async function importLaborLaw(pdfPath: string): Promise<ImportResult> {
  try {
    console.log('Extracting text from PDF...');
    const text = await extractText(pdfPath);
    
    console.log('Parsing articles...');
    const articles = parseArticles(text);
    
    console.log('Updating knowledge base...');
    const result = await updateKnowledgeBase(articles);
    
    return result;
  } catch (error) {
    throw new Error(
      `Failed to import labor law: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
