import cron from 'node-cron';
import { webScrapingService } from './webScrapingService';
import { faqDatabaseService } from './faqDatabaseService';

interface ScrapingSource {
  name: string;
  scrapeFunction: () => Promise<any[]>;
  category: string;
  language: string;
}

class ScheduledScraperService {
  private isRunning: boolean = false;
  private lastRunTime: Date | null = null;
  private cronJob: any | null = null;

  private scrapingSources: ScrapingSource[] = [
    {
      name: 'LMRA_FAQ',
      scrapeFunction: () => webScrapingService.scrapeLMRAFAQ(),
      category: 'general-legal',
      language: 'en'
    },
    {
      name: 'LMRA_VISA_SERVICES',
      scrapeFunction: () => webScrapingService.getLMRAServiceInfo('visa').then(data => data ? [data] : []),
      category: 'visa-services', 
      language: 'en'
    },
    {
      name: 'LMRA_WORK_PERMITS',
      scrapeFunction: () => webScrapingService.getLMRAServiceInfo('work-permit').then(data => data ? [data] : []),
      category: 'labour-law',
      language: 'en'
    },
    {
      name: 'LMRA_LABOUR_LAW',
      scrapeFunction: () => webScrapingService.getLMRAServiceInfo('labour-law').then(data => data ? [data] : []),
      category: 'labour-law',
      language: 'en'
    }
  ];

  constructor() {
    console.log('⏰ Scheduled Scraper Service initialized');
    this.initializeScheduler();
    
    // Run initial scraping on startup if needed
    this.checkAndRunInitialScraping();
  }

  private initializeScheduler(): void {
    // Schedule to run every 48 hours (at 2 AM)
    // Cron format: minute hour day month weekday
    // '0 2 */2 * *' would run every 2 days at 2 AM
    // For testing, let's use a more frequent schedule: '0 */2 * * *' (every 2 hours)
    
    const cronSchedule = process.env.NODE_ENV === 'development' 
      ? '0 */6 * * *'    // Every 6 hours in development
      : '0 2 */2 * *';   // Every 48 hours at 2 AM in production

    this.cronJob = cron.schedule(cronSchedule, async () => {
      console.log('⏰ Scheduled FAQ scraping triggered');
      await this.runScheduledScraping();
    }, {
      timezone: 'Asia/Bahrain' // Bahrain timezone
    });

    console.log(`✅ FAQ scraping scheduled: ${cronSchedule} (${process.env.NODE_ENV === 'development' ? 'every 6 hours' : 'every 48 hours'})`);
  }

  private async checkAndRunInitialScraping(): Promise<void> {
    try {
      // Check if any source needs initial scraping
      let needsInitialRun = false;
      
      for (const source of this.scrapingSources) {
        const needsUpdate = await faqDatabaseService.needsUpdate(source.name);
        if (needsUpdate) {
          needsInitialRun = true;
          break;
        }
      }

      if (needsInitialRun) {
        console.log('🚀 Running initial FAQ scraping...');
        setTimeout(() => this.runScheduledScraping(), 5000); // Run after 5 seconds to let server start
      } else {
        console.log('✅ FAQ data is up to date, no initial scraping needed');
      }
    } catch (error) {
      console.error('Error checking for initial scraping:', error);
    }
  }

