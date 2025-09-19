import React, { useState } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { mockCommunityPosts, formatTimeAgo, getCategoryEmoji } from '../data/communityData';
import { CommunityPost, LegalCategory } from '../types';
import NewPostForm from './NewPostForm';

const CommunityContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  max-height: 800px;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PostCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primaryLight};
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-weight: 600;
  margin-left: 8px;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const CategoryTag = styled.span`
  background: ${props => props.theme.colors.primaryLight};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const PostContent = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const AIResponse = styled.div`
  background: ${props => props.theme.colors.primaryLight}20;
  border-left: 3px solid ${props => props.theme.colors.primary};
  padding: 12px;
  margin: 12px 0;
  border-radius: 4px;
`;

const AIResponseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const AIResponseContent = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 8px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ActionButton = styled.button<{ isLiked?: boolean; disabled?: boolean }>`
  background: none;
  border: none;
  color: ${props => 
    props.isLiked 
      ? props.theme.colors.primary 
      : props.theme.colors.textSecondary
  };
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryLight}20;
    color: ${props => props.theme.colors.primary};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 8px 0;
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NewPostButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface CommunitySectionProps {
  onClose?: () => void;
  additionalPosts?: CommunityPost[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ onClose, additionalPosts = [] }) => {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    // Initialize from localStorage
    return JSON.parse(localStorage.getItem('liked_posts') || '[]');
  });
  
  // Merge additional posts from chat with existing posts
  const allPosts = [...additionalPosts, ...posts];

  const toggleAIResponse = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const handleLikePost = (postId: string) => {
    // Check if user already liked this post
    if (likedPosts.includes(postId)) {
      return; // User has already liked this post
    }

    // Update localStorage
    const updatedLikedPosts = [...likedPosts, postId];
    setLikedPosts(updatedLikedPosts);
    localStorage.setItem('liked_posts', JSON.stringify(updatedLikedPosts));

    // Update the likes count in the posts state
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );

    // Also update additional posts if they exist
    if (additionalPosts.some(post => post.id === postId)) {
      // Find and update the post in additionalPosts if needed
      // This ensures likes work for posts from chat as well
      const postIndex = additionalPosts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        additionalPosts[postIndex].likes += 1;
      }
    }
  };

  const handleNewPost = (postData: {
    content: string;
    category: LegalCategory;
    tags: string[];
    isAnonymous: boolean;
  }) => {
    const newPost: CommunityPost = {
      id: (posts.length + 1).toString(),
      userId: 'current-user',
      userName: postData.isAnonymous ? 'Anonymous' : 'You',
      content: postData.content,
      category: postData.category,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      isAnonymous: postData.isAnonymous,
      tags: postData.tags
    };
    
    setPosts([newPost, ...posts]);
    setShowNewPostForm(false);
  };

  return (
    <CommunityContainer>
      <HeaderRow>
        <Title>
          💬 Community Feed
        </Title>
        <HeaderButtons>
          <NewPostButton onClick={() => setShowNewPostForm(!showNewPostForm)}>
            {showNewPostForm ? '✖ Cancel' : '➕ New Post'}
          </NewPostButton>
          {onClose && (
            <CloseButton onClick={onClose} title="Close Community">
              <X />
            </CloseButton>
          )}
        </HeaderButtons>
      </HeaderRow>
      
      {showNewPostForm && (
        <NewPostForm
          onSubmit={handleNewPost}
          onCancel={() => setShowNewPostForm(false)}
        />
      )}
      
      {allPosts.map((post: CommunityPost) => (
        <PostCard key={post.id}>
          <PostHeader>
            <UserInfo>
              {getCategoryEmoji(post.category)}
              <UserName>{post.isAnonymous ? 'Anonymous' : post.userName}</UserName>
            </UserInfo>
            <CategoryTag>{post.category.replace('-', ' ')}</CategoryTag>
          </PostHeader>
          
          <PostContent>{post.content}</PostContent>
          
          {post.tags.length > 0 && (
            <TagsContainer>
              {post.tags.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagsContainer>
          )}
          
          {post.aiResponse && expandedPosts.has(post.id) && (
            <AIResponse>
              <AIResponseHeader>
                🤖 AI Assistant • {post.aiResponseTimestamp && formatTimeAgo(post.aiResponseTimestamp)}
              </AIResponseHeader>
              <AIResponseContent>{post.aiResponse}</AIResponseContent>
            </AIResponse>
          )}
          
          <PostMeta>
            <span>{formatTimeAgo(post.timestamp)}</span>
            <ActionButtons>
              <ActionButton
                onClick={() => handleLikePost(post.id)}
                isLiked={likedPosts.includes(post.id)}
                disabled={likedPosts.includes(post.id)}
                title={likedPosts.includes(post.id) ? 'Already liked' : 'Like this post'}
              >
                {likedPosts.includes(post.id) ? '❤️' : '👍'} {post.likes}
              </ActionButton>
              <ActionButton>
                💬 {post.replies}
              </ActionButton>
              {post.aiResponse && (
                <ActionButton onClick={() => toggleAIResponse(post.id)}>
                  🤖 {expandedPosts.has(post.id) ? 'Hide' : 'Show'} AI Response
                </ActionButton>
              )}
            </ActionButtons>
          </PostMeta>
        </PostCard>
      ))}
    </CommunityContainer>
  );
};

export default CommunitySection;

