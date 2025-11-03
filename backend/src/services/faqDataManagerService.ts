import { faqDatabaseService } from './faqDatabaseService';

interface FAQContextOptions {
  query: string;
  category?: string;
  language?: string;
  maxItems?: number;
  maxLength?: number;
}

interface FAQContext {
  relevantFAQs: any[];
  contextText: string;
  metadata: {
    totalItems: number;
    sources: string[];
    lastUpdated: string;
    cacheStatus: string;
  };
}

class FAQDataManagerService {
  constructor() {
    console.log('📋 FAQ Data Manager Service initialized - Local cache management ready');
  }

  /**
   * Get relevant FAQ context for AI responses
   */
  async getFAQContext(options: FAQContextOptions): Promise<FAQContext> {
    const { query, category, language = 'en', maxItems = 10, maxLength = 1500 } = options;

    try {
      // Search for relevant FAQ items
      const relevantFAQs = await faqDatabaseService.searchFAQItems({
        query,
        category,
        language,
        limit: maxItems
      });

      // Get additional context from the same category if not enough results
      let additionalFAQs = [];
      if (relevantFAQs.length < 3 && category) {
        additionalFAQs = await faqDatabaseService.getFAQByCategory(
          category, 
          language, 
          Math.max(5, maxItems - relevantFAQs.length)
        );
        // Remove duplicates
        additionalFAQs = additionalFAQs.filter(
          faq => !relevantFAQs.find(existing => existing.id === faq.id)
        );
      }

      const allRelevantFAQs = [...relevantFAQs, ...additionalFAQs].slice(0, maxItems);

      // Format context text for AI
      const contextText = this.formatFAQsForAI(allRelevantFAQs, maxLength);

      // Get metadata
      const sources = [...new Set(allRelevantFAQs.map(faq => faq.source))];
      const lastUpdated = allRelevantFAQs.length > 0 
        ? Math.max(...allRelevantFAQs.map(faq => new Date(faq.lastUpdated).getTime()))
        : 0;

      const metadata = {
        totalItems: allRelevantFAQs.length,
        sources,
        lastUpdated: lastUpdated > 0 ? new Date(lastUpdated).toISOString() : 'No data',
        cacheStatus: await this.getCacheStatus()
      };

      console.log(`📋 FAQ context generated: ${allRelevantFAQs.length} items for query "${query}"`);

      return {
        relevantFAQs: allRelevantFAQs,
        contextText,
        metadata
      };

    } catch (error) {
      console.error('Error getting FAQ context:', error);
      return {
        relevantFAQs: [],
        contextText: '',
        metadata: {
          totalItems: 0,
          sources: [],
          lastUpdated: 'Error',
          cacheStatus: 'error'
        }
      };
    }
  }

  /**
   * Get FAQ data by specific category
   */
  async getFAQByCategory(category: string, language: string = 'en'): Promise<any[]> {
    try {
      return await faqDatabaseService.getFAQByCategory(category, language, 20);
    } catch (error) {
      console.error(`Error getting FAQ by category ${category}:`, error);
      return [];
    }
  }

  /**
   * Search FAQ items with advanced options
   */
  async searchFAQs(query: string, options: any = {}): Promise<any[]> {
    try {
      return await faqDatabaseService.searchFAQItems({
        query,
        ...options
      });
    } catch (error) {
      console.error(`Error searching FAQs for "${query}":`, error);
      return [];
    }
  }

