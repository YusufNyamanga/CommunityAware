export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  category?: LegalCategory;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export type LegalCategory = 
  | 'labour-law'
  | 'company-formation'
  | 'visa-services'
  | 'grace-period'
  | 'lmra'
  | 'sijilat'
  | 'general-legal'
  | 'other';


export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

export interface KnowledgeBaseResource {
  id: string;
  title: string;
  type: 'document' | 'faq' | 'template' | 'guide';
  category: LegalCategory;
  url?: string;
  content?: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  category: LegalCategory;
  timestamp: Date;
  likes: number;
  replies: number;
  isAnonymous: boolean;
  tags: string[];
  aiResponse?: string;
  aiResponseTimestamp?: Date;
}

export interface CommunityReply {
  id: string;
  postId: string;
  userName: string;
  content: string;
  timestamp: Date;
  isAnonymous: boolean;
}

export interface CommunityUser {
  id: string;
  name: string;
  avatar?: string;
  joinedDate: Date;
  postsCount: number;
  helpfulVotes: number;
}
