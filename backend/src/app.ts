import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';

// Load environment variables FIRST before importing services
config();

import { validateToken, checkUserRateLimit, validateRequestToken } from './middleware/auth';
import { aiController } from './controllers/aiController';
import { authController } from './controllers/authController';
import { aiService } from './services/aiService';
import { scheduledScraperService } from './services/scheduledScraperService';
import { faqDataManagerService } from './services/faqDataManagerService';
import { faqDatabaseService } from './services/faqDatabaseService';
import { faqCacheService } from './services/faqCacheService';
import { webScrapingService } from './services/webScrapingService';
import { searchService } from './services/searchService';
import fetch from 'node-fetch';
import { load as loadXML } from 'cheerio';

const app = express();
const port = process.env.PORT || 5000;

// Trust proxy for correct IP in rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Security headers
app.use(helmet({ contentSecurityPolicy: false }));

// CORS configuration - allow frontend connections
const envOrigins = (process.env.CORS_ORIGINS || process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'https://umoja-aware.com',
  'https://www.umoja-aware.com'
];
const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.startsWith('http://192.168.') || origin.startsWith('https://192.168.')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json());

// Debug/Test endpoints enabled only outside production
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/debug-env', (req, res) => {
    res.json({
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV,
      DEEPSEEK_API_KEY_EXISTS: !!process.env.DEEPSEEK_API_KEY,
      DEEPSEEK_API_KEY_LENGTH: process.env.DEEPSEEK_API_KEY?.length || 0,
      DEEPSEEK_API_KEY_PREFIX: process.env.DEEPSEEK_API_KEY?.substring(0, 10) + '...',
      AI_SERVICE: 'DeepSeek (Enhanced Multilingual)',
    });
  });

  app.get('/api/test-lmra-faq', async (req, res) => {
    try {
      console.log('🔍 Testing LMRA FAQ scraping...');
      const faqData = await webScrapingService.scrapeLMRAFAQ();
      res.json({
        success: true,
        message: `Successfully scraped ${faqData.length} FAQ items from LMRA`,
        data: faqData.slice(0, 3),
        total: faqData.length
      });
    } catch (error) {
      console.error('Error testing LMRA FAQ:', error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to scrape LMRA FAQ' });
    }
  });

  app.post('/api/test-live-search', async (req, res) => {
    try {
      const { query, category = 'general-legal' } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }
      console.log(`🔍 Testing live search for: "${query}"`);
      const liveData = await searchService.searchLiveData(query, category);
      const formattedContext = searchService.formatLiveDataForAI(liveData);
      res.json({ success: true, query, category, liveData, formattedContext, summary: liveData.summary });
    } catch (error) {
      console.error('Error testing live search:', error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to search live data' });
    }
  });

  app.post('/api/test-ai-direct', async (req, res) => {
    try {
      const { message, category = 'VISA', language = 'en' } = req.body;
      const response = await aiService.sendMessage(message, [], category as any, language as any);
      res.json(response);
    } catch (error) {
      console.error('AI Test Error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to connect to AI service' });
    }
  });
}

// LMRA FAQ scraping test endpoint
app.get('/api/test-lmra-faq', async (req, res) => {
  try {
    console.log('🔍 Testing LMRA FAQ scraping...');
    const faqData = await webScrapingService.scrapeLMRAFAQ();
    res.json({
      success: true,
      message: `Successfully scraped ${faqData.length} FAQ items from LMRA`,
      data: faqData.slice(0, 3), // Return first 3 items for testing
      total: faqData.length
    });
  } catch (error) {
    console.error('Error testing LMRA FAQ:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to scrape LMRA FAQ'
    });
  }
});

