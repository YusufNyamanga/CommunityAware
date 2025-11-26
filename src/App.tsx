import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { LanguageProvider } from './contexts/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { Chat } from './components/Chat';
const KnowledgeBase = lazy(() => import('./components/KnowledgeBase').then(m => ({ default: m.KnowledgeBase })));
const CommunitySection = lazy(() => import('./components/CommunitySection'));
const AboutPage = lazy(() => import('./components/About'));
const TermsPage = lazy(() => import('./components/Terms'));
const PrivacyPage = lazy(() => import('./components/Privacy'));
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

const OfflineBanner = styled.div<{ $show: boolean }>`
  position: sticky;
  top: 0;
  z-index: 2000;
  background: ${({ theme }) => theme.colors.warning};
  color: #000;
  padding: 8px 12px;
  text-align: center;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ContentWithSidebar = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarSection = styled.section`
  flex: 0 0 400px;
  max-width: 400px;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  
  @media (max-width: 1280px) {
    display: none;
  }
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



const ContentArea = styled.div`
  flex: 1;
  overflow: hidden;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 12px;
  }
  @media (max-width: 480px) {
    padding: 10px 8px;
  }
`;

type ActiveTab = 'chat' | 'knowledge' | 'community' | 'about' | 'terms' | 'privacy';

// Inner App component that has access to theme
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [chatSessionId, setChatSessionId] = useState<string>(() => Date.now().toString());
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  React.useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);
  
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
    // Keep chat visible; user can navigate to Community manually
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <Chat key={chatSessionId} sessionId={chatSessionId} onPostToCommunity={handlePostToCommunity} />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'community':
        return <CommunitySection onClose={() => setActiveTab('chat')} additionalPosts={communityPosts} />;
      case 'about':
        return <AboutPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <Chat onPostToCommunity={handlePostToCommunity} />;
    }
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <AppContainer>
        <OfflineBanner $show={isOffline}>You are offline. Some features may be unavailable.</OfflineBanner>
        <Header 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onNewChat={() => setChatSessionId(Date.now().toString())}
        />

        <MainContent>
          <ContentArea>
            <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
              <PageContainer>
                {renderContent()}
              </PageContainer>
            </Suspense>
          </ContentArea>
        </MainContent>
        
        
        
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
