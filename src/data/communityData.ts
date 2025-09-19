import { CommunityPost, CommunityUser } from '../types';

// Mock users
export const mockUsers: CommunityUser[] = [
  {
    id: '1',
    name: 'Ahmad Al-Mahmood',
    joinedDate: new Date('2024-01-15'),
    postsCount: 12,
    helpfulVotes: 45
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    joinedDate: new Date('2024-02-20'),
    postsCount: 8,
    helpfulVotes: 23
  },
  {
    id: '3',
    name: 'Mohammed Al-Rashid',
    joinedDate: new Date('2024-03-10'),
    postsCount: 15,
    helpfulVotes: 67
  },
  {
    id: '4',
    name: 'Lisa Chen',
    joinedDate: new Date('2024-01-28'),
    postsCount: 6,
    helpfulVotes: 18
  },
  {
    id: '5',
    name: 'Khalid Al-Bahrani',
    joinedDate: new Date('2024-04-05'),
    postsCount: 9,
    helpfulVotes: 31
  }
];

// Mock community posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Ahmad Al-Mahmood',
    content: 'Can someone help me understand the overtime calculation for night shifts? My employer is paying me 125% but I think it should be 150% for work between 9 PM to 6 AM.',
    category: 'labour-law',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 12,
    replies: 3,
    isAnonymous: false,
    tags: ['overtime', 'night shift', 'salary'],
    aiResponse: 'According to Bahrain Labour Law Article 59-62, night work (9 PM to 6 AM) should be compensated at 150% of regular wage (50% extra), not just 125%. You are correct that your employer should pay you the higher rate for night shifts.',
    aiResponseTimestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    content: 'I\'m starting a new job next week and they mentioned a 6-month probation period. Is this legal? I thought the maximum was 3 months.',
    category: 'labour-law',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 8,
    replies: 2,
    isAnonymous: false,
    tags: ['probation', 'employment contract'],
    aiResponse: 'Under Bahrain Labour Law Article 39-41, probation periods can be up to 6 months for technical/professional roles, but maximum 3 months for most other positions. The 6-month period is legal if your role qualifies as technical or professional.',
    aiResponseTimestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000)
  },
  {
    id: '3',
    userId: '3',
    userName: 'Anonymous User',
    content: 'How do I calculate my end of service gratuity? I\'ve been working for the same company for 5 years and thinking about resigning.',
    category: 'labour-law',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 15,
    replies: 5,
    isAnonymous: true,
    tags: ['end of service', 'gratuity', 'resignation'],
    aiResponse: 'For 5 years of service: First 3 years = 15 days salary per year (45 days total), Last 2 years = 1 month salary per year (2 months total). Total gratuity = 45 days + 2 months = approximately 3.5 months salary based on your last drawn basic salary.',
    aiResponseTimestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000)
  },
  {
    id: '4',
    userId: '4',
    userName: 'Lisa Chen',
    content: 'Need help with company formation in Bahrain. What\'s the minimum capital requirement for an LLC? And do I need a local partner?',
    category: 'company-formation',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 6,
    replies: 1,
    isAnonymous: false,
    tags: ['LLC', 'capital requirement', 'local partner'],
    aiResponse: 'For LLC formation in Bahrain: Minimum capital is BD 20,000. You don\'t necessarily need a local partner for most business activities, but some sectors may require local participation. Check with Sijilat for your specific business type.',
    aiResponseTimestamp: new Date(Date.now() - 7.5 * 60 * 60 * 1000)
  },
  {
    id: '5',
    userId: '5',
    userName: 'Khalid Al-Bahrani',
    content: 'My visa expires next month. Can I apply for a grace period extension? What documents do I need?',
    category: 'grace-period',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likes: 9,
    replies: 4,
    isAnonymous: false,
    tags: ['visa extension', 'grace period', 'documents'],
    aiResponse: 'Yes, you can apply for a grace period extension through LMRA. Required documents: valid passport, current visa copy, application form, fee payment. Apply before your current visa expires for best results.',
    aiResponseTimestamp: new Date(Date.now() - 11 * 60 * 60 * 1000)
  },
  {
    id: '6',
    userId: '1',
    userName: 'Ahmad Al-Mahmood',
    content: 'Just got my LMRA work permit approved! The process was smoother than expected. Happy to share my experience if anyone needs help.',
    category: 'lmra',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    likes: 22,
    replies: 7,
    isAnonymous: false,
    tags: ['work permit', 'LMRA', 'success story'],
    aiResponse: 'Congratulations on your work permit approval! Your experience could be valuable for others going through the same process. Thank you for offering to help the community.',
    aiResponseTimestamp: new Date(Date.now() - 17 * 60 * 60 * 1000)
  }
];

// Helper function to get user by ID
export const getUserById = (userId: string): CommunityUser | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Helper function to format time ago
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

// Helper function to get category emoji
export const getCategoryEmoji = (category: string): string => {
  const emojiMap: Record<string, string> = {
    'labour-law': '⚖️',
    'company-formation': '🏢',
    'visa-services': '🛂',
    'grace-period': '⏰',
    'lmra': '📋',
    'sijilat': '📝',
    'general-legal': '📚',
    'other': '💬'
  };
  return emojiMap[category] || '💬';
};