  /**
   * Get comprehensive FAQ statistics
   */
  async getFAQStatistics(): Promise<any> {
    try {
      const stats = await faqDatabaseService.getFAQStats();
      const cacheStatus = await this.getCacheStatus();
      
      return {
        ...stats,
        cacheStatus,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting FAQ statistics:', error);
      return {
        total: 0,
        bySource: [],
        byCategory: [],
        recentUpdates: [],
        cacheStatus: 'error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get cache health status
   */
  private async getCacheStatus(): Promise<string> {
    try {
      const metadata = await faqDatabaseService.getScrapingMetadata();
      
      if (metadata.length === 0) {
        return 'empty';
      }

      const now = new Date();
      const recentUpdates = metadata.filter(item => {
        const lastScraped = new Date(item.lastScraped);
        const hoursSince = (now.getTime() - lastScraped.getTime()) / (1000 * 60 * 60);
        return hoursSince <= 48;
      });

      if (recentUpdates.length === 0) {
        return 'stale';
      }

      const hasErrors = metadata.some(item => item.status === 'error');
      if (hasErrors) {
        return 'partial';
      }

      return 'fresh';
    } catch (error) {
      console.error('Error checking cache status:', error);
      return 'error';
    }
  }

  /**
   * Format FAQ items for AI context
   */
  private formatFAQsForAI(faqs: any[], maxLength: number): string {
    if (faqs.length === 0) return '';

    const sections = [];
    sections.push('OFFICIAL FAQ DATABASE (Locally cached, updated every 48 hours):');

    let currentLength = sections[0].length;
    const now = new Date();

    for (const faq of faqs) {
      // Calculate age of the data
      const lastUpdated = new Date(faq.lastUpdated);
      const hoursAge = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60));
      const ageText = hoursAge < 24 ? `${hoursAge}h old` : `${Math.floor(hoursAge / 24)}d old`;

      // Create entry with metadata
      const entry = `\n- [${faq.source}] ${faq.title} (${ageText})\n  ${faq.content.substring(0, 200).trim()}${faq.content.length > 200 ? '...' : ''}`;
      
      if (currentLength + entry.length > maxLength) {
        sections.push('\n[Additional FAQ items available but truncated due to length limits]');
        break;
      }
      
      sections.push(entry);
      currentLength += entry.length;
    }

    // Add summary footer
    const sourcesCount = [...new Set(faqs.map(f => f.source))].length;
    sections.push(`\n\n[FAQ Context: ${faqs.length} items from ${sourcesCount} official sources]`);

    return sections.join('');
  }

  /**
   * Check if local cache needs updating
   */
  async needsCacheUpdate(): Promise<{ needsUpdate: boolean; details: any }> {
    try {
      const sources = ['LMRA_FAQ', 'LMRA_VISA_SERVICES', 'LMRA_WORK_PERMITS', 'LMRA_LABOUR_LAW'];
      const updateStatus = {};

      for (const source of sources) {
        const needsUpdate = await faqDatabaseService.needsUpdate(source);
        updateStatus[source] = {
          needsUpdate,
          lastCheck: new Date().toISOString()
        };
      }

      const overallNeedsUpdate = Object.values(updateStatus).some((status: any) => status.needsUpdate);

      return {
        needsUpdate: overallNeedsUpdate,
        details: updateStatus
      };
    } catch (error) {
      console.error('Error checking cache update needs:', error);
      return {
        needsUpdate: true,
        details: { error: error.message }
      };
    }
  }

  /**
   * Get FAQ recommendations based on query
   */
  async getFAQRecommendations(query: string, category?: string, limit: number = 5): Promise<any[]> {
    try {
      // Search for highly relevant FAQs
      const faqs = await faqDatabaseService.searchFAQItems({
        query,
        category,
        language: 'en',
        limit
      });

      // Add relevance scoring
      return faqs.map(faq => ({
        ...faq,
        relevanceScore: this.calculateRelevanceScore(faq, query),
        summary: faq.content.length > 100 ? faq.content.substring(0, 100) + '...' : faq.content
      })).sort((a, b) => b.relevanceScore - a.relevanceScore);

    } catch (error) {
      console.error('Error getting FAQ recommendations:', error);
      return [];
    }
  }

  /**
   * Calculate relevance score for FAQ item
   */
  private calculateRelevanceScore(faq: any, query: string): number {
    const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
    const titleLower = faq.title.toLowerCase();
    const contentLower = faq.content.toLowerCase();
    
    let score = 0;

    // Title matches (higher weight)
    queryWords.forEach(word => {
      if (titleLower.includes(word)) {
        score += 3;
      }
    });

    // Content matches
    queryWords.forEach(word => {
      const matches = (contentLower.match(new RegExp(word, 'g')) || []).length;
      score += matches;
    });

    // Recency bonus (newer content gets higher score)
    const ageInHours = (Date.now() - new Date(faq.lastUpdated).getTime()) / (1000 * 60 * 60);
    const recencyBonus = Math.max(0, (168 - ageInHours) / 168); // 7 days max bonus
    score += recencyBonus;

    return Math.round(score * 100) / 100;
  }

  /**
   * Get multilingual FAQ support status
   */
  async getMultilingualStatus(): Promise<any> {
    try {
      const allFAQs = await faqDatabaseService.getAllFAQForContext('en');
      const languageStats = {};
      
      // For now, most FAQ data will be in English
      // Future enhancement: Add multilingual scraping
      languageStats['en'] = allFAQs.length;
      languageStats['ar'] = 0; // Placeholder for Arabic FAQs
      
      return {
        supportedLanguages: ['en'], // Can be extended
        itemCounts: languageStats,
        primaryLanguage: 'en'
      };
    } catch (error) {
      console.error('Error getting multilingual status:', error);
      return {
        supportedLanguages: ['en'],
        itemCounts: { en: 0 },
        primaryLanguage: 'en'
      };
    }
  }
}

export const faqDataManagerService = new FAQDataManagerService();
export default FAQDataManagerService;