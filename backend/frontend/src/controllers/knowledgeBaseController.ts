import { Request, Response } from 'express';
import { knowledgeBaseService } from '../services/knowledgeBaseService';

export const knowledgeBaseController = {
  // Glossary Routes
  async getAllGlossaryTerms(req: Request, res: Response) {
    try {
      const terms = await knowledgeBaseService.getAllGlossaryTerms();
      res.json(terms);
    } catch (error) {
      console.error('Error getting glossary terms:', error);
      res.status(500).json({ error: 'Failed to get glossary terms' });
    }
  },

  async searchGlossary(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const results = await knowledgeBaseService.searchGlossary(query);
      res.json(results);
    } catch (error) {
      console.error('Error searching glossary:', error);
      res.status(500).json({ error: 'Failed to search glossary' });
    }
  },

  async addGlossaryTerm(req: Request, res: Response) {
    try {
      const term = await knowledgeBaseService.addGlossaryTerm(req.body);
      res.status(201).json(term);
    } catch (error) {
      console.error('Error adding glossary term:', error);
      res.status(500).json({ error: 'Failed to add glossary term' });
    }
  },

  async updateGlossaryTerm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const term = await knowledgeBaseService.updateGlossaryTerm(id, req.body);
      res.json(term);
    } catch (error) {
      console.error('Error updating glossary term:', error);
      res.status(500).json({ error: 'Failed to update glossary term' });
    }
  },

  // FAQ Routes
  async getAllFAQs(req: Request, res: Response) {
    try {
      const faqs = await knowledgeBaseService.getAllFAQs();
      res.json(faqs);
    } catch (error) {
      console.error('Error getting FAQs:', error);
      res.status(500).json({ error: 'Failed to get FAQs' });
    }
  },

  async searchFAQs(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const results = await knowledgeBaseService.searchFAQs(query);
      res.json(results);
    } catch (error) {
      console.error('Error searching FAQs:', error);
      res.status(500).json({ error: 'Failed to search FAQs' });
    }
  },

  async addFAQ(req: Request, res: Response) {
    try {
      const faq = await knowledgeBaseService.addFAQ(req.body);
      res.status(201).json(faq);
    } catch (error) {
      console.error('Error adding FAQ:', error);
      res.status(500).json({ error: 'Failed to add FAQ' });
    }
  },

  async updateFAQ(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const faq = await knowledgeBaseService.updateFAQ(id, req.body);
      res.json(faq);
    } catch (error) {
      console.error('Error updating FAQ:', error);
      res.status(500).json({ error: 'Failed to update FAQ' });
    }
  },

  // Law Article Routes
  async getAllLawArticles(req: Request, res: Response) {
    try {
      const articles = await knowledgeBaseService.getAllLawArticles();
      res.json(articles);
    } catch (error) {
      console.error('Error getting law articles:', error);
      res.status(500).json({ error: 'Failed to get law articles' });
    }
  },

  async searchLaws(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const results = await knowledgeBaseService.searchLaws(query);
      res.json(results);
    } catch (error) {
      console.error('Error searching laws:', error);
      res.status(500).json({ error: 'Failed to search laws' });
    }
  },

  async addLawArticle(req: Request, res: Response) {
    try {
      const article = await knowledgeBaseService.addLawArticle(req.body);
      res.status(201).json(article);
    } catch (error) {
      console.error('Error adding law article:', error);
      res.status(500).json({ error: 'Failed to add law article' });
    }
  },

  async updateLawArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await knowledgeBaseService.updateLawArticle(id, req.body);
      res.json(article);
    } catch (error) {
      console.error('Error updating law article:', error);
      res.status(500).json({ error: 'Failed to update law article' });
    }
  },

  // Bulk Import Routes
  async importFAQs(req: Request, res: Response) {
    try {
      const { faqs } = req.body;
      if (!Array.isArray(faqs)) {
        return res.status(400).json({ error: 'FAQs must be an array' });
      }
      const importedFAQs = await knowledgeBaseService.importFAQs(faqs);
      res.status(201).json(importedFAQs);
    } catch (error) {
      console.error('Error importing FAQs:', error);
      res.status(500).json({ error: 'Failed to import FAQs' });
    }
  },

  async importLawArticles(req: Request, res: Response) {
    try {
      const { articles } = req.body;
      if (!Array.isArray(articles)) {
        return res.status(400).json({ error: 'Articles must be an array' });
      }
      const importedArticles = await knowledgeBaseService.importLawArticles(articles);
      res.status(201).json(importedArticles);
    } catch (error) {
      console.error('Error importing law articles:', error);
      res.status(500).json({ error: 'Failed to import law articles' });
    }
  },

  // Updates Routes
  async getRecentUpdates(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const updates = await knowledgeBaseService.getRecentUpdates(limit);
      res.json(updates);
    } catch (error) {
      console.error('Error getting recent updates:', error);
      res.status(500).json({ error: 'Failed to get recent updates' });
    }
  }
};
