import { faqDatabaseService } from './faqDatabaseService';

interface CacheEntry {
  contextText: string;
  relevantFAQs: any[];
  metadata: any;
  timestamp: number;
  hits: number;
}

interface CacheKey {
  queryHash: string;
  category?: string;
  language: string;
}

class FAQCacheService {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_TTL = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_CACHE_SIZE = 1000;
  private readonly CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

  // Pre-computed popular FAQ contexts
  private popularQueries = [
    'work visa application',
    'visa requirements',
    'labour law working hours',
    'company registration',
    'work permit documents',
    'LMRA requirements'
  ];

  constructor() {
    console.log('⚡ FAQ Cache Service initialized - Performance optimization active');
    
    // Start cleanup interval
    setInterval(() => this.cleanupExpiredEntries(), this.CLEANUP_INTERVAL);
    
    // Pre-warm cache with popular queries
    setTimeout(() => this.preWarmCache(), 2000);
  }

  /**
   * Get FAQ context with caching
   */
  async getFAQContextFast(options: {
    query: string;
    category?: string;
    language?: string;
    maxItems?: number;
    maxLength?: number;
  }): Promise<any> {
    const startTime = Date.now();
    const { query, category, language = 'en', maxItems = 8, maxLength = 1500 } = options;

    // Generate cache key
    const cacheKey = this.generateCacheKey(query, category, language);
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      cached.hits++;
      console.log(`⚡ FAQ cache HIT for "${query}" (${Date.now() - startTime}ms)`);
      return {
        relevantFAQs: cached.relevantFAQs,
        contextText: cached.contextText,
        metadata: {
          ...cached.metadata,
          fromCache: true,
          responseTime: Date.now() - startTime
        }
      };
    }

    // Cache miss - fetch from database
    console.log(`📊 FAQ cache MISS for "${query}" - fetching from database`);
    
