import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

interface FAQItem {
  id?: number;
  title: string;
  content: string;
  category: string;
  source: string;
  url: string;
  language: string;
  lastUpdated: string;
  createdAt?: string;
}

interface FAQSearchOptions {
  category?: string;
  language?: string;
  query?: string;
  limit?: number;
}

class FAQDatabaseService {
  private db: sqlite3.Database;
  private dbPath: string;

  constructor() {
    // Store database in the backend directory
    this.dbPath = path.join(__dirname, '../..', 'data', 'faq_cache.db');
    
    // Ensure the data directory exists
    const fs = require('fs');
    const dataDir = path.dirname(this.dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    this.db = new sqlite3.Database(this.dbPath);
    this.initializeDatabase();
    
    console.log('💾 FAQ Database Service initialized - Local caching enabled');
  }

  private async initializeDatabase(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS faq_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        source TEXT NOT NULL,
        url TEXT,
        language TEXT DEFAULT 'en',
        lastUpdated TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        searchableText TEXT GENERATED ALWAYS AS (LOWER(title || ' ' || content)) VIRTUAL
      )
    `;

    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_faq_category_language 
      ON faq_items(category, language)
    `;

    const createSearchIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_faq_search 
      ON faq_items(searchableText)
    `;

    const createPerformanceIndexes = `
      CREATE INDEX IF NOT EXISTS idx_faq_title_content 
      ON faq_items(title, content);
      
      CREATE INDEX IF NOT EXISTS idx_faq_category_lang_updated 
      ON faq_items(category, language, lastUpdated DESC);
      
      CREATE INDEX IF NOT EXISTS idx_faq_source_updated 
      ON faq_items(source, lastUpdated DESC);
      
      CREATE INDEX IF NOT EXISTS idx_faq_updated_desc 
      ON faq_items(lastUpdated DESC);
    `;

    const createLastUpdatedQuery = `
      CREATE TABLE IF NOT EXISTS scraping_metadata (
        id INTEGER PRIMARY KEY,
        source TEXT UNIQUE NOT NULL,
        lastScraped TEXT NOT NULL,
        itemCount INTEGER DEFAULT 0,
        status TEXT DEFAULT 'success'
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(createTableQuery);
        this.db.run(createIndexQuery);
        this.db.run(createSearchIndexQuery);
        this.db.exec(createPerformanceIndexes); // Add performance indexes
        this.db.run(createLastUpdatedQuery, (err) => {
          if (err) {
            console.error('Error creating FAQ database tables:', err);
            reject(err);
          } else {
            console.log('✅ FAQ database tables initialized');
            resolve();
          }
        });
      });
    });
  }

  /**
   * Store FAQ items from scraping
   */
  async storeFAQItems(items: Omit<FAQItem, 'id'>[]): Promise<number> {
    if (items.length === 0) return 0;

    const insertQuery = `
      INSERT OR REPLACE INTO faq_items 
      (title, content, category, source, url, language, lastUpdated)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt = this.db.prepare(insertQuery);
        let insertedCount = 0;

        for (const item of items) {
          stmt.run([
            item.title,
            item.content,
            item.category,
            item.source,
            item.url,
            item.language,
            item.lastUpdated
          ], function(err) {
            if (err) {
              console.error('Error inserting FAQ item:', err);
            } else {
              insertedCount++;
            }
          });
        }

        stmt.finalize((err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`💾 Stored ${insertedCount} FAQ items in local database`);
            resolve(insertedCount);
          }
        });
      });
    });
  }

  /**
   * Search FAQ items locally
   */
  async searchFAQItems(options: FAQSearchOptions = {}): Promise<FAQItem[]> {
    const { category, language = 'en', query, limit = 50 } = options;

    let sql = `
      SELECT id, title, content, category, source, url, language, lastUpdated, createdAt 
      FROM faq_items 
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category && category !== 'general-legal') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (language) {
      sql += ' AND language = ?';
      params.push(language);
    }

    if (query && query.length > 2) {
      sql += ' AND searchableText LIKE ?';
      params.push(`%${query.toLowerCase()}%`);
    }

    sql += ' ORDER BY lastUpdated DESC, id DESC LIMIT ?';
    params.push(limit);

    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows: any[]) => {
        if (err) {
          console.error('Error searching FAQ items:', err);
          reject(err);
        } else {
          resolve(rows as FAQItem[]);
        }
      });
    });
  }

  /**
   * Get FAQ items by category
   */
  async getFAQByCategory(category: string, language: string = 'en', limit: number = 20): Promise<FAQItem[]> {
    return this.searchFAQItems({ category, language, limit });
  }

  /**
   * Get all FAQ items for AI context
   */
  async getAllFAQForContext(language: string = 'en', limit: number = 100): Promise<FAQItem[]> {
    return this.searchFAQItems({ language, limit });
  }

  /**
   * Update scraping metadata
   */
  async updateScrapingMetadata(source: string, itemCount: number, status: string = 'success'): Promise<void> {
    const query = `
      INSERT OR REPLACE INTO scraping_metadata (source, lastScraped, itemCount, status)
      VALUES (?, datetime('now'), ?, ?)
    `;

    return new Promise((resolve, reject) => {
      this.db.run(query, [source, itemCount, status], (err) => {
        if (err) {
          console.error('Error updating scraping metadata:', err);
          reject(err);
        } else {
          console.log(`📊 Updated scraping metadata for ${source}: ${itemCount} items`);
          resolve();
        }
      });
    });
  }

  /**
   * Get scraping metadata
   */
  async getScrapingMetadata(source?: string): Promise<any[]> {
    const query = source 
      ? 'SELECT * FROM scraping_metadata WHERE source = ?'
      : 'SELECT * FROM scraping_metadata ORDER BY lastScraped DESC';
    
    const params = source ? [source] : [];

    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          console.error('Error getting scraping metadata:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * Check if FAQ data needs update (older than 48 hours)
   */
  async needsUpdate(source: string): Promise<boolean> {
    const metadata = await this.getScrapingMetadata(source);
    
    if (metadata.length === 0) {
      return true; // No data exists, needs update
    }

    const lastScraped = new Date(metadata[0].lastScraped);
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - lastScraped.getTime()) / (1000 * 60 * 60);

    return hoursSinceUpdate >= 48; // Update every 48 hours
  }

  /**
   * Clear old FAQ data for a source before updating
   */
  async clearOldFAQData(source: string): Promise<void> {
    const query = 'DELETE FROM faq_items WHERE source = ?';

    return new Promise((resolve, reject) => {
      this.db.run(query, [source], function(err) {
        if (err) {
          console.error(`Error clearing old FAQ data for ${source}:`, err);
          reject(err);
        } else {
          console.log(`🗑️ Cleared ${this.changes} old FAQ items for ${source}`);
          resolve();
        }
      });
    });
  }

  /**
   * Get FAQ statistics
   */
  async getFAQStats(): Promise<any> {
    const queries = {
      total: 'SELECT COUNT(*) as count FROM faq_items',
      bySource: 'SELECT source, COUNT(*) as count, MAX(lastUpdated) as lastUpdate FROM faq_items GROUP BY source',
      byCategory: 'SELECT category, COUNT(*) as count FROM faq_items GROUP BY category',
      recentUpdates: 'SELECT source, lastScraped, itemCount, status FROM scraping_metadata ORDER BY lastScraped DESC'
    };

    const results: any = {};

    for (const [key, query] of Object.entries(queries)) {
      results[key] = await new Promise((resolve, reject) => {
        this.db.all(query, (err, rows) => {
          if (err) {
            console.error(`Error getting FAQ stats for ${key}:`, err);
            resolve([]);
          } else {
            resolve(key === 'total' ? (rows[0] as any)?.count || 0 : rows);
          }
        });
      });
    }

    return results;
  }

  /**
   * Format FAQ data for AI context
   */
  formatFAQForAI(faqItems: FAQItem[], maxLength: number = 2000): string {
    if (faqItems.length === 0) return '';

    const sections = [];
    sections.push('OFFICIAL FAQ DATABASE (Updated every 48 hours):');

    let currentLength = sections[0].length;

    for (const item of faqItems) {
      const entry = `- ${item.title}: ${item.content.substring(0, 150)}...`;
      
      if (currentLength + entry.length > maxLength) break;
      
      sections.push(entry);
      currentLength += entry.length;
    }

    return sections.join('\n');
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    return new Promise((resolve) => {
      this.db.close((err) => {
        if (err) {
          console.error('Error closing FAQ database:', err);
        } else {
          console.log('💾 FAQ database connection closed');
        }
        resolve();
      });
    });
  }
}

export const faqDatabaseService = new FAQDatabaseService();
export default FAQDatabaseService;