import { ChatMessage, LegalCategory } from '../types';

export interface DatabaseChatSession {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  category?: LegalCategory;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    location?: string;
  };
}

export interface DatabaseUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
    publicProfile: boolean;
  };
  stats: {
    totalSessions: number;
    totalMessages: number;
    totalTokensUsed: number;
    joinedAt: Date;
    lastActive: Date;
  };
  subscription?: {
    plan: 'free' | 'premium' | 'pro';
    expiresAt?: Date;
    tokensRemaining: number;
  };
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  question: string;
  answer: string;
  category: LegalCategory;
  tags: string[];
  likes: number;
  replies: number;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  aiResponse?: {
    content: string;
    confidence: number;
    sources: string[];
  };
}

// Simulated database using localStorage for now
// In production, this would connect to a real database like PostgreSQL, MongoDB, etc.
class DatabaseService {
  private readonly USERS_KEY = 'communityaware_db_users';
  private readonly SESSIONS_KEY = 'communityaware_db_sessions';
  private readonly COMMUNITY_POSTS_KEY = 'communityaware_db_community_posts';
  private readonly ANALYTICS_KEY = 'communityaware_db_analytics';

  // User Management
  async createUser(userData: Partial<DatabaseUser>): Promise<DatabaseUser> {
    const user: DatabaseUser = {
      id: this.generateId(),
      email: userData.email,
      name: userData.name,
      avatar: userData.avatar,
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
        publicProfile: false,
        ...userData.preferences
      },
      stats: {
        totalSessions: 0,
        totalMessages: 0,
        totalTokensUsed: 0,
        joinedAt: new Date(),
        lastActive: new Date()
      },
      subscription: {
        plan: 'free',
        tokensRemaining: 1000
      }
    };

    const users = this.getAllUsers();
    users.push(user);
    this.saveUsers(users);
    
    return user;
  }

  async getUser(userId: string): Promise<DatabaseUser | null> {
    const users = this.getAllUsers();
    return users.find(u => u.id === userId) || null;
  }

  async updateUser(userId: string, updates: Partial<DatabaseUser>): Promise<DatabaseUser | null> {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...updates };
      this.saveUsers(users);
      return users[userIndex];
    }
    
    return null;
  }

  async updateUserStats(userId: string, stats: Partial<DatabaseUser['stats']>): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.stats = { ...user.stats, ...stats, lastActive: new Date() };
      await this.updateUser(userId, { stats: user.stats });
    }
  }

  // Session Management
  async saveChatSessionToDB(session: DatabaseChatSession): Promise<void> {
    const sessions = this.getAllSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = { ...session, updatedAt: new Date() };
    } else {
      sessions.unshift(session);
    }
    
    // Keep only last 500 sessions
    const limitedSessions = sessions.slice(0, 500);
    this.saveSessions(limitedSessions);
    
    // Update user stats
    await this.updateUserStats(session.userId, {
      totalSessions: sessions.filter(s => s.userId === session.userId).length,
      totalMessages: session.messages.length
    });
  }

  async getUserSessions(userId: string, limit: number = 20): Promise<DatabaseChatSession[]> {
    const sessions = this.getAllSessions();
    return sessions
      .filter(s => s.userId === userId)
      .slice(0, limit)
      .map(s => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt)
      }));
  }

  async getPublicSessions(category?: LegalCategory, limit: number = 10): Promise<DatabaseChatSession[]> {
    const sessions = this.getAllSessions();
    return sessions
      .filter(s => s.isPublic && (!category || s.category === category))
      .slice(0, limit);
  }

  // Community Posts Management
  async saveCommunityPost(post: CommunityPost): Promise<void> {
    const posts = this.getAllCommunityPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = { ...post, updatedAt: new Date() };
    } else {
      posts.unshift(post);
    }
    
    // Keep only last 1000 posts
    const limitedPosts = posts.slice(0, 1000);
    this.saveCommunityPosts(limitedPosts);
  }

  async getCommunityPosts(category?: LegalCategory, limit: number = 20): Promise<CommunityPost[]> {
    const posts = this.getAllCommunityPosts();
    return posts
      .filter(p => !category || p.category === category)
      .slice(0, limit)
      .map(p => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }));
  }

  async likeCommunityPost(postId: string): Promise<void> {
    const posts = this.getAllCommunityPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex >= 0) {
      posts[postIndex].likes += 1;
      posts[postIndex].updatedAt = new Date();
      this.saveCommunityPosts(posts);
    }
  }

  // Analytics
  async recordAnalytics(event: string, data: any): Promise<void> {
    const analytics = this.getAnalyticsData();
    analytics.push({
      id: this.generateId(),
      event,
      data,
      timestamp: new Date()
    });
    
    // Keep only last 10000 events
    const limitedAnalytics = analytics.slice(0, 10000);
    this.saveAnalytics(limitedAnalytics);
  }

  async getAnalytics(event?: string): Promise<any[]> {
    const analytics = this.getAnalyticsData();
    return event ? analytics.filter((a: any) => a.event === event) : analytics;
  }

  // Search functionality
  async searchSessions(userId: string, query: string): Promise<DatabaseChatSession[]> {
    const sessions = await this.getUserSessions(userId, 100);
    const lowerQuery = query.toLowerCase();
    
    return sessions.filter(session => 
      session.title.toLowerCase().includes(lowerQuery) ||
      session.messages.some(msg => msg.content.toLowerCase().includes(lowerQuery)) ||
      session.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async searchCommunityPosts(query: string): Promise<CommunityPost[]> {
    const posts = await this.getCommunityPosts(undefined, 500);
    const lowerQuery = query.toLowerCase();
    
    return posts.filter(post =>
      post.question.toLowerCase().includes(lowerQuery) ||
      post.answer.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Data Export/Import
  async exportUserData(userId: string): Promise<string> {
    const user = await this.getUser(userId);
    const sessions = await this.getUserSessions(userId, 1000);
    const posts = this.getAllCommunityPosts().filter(p => p.userId === userId);
    
    return JSON.stringify({
      user,
      sessions,
      communityPosts: posts,
      exportedAt: new Date()
    }, null, 2);
  }

  async deleteUserData(userId: string): Promise<void> {
    // Remove user
    const users = this.getAllUsers().filter(u => u.id !== userId);
    this.saveUsers(users);
    
    // Remove user sessions
    const sessions = this.getAllSessions().filter(s => s.userId !== userId);
    this.saveSessions(sessions);
    
    // Remove user community posts
    const posts = this.getAllCommunityPosts().filter(p => p.userId !== userId);
    this.saveCommunityPosts(posts);
  }

  // Private methods for data persistence
  private getAllUsers(): DatabaseUser[] {
    try {
      const stored = localStorage.getItem(this.USERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  }

  private saveUsers(users: DatabaseUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  private getAllSessions(): DatabaseChatSession[] {
    try {
      const stored = localStorage.getItem(this.SESSIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  private saveSessions(sessions: DatabaseChatSession[]): void {
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
  }

  private getAllCommunityPosts(): CommunityPost[] {
    try {
      const stored = localStorage.getItem(this.COMMUNITY_POSTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading community posts:', error);
      return [];
    }
  }

  private saveCommunityPosts(posts: CommunityPost[]): void {
    localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(posts));
  }

  private getAnalyticsData(): any[] {
    try {
      const stored = localStorage.getItem(this.ANALYTICS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading analytics:', error);
      return [];
    }
  }

  private saveAnalytics(analytics: any[]): void {
    localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(analytics));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const databaseService = new DatabaseService();
