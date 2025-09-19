import { GlossaryTerm, FAQ, LawArticle, KnowledgeBaseUpdate } from '../types/knowledge';
import fs from 'fs/promises';
import path from 'path';

class KnowledgeBaseService {
  private glossaryTerms: Map<string, GlossaryTerm>;
  private faqs: Map<string, FAQ>;
  private lawArticles: Map<string, LawArticle>;
  private updates: KnowledgeBaseUpdate[];
  private dataPath: string;

  constructor() {
    this.glossaryTerms = new Map();
    this.faqs = new Map();
    this.lawArticles = new Map();
    this.updates = [];
    this.dataPath = path.join(__dirname, '../../data');
    this.initializeData();
  }

  private async initializeData() {
    try {
      await fs.mkdir(this.dataPath, { recursive: true });
      await this.loadData();
    } catch (error) {
      console.error('Error initializing knowledge base:', error);
    }
  }

  private async loadData() {
    try {
      const glossaryData = await fs.readFile(path.join(this.dataPath, 'glossary.json'), 'utf-8');
      const faqData = await fs.readFile(path.join(this.dataPath, 'faqs.json'), 'utf-8');
      const lawData = await fs.readFile(path.join(this.dataPath, 'laws.json'), 'utf-8');
      const updatesData = await fs.readFile(path.join(this.dataPath, 'updates.json'), 'utf-8');

      const glossary = JSON.parse(glossaryData);
      const faqs = JSON.parse(faqData);
      const laws = JSON.parse(lawData);
      const updates = JSON.parse(updatesData);

      glossary.forEach((term: GlossaryTerm) => this.glossaryTerms.set(term.id, term));
      faqs.forEach((faq: FAQ) => this.faqs.set(faq.id, faq));
      laws.forEach((article: LawArticle) => this.lawArticles.set(article.id, article));
      this.updates = updates;
    } catch (error) {
      console.log('No existing data found, starting with empty knowledge base');
      this.saveData(); // Create initial empty files
    }
  }

  private async saveData() {
    try {
      await fs.writeFile(
        path.join(this.dataPath, 'glossary.json'),
        JSON.stringify(Array.from(this.glossaryTerms.values()), null, 2)
      );
      await fs.writeFile(
        path.join(this.dataPath, 'faqs.json'),
        JSON.stringify(Array.from(this.faqs.values()), null, 2)
      );
      await fs.writeFile(
        path.join(this.dataPath, 'laws.json'),
        JSON.stringify(Array.from(this.lawArticles.values()), null, 2)
      );
      await fs.writeFile(
        path.join(this.dataPath, 'updates.json'),
        JSON.stringify(this.updates, null, 2)
      );
    } catch (error) {
      console.error('Error saving knowledge base data:', error);
      throw new Error('Failed to save knowledge base data');
    }
  }

  // Glossary Terms
  async addGlossaryTerm(term: Omit<GlossaryTerm, 'id' | 'lastUpdated'>): Promise<GlossaryTerm> {
    const newTerm: GlossaryTerm = {
      ...term,
      id: `term-${Date.now()}`,
      lastUpdated: new Date()
    };
    this.glossaryTerms.set(newTerm.id, newTerm);
    await this.saveData();
    return newTerm;
  }

  async updateGlossaryTerm(id: string, updates: Partial<GlossaryTerm>): Promise<GlossaryTerm> {
    const term = this.glossaryTerms.get(id);
    if (!term) throw new Error('Term not found');

    const updatedTerm = {
      ...term,
      ...updates,
      lastUpdated: new Date()
    };
    this.glossaryTerms.set(id, updatedTerm);
    await this.saveData();
    return updatedTerm;
  }

  // FAQs
  async addFAQ(faq: Omit<FAQ, 'id' | 'lastUpdated'>): Promise<FAQ> {
    const newFAQ: FAQ = {
      ...faq,
      id: `faq-${Date.now()}`,
      lastUpdated: new Date()
    };
    this.faqs.set(newFAQ.id, newFAQ);
    await this.saveData();
    return newFAQ;
  }

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<FAQ> {
    const faq = this.faqs.get(id);
    if (!faq) throw new Error('FAQ not found');

    const updatedFAQ = {
      ...faq,
      ...updates,
      lastUpdated: new Date()
    };
    this.faqs.set(id, updatedFAQ);
    await this.saveData();
    return updatedFAQ;
  }

  // Law Articles
  async addLawArticle(article: Omit<LawArticle, 'id' | 'lastUpdated'>): Promise<LawArticle> {
    const newArticle: LawArticle = {
      ...article,
      id: `law-${Date.now()}`,
      lastUpdated: new Date()
    };
    this.lawArticles.set(newArticle.id, newArticle);
    await this.saveData();
    return newArticle;
  }

  async updateLawArticle(id: string, updates: Partial<LawArticle>): Promise<LawArticle> {
    const article = this.lawArticles.get(id);
    if (!article) throw new Error('Article not found');

    const updatedArticle = {
      ...article,
      ...updates,
      lastUpdated: new Date()
    };
    this.lawArticles.set(id, updatedArticle);
    await this.saveData();
    return updatedArticle;
  }

  // Search and Retrieval
  async searchGlossary(query: string): Promise<GlossaryTerm[]> {
    const searchTerms = query.toLowerCase().split(' ');
    return Array.from(this.glossaryTerms.values()).filter(term => 
      searchTerms.some(searchTerm => 
        term.term.toLowerCase().includes(searchTerm) ||
        term.definition.toLowerCase().includes(searchTerm) ||
        term.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    );
  }

  async searchFAQs(query: string): Promise<FAQ[]> {
    const searchTerms = query.toLowerCase().split(' ');
    return Array.from(this.faqs.values()).filter(faq => 
      searchTerms.some(searchTerm => 
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    );
  }

  async searchLaws(query: string): Promise<LawArticle[]> {
    const searchTerms = query.toLowerCase().split(' ');
    return Array.from(this.lawArticles.values()).filter(article => 
      searchTerms.some(searchTerm => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    );
  }

  // Bulk Updates
  async importFAQs(faqs: Omit<FAQ, 'id' | 'lastUpdated'>[]): Promise<FAQ[]> {
    const importedFAQs: FAQ[] = [];
    for (const faq of faqs) {
      const newFAQ = await this.addFAQ(faq);
      importedFAQs.push(newFAQ);
    }
    return importedFAQs;
  }

  async importLawArticles(articles: Omit<LawArticle, 'id' | 'lastUpdated'>[]): Promise<LawArticle[]> {
    const importedArticles: LawArticle[] = [];
    for (const article of articles) {
      const newArticle = await this.addLawArticle(article);
      importedArticles.push(newArticle);
    }
    return importedArticles;
  }

  // Get all items
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    return Array.from(this.glossaryTerms.values());
  }

  async getAllFAQs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values());
  }

  async getAllLawArticles(): Promise<LawArticle[]> {
    return Array.from(this.lawArticles.values());
  }

  async getRecentUpdates(limit: number = 10): Promise<KnowledgeBaseUpdate[]> {
    return this.updates
      .sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime())
      .slice(0, limit);
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();
