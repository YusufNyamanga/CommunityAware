import React from 'react';
import styled from 'styled-components';
import { User, Bot, Clock, Share2 } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onPostToCommunity?: (message: ChatMessageType, userQuestion: string) => void;
  userQuestion?: string;
  alreadyPosted?: boolean;
}

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  justify-content: ${({ $isUser }) => $isUser ? 'flex-end' : 'flex-start'};
  animation: slideInFromBottom 0.4s ease-out;
  
  /* Optimize spacing on mobile */
  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }
  
  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Avatar = styled.div<{ $isUser: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isUser, theme }) => 
    $isUser 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
      : `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`
  };
  color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
  flex-shrink: 0;
  order: ${({ $isUser }) => $isUser ? 1 : 0};
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  /* Smaller avatar on mobile to save space */
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 1rem 1.25rem;
  border-radius: ${({ $isUser }) =>
    $isUser 
      ? '20px 20px 4px 20px'
      : '20px 20px 20px 4px'
  };
  background-color: ${({ $isUser, theme }) =>
    $isUser 
      ? theme.colors.primary
      : theme.colors.surface
  };
  color: ${({ $isUser, theme }) =>
    $isUser 
      ? (theme.isDark ? '#000' : '#fff')
      : theme.colors.text
  };
  border: 1px solid ${({ $isUser, theme }) =>
    $isUser 
      ? 'transparent'
      : `${theme.colors.primary}20`
  };
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  line-height: 1.6;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  /* Increase width on mobile for better readability */
  @media (max-width: 768px) {
    max-width: 85%;
  }
  
  @media (max-width: 480px) {
    max-width: 90%;
    padding: 0.875rem 1rem;
  }
  
  /* Markdown-style formatting */
  strong {
    font-weight: 600;
  }
  
  em {
    font-style: italic;
  }
  
  code {
    background: ${({ theme }) => theme.colors.background};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  pre {
    background: ${({ theme }) => theme.colors.background};
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 0.5rem 0;
    border: 1px solid ${({ theme }) => theme.colors.primary}20;
  }
  
  ul, ol {
    margin: 0.5rem 0 0.5rem 1.5rem;
  }
  
  li {
    margin-bottom: 0.25rem;
    
    /* Orange bullets and numbers */
    &::marker {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }
  }
  
  /* Enhanced styling for numbered lists */
  ol {
    counter-reset: orange-counter;
    list-style: none;
    padding-left: 0;
    margin: 0.5rem 0;
    
    li {
      counter-increment: orange-counter;
      padding-left: 2.5rem;
      position: relative;
      margin-bottom: 0.5rem;
      line-height: 1.6;
      
      &::before {
        content: counter(orange-counter) ".";
        position: absolute;
        left: 0;
        top: 0;
        color: ${({ theme }) => theme.colors.primary} !important;
        font-weight: 700;
        font-size: 1.1em;
        width: 2rem;
        display: inline-block;
      }
      
      /* Make the dots orange too */
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        color: ${({ theme }) => theme.colors.primary} !important;
      }
    }
  }
  
  /* Enhanced styling for unordered lists */
  ul {
    list-style: none !important;
    padding-left: 0 !important;
    margin: 0.5rem 0;
    
    li {
      padding-left: 2.5rem !important;
      position: relative;
      margin-bottom: 0.5rem;
      line-height: 1.6;
      list-style: none !important;
      
      &::before {
        content: "●" !important;
        position: absolute !important;
        left: 0.75rem !important;
        top: 0 !important;
        color: ${({ theme }) => theme.colors.primary} !important;
        font-weight: 700 !important;
        font-size: 1.3em !important;
        line-height: 1.2 !important;
        width: 1.5rem !important;
        display: inline-block !important;
        z-index: 10 !important;
      }
      
      /* Override any inherited list styling */
      &::marker {
        display: none !important;
        content: none !important;
      }
    }
  }
  
  /* Additional override to ensure orange bullets */
  ul li::before {
    color: ${({ theme }) => theme.colors.primary} !important;
  }
  
  p {
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MessageMeta = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  justify-content: ${({ $isUser }) => $isUser ? 'flex-end' : 'flex-start'};
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const CategoryTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-left: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 10px;
    height: 10px;
  }
`;

// Function to clean AI responses from asterisks, hashes, and other formatting
const cleanAIResponse = (content: string): string => {
  if (!content) return content;
  
  return content
    // Remove multiple asterisks used for emphasis
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove hash symbols used for headings
    .replace(/^#{1,6}\s+/gm, '')
    // Remove extra markdown formatting
    .replace(/`([^`]+)`/g, '$1')
    // Clean up multiple spaces and line breaks
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{3,}/g, ' ')
    // Remove leading/trailing whitespace
    .trim();
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onPostToCommunity, userQuestion, alreadyPosted }) => {
  const isUser = message.sender === 'user';
  
  const handlePostToCommunity = () => {
    if (alreadyPosted) return;
    if (onPostToCommunity && userQuestion && !isUser) {
      onPostToCommunity(message, userQuestion);
    }
  };
  
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return timestamp.toLocaleDateString();
  };

  return (
    <MessageContainer $isUser={isUser}>
      <Avatar $isUser={isUser}>
        {isUser ? <User /> : <Bot />}
      </Avatar>
      
      <div>
        <MessageBubble $isUser={isUser}>
          {isUser ? message.content : cleanAIResponse(message.content)}
        </MessageBubble>
        
        <MessageMeta $isUser={isUser}>
          <Clock />
          <span>{formatTimestamp(message.timestamp)}</span>
          {message.category && !isUser && (
            <CategoryTag>{message.category.replace('-', ' ')}</CategoryTag>
          )}
          {onPostToCommunity && userQuestion && !isUser && message.content && (
            <ActionButton onClick={handlePostToCommunity} title="Post this Q&A to Community" disabled={!!alreadyPosted}>
              <Share2 />
              <span>{alreadyPosted ? 'Posted' : 'Post to Community'}</span>
            </ActionButton>
          )}
        </MessageMeta>
      </div>
    </MessageContainer>
  );
};
