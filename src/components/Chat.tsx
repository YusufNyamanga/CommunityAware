import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage, LegalCategory } from '../types';
import { backendApiService } from '../services/backendApiService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';
import { Loader } from 'lucide-react';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const MessagesContainer = styled.div<{ $idle: boolean }>`
  flex: 1;
  overflow-y: ${({ $idle }) => ($idle ? 'hidden' : 'auto')};
  padding: ${({ $idle }) => ($idle ? '1.25rem' : '2rem')};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: ${({ $idle }) => ($idle ? 'center' : 'flex-start')};
  align-items: ${({ $idle }) => ($idle ? 'center' : 'stretch')};
  scroll-behavior: smooth;
  overflow-anchor: none;
  min-height: 0; /* allow content to shrink within flex parent */
  
  @media (max-width: 768px) {
    padding: ${({ $idle }) => ($idle ? '1rem' : '1rem')};
  }
  
  @media (max-width: 480px) {
    padding: ${({ $idle }) => ($idle ? '0.75rem 0.5rem' : '0.75rem 0.5rem')};
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;
  }
`;

const WelcomeTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const WelcomeText = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SuggestionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const SuggestionChip = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  height: 28px;
  padding: 0 10px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary}10;
    border-color: ${({ theme }) => theme.colors.primary}50;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25rem;
  height: 100%;