    try {
      // Search for relevant FAQ items with optimized query
      const relevantFAQs = await this.optimizedFAQSearch({
        query,
        category,
        language,
        limit: maxItems
      });

      // Get additional context if needed
      let additionalFAQs = [];
      if (relevantFAQs.length < 3 && category) {
        additionalFAQs = await faqDatabaseService.getFAQByCategory(
          category, 
          language, 
          Math.max(3, maxItems - relevantFAQs.length)
        );
        // Remove duplicates
        additionalFAQs = additionalFAQs.filter(
          faq => !relevantFAQs.find(existing => existing.id === faq.id)
        );
      }

      const allRelevantFAQs = [...relevantFAQs, ...additionalFAQs].slice(0, maxItems);

      // Format context text
      const contextText = this.formatFAQsForAI(allRelevantFAQs, maxLength);

      // Create metadata
      const sources = [...new Set(allRelevantFAQs.map(faq => faq.source))];
      const lastUpdated = allRelevantFAQs.length > 0 
        ? Math.max(...allRelevantFAQs.map(faq => new Date(faq.lastUpdated).getTime()))
        : 0;

      const result = {
        relevantFAQs: allRelevantFAQs,
        contextText,
        metadata: {
          totalItems: allRelevantFAQs.length,
          sources,
          lastUpdated: lastUpdated > 0 ? new Date(lastUpdated).toISOString() : 'No data',
          cacheStatus: 'fresh',
          fromCache: false,
          responseTime: Date.now() - startTime
        }
      };

      // Store in cache
      this.setCache(cacheKey, result);

      console.log(`⚡ FAQ context generated and cached: ${allRelevantFAQs.length} items (${Date.now() - startTime}ms)`);
      return result;

    } catch (error) {
      console.error('Error getting FAQ context:', error);
      return {
        relevantFAQs: [],
        contextText: '',
        metadata: {
          totalItems: 0,
          sources: [],
          lastUpdated: 'Error',
          cacheStatus: 'error',
          fromCache: false,
          responseTime: Date.now() - startTime
        }
      };
    }
  }

  /**
   * Optimized FAQ search with better indexing
   */
  private async optimizedFAQSearch(options: any): Promise<any[]> {
    // Use simple word matching for better performance
    const { query, category, language = 'en', limit = 10 } = options;
    
    try {
      return await faqDatabaseService.searchFAQItems({
        query,
        category,
        language,
        limit
      });
    } catch (error) {
      console.error('Optimized FAQ search error:', error);
      return [];
    }
  }

  /**
   * Pre-warm cache with popular queries
   */
  private async preWarmCache(): Promise<void> {
    console.log('🔥 Pre-warming FAQ cache with popular queries...');
    
    for (const query of this.popularQueries) {
      try {
        await this.getFAQContextFast({ query });
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error pre-warming cache for "${query}":`, error);
      }
    }
    
    console.log(`✅ FAQ cache pre-warmed with ${this.popularQueries.length} popular queries`);
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(query: string, category?: string, language: string = 'en'): string {
    const normalizedQuery = query.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
    const queryHash = this.simpleHash(normalizedQuery);
    return `${queryHash}_${category || 'general'}_${language}`;
  }

  /**
   * Simple hash function for cache keys
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Get from cache
   */
  private getFromCache(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (entry && (Date.now() - entry.timestamp) < this.CACHE_TTL) {
      return entry;
    }
    
    if (entry) {
      this.cache.delete(key); // Remove expired entry
    }
    
    return null;
  }

  /**
   * Set cache entry
   */
  private setCache(key: string, result: any): void {
    // Check cache size limit
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictLeastUsed();
    }

    const entry: CacheEntry = {
      contextText: result.contextText,
      relevantFAQs: result.relevantFAQs,
      metadata: result.metadata,
      timestamp: Date.now(),
      hits: 0
    };

    this.cache.set(key, entry);
  }

  /**
   * Evict least used cache entries
   */
  private evictLeastUsed(): void {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].hits - b[1].hits); // Sort by hits ascending
    
    // Remove 20% of least used entries
    const toRemove = Math.floor(entries.length * 0.2);
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0]);
    }
    
    console.log(`🧹 Evicted ${toRemove} least used cache entries`);
  }

  /**
   * Clean up expired entries
   */
  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if ((now - entry.timestamp) >= this.CACHE_TTL) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} expired FAQ cache entries`);
    }
  }

  /**
   * Format FAQs for AI with optimized processing
   */
  private formatFAQsForAI(faqs: any[], maxLength: number): string {
    if (faqs.length === 0) return '';

    const sections = [];
    sections.push('OFFICIAL FAQ DATABASE (Cached for performance):');

    let currentLength = sections[0].length;

    // Pre-calculate age text for better performance
    const now = Date.now();

    for (const faq of faqs) {
      const lastUpdated = new Date(faq.lastUpdated).getTime();
      const hoursAge = Math.floor((now - lastUpdated) / (1000 * 60 * 60));
      const ageText = hoursAge < 24 ? `${hoursAge}h` : `${Math.floor(hoursAge / 24)}d`;

      const entry = `\n- [${faq.source}] ${faq.title} (${ageText})\n  ${faq.content.substring(0, 180)}${faq.content.length > 180 ? '...' : ''}`;
      
      if (currentLength + entry.length > maxLength) {
        sections.push('\n[More FAQ items available...]');
        break;
      }
      
      sections.push(entry);
      currentLength += entry.length;
    }

    return sections.join('');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): any {
    const entries = Array.from(this.cache.values());
    const totalHits = entries.reduce((sum, entry) => sum + entry.hits, 0);
    const avgAge = entries.length > 0 
      ? (Date.now() - entries.reduce((sum, entry) => sum + entry.timestamp, 0) / entries.length) / (1000 * 60)
      : 0;

    return {
      totalEntries: this.cache.size,
      totalHits,
      averageHits: entries.length > 0 ? totalHits / entries.length : 0,
      averageAgeMinutes: Math.round(avgAge),
      maxCacheSize: this.MAX_CACHE_SIZE,
      cacheUtilization: (this.cache.size / this.MAX_CACHE_SIZE) * 100
    };
  }

  /**
   * Clear cache (for testing/admin)
   */
  clearCache(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`🧹 Cleared FAQ cache (${size} entries removed)`);
  }
}

export const faqCacheService = new FAQCacheService();
export default FAQCacheService;