  /**
   * Run the scheduled scraping process
   */
  async runScheduledScraping(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ Scraping already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    this.lastRunTime = new Date();
    
    console.log('🚀 Starting scheduled FAQ scraping process...');

    let totalScraped = 0;
    const results: any[] = [];

    for (const source of this.scrapingSources) {
      try {
        console.log(`🔍 Scraping ${source.name}...`);
        
        // Check if this source needs updating
        const needsUpdate = await faqDatabaseService.needsUpdate(source.name);
        
        if (!needsUpdate) {
          console.log(`✅ ${source.name} is up to date, skipping...`);
          continue;
        }

        // Clear old data for this source
        await faqDatabaseService.clearOldFAQData(source.name);

        // Scrape new data
        const scrapedData = await source.scrapeFunction();
        
        if (scrapedData && scrapedData.length > 0) {
          // Transform scraped data to FAQ format
          const faqItems = scrapedData.map(item => ({
            title: item.title || 'Untitled',
            content: item.content || '',
            category: source.category,
            source: source.name,
            url: item.url || '',
            language: source.language,
            lastUpdated: new Date().toISOString()
          }));

          // Store in database
          const stored = await faqDatabaseService.storeFAQItems(faqItems);
          
          // Update metadata
          await faqDatabaseService.updateScrapingMetadata(source.name, stored, 'success');
          
          totalScraped += stored;
          results.push({
            source: source.name,
            scraped: stored,
            status: 'success'
          });

          console.log(`✅ Successfully scraped and stored ${stored} items from ${source.name}`);
        } else {
          // Update metadata even if no items found
          await faqDatabaseService.updateScrapingMetadata(source.name, 0, 'no_data');
          
          results.push({
            source: source.name,
            scraped: 0,
            status: 'no_data'
          });

          console.log(`⚠️ No data found for ${source.name}`);
        }

        // Add delay between scraping requests to be respectful
        await this.delay(2000);

      } catch (error) {
        console.error(`❌ Error scraping ${source.name}:`, error);
        
        // Update metadata with error status
        await faqDatabaseService.updateScrapingMetadata(source.name, 0, 'error');
        
        results.push({
          source: source.name,
          scraped: 0,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    this.isRunning = false;
    
    console.log(`🎉 Scheduled scraping completed! Total items scraped: ${totalScraped}`);
    console.log('📊 Scraping results:', JSON.stringify(results, null, 2));
  }

  /**
   * Manually trigger scraping (for admin purposes)
   */
  async manualScraping(sourceNames?: string[]): Promise<any> {
    console.log('🔧 Manual scraping triggered');
    
    const sourcesToScrape = sourceNames 
      ? this.scrapingSources.filter(s => sourceNames.includes(s.name))
      : this.scrapingSources;

    if (sourcesToScrape.length === 0) {
      return { success: false, message: 'No valid sources specified' };
    }

    const originalSources = this.scrapingSources;
    this.scrapingSources = sourcesToScrape;
    
    try {
      await this.runScheduledScraping();
      return { 
        success: true, 
        message: `Manual scraping completed for ${sourcesToScrape.length} sources`,
        sources: sourcesToScrape.map(s => s.name)
      };
    } finally {
      this.scrapingSources = originalSources;
    }
  }

  /**
   * Get scraping status and statistics
   */
  async getStatus(): Promise<any> {
    const stats = await faqDatabaseService.getFAQStats();
    
    return {
      isRunning: this.isRunning,
      lastRunTime: this.lastRunTime,
      nextRunTime: this.cronJob?.nextDate?.()?.toISDate?.() || null,
      scheduledSources: this.scrapingSources.map(s => s.name),
      faqStats: stats
    };
  }

  /**
   * Add sample FAQ data for testing (fallback)
   */
  async addSampleFAQData(): Promise<void> {
    const sampleFAQs = [
      {
        title: 'How to apply for a work visa in Bahrain?',
        content: 'To apply for a work visa in Bahrain, you need to have a job offer from a Bahraini employer. The employer must obtain a work permit from LMRA first. Required documents include passport, medical certificate, educational certificates, and police clearance certificate.',
        category: 'visa-services',
        source: 'SAMPLE_DATA',
        url: 'https://www.lmra.bh/en/visa-services',
        language: 'en',
        lastUpdated: new Date().toISOString()
      },
      {
        title: 'What are the labour law requirements for working hours?',
        content: 'According to Bahrain Labour Law, normal working hours should not exceed 8 hours per day and 48 hours per week. During Ramadan, working hours are reduced to 6 hours per day. Overtime work requires employee consent and additional compensation.',
        category: 'labour-law',
        source: 'SAMPLE_DATA',
        url: 'https://www.lmra.bh/en/labour-law',
        language: 'en',
        lastUpdated: new Date().toISOString()
      },
      {
        title: 'How to register a new company in Bahrain?',
        content: 'Company registration in Bahrain is done through Sijilat. You need to choose a company name, prepare required documents including MOA and AOA, pay registration fees, and obtain necessary licenses. The process typically takes 1-2 weeks.',
        category: 'company-formation',
        source: 'SAMPLE_DATA',
        url: 'https://www.sijilat.bh/en/services',
        language: 'en',
        lastUpdated: new Date().toISOString()
      }
    ];

    await faqDatabaseService.storeFAQItems(sampleFAQs);
    await faqDatabaseService.updateScrapingMetadata('SAMPLE_DATA', sampleFAQs.length, 'success');
    
    console.log('✅ Sample FAQ data added for testing');
  }

  /**
   * Stop the scheduled scraping
   */
  stop(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      console.log('⏸️ Scheduled FAQ scraping stopped');
    }
  }

  /**
   * Start the scheduled scraping
   */
  start(): void {
    if (this.cronJob) {
      this.cronJob.start();
      console.log('▶️ Scheduled FAQ scraping started');
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const scheduledScraperService = new ScheduledScraperService();
export default ScheduledScraperService;