`;

interface ChatProps {
  sessionId?: string;
  onPostToCommunity?: (question: string, answer: string, category?: LegalCategory) => void;
}


export const Chat: React.FC<ChatProps> = ({ sessionId, onPostToCommunity }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamStatus, setStreamStatus] = useState<null | 'retrying' | 'fallback'>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const [postedMessageIds, setPostedMessageIds] = useState<Set<string>>(new Set());
  const storageKey = `chat:session:${sessionId || 'default'}`;
  
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const placeholderTopics = [
    `${t.labourLawQuery} ...`,
    `${t.companyFormationQuery} ...`,
    `${t.culturalGuidelinesQuery} ...`,
  ];
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [phase, setPhase] = useState<'typing' | 'deleting'>("typing");
  const [cursorPos, setCursorPos] = useState(0);
  
  const handlePostToCommunity = (aiMessage: ChatMessage, userQuestion: string) => {
    if (!aiMessage?.id) return;
    if (postedMessageIds.has(aiMessage.id)) return;
    if (onPostToCommunity && aiMessage.content) {
      onPostToCommunity(userQuestion, aiMessage.content, aiMessage.category);
      setPostedMessageIds(prev => new Set(prev).add(aiMessage.id));
    }
  };

  const handleSuggestionClick = (query: string) => {
    handleSendMessage(query);
  };

  useEffect(() => {
    const full = placeholderTopics[currentPlaceholderIndex % placeholderTopics.length] || "";
    const typingSpeed = 40;
    const deletingSpeed = 30;
    const timer = setTimeout(() => {
      if (phase === 'typing') {
        if (cursorPos < full.length) {
          const nextPos = cursorPos + 1;
          setCursorPos(nextPos);
          setTypedPlaceholder(full.slice(0, nextPos));
        } else {
          setPhase('deleting');
        }
      } else {
        if (cursorPos > 0) {
          const nextPos = cursorPos - 1;
          setCursorPos(nextPos);
          setTypedPlaceholder(full.slice(0, nextPos));
        } else {
          setPhase('typing');
          setCurrentPlaceholderIndex((i) => (i + 1) % placeholderTopics.length);
        }
      }
    }, phase === 'typing' ? typingSpeed : deletingSpeed);
    return () => clearTimeout(timer);
  }, [phase, cursorPos, currentPlaceholderIndex, t]);

  useEffect(() => {
    setPhase('typing');
    setCursorPos(0);
    setTypedPlaceholder("");
    setCurrentPlaceholderIndex(0);
  }, [t]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        const restored = parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp as any) }));
        setMessages(restored);
      } else {
        setMessages([]);
      }
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      const serializable = messages.map(m => ({ ...m, timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp }));
      localStorage.setItem(storageKey, JSON.stringify(serializable));
    } catch {}
  }, [messages, storageKey]);


  // Enhanced scroll management for streaming
  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true;
    const container = messagesContainerRef.current;
    const threshold = 100; // pixels from bottom
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
  };

  const scrollToBottom = (force = false) => {
    if (!messagesEndRef.current) return;
    
    // Only auto-scroll if user is near bottom or force is true
    if (force || isNearBottom() || !isUserScrolling) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      });
    }
  };

  // Handle user scroll detection
  const handleScroll = () => {
    setIsUserScrolling(!isNearBottom());
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]); // Only trigger on new messages, not content updates

  // Separate effect for streaming updates
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'ai' && lastMessage.content) {
        scrollToBottom(); // Keep following streaming content
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string, selectedCategory?: LegalCategory) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    const category = selectedCategory || backendApiService.categorizeQuery(content);

    try {
      let streamingContent = '';
      const historyForCall = [...messages, userMessage];
      const hadPreviousAI = messages.some(m => m.sender === 'ai');
      const sanitizeGreeting = (text: string) => {
        if (!hadPreviousAI) return text;
        const pattern = /^(\s*)(hallo\s+habibi|hello|hi|hey|hola|bonjour|merhaba|privet|привет|ciao|salut|ola|olá|你好|مرحبا|أهلا|اهلا|سلام|habari|namaste|नमस्ते)([\s,!.:؛،]*)/i;
        const replaced = text.replace(pattern, '$1');
        // also remove time-of-day greetings if any slipped through
        const tod = /^(\s*)(good\s+(morning|afternoon|evening|night))([\s,!.:]*)/i;
        return replaced.replace(tod, '$1');
      };
      let greetingSanitized = false;
      const response = await backendApiService.sendMessage(content, historyForCall, category, (chunk: string) => {
        if (streamingContent === '') {
          if (!greetingSanitized) {
            const cleaned = sanitizeGreeting(chunk);
            if (cleaned !== chunk) {
              chunk = cleaned;
              greetingSanitized = true;
            }
          }
          setIsLoading(false);
          const aiMsg: ChatMessage = {
            id: aiMessageId,
            content: chunk,
            sender: 'ai',
            timestamp: new Date(),
            category,
          };
          streamingContent = chunk;
          setMessages(prev => [...prev, aiMsg]);
          return;
        }
        streamingContent += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: streamingContent }
            : msg
        ));
      }, currentLanguage, (status) => {
        setStreamStatus(status);
      });
      
      setMessages(prev => {
        const exists = prev.some(m => m.id === aiMessageId);
        if (!exists) {
          const aiMsg: ChatMessage = {
            id: aiMessageId,
            content: sanitizeGreeting(response),
            sender: 'ai',
            timestamp: new Date(),
            category,
          };
          return [...prev, aiMsg];
        }
        return prev.map(msg => msg.id === aiMessageId ? { ...msg, content: sanitizeGreeting(response) } : msg);
      });
      setStreamStatus(null);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorText = t.apologyProcessing || "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
      setMessages(prev => {
        const exists = prev.some(m => m.id === aiMessageId);
        if (!exists) {
          const aiMsg: ChatMessage = {
            id: aiMessageId,
            content: errorText,
            sender: 'ai',
            timestamp: new Date(),
            category,
          };
          return [...prev, aiMsg];
        }
        return prev.map(msg => msg.id === aiMessageId ? { ...msg, content: errorText } : msg);
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <ChatContainer>
      <MessagesContainer ref={messagesContainerRef} $idle={messages.length === 0}>
        {showWelcome ? (
          <EmptyState>
            <WelcomeMessage>
              <WelcomeTitle>{t.welcomeTitle}</WelcomeTitle>
              <WelcomeText>
                {t.welcomeDescription}
              </WelcomeText>
              <SuggestionRow>
                <SuggestionChip onClick={() => handleSuggestionClick(t.labourLawQuery)} disabled={isLoading}>{t.labourLaw}</SuggestionChip>
                <SuggestionChip onClick={() => handleSuggestionClick(t.companyFormationQuery)} disabled={isLoading}>{t.companyFormation}</SuggestionChip>
                <SuggestionChip onClick={() => handleSuggestionClick(t.culturalGuidelinesQuery)} disabled={isLoading}>{t.culturalGuidelines}</SuggestionChip>
              </SuggestionRow>
            </WelcomeMessage>
          </EmptyState>
        ) : (
          <>
            {messages.map((message, index) => {
              // Find the previous user message for AI responses
              const userQuestion = message.sender === 'ai' && index > 0 && messages[index - 1].sender === 'user' 
                ? messages[index - 1].content 
                : undefined;
              
              return (
                <ChatMessageComponent 
                  key={message.id} 
                  message={message} 
                  onPostToCommunity={onPostToCommunity ? handlePostToCommunity : undefined}
                  userQuestion={userQuestion}
                  alreadyPosted={postedMessageIds.has(message.id)}
                />
              );
            })}
            
            {isLoading && (
              <LoadingIndicator>
                <Loader size={16} />
                <span>{t.aiThinking}</span>
              </LoadingIndicator>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </MessagesContainer>

      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder={''}
        ghostPlaceholder={typedPlaceholder}
      />
    </ChatContainer>
  );
};
