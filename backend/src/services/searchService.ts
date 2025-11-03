import { webScrapingService } from './webScrapingService';

interface SearchResult {
  title: string;
  content: string;
  url: string;
  source: string;
  relevanceScore: number;
  lastUpdated?: string;
}

interface LiveDataContext {
  officialSources: SearchResult[];
  lmraFAQ: SearchResult[];
  recentUpdates: SearchResult[];
  summary: string;
}

class SearchService {
  private readonly OFFICIAL_SOURCES = [
    'https://www.lmra.bh',
    'https://www.sijilat.bh',
    'https://www.bahrain.bh',
    'https://www.cbb.gov.bh',
    'https://www.moic.gov.bh'
  ];

  constructor() {
    console.log('🔍 Search Service initialized - Official sources integration ready');
  }

  /**
   * Search and aggregate live data for a specific query
   */
  async searchLiveData(
    query: string, 
    category?: string, 
    language: string = 'en'
  ): Promise<LiveDataContext> {
    console.log(`🔍 Searching live data for: "${query}" (Category: ${category || 'general'})`);
    
    const [officialSources, lmraFAQ, recentUpdates] = await Promise.allSettled([
      this.searchOfficialSources(query, category),
      this.searchLMRAFAQ(query),
      this.getRecentUpdates(category)
    ]);

    const results: LiveDataContext = {
      officialSources: this.extractResults(officialSources),
      lmraFAQ: this.extractResults(lmraFAQ),
      recentUpdates: this.extractResults(recentUpdates),
      summary: ''
    };

    // Generate a summary of findings
    results.summary = this.generateSearchSummary(results, query);

    console.log(`✅ Live data search complete: ${this.getTotalResults(results)} sources found`);
    return results;
  }

  /**
   * Get specific LMRA service information
   */
  async getLMRAServiceData(serviceType: string): Promise<SearchResult | null> {
    try {
      const serviceInfo = await webScrapingService.getLMRAServiceInfo(serviceType);
      if (!serviceInfo) return null;

      return {
        title: serviceInfo.title,
        content: serviceInfo.content,
        url: serviceInfo.url,
        source: serviceInfo.source,
        relevanceScore: 1.0,
        lastUpdated: serviceInfo.lastUpdated
      };
    } catch (error) {
      console.error(`Error getting LMRA service data for ${serviceType}:`, error);
      return null;
    }
  }

  /**
   * Search for visa-related information
   */
  async searchVisaInfo(query: string): Promise<SearchResult[]> {
    const visaQueries = [
      `${query} visa requirements Bahrain`,
      `${query} LMRA visa application`,
      `${query} work permit Bahrain`
    ];

    const results: SearchResult[] = [];

    for (const searchQuery of visaQueries) {
      try {
        const sources = await webScrapingService.searchOfficialSources(searchQuery, 'visa-services');
        const processedResults = sources.map(source => ({
          title: source.title,
          content: source.content,
          url: source.url,
          source: source.source,
          relevanceScore: this.calculateRelevanceScore(source.content, query),
          lastUpdated: source.lastUpdated
        }));
        results.push(...processedResults);
      } catch (error) {
        console.error(`Error searching visa info for "${searchQuery}":`, error);
        continue;
      }
    }

    return this.deduplicateResults(results);
  }

  /**
   * Search labour law information
   */
  async searchLabourLawInfo(query: string): Promise<SearchResult[]> {
    try {
      const sources = await webScrapingService.searchOfficialSources(query, 'labour-law');
      return sources.map(source => ({
        title: source.title,
        content: source.content,
        url: source.url,
        source: source.source,
        relevanceScore: this.calculateRelevanceScore(source.content, query),
        lastUpdated: source.lastUpdated
      }));
    } catch (error) {
      console.error(`Error searching labour law info:`, error);
      return [];
    }
  }

  /**
   * Get real-time updates from official sources
   */
  async getOfficialUpdates(category?: string): Promise<SearchResult[]> {
    try {
      const updates = await webScrapingService.getLiveUpdates(category || 'general');
      return updates.map(update => ({
        title: update.title,
        content: update.content,
        url: update.url,
        source: update.source,
        relevanceScore: 0.8, // High relevance for official updates
        lastUpdated: update.lastUpdated
      }));
    } catch (error) {
      console.error('Error getting official updates:', error);
      return [];
    }
  }

  // Private methods

  private async searchOfficialSources(query: string, category?: string): Promise<SearchResult[]> {
    try {
      const sources = await webScrapingService.searchOfficialSources(query, category);
      return sources.map(source => ({
        title: source.title,
        content: source.content,
        url: source.url,
        source: source.source,
        relevanceScore: this.calculateRelevanceScore(source.content, query),
        lastUpdated: source.lastUpdated
      }));
    } catch (error) {
      console.error('Error searching official sources:', error);
      return [];
    }
  }