// Live data search test endpoint
app.post('/api/test-live-search', async (req, res) => {
  try {
    const { query, category = 'general-legal' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    console.log(`🔍 Testing live search for: "${query}"`);
    const liveData = await searchService.searchLiveData(query, category);
    const formattedContext = searchService.formatLiveDataForAI(liveData);
    
    res.json({
      success: true,
      query,
      category,
      liveData,
      formattedContext,
      summary: liveData.summary
    });
  } catch (error) {
    console.error('Error testing live search:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search live data'
    });
  }
});

// FAQ Management Endpoints

// Get FAQ statistics and cache status
app.get('/api/faq-status', async (req, res) => {
  try {
    const stats = await faqDataManagerService.getFAQStatistics();
    const scraperStatus = await scheduledScraperService.getStatus();
    const cacheUpdateStatus = await faqDataManagerService.needsCacheUpdate();
    
    res.json({
      success: true,
      faqStats: stats,
      scraperStatus,
      cacheUpdateStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting FAQ status:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get FAQ status'
    });
  }
});

// Trigger manual FAQ scraping
app.post('/api/admin/trigger-scraping', async (req, res) => {
  try {
    const { sources } = req.body; // Optional: specify specific sources
    console.log('🔧 Manual FAQ scraping triggered via API');
    
    const result = await scheduledScraperService.manualScraping(sources);
    
    res.json({
      success: true,
      message: 'Manual scraping completed',
      result
    });
  } catch (error) {
    console.error('Error triggering manual scraping:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to trigger scraping'
    });
  }
});

// Add sample FAQ data for testing
app.post('/api/admin/add-sample-data', async (req, res) => {
  try {
    await scheduledScraperService.addSampleFAQData();
    const stats = await faqDataManagerService.getFAQStatistics();
    
    res.json({
      success: true,
      message: 'Sample FAQ data added successfully',
      stats
    });
  } catch (error) {
    console.error('Error adding sample FAQ data:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add sample data'
    });
  }
});

// Search local FAQ database
app.post('/api/search-faq', async (req, res) => {
  try {
    const { query, category, language = 'en', limit = 10 } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const faqs = await faqDataManagerService.searchFAQs(query, {
      category,
      language,
      limit
    });
    
    const recommendations = await faqDataManagerService.getFAQRecommendations(query, category, 5);
    
    res.json({
      success: true,
      query,
      results: faqs,
      recommendations,
      total: faqs.length
    });
  } catch (error) {
    console.error('Error searching FAQ database:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search FAQ database'
    });
  }
});

// Performance Monitoring Endpoints

// Get cache statistics
app.get('/api/cache-stats', async (req, res) => {
  try {
    const cacheStats = faqCacheService.getCacheStats();
    res.json({
      success: true,
      cacheStats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get cache stats'
    });
  }
});

// Clear cache (admin endpoint)
app.post('/api/admin/clear-cache', async (req, res) => {
  try {
    faqCacheService.clearCache();
    res.json({
      success: true,
      message: 'FAQ cache cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to clear cache'
    });
  }
});

// Performance test endpoint (disabled in production)
app.post('/api/performance-test', async (req, res) => {
  try {
    const { query = 'work visa requirements', iterations = 3 } = req.body;
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      
      const faqContext = await faqCacheService.getFAQContextFast({
        query,
        category: 'visa-services',
        language: 'en'
      });
      
      const endTime = Date.now();
      results.push({
        iteration: i + 1,
        responseTime: endTime - startTime,
        fromCache: faqContext.metadata?.fromCache || false,
        itemsFound: faqContext.relevantFAQs.length
      });
      
      // Small delay between tests
      if (i < iterations - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
    
    res.json({
      success: true,
      query,
      results,
      averageResponseTime: Math.round(avgResponseTime),
      cacheHitRate: (results.filter(r => r.fromCache).length / results.length) * 100
    });
  } catch (error) {
    console.error('Error in performance test:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Performance test failed'
    });
  }
});

