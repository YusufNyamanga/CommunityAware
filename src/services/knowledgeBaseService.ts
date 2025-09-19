import { KnowledgeBaseEntry, searchKnowledgeBase, getKnowledgeByCategory } from '../data/knowledgeBase';

export class KnowledgeBaseService {
  // Search for relevant knowledge base entries based on user query
  public searchRelevantEntries(query: string): KnowledgeBaseEntry[] {
    return searchKnowledgeBase(query);
  }

  // Get knowledge base entries by category
  public getEntriesByCategory(category: string): KnowledgeBaseEntry[] {
    return getKnowledgeByCategory(category);
  }

  // Extract relevant context from knowledge base for AI prompt
  public extractRelevantContext(query: string, maxEntries: number = 3): string {
    const relevantEntries = this.searchRelevantEntries(query);
    
    if (relevantEntries.length === 0) {
      return '';
    }

    // Sort by relevance and take top entries
    const topEntries = relevantEntries.slice(0, maxEntries);
    
    let context = '\\n\\n--- RELEVANT BAHRAIN LABOUR LAW INFORMATION ---\\n';
    
    topEntries.forEach(entry => {
      context += `\\n**${entry.title}** (${entry.articleNumber || 'Bahrain Labour Law'}):\\n`;
      context += `${entry.content}\\n`;
      if (entry.source) {
        context += `Source: ${entry.source}\\n`;
      }
      context += '\\n---\\n';
    });
    
    context += '\\nPlease base your response on this official information from Bahrain Labour Law.';
    
    return context;
  }

  // Check if query is related to labour law
  public isLabourLawQuery(query: string): boolean {
    const labourKeywords = [
      'labour', 'labor', 'work', 'employee', 'employer', 'salary', 'wage',
      'overtime', 'leave', 'vacation', 'sick', 'maternity', 'termination',
      'resignation', 'contract', 'probation', 'working hours', 'rest',
      'gratuity', 'end of service', 'dispute', 'court', 'lmra'
    ];

    const lowerQuery = query.toLowerCase();
    return labourKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  // Get summary of key labour law topics
  public getLabourLawSummary(): string {
    return `
Here are the key areas of Bahrain Labour Law I can help you with:

📋 Employment Contracts & Probation
- Contract terms and conditions
- Probation periods and extensions

⏰ Working Hours & Overtime
- Standard working hours (8 hours/day, 48 hours/week)
- Overtime compensation (125% of regular rate)
- Night work and holiday pay

🏖️ Leave Entitlements
- Annual leave (21-30 days based on service)
- Sick leave (15 days full pay, 20 days half pay)
- Maternity leave (60 days full pay)

💰 Wages & Benefits
- Payment rules and timing
- End of service gratuity calculation
- Salary deductions and overtime pay

🏁 Termination & Disputes
- Notice periods based on service length
- Labour dispute resolution process
- LMRA mediation services

Ask me specific questions about any of these topics for accurate, law-based answers!
    `;
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();
