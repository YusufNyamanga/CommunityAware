import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface ScrapedContent {
  title: string;
  content: string;
  url: string;
  lastUpdated?: string;
  source: string;
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

class WebScrapingService {
  private readonly LMRA_BASE_URL = 'https://www.lmra.bh';
  private readonly LMRA_FAQ_URL = 'https://www.lmra.bh/en/faq';
  private readonly SIJILAT_URL = 'https://www.sijilat.bh';
  private readonly BAHRAIN_GOV_URL = 'https://www.bahrain.bh';
  
  private readonly USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  
  // Cache for scraped content (expires after 1 hour)
  private cache: Map<string, { content: ScrapedContent; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  constructor() {
    console.log('🕷️ Web Scraping Service initialized - Live data integration enabled');
  }

  /**
   * Scrape LMRA FAQ page for latest information
   */
  async scrapeLMRAFAQ(): Promise<ScrapedContent[]> {
    try {
      console.log('🔍 Scraping LMRA FAQ for latest information...');
      
      const response = await fetch(this.LMRA_FAQ_URL, {
        headers: {
          'User-Agent': this.USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        timeout: 10000
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const faqItems: ScrapedContent[] = [];

      // Try different selectors for FAQ items
      const faqSelectors = [
        '.faq-item, .accordion-item, .question, .qa-item',
        '.panel, .collapse, .expandable',
        'h3, h4, h5', // Fallback to headings
      ];

      for (const selector of faqSelectors) {
        $(selector).each((i, element) => {
          const $el = $(element);
          const title = $el.find('h3, h4, h5, .question, .title').text().trim() || 
                       $el.text().trim().split('\n')[0];
          const content = $el.next().text().trim() || 
                         $el.siblings('.answer, .content, .description').text().trim() ||
                         $el.text().trim();

          if (title && content && title !== content) {
            faqItems.push({
              title: this.cleanText(title),
              content: this.cleanText(content),
              url: this.LMRA_FAQ_URL,
              source: 'LMRA FAQ',
              lastUpdated: new Date().toISOString()
            });
          }
        });

        if (faqItems.length > 0) break; // Use first successful selector
      }

      console.log(`✅ Scraped ${faqItems.length} FAQ items from LMRA`);
      return faqItems;

    } catch (error) {
      console.error('❌ Error scraping LMRA FAQ:', error);
      return [];
    }
  }

  /**
   * Scrape specific LMRA page content
   */
  async scrapeLMRAPage(url: string): Promise<ScrapedContent | null> {
    try {
      const cacheKey = `lmra_${url}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      console.log(`🔍 Scraping LMRA page: ${url}`);

      const response = await fetch(url, {
        headers: { 'User-Agent': this.USER_AGENT },
        timeout: 10000
      });

      if (!response.ok) return null;

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract main content
      const title = $('h1, .page-title, .main-title').first().text().trim() ||
                   $('title').text().trim();
      
      const content = $('.content, .main-content, .page-content, article, .text-content')
        .text().trim() || $('body').text().trim();

      const scrapedContent: ScrapedContent = {
        title: this.cleanText(title),
        content: this.cleanText(content),
        url: url,
        source: 'LMRA Official',
        lastUpdated: new Date().toISOString()
      };

      this.setCache(cacheKey, scrapedContent);
      return scrapedContent;

    } catch (error) {
      console.error(`❌ Error scraping LMRA page ${url}:`, error);
      return null;
    }
  }

  /**
   * Search for relevant content on official Bahrain government websites
   */
  async searchOfficialSources(query: string, category?: string): Promise<ScrapedContent[]> {
    const results: ScrapedContent[] = [];
    
    try {
      console.log(`🔍 Searching official sources for: "${query}"`);

      // Define search URLs based on category
      const searchUrls = this.getSearchUrlsByCategory(category);

      for (const searchUrl of searchUrls) {
        try {
          const content = await this.scrapeUrl(searchUrl);
          if (content && this.isContentRelevant(content.content, query)) {
            results.push(content);
          }
        } catch (error) {
          console.error(`Error scraping ${searchUrl}:`, error);
          continue; // Continue with other URLs
        }
      }

      console.log(`✅ Found ${results.length} relevant results from official sources`);
      return results;

    } catch (error) {
      console.error('❌ Error searching official sources:', error);
      return [];
    }
  }

  /**
   * Get live updates from multiple government sources
   */
  async getLiveUpdates(category: string): Promise<ScrapedContent[]> {
    const sources = [
      `${this.LMRA_BASE_URL}/en/news`,
      `${this.SIJILAT_URL}/en/news`,
      `${this.BAHRAIN_GOV_URL}/en/news`
    ];

    const updates: ScrapedContent[] = [];

    for (const url of sources) {
      try {
        const content = await this.scrapeUrl(url);
        if (content) {
          updates.push(content);
        }
      } catch (error) {
        console.error(`Error scraping updates from ${url}:`, error);
        continue;
      }
    }

    return updates;
  }

  /**
   * Extract specific information from LMRA services pages
   */
  async getLMRAServiceInfo(serviceType: string): Promise<ScrapedContent | null> {
    const serviceUrls: Record<string, string> = {
      'work-permit': `${this.LMRA_BASE_URL}/en/services/work-permits`,
      'visa': `${this.LMRA_BASE_URL}/en/services/visa-services`,
      'labour-law': `${this.LMRA_BASE_URL}/en/labour-law`,
      'employers': `${this.LMRA_BASE_URL}/en/services/employers`,
      'employees': `${this.LMRA_BASE_URL}/en/services/employees`,
    };

    const url = serviceUrls[serviceType];
    if (!url) return null;

    return await this.scrapeLMRAPage(url);
  }

  // Private helper methods

  private async scrapeUrl(url: string): Promise<ScrapedContent | null> {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': this.USER_AGENT },
        timeout: 8000
      });

      if (!response.ok) return null;

      const html = await response.text();
      const $ = cheerio.load(html);

      const title = $('h1, .title, .page-title').first().text().trim() || 
                   $('title').text().trim();
      const content = $('.content, .main-content, article, .description')
        .text().trim();

      if (!content) return null;

      return {
        title: this.cleanText(title),
        content: this.cleanText(content),
        url: url,
        source: this.extractSourceName(url),
        lastUpdated: new Date().toISOString()
      };

    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      return null;
    }
  }

  private getSearchUrlsByCategory(category?: string): string[] {
    const baseUrls = [
      `${this.LMRA_BASE_URL}/en/faq`,
      `${this.LMRA_BASE_URL}/en/services`,
      `${this.SIJILAT_URL}/en/services`,
    ];

    switch (category) {
      case 'visa-services':
        return [
          `${this.LMRA_BASE_URL}/en/services/visa-services`,
          `${this.LMRA_BASE_URL}/en/visa-information`,
          ...baseUrls
        ];
      case 'labour-law':
        return [
          `${this.LMRA_BASE_URL}/en/labour-law`,
          `${this.LMRA_BASE_URL}/en/services/labour-disputes`,
          ...baseUrls
        ];
      case 'company-formation':
        return [
          `${this.SIJILAT_URL}/en/services`,
          `${this.SIJILAT_URL}/en/business-registration`,
          ...baseUrls
        ];
      default:
        return baseUrls;
    }
  }

  private isContentRelevant(content: string, query: string): boolean {
    const queryWords = query.toLowerCase().split(' ');
    const contentLower = content.toLowerCase();
    
    // Check if at least 2 words from the query appear in the content
    const matches = queryWords.filter(word => 
      word.length > 2 && contentLower.includes(word)
    ).length;
    
    return matches >= Math.min(2, queryWords.length);
  }

  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .replace(/[^\w\s\u0600-\u06FF.,!?;:()\-'"]/g, '') // Keep Arabic, English, and basic punctuation
      .trim();
  }

  private extractSourceName(url: string): string {
    if (url.includes('lmra.bh')) return 'LMRA Official';
    if (url.includes('sijilat.bh')) return 'Sijilat Official';
    if (url.includes('bahrain.bh')) return 'Bahrain Government';
    return 'Official Source';
  }

  private getFromCache(key: string): ScrapedContent | null {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_DURATION) {
      return cached.content;
    }
    return null;
  }

  private setCache(key: string, content: ScrapedContent): void {
    this.cache.set(key, {
      content,
      timestamp: Date.now()
    });
  }
}

export const webScrapingService = new WebScrapingService();
export default WebScrapingService;