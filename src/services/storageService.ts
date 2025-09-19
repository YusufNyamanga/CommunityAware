import { ChatMessage } from '../types';

export interface StoredChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    defaultCategory: string;
  };
  createdAt: Date;
  lastActive: Date;
}

class StorageService {
  private readonly CHAT_SESSIONS_KEY = 'communityaware_chat_sessions';
  private readonly USER_PROFILE_KEY = 'communityaware_user_profile';
  private readonly CURRENT_SESSION_KEY = 'communityaware_current_session';

  // Chat Sessions Management
  saveChatSession(session: StoredChatSession): void {
    try {
      const sessions = this.getAllChatSessions();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = { ...session, updatedAt: new Date() };
      } else {
        sessions.unshift(session);
      }
      
      // Keep only last 50 sessions to prevent storage overflow
      const limitedSessions = sessions.slice(0, 50);
      localStorage.setItem(this.CHAT_SESSIONS_KEY, JSON.stringify(limitedSessions));
    } catch (error) {
      console.error('Error saving chat session:', error);
    }
  }

  getAllChatSessions(): StoredChatSession[] {
    try {
      const stored = localStorage.getItem(this.CHAT_SESSIONS_KEY);
      if (!stored) return [];
      
      const sessions = JSON.parse(stored);
      // Convert date strings back to Date objects
      return sessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      return [];
    }
  }

  getChatSession(sessionId: string): StoredChatSession | null {
    const sessions = this.getAllChatSessions();
    return sessions.find(s => s.id === sessionId) || null;
  }

  deleteChatSession(sessionId: string): void {
    try {
      const sessions = this.getAllChatSessions().filter(s => s.id !== sessionId);
      localStorage.setItem(this.CHAT_SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error deleting chat session:', error);
    }
  }

  // Current Session Management
  setCurrentSession(sessionId: string): void {
    localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
  }

  getCurrentSessionId(): string | null {
    return localStorage.getItem(this.CURRENT_SESSION_KEY);
  }

  clearCurrentSession(): void {
    localStorage.removeItem(this.CURRENT_SESSION_KEY);
  }

  // User Profile Management
  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.USER_PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  getUserProfile(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.USER_PROFILE_KEY);
      if (!stored) return null;
      
      const profile = JSON.parse(stored);
      return {
        ...profile,
        createdAt: new Date(profile.createdAt),
        lastActive: new Date(profile.lastActive)
      };
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  }

  updateUserLastActive(): void {
    const profile = this.getUserProfile();
    if (profile) {
      this.saveUserProfile({ ...profile, lastActive: new Date() });
    }
  }

  // Utility Methods
  generateSessionTitle(messages: ChatMessage[]): string {
    const firstUserMessage = messages.find(m => m.sender === 'user');
    if (firstUserMessage) {
      const title = firstUserMessage.content.slice(0, 50);
      return title.length < firstUserMessage.content.length ? `${title}...` : title;
    }
    return `Chat ${new Date().toLocaleDateString()}`;
  }

  exportChatSessions(): string {
    const sessions = this.getAllChatSessions();
    return JSON.stringify(sessions, null, 2);
  }

  importChatSessions(jsonData: string): boolean {
    try {
      const sessions = JSON.parse(jsonData);
      localStorage.setItem(this.CHAT_SESSIONS_KEY, JSON.stringify(sessions));
      return true;
    } catch (error) {
      console.error('Error importing chat sessions:', error);
      return false;
    }
  }

  clearAllData(): void {
    localStorage.removeItem(this.CHAT_SESSIONS_KEY);
    localStorage.removeItem(this.USER_PROFILE_KEY);
    localStorage.removeItem(this.CURRENT_SESSION_KEY);
  }

  getStorageSize(): { used: string; available: string } {
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    const usedKB = (used / 1024).toFixed(2);
    const availableKB = ((5 * 1024 * 1024 - used) / 1024).toFixed(2); // Assuming 5MB limit
    
    return {
      used: `${usedKB} KB`,
      available: `${availableKB} KB`
    };
  }
}

export const storageService = new StorageService();