// Simple test endpoint
app.post('/api/test-ai-direct', async (req, res) => {
  console.log('Testing Z.ai API...');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('ZAI_API_KEY exists:', !!process.env.ZAI_API_KEY);
  console.log('ZAI_API_KEY length:', process.env.ZAI_API_KEY?.length || 0);
  try {
    const { message, category = 'VISA', language = 'en' } = req.body;
    const response = await aiService.sendMessage(
      message,
      [],
      category,
      language
    );
    console.log('AI Response:', response);
    res.json(response);
  } catch (error) {
    console.error('AI Test Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to connect to AI service'
    });
  }
});

// API routes with authentication and rate limiting
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/test-ai', validateToken, aiController.testConnection);

// Basic rate limits
const chatLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });
const newsLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });

// Chat routes (temporarily without auth for testing - add auth in production)
app.post('/api/chat', chatLimiter, aiController.handleChat);
app.get('/api/chat/stream', chatLimiter, aiController.handleChatStreamGet);

// Protected routes (for future authenticated features)
// app.use('/api/chat', validateToken, checkUserRateLimit, validateRequestToken, aiController.handleChat);

// Health check

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port} and bound to 0.0.0.0`);
});

// Bahrain News aggregator endpoint (RSS -> JSON)
type NewsItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  country: string;
  source: string;
};

const bahrainFeeds: Array<{ name: string; url: string; base?: string }> = [
  { name: 'Bahrain News Agency', url: 'https://www.bna.bh/en/rss.xml', base: 'https://www.bna.bh' },
  { name: 'Gulf Insider (Bahrain)', url: 'https://www.gulf-insider.com/category/bahrain/feed/', base: 'https://www.gulf-insider.com/category/bahrain/' },
  { name: 'Google News (Bahrain)', url: 'https://news.google.com/rss/search?q=Bahrain&hl=en&gl=BH&ceid=BH:en' },
  { name: 'LMRA (Official)', url: 'https://news.google.com/rss/search?q=site%3Almra.bh&hl=en&gl=BH&ceid=BH%3Aen' },
  { name: 'NPRA (Official)', url: 'https://news.google.com/rss/search?q=site%3Anpra.gov.bh&hl=en&gl=BH&ceid=BH%3Aen' },
  { name: 'Ministry of Interior (MOI)', url: 'https://news.google.com/rss/search?q=site%3Amoi.gov.bh&hl=en&gl=BH&ceid=BH%3Aen' },
  { name: 'Ministry of Labour', url: 'https://news.google.com/rss/search?q=site%3Alabour.gov.bh%20OR%20site%3Amlsd.gov.bh&hl=en&gl=BH&ceid=BH%3Aen' }
];

const NEWS_CACHE_TTL_MS = 10 * 60 * 1000;
let bahrainNewsCache: { items: NewsItem[]; exp: number } | null = null;

async function fetchRSS(url: string, source: string): Promise<NewsItem[]> {
  try {
    const resp = await fetch(url, { timeout: 15000 } as any);
    const xml = await resp.text();
    const $ = loadXML(xml, { xmlMode: true });
    const items: NewsItem[] = [];
    $('item').each((_, el) => {
      const title = $(el).find('title').first().text().trim();
      const description = $(el).find('description').first().text().trim() || $(el).find('content\:encoded').first().text().trim();
      const link = $(el).find('link').first().text().trim();
      const pubDate = $(el).find('pubDate').first().text().trim() || $(el).find('dc\:date').first().text().trim();
      items.push({
        title: title || 'No title',
        description: description || 'No description',
        link: link || '#',
        pubDate: pubDate || new Date().toISOString(),
        country: 'Bahrain',
        source
      });
    });
    return items;
  } catch (e) {
    console.error(`Failed to fetch RSS for ${source}:`, e);
    return [];
  }
}

app.get('/api/news/bahrain', newsLimiter, async (req, res) => {
  try {
    if (bahrainNewsCache && bahrainNewsCache.exp > Date.now()) {
      return res.json({ success: true, cached: true, items: bahrainNewsCache.items });
    }
    const lang = validateLang((req.query.lang as string) || 'en');
    const feeds = buildBahrainFeeds(lang);
    const results = await Promise.all(feeds.map(f => fetchRSS(f.url, f.name)));
    const all = results.flat();
    const recentMs = 24 * 60 * 60 * 1000;
    const recent = all.filter(n => {
      const d = new Date(n.pubDate);
      return !isNaN(d.getTime()) && (Date.now() - d.getTime()) <= recentMs;
    });
    const seen = new Set<string>();
    const dedup = recent.filter(n => {
      const key = (n.link || '') + '|' + (n.title || '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const sorted = dedup.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 30);

    bahrainNewsCache = { items: sorted, exp: Date.now() + NEWS_CACHE_TTL_MS };
    res.json({ success: true, cached: false, items: sorted });
  } catch (error) {
    console.error('Error aggregating Bahrain news:', error);
    res.status(500).json({ success: false, error: 'Failed to aggregate Bahrain news' });
  }
});

// Country-specific news aggregator (Google News)
function getCeid(country: string): string | null {
  const map: Record<string, string> = {
    'Bahrain': 'BH',
    'Kenya': 'KE',
    'Tanzania': 'TZ',
    'Uganda': 'UG',
    'Nigeria': 'NG',
    'Ethiopia': 'ET',
    'Cameroon': 'CM',
    'Ghana': 'GH',
    'South Africa': 'ZA',
    'Egypt': 'EG',
    'Morocco': 'MA'
  };
  return map[country] || null;
}

function validateLang(lang?: string): string {
  const allowed = new Set(['en','ar','fr','zh','zh-tw','es','pt','ru','hi','th','id','ms','tr','ur']);
  const normalized = (lang || '').toLowerCase();
  return allowed.has(normalized) ? normalized : 'en';
}

function buildBahrainFeeds(lang: string): Array<{ name: string; url: string; base?: string }> {
  const hl = validateLang(lang);
  const ceid = 'BH';
  return [
    { name: 'Bahrain News Agency', url: 'https://www.bna.bh/en/rss.xml', base: 'https://www.bna.bh' },
    { name: 'Gulf Insider (Bahrain)', url: 'https://www.gulf-insider.com/category/bahrain/feed/', base: 'https://www.gulf-insider.com/category/bahrain/' },
    { name: 'Google News (Bahrain)', url: `https://news.google.com/rss/search?q=Bahrain&hl=${hl}&gl=${ceid}&ceid=${ceid}:${hl}` },
    { name: 'LMRA (Official)', url: `https://news.google.com/rss/search?q=site%3Almra.bh&hl=${hl}&gl=${ceid}&ceid=${ceid}:${hl}` },
    { name: 'NPRA (Official)', url: `https://news.google.com/rss/search?q=site%3Anpra.gov.bh&hl=${hl}&gl=${ceid}&ceid=${ceid}:${hl}` },
    { name: 'Ministry of Interior (MOI)', url: `https://news.google.com/rss/search?q=site%3Amoi.gov.bh&hl=${hl}&gl=${ceid}&ceid=${ceid}:${hl}` },
    { name: 'Ministry of Labour', url: `https://news.google.com/rss/search?q=site%3Alabour.gov.bh%20OR%20site%3Amlsd.gov.bh&hl=${hl}&gl=${ceid}&ceid=${ceid}:${hl}` }
  ];
}

