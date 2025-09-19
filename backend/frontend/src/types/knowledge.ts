export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  arabicTerm?: string;
  arabicDefinition?: string;
  category: string;
  source: string;
  lastUpdated: Date;
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  arabicQuestion?: string;
  arabicAnswer?: string;
  category: string;
  source: string;
  lastUpdated: Date;
  tags: string[];
}

export interface LawArticle {
  id: string;
  articleNumber: string;
  title: string;
  content: string;
  arabicTitle?: string;
  arabicContent?: string;
  chapter: string;
  section?: string;
  relatedArticles: string[];
  lastUpdated: Date;
  tags: string[];
}

export interface KnowledgeBaseUpdate {
  id: string;
  type: 'faq' | 'law' | 'glossary';
  content: FAQ | LawArticle | GlossaryTerm;
  updateDate: Date;
  updatedBy: string;
  changeDescription: string;
}
