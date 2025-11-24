import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { HeaderWithRouter } from './components/HeaderWithRouter';
import { Chat } from './components/Chat';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { SEO } from './components/SEO';
import styled from 'styled-components';

const KnowledgeBase = lazy(() => import('./components/KnowledgeBase').then(m => ({ default: m.KnowledgeBase })));
const CommunitySection = lazy(() => import('./components/CommunitySection'));
const AboutPage = lazy(() => import('./components/About'));
const TermsPage = lazy(() => import('./components/Terms'));
const PrivacyPage = lazy(() => import('./components/Privacy'));
const SchoolsDirectoryPage = lazy(() => import('./pages/SchoolsDirectoryPage'));
const CalculatorsPage = lazy(() => import('./pages/Calculators/CalculatorsPage'));
const News = lazy(() => import('./components/News').then(m => ({ default: m.News })));
const ResignationLetterGenerator = lazy(() => import('./pages/ResignationLetterGenerator'));

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow-x: hidden;
  padding-top: var(--header-height);
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

const InstallBanner = styled.div<{ $show: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 5000;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  padding: 10px 14px;
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  gap: 12px;
  align-items: center;
  max-width: 90vw;
`;

const CloseBanner = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const InstallButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
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

const ChatSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;


const PageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const PageWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

type ActiveTab = 'chat' | 'knowledge' | 'community' | 'about' | 'terms' | 'privacy' | 'schools' | 'calculators' | 'news' | 'resignation';

// Main App component with routing
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [communityPosts, setCommunityPosts] = React.useState<any[]>([]);
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('chat');
  const [chatSessionId, setChatSessionId] = React.useState<string>(() => Date.now().toString());
  const navigate = useNavigate();
  const [installEvent, setInstallEvent] = React.useState<any>(null);
  const [showInstall, setShowInstall] = React.useState<boolean>(false);
  const [iosHint, setIosHint] = React.useState<string>('');
  
  
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

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

  

  React.useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroidOrDesktop = !isIOS;

    const handler = (e: any) => {
      e.preventDefault();
      setInstallEvent(e);
      setShowInstall(true);
      setIosHint('');
    };
    window.addEventListener('beforeinstallprompt', handler as any);

    if (isIOS && !isStandalone) {
      setIosHint('Install on iPhone: tap Share, then Add to Home Screen');
      setShowInstall(true);
    }

    // Optional SW registration for update auto-reload if present
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(reg => {
        reg.onupdatefound = () => {
          const iw = reg.installing;
          if (!iw) return;
          iw.addEventListener('statechange', () => {
            if (iw.state === 'installed' && navigator.serviceWorker.controller) {
              try { window.location.reload(); } catch {}
            }
          });
        };
      }).catch(() => {});
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as any);
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
    setActiveTab('community');
    navigate('/community');
  };

  // Main page component with chat and knowledge base
  const MainPage: React.FC = () => {
    const { currentLanguage } = useLanguage();
    
    const seoTitle = currentLanguage === 'ar' 
      ? 'مساعد التوعية المجتمعية بالذكاء الاصطناعي للمجتمع البحريني' 
      : 'AI Community Awareness Assistant for Bahrain';
      
    const seoDescription = currentLanguage === 'ar'
      ? 'احصل على معلومات وتوعية مجتمعية فورية باستخدام الذكاء الاصطناعي. قاعدة معرفية شاملة بقوانين البحرين، منتدى مجتمعي، ومعلومات موثوقة حول قانون العمل، التأشيرات، وتحديثات المجتمع.'
      : 'Get instant community awareness and information using AI. Comprehensive knowledge base of Bahrain laws, community forum, and reliable updates on labour law, visas, and local matters.';

    return (
      <>
        <SEO 
          title={seoTitle}
          description={seoDescription}
          keywords="Umoja-Aware, AI community awareness assistant, Bahrain services, labour law, visa assistance, community updates, knowledge base, AI chat assistant, Bahrain community"
          canonicalUrl="https://umoja-aware.com"
        />
        <MainContent>
          <ContentWithSidebar>
            <ChatSection>
              <Chat key={chatSessionId} sessionId={chatSessionId} onPostToCommunity={handlePostToCommunity} />
            </ChatSection>
          </ContentWithSidebar>
        </MainContent>
        
      </>
    );
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <AppContainer>
        
        <OfflineBanner $show={isOffline}>You are offline. Some features may be unavailable.</OfflineBanner>
        <InstallBanner $show={showInstall}>
          {iosHint ? (
            <>
              <span>{iosHint}</span>
              <CloseBanner onClick={() => { setShowInstall(false); setIosHint(''); }}>✖</CloseBanner>
            </>
          ) : (
            <>
              <span>Install the app for a native experience</span>
              <InstallButton onClick={async () => {
                try {
                  if (installEvent && typeof installEvent.prompt === 'function') {
                    installEvent.prompt();
                    const choice = await installEvent.userChoice;
                    setShowInstall(false);
                  }
                } catch {}
              }}>Install App</InstallButton>
              <CloseBanner onClick={() => setShowInstall(false)}>✖</CloseBanner>
            </>
          )}
        </InstallBanner>
        
        <Routes>
          <Route path="/" element={
            <>
              <HeaderWithRouter activeTab={activeTab} onTabChange={handleTabChange} onNewChat={() => setChatSessionId(Date.now().toString())} />
              <MainPage />
            </>
          } />
          
        <Route path="/about" element={
          <>
            <HeaderWithRouter activeTab="about" onTabChange={() => {}} />
            <PageContainer>
              <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                <AboutPage />
              </Suspense>
            </PageContainer>
          </>
        } />
          
        <Route path="/terms" element={
          <>
            <HeaderWithRouter activeTab="terms" onTabChange={() => {}} />
            <PageContainer>
              <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                <TermsPage />
              </Suspense>
            </PageContainer>
          </>
        } />
          
        <Route path="/privacy" element={
          <>
            <HeaderWithRouter activeTab="privacy" onTabChange={() => {}} />
            <PageContainer>
              <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                <PrivacyPage />
              </Suspense>
            </PageContainer>
          </>
        } />
        
          
          <Route path="/community" element={
            <>
              <HeaderWithRouter activeTab="community" onTabChange={handleTabChange} />
              <PageContainer>
                <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                  <CommunitySection onClose={() => {}} additionalPosts={communityPosts} />
                </Suspense>
              </PageContainer>
            </>
          } />
          
          <Route path="/knowledge" element={
            <>
              <HeaderWithRouter activeTab="knowledge" onTabChange={handleTabChange} />
              <PageContainer>
                <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                  <KnowledgeBase />
                </Suspense>
              </PageContainer>
              <Footer />
            </>
          } />
          
        <Route path="/schools-directory" element={
          <>
            <HeaderWithRouter activeTab="schools" onTabChange={() => {}} />
            <SchoolsDirectoryPage />
          </>
        } />
        <Route path="/calculators/*" element={
          <>
            <HeaderWithRouter activeTab="calculators" onTabChange={handleTabChange} />
            <PageContainer>
              <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}> 
                <CalculatorsPage />
              </Suspense>
            </PageContainer>
          </>
        } />
        <Route path="/news" element={
          <>
            <HeaderWithRouter activeTab="news" onTabChange={handleTabChange} />
            <PageContainer>
              <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                <News />
              </Suspense>
            </PageContainer>
          </>
        } />
        <Route path="/resignation-letter" element={
          <>
            <HeaderWithRouter activeTab="resignation" onTabChange={handleTabChange} />
            <PageContainer>
              <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
                <ResignationLetterGenerator />
              </Suspense>
            </PageContainer>
          </>
        } />
        <Route path="*" element={
          <>
            <HeaderWithRouter activeTab={activeTab} onTabChange={handleTabChange} />
            <PageContainer>
              <div style={{ padding: 20, fontWeight: 600 }}>404 — Page not found</div>
            </PageContainer>
          </>
        } />
        </Routes>
        
        <CookieConsent />
      </AppContainer>
    </StyledThemeProvider>
  );
};

// Main App component with providers and router
const AppWithRouter: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default AppWithRouter;