function getFeedsForCountry(country: string, lang?: string): Array<{ name: string; url: string }> {
  const hl = validateLang(lang);
  if (country.toLowerCase() === 'bahrain') {
    return buildBahrainFeeds(hl).map(({ name, url }) => ({ name, url }));
  }
  const ceid = getCeid(country);
  const feeds: Array<{ name: string; url: string }> = [];
  if (ceid) {
    feeds.push({ name: `Google News (${country})`, url: `https://news.google.com/rss/search?q=${encodeURIComponent(country)}&hl=${hl}&gl=${ceid}&ceid=${ceid}:${hl}` });
  } else {
    feeds.push({ name: `Google News (${country})`, url: `https://news.google.com/rss/search?q=${encodeURIComponent(country)}&hl=${hl}` });
  }
  return feeds;
}

app.get('/api/news/:country', newsLimiter, async (req, res) => {
  try {
    const country = (req.params.country || '').trim();
    if (!country) return res.status(400).json({ success: false, error: 'Country required' });
    const feeds = getFeedsForCountry(country, (req.query.lang as string) || 'en');
    const results = await Promise.all(feeds.map(f => fetchRSS(f.url, f.name)));
    const all = results.flat();
    const recentMs = 24 * 60 * 60 * 1000;
    const recent = all.filter(n => {
      const d = new Date(n.pubDate);
      return !isNaN(d.getTime()) && (Date.now() - d.getTime()) <= recentMs;
    });
    const seen = new Set<string>();
    const dedup = recent.filter(n => {
      const key = (n.link || '') + '|' + (n.title || '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const sorted = dedup.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 30);
    res.json({ success: true, items: sorted });
  } catch (error) {
    console.error('Error aggregating country news:', error);
    res.status(500).json({ success: false, error: 'Failed to aggregate news' });
  }
});

// Jobs aggregator (Google News based)
type JobItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
};

const JOBS_CACHE_TTL_MS = 15 * 60 * 1000;
let jobsCache: Map<string, { items: JobItem[]; exp: number }> = new Map();

function getJobFeeds(country: string): Array<{ name: string; url: string }> {
  const ceid = getCeid(country) || 'BH';
  const qCountry = encodeURIComponent(country);
  const feeds: Array<{ name: string; url: string }> = [
    { name: `LinkedIn (Bahrain)`, url: `https://news.google.com/rss/search?q=site%3Alinkedin.com%2Fjobs%20${qCountry}&hl=en&gl=${ceid}&ceid=${ceid}:en` }
  ];
  return feeds;
}

async function fetchJobsRSS(url: string, source: string): Promise<JobItem[]> {
  try {
    const resp = await fetch(url, { timeout: 15000 } as any);
    const xml = await resp.text();
    const $ = loadXML(xml, { xmlMode: true });
    const items: JobItem[] = [];
    $('item').each((_, el) => {
      const title = $(el).find('title').first().text().trim();
      const link = $(el).find('link').first().text().trim();
      const pubDate = $(el).find('pubDate').first().text().trim() || $(el).find('dc\:date').first().text().trim();
      items.push({
        title: title || 'Untitled',
        link: link || '#',
        pubDate: pubDate || new Date().toISOString(),
        source
      });
    });
    return items;
  } catch (e) {
    console.error(`Failed to fetch Jobs RSS for ${source}:`, e);
    return [];
  }
}

// Direct scrapers for Bahrain job boards
async function scrapeBaytBahrainJobs(): Promise<JobItem[]> {
  try {
    const url = 'https://www.bayt.com/en/bahrain/jobs/';
    const resp = await fetch(url, { timeout: 15000 } as any);
    const html = await resp.text();
    const $ = loadXML(html);
    const items: JobItem[] = [];
    $('a').each((_, el) => {
      const href = ($(el).attr('href') || '').trim();
      const text = ($(el).text() || '').trim();
      if (!href || !text) return;
      if (href.includes('/en/bahrain/jobs/') || href.includes('/en/job/')) {
        // Normalize relative links
        const full = href.startsWith('http') ? href : ('https://www.bayt.com' + (href.startsWith('/') ? href : '/' + href));
        if (text.length >= 10) {
          items.push({
            title: text,
            link: full,
            pubDate: new Date().toISOString(),
            source: 'Bayt (Bahrain)'
          });
        }
      }
    });
    return items.slice(0, 50);
  } catch (e) {
    console.error('Failed to scrape Bayt Bahrain jobs:', e);
    return [];
  }
}

async function scrapeGulfTalentBahrainJobs(): Promise<JobItem[]> {
  try {
    const url = 'https://www.gulftalent.com/bahrain/jobs';
    const resp = await fetch(url, { timeout: 15000 } as any);
    const html = await resp.text();
    const $ = loadXML(html);
    const items: JobItem[] = [];
    $('a').each((_, el) => {
      const href = ($(el).attr('href') || '').trim();
      const text = ($(el).text() || '').trim();
      if (!href || !text) return;
      if (href.includes('/bahrain/jobs/') || href.includes('/jobs/')) {
        const full = href.startsWith('http') ? href : ('https://www.gulftalent.com' + (href.startsWith('/') ? href : '/' + href));
        // Filter out non-job links by basic heuristics
        if (text.length >= 8 && !/Apply|Login|Sign|Browse|More/i.test(text)) {
          items.push({
            title: text,
            link: full,
            pubDate: new Date().toISOString(),
            source: 'GulfTalent (Bahrain)'
          });
        }
      }
    });
    return items.slice(0, 50);
  } catch (e) {
    console.error('Failed to scrape GulfTalent Bahrain jobs:', e);
    return [];
  }
}

async function scrapeExpatriatesBahrainJobs(): Promise<JobItem[]> {
  try {
    const url = 'https://www.expatriates.com/classifieds/bahrain/jobs';
    const resp = await fetch(url, { timeout: 15000 } as any);
    const html = await resp.text();
    const $ = loadXML(html);
    const items: JobItem[] = [];
    $('a').each((_, el) => {
      const href = ($(el).attr('href') || '').trim();
      const text = ($(el).text() || '').trim();
      if (!href || !text) return;
      // Match job listing detail or category pages under Bahrain jobs
      if (/classifieds\/bahrain\/jobs/i.test(href) || /classifieds\/bh\/jobs/i.test(href) || /cls\//i.test(href)) {
        const full = href.startsWith('http') ? href : ('https://www.expatriates.com' + (href.startsWith('/') ? href : '/' + href));
        // Basic heuristics to avoid navigational links
        if (text.length >= 6 && !/post|login|manage|next|prev|back/i.test(text)) {
          items.push({
            title: text,
            link: full,
            pubDate: new Date().toISOString(),
            source: 'Expatriates (Bahrain)'
          });
        }
      }
    });
    return items.slice(0, 60);
  } catch (e) {
    console.error('Failed to scrape Expatriates Bahrain jobs:', e);
    return [];
  }
}

app.get('/api/jobs', newsLimiter, async (req, res) => {
  try {
    // Force Bahrain-only jobs
    const country = 'Bahrain';
    const key = country.toLowerCase();
    const cached = jobsCache.get(key);
    if (cached && cached.exp > Date.now()) {
      return res.json({ success: true, cached: true, items: cached.items });
    }

    const feeds = getJobFeeds(country);
    const results = await Promise.all([
      scrapeBaytBahrainJobs(),
      scrapeGulfTalentBahrainJobs(),
      scrapeExpatriatesBahrainJobs(),
      ...feeds.map(f => fetchJobsRSS(f.url, f.name))
    ]);
    const all = results.flat();
    const recentMs = 10 * 24 * 60 * 60 * 1000;
    const recent = all.filter(n => {
      const d = new Date(n.pubDate);
      return !isNaN(d.getTime()) && (Date.now() - d.getTime()) <= recentMs;
    });
    const seen = new Set<string>();
    const dedup = recent.filter(n => {
      const key = (n.link || '') + '|' + (n.title || '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const sorted = dedup.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 40);
    jobsCache.set(key, { items: sorted, exp: Date.now() + JOBS_CACHE_TTL_MS });
    res.json({ success: true, cached: false, items: sorted });
  } catch (error) {
    console.error('Error aggregating jobs:', error);
    res.status(500).json({ success: false, error: 'Failed to aggregate jobs' });
  }
});
