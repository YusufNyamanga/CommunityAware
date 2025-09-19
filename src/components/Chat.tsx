import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage, LegalCategory } from '../types';
import { qwenService } from '../services/qwenService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';
import { Loader } from 'lucide-react';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  scroll-behavior: smooth;
  /* Anchor scrolling to bottom for better streaming experience */
  overflow-anchor: none;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
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

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const QuickActionCard = styled.button`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 0.25rem 0;
    line-height: 1.2;
  }
  
  p {
    font-size: 0.675rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.2;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Mobile optimizations for 2-column layout */
  @media (max-width: 768px) {
    padding: 0.5rem;
    height: 70px;
    
    h3 {
      font-size: 0.75rem;
    }
    
    p {
      font-size: 0.625rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.375rem;
    height: 65px;
    border-radius: 6px;
    
    h3 {
      font-size: 0.7rem;
    }
    
    p {
      font-size: 0.575rem;
    }
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
  padding: 2rem;
`;

interface ChatProps {
  sessionId?: string;
  onPostToCommunity?: (question: string, answer: string, category?: LegalCategory) => void;
}


export const Chat: React.FC<ChatProps> = ({ sessionId, onPostToCommunity }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  
  const handlePostToCommunity = (aiMessage: ChatMessage, userQuestion: string) => {
    if (onPostToCommunity && aiMessage.content) {
      onPostToCommunity(userQuestion, aiMessage.content, aiMessage.category);
    }
  };

  const quickActions = [
    {
      title: t.labourLaw,
      description: t.askQuestion,
      query: t.labourLawQuery
    },
    {
      title: t.lmra,
      description: t.askQuestion,
      query: t.lmraQuery
    },
    {
      title: t.workingHours,
      description: t.askQuestion,
      query: currentLanguage === 'en' ? 'What are the standard working hours and overtime rules in Bahrain?' :
             currentLanguage === 'ar' ? 'ما هي ساعات العمل القياسية وقواعد العمل الإضافي في البحرين؟' :
             currentLanguage === 'zh' ? '巴林的标准工作时间和加班规定是什么？' :
             currentLanguage === 'es' ? '¿Cuáles son las horas de trabajo estándar y las reglas de horas extra en Bahréin?' :
             currentLanguage === 'ml' ? 'ബഹ്റൈനിലെ സ്റ്റാൻഡേർഡ് വർക്കിംഗ് അവേഴ്സും ഓവർടൈം നിയമങ്ങളും എന്താണ്?' :
             currentLanguage === 'lg' ? 'Ssaawa z\'omulimu ezitongole n\'amateeka g\'omulimu ogw\'eyongeddwa mu Bahrain biki?' :
             currentLanguage === 'fr' ? 'Quelles sont les heures de travail standard et les règles des heures supplémentaires à Bahreïn?' :
             currentLanguage === 'tl' ? 'Ano ang mga standard na oras ng trabaho at patakaran sa overtime sa Bahrain?' :
             currentLanguage === 'hi' ? 'बहरीन में मानक कार्य घंटे और ओवरटाइम नियम क्या हैं?' :
             currentLanguage === 'ur' ? 'بحرین میں معیاری کام کے اوقات اور اوور ٹائم کے قوانین کیا ہیں؟' :
             currentLanguage === 'pt' ? 'Quais são as horas de trabalho padrão e as regras de horas extras no Bahrein?' :
             'What are the standard working hours and overtime rules in Bahrain?'
    },
    {
      title: t.leaveBenefits,
      description: t.askQuestion,
      query: currentLanguage === 'en' ? 'What are my annual leave and sick leave entitlements under Bahrain labour law?' :
             currentLanguage === 'ar' ? 'ما هي حقوقي في الإجازة السنوية والإجازة المرضية حسب قانون العمل البحريني؟' :
             currentLanguage === 'zh' ? '根据巴林劳动法，我的年假和病假权利是什么？' :
             currentLanguage === 'es' ? '¿Cuáles son mis derechos de vacaciones anuales y licencia por enfermedad bajo la ley laboral de Bahréin?' :
             currentLanguage === 'ml' ? 'ബഹ്റൈൻ തൊഴിൽ നിയമപ്രകാരം എന്റെ വാർഷിക അവധിയും രോഗാവധിയും എന്താണ്?' :
             currentLanguage === 'lg' ? 'Ddala lyange ery\'omwaka n\'olw\'obulwadde mu mateeka g\'omulimu ga Bahrain biki?' :
             currentLanguage === 'fr' ? 'Quels sont mes droits aux congés annuels et aux congés de maladie selon le droit du travail de Bahreïn?' :
             currentLanguage === 'tl' ? 'Ano ang aking mga karapatan sa annual leave at sick leave sa ilalim ng batas sa paggawa ng Bahrain?' :
             currentLanguage === 'hi' ? 'बहरीन श्रम कानून के तहत मेरे वार्षिक छुट्टी और बीमारी की छुट्टी के अधिकार क्या हैं?' :
             currentLanguage === 'ur' ? 'بحرین لیبر لاء کے تحت میرے سالانہ چھٹی اور بیماری کی چھٹی کے حقوق کیا ہیں؟' :
             currentLanguage === 'pt' ? 'Quais são meus direitos de férias anuais e licença médica sob a lei trabalhista do Bahrein?' :
             'What are my annual leave and sick leave entitlements under Bahrain labour law?'
    }
  ];

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

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Create initial AI message for streaming
    const aiMessageId = (Date.now() + 1).toString();
    const category = qwenService.categorizeQuery(content);
    
    const initialAiMessage: ChatMessage = {
      id: aiMessageId,
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      category,
    };

    setMessages(prev => [...prev, initialAiMessage]);

    try {
      // Get AI response with streaming (Qwen service handles cleaning internally)
      let streamingContent = '';
      const response = await qwenService.sendMessage(content, messages, category, (chunk: string) => {
        // Hide loading indicator once streaming starts
        if (streamingContent === '') {
          setIsLoading(false);
        }
        // Accumulate streaming content
        streamingContent += chunk;
        
        // Update the message with the streaming content
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: streamingContent }
            : msg
        ));
      }, currentLanguage);
      
      // Ensure final message is set with the complete response
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, content: response }
          : msg
      ));
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Replace the initial AI message with error message
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { 
              ...msg, 
              content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment." 
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <ChatContainer>
      <MessagesContainer ref={messagesContainerRef}>
        {showWelcome ? (
          <EmptyState>
            <WelcomeMessage>
              <WelcomeTitle>{t.welcomeTitle}</WelcomeTitle>
              <WelcomeText>
                {t.welcomeDescription}
              </WelcomeText>
              
              <QuickActions>
                {quickActions.map((action, index) => (
                  <QuickActionCard
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </QuickActionCard>
                ))}
              </QuickActions>
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
      />
    </ChatContainer>
  );
};
