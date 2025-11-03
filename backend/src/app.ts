import express from 'express';
import cors from 'cors';
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

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration - allow frontend connections
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.100.27:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json());

// Debug endpoint to check environment variables
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

// Performance test endpoint
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

// Chat routes (temporarily without auth for testing - should add auth in production)
app.post('/api/chat', aiController.handleChat);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
