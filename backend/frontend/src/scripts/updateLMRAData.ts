import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import PDFParser from 'pdf2json';
import { knowledgeBaseService } from '../services/knowledgeBaseService';
import { FAQ, LawArticle } from '../types/knowledge';

const LMRA_FAQ_URLS = [
  'https://lmra.gov.bh/en/faq/category/1',  // General
  'https://lmra.gov.bh/en/faq/category/6',  // Work Permits
  'https://lmra.gov.bh/en/faq/category/11', // Labour Law
];
const LABOUR_LAW_URL = 'https://www.lmra.gov.bh/files/cms/shared/file/labour%20law.pdf';
const DATA_DIR = path.join(__dirname, '../../data');

async function scrapeLMRAFAQs(): Promise<FAQ[]> {
  try {
    const faqs: FAQ[] = [];
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    };

    for (const url of LMRA_FAQ_URLS) {
      const response = await axios.get(url, { headers });
      const $ = cheerio.load(response.data);
      
      // Update selectors based on actual HTML structure
      $('.faq-content').each((i, element) => {
        const question = $(element).find('.faq-question').text().trim();
        const answer = $(element).find('.faq-answer').text().trim();
        const category = url.includes('category/1') ? 'general' :
                        url.includes('category/6') ? 'work-permits' :
                        url.includes('category/11') ? 'labour-law' : 'other';
        
        if (question && answer) {
          faqs.push({
            id: `faq-${Date.now()}-${i}`,
            question,
            answer,
            category,
            source: url,
            tags: ['lmra', 'faq', category],
            lastUpdated: new Date()
          } as FAQ);
        }
      });
      
      // Add delay between requests to avoid overloading the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return faqs;
  } catch (error) {
    console.error('Error scraping LMRA FAQs:', error);
    throw error;
  }
}

async function downloadAndParseLawPDF(): Promise<LawArticle[]> {
  try {
    // Download PDF
    const response = await axios.get(LABOUR_LAW_URL, { responseType: 'arraybuffer' });
    const pdfPath = path.join(DATA_DIR, 'labour_law.pdf');
    await fs.writeFile(pdfPath, response.data);

    // Parse PDF
    const pdfParser = new PDFParser();
    const articles: LawArticle[] = [];

    return new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        let currentArticle: Partial<LawArticle> = {};
        let currentText = '';

        // Process each page
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(text => {
            const content = decodeURIComponent(text.R[0].T);

            // Check for article headers (adjust regex based on actual format)
            if (content.match(/^Article \d+/i)) {
              // Save previous article if exists
              if (currentArticle.articleNumber) {
                articles.push({
                  ...currentArticle,
                  content: currentText.trim(),
                  lastUpdated: new Date(),
                  tags: ['labour-law', 'article'],
                  relatedArticles: []
                } as LawArticle);
              }

              // Start new article
              const articleMatch = content.match(/^Article (\d+)/i);
              currentArticle = {
                articleNumber: articleMatch ? articleMatch[1] : '',
                title: content,
                chapter: 'Labour Law', // You might want to extract actual chapters
              };
              currentText = '';
            } else {
              currentText += ' ' + content;
            }
          });
        });

        // Add final article
        if (currentArticle.articleNumber) {
          articles.push({
            ...currentArticle,
            content: currentText.trim(),
            lastUpdated: new Date(),
            tags: ['labour-law', 'article'],
            relatedArticles: []
          } as LawArticle);
        }

        resolve(articles);
      });

      pdfParser.on('pdfParser_dataError', error => {
        reject(error);
      });

      pdfParser.loadPDF(pdfPath);
    });
  } catch (error) {
    console.error('Error processing Labour Law PDF:', error);
    throw error;
  }
}

async function updateKnowledgeBase() {
  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(DATA_DIR, { recursive: true });

    console.log('Fetching LMRA FAQs...');
    const faqs = await scrapeLMRAFAQs();
    console.log(`Found ${faqs.length} FAQs`);

    console.log('Processing Labour Law PDF...');
    const articles = await downloadAndParseLawPDF();
    console.log(`Extracted ${articles.length} articles`);

    console.log('Importing FAQs to knowledge base...');
    await knowledgeBaseService.importFAQs(faqs);

    console.log('Importing law articles to knowledge base...');
    await knowledgeBaseService.importLawArticles(articles);

    console.log('Knowledge base update completed successfully!');
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    process.exit(1);
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateKnowledgeBase();
}

export { updateKnowledgeBase };