  private async searchLMRAFAQ(query: string): Promise<SearchResult[]> {
    try {
      const faqItems = await webScrapingService.scrapeLMRAFAQ();
      return faqItems
        .filter(item => this.isContentRelevant(item.content, query))
        .map(item => ({
          title: item.title,
          content: item.content,
          url: item.url,
          source: item.source,
          relevanceScore: this.calculateRelevanceScore(item.content, query),
          lastUpdated: item.lastUpdated
        }))
        .sort((a, b) => b.relevanceScore - a.relevanceScore);
    } catch (error) {
      console.error('Error searching LMRA FAQ:', error);
      return [];
    }
  }

  private async getRecentUpdates(category?: string): Promise<SearchResult[]> {
    try {
      return await this.getOfficialUpdates(category);
    } catch (error) {
      console.error('Error getting recent updates:', error);
      return [];
    }
  }

  private calculateRelevanceScore(content: string, query: string): number {
    const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
    const contentLower = content.toLowerCase();
    
    let score = 0;
    let wordMatches = 0;

    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        wordMatches++;
        // Boost score for exact matches
        const exactMatches = (contentLower.match(new RegExp(word, 'g')) || []).length;
        score += exactMatches * 0.1;
      }
    }

    // Base relevance score
    const baseScore = wordMatches / queryWords.length;
    
    // Boost for content length (longer content might be more comprehensive)
    const lengthBoost = Math.min(content.length / 1000, 0.2);
    
    return Math.min(baseScore + score + lengthBoost, 1.0);
  }

  private isContentRelevant(content: string, query: string): boolean {
    const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
    const contentLower = content.toLowerCase();
    
    const matches = queryWords.filter(word => contentLower.includes(word)).length;
    return matches >= Math.min(2, queryWords.length);
  }

  private deduplicateResults(results: SearchResult[]): SearchResult[] {
    const seen = new Set<string>();
    return results.filter(result => {
      const key = `${result.title}_${result.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private extractResults(settledResult: PromiseSettledResult<SearchResult[]>): SearchResult[] {
    if (settledResult.status === 'fulfilled') {
      return settledResult.value;
    }
    console.error('Search operation failed:', settledResult.reason);
    return [];
  }

  private getTotalResults(results: LiveDataContext): number {
    return results.officialSources.length + results.lmraFAQ.length + results.recentUpdates.length;
  }

  private generateSearchSummary(results: LiveDataContext, query: string): string {
    const totalSources = this.getTotalResults(results);
    
    if (totalSources === 0) {
      return `No live data found for "${query}". Using general knowledge base.`;
    }

    const summaryParts = [];
    
    if (results.lmraFAQ.length > 0) {
      summaryParts.push(`${results.lmraFAQ.length} LMRA FAQ entries`);
    }
    
    if (results.officialSources.length > 0) {
      summaryParts.push(`${results.officialSources.length} official sources`);
    }
    
    if (results.recentUpdates.length > 0) {
      summaryParts.push(`${results.recentUpdates.length} recent updates`);
    }

    return `Found live data from ${summaryParts.join(', ')} for "${query}".`;
  }

  /**
   * Format live data for AI context injection
   */
  formatLiveDataForAI(liveData: LiveDataContext, maxLength: number = 2000): string {
    const sections = [];

    // Add LMRA FAQ data
    if (liveData.lmraFAQ.length > 0) {
      sections.push('OFFICIAL LMRA FAQ INFORMATION:');
      liveData.lmraFAQ.slice(0, 3).forEach(item => {
        sections.push(`- ${item.title}: ${item.content.substring(0, 200)}...`);
      });
    }

    // Add official sources
    if (liveData.officialSources.length > 0) {
      sections.push('\nOFFICIAL GOVERNMENT SOURCES:');
      liveData.officialSources.slice(0, 2).forEach(item => {
        sections.push(`- ${item.source}: ${item.content.substring(0, 150)}...`);
      });
    }

    // Add recent updates
    if (liveData.recentUpdates.length > 0) {
      sections.push('\nRECENT OFFICIAL UPDATES:');
      liveData.recentUpdates.slice(0, 2).forEach(item => {
        sections.push(`- ${item.title}: ${item.content.substring(0, 100)}...`);
      });
    }

    const formatted = sections.join('\n').substring(0, maxLength);
    return formatted + (formatted.length === maxLength ? '...' : '');
  }
}

export const searchService = new SearchService();
export default SearchService;