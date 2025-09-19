import React, { useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { LanguageProvider } from './contexts/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { Chat } from './components/Chat';
import { KnowledgeBase } from './components/KnowledgeBase';
import CommunitySection from './components/CommunitySection';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ChatSection = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const KnowledgeSection = styled.section`
  flex: 1;
  min-width: 400px;
  max-width: 500px;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ToggleKnowledgeButton = styled.button`
  position: fixed;
  top: 80px;
  right: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.1);
  }
  
  @media (min-width: 1025px) {
    display: none;
  }
`;

const MobileKnowledgeOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.show ? '0' : '-100%'};
  width: 90%;
  max-width: 500px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  z-index: 1001;
  overflow-y: auto;
  transition: right 0.3s ease;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (min-width: 1025px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  z-index: 1002;
`;


const ContentArea = styled.div`
  flex: 1;
  overflow: hidden;
`;

type ActiveTab = 'chat' | 'knowledge' | 'community';

// Inner App component that has access to theme
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [showMobileKnowledge, setShowMobileKnowledge] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  
  const handlePostToCommunity = (question: string, answer: string, category?: any) => {
    const newPost = {
      id: Date.now().toString(),
      userId: 'ai-assistant',
      userName: 'AI Assistant',
      content: question,
      category: category || 'general-legal',
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      isAnonymous: false,
      tags: ['from-chat', 'ai-answered'],
      aiResponse: answer,
      aiResponseTimestamp: new Date()
    };
    
    setCommunityPosts(prev => [newPost, ...prev]);
    setActiveTab('community'); // Switch to community tab to show the posted question
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <Chat onPostToCommunity={handlePostToCommunity} />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'community':
        return <CommunitySection onClose={() => setActiveTab('chat')} additionalPosts={communityPosts} />;
      default:
        return <Chat onPostToCommunity={handlePostToCommunity} />;
    }
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <AppContainer>
        <Header 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <MainContent>
          <ContentArea>
            {renderContent()}
          </ContentArea>
          
          {/* Desktop sidebar - only show for desktop and only on chat tab */}
          {activeTab === 'chat' && (
            <KnowledgeSection>
              <KnowledgeBase />
            </KnowledgeSection>
          )}
        </MainContent>
        
        {/* Mobile Knowledge Base Toggle - only show on chat tab */}
        {activeTab === 'chat' && (
          <ToggleKnowledgeButton 
            onClick={() => setShowMobileKnowledge(true)}
            title="Open Knowledge Base"
          >
            📚
          </ToggleKnowledgeButton>
        )}
        
        {/* Mobile Knowledge Base Overlay */}
        <MobileKnowledgeOverlay show={showMobileKnowledge}>
          <CloseButton 
            onClick={() => setShowMobileKnowledge(false)}
            title="Close Knowledge Base"
          >
            ×
          </CloseButton>
          <KnowledgeBase />
        </MobileKnowledgeOverlay>
        
        <Footer />
        
        {/* Cookie Consent Popup */}
        <CookieConsent />
      </AppContainer>
    </StyledThemeProvider>
  );
};

// Main App component with providers
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
