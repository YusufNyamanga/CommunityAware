import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Download, Plus } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';
import { LanguageSelector } from './LanguageSelector';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface}CC, ${({ theme }) => theme.colors.surface}99);
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  min-height: 85px;
  padding-top: env(safe-area-inset-top);
  
  /* Extra large screens get even more padding */
  @media (min-width: 1400px) {
    padding: 2rem 4rem;
    min-height: 95px;
  }
  
  /* Large screens */
  @media (min-width: 1200px) and (max-width: 1399px) {
    padding: 1.75rem 3.5rem;
    min-height: 90px;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    min-height: 60px;
    /* On mobile, only show hamburger and logo */
    justify-content: space-between;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    min-height: 55px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-decoration: none;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const LogoText = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 2.3rem;
  line-height: 1.1;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  
  /* Extra large screens get bigger logo */
  @media (min-width: 1400px) {
    font-size: 2.8rem;
  }
  
  /* Large screens */
  @media (min-width: 1200px) and (max-width: 1399px) {
    font-size: 2.6rem;
  }
  
  /* Mobile screens - larger since no tagline */
  @media (max-width: 768px) {
    font-size: 1.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const TagLine = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
  margin: 0.5rem 0 0 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  /* Extra large screens get even more spacing */
  @media (min-width: 1400px) {
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
    transform: translateY(-1px);
  }

  svg { width: 18px; height: 18px; }
`;

const MobileActions = styled.div`
  width: 44px;
  height: 44px;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const InstallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
    transform: translateY(-1px);
  }

  svg { width: 18px; height: 18px; }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;


const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-left: env(safe-area-inset-left);
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: scale(1.05);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MenuPanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${props => props.$isOpen ? '0' : '-320px'};
  width: 300px;
  height: 100dvh;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 6000;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  direction: ltr;
  text-align: left;
  
  @media (max-width: 480px) {
    width: 85vw;
    max-width: 280px;
    left: ${props => props.$isOpen ? '0' : '-100vw'};
  }
`;

const MenuHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  
  @media (max-width: 480px) {
    padding: 15px;
    min-height: 55px;
  }
`;

const MenuTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const MenuContent = styled.div`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  direction: ltr;
  text-align: left;
  
  @media (max-width: 480px) {
    padding: 15px 0;
  }
`;

const MenuSection = styled.div`
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    margin-bottom: 25px;
  }
`;

const SectionTitle = styled.h4`
  margin: 0 0 12px 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuItem = styled(Link)`
  width: 100%;
  padding: 12px 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight}20;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &.active {
    background-color: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const MenuButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight}20;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

type ActiveTab = 'chat' | 'knowledge' | 'community' | 'about' | 'terms' | 'privacy' | 'schools' | 'calculators' | 'news' | 'resignation';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onNewChat?: () => void;
}

export const HeaderWithRouter: React.FC<HeaderProps> = ({ activeTab, onTabChange, onNewChat }) => {
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNewChat = () => {
    onNewChat?.();
    if (location.pathname !== '/') navigate('/');
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (tab: ActiveTab) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const getPathForTab = (tab: ActiveTab): string => {
    switch (tab) {
      case 'chat': return '/';
      case 'knowledge': return '/knowledge';
      case 'community': return '/community';
      case 'schools': return '/schools-directory';
      case 'resignation': return '/resignation-letter';
      default: return '/';
    }
  };

  const getTabFromPath = (path: string): ActiveTab => {
    if (path === '/') return 'chat';
    if (path.startsWith('/knowledge')) return 'knowledge';
    if (path.startsWith('/community')) return 'community';
    if (path.startsWith('/schools-directory')) return 'schools';
    if (path.startsWith('/calculators')) return 'calculators';
    if (path.startsWith('/news')) return 'news';
    if (path.startsWith('/resignation-letter')) return 'resignation';
    return 'chat';
  };

  const currentPathTab = getTabFromPath(location.pathname);

  React.useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const isStandalone = React.useMemo(() => {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || (navigator as any).standalone === true;
  }, []);

  const handleInstall = async () => {
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isiOS) {
      alert('On iPhone/iPad: open in Safari, tap Share, then "Add to Home Screen" to install the app.');
      setShowInstall(false);
      return;
    }
    if (!installPromptEvent) {
      alert('Install prompt is not available yet. Visit over HTTPS in Chrome/Edge and try again.');
      setShowInstall(false);
      return;
    }
    installPromptEvent.prompt();
    await installPromptEvent.userChoice;
    setInstallPromptEvent(null);
    setShowInstall(false);
  };

  return (
    <>
      <HeaderContainer>
        <HamburgerButton 
          onClick={() => setIsMenuOpen(true)}
          title="Open menu"
        >
          <Menu />
        </HamburgerButton>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <Logo to="/" onClick={handleLogoClick}>
            <LogoText>Umoja-Aware</LogoText>
          </Logo>
          <TagLine>AI Community Awareness Assistant</TagLine>
        </div>
        
        <Controls>
          <NewChatButton onClick={handleNewChat} title="New chat" aria-label="New chat">
            <Plus />
          </NewChatButton>
          <ThemeToggle 
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun /> : <Moon />}
          </ThemeToggle>
        </Controls>
        <MobileActions>
          <NewChatButton onClick={handleNewChat} title="New chat" aria-label="New chat">
            <Plus />
          </NewChatButton>
        </MobileActions>
      </HeaderContainer>

      {/* Menu Overlay */}
      <MenuOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
      
      {/* Menu Panel */}
      <MenuPanel $isOpen={isMenuOpen}>
        <MenuHeader>
          <MenuTitle>Navigation</MenuTitle>
          <CloseButton onClick={closeMenu}>
            <X />
          </CloseButton>
        </MenuHeader>
        
        <MenuContent>
          <MenuSection>
            <SectionTitle>Main Features</SectionTitle>
            <MenuItem 
              to="/" 
              className={currentPathTab === 'chat' ? 'active' : ''}
              onClick={closeMenu}
            >
              💬 {t.chat}
            </MenuItem>
            <MenuItem 
              to="/news" 
              className={currentPathTab === 'news' ? 'active' : ''}
              onClick={closeMenu}
            >
              📰 News
            </MenuItem>
            <MenuItem 
              to="/community" 
              className={currentPathTab === 'community' ? 'active' : ''}
              onClick={closeMenu}
            >
              👨‍👩‍👧 {t.community}
            </MenuItem>
            <MenuItem 
              to="/calculators" 
              className={currentPathTab === 'calculators' ? 'active' : ''}
              onClick={closeMenu}
            >
              🧮 Calculators
            </MenuItem>
            <MenuItem 
              to="/knowledge" 
              className={currentPathTab === 'knowledge' ? 'active' : ''}
              onClick={closeMenu}
            >
              📚 {t.knowledgeBase}
            </MenuItem>
            <MenuItem 
              to="/resignation-letter" 
              className={currentPathTab === 'resignation' ? 'active' : ''}
              onClick={closeMenu}
            >
              📝 Letter Generator
            </MenuItem>
            <MenuItem 
              to="/schools-directory" 
              className={currentPathTab === 'schools' ? 'active' : ''}
              onClick={closeMenu}
            >
              🏫 Schools Directory
            </MenuItem>
          </MenuSection>
          <MenuSection>
            <SectionTitle>Language</SectionTitle>
            <div style={{ padding: '12px 20px' }}>
              <LanguageSelector />
            </div>
          </MenuSection>
          
          <MenuSection>
            <SectionTitle>Settings</SectionTitle>
            <MenuButton onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'} {isDark ? 'Light Mode' : 'Dark Mode'}
            </MenuButton>
          </MenuSection>
          
          <MenuSection>
            <SectionTitle>Information</SectionTitle>
            <MenuItem 
              to="/about" 
              className={currentPathTab === 'about' ? 'active' : ''}
              onClick={closeMenu}
            >
              📖 {t.about}
            </MenuItem>
            <MenuItem 
              to="/terms" 
              className={currentPathTab === 'terms' ? 'active' : ''}
              onClick={closeMenu}
            >
              📜 {t.terms}
            </MenuItem>
            <MenuItem 
              to="/privacy" 
              className={currentPathTab === 'privacy' ? 'active' : ''}
              onClick={closeMenu}
            >
              🔒 {t.privacy}
            </MenuItem>
          </MenuSection>

        </MenuContent>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(0,0,0,0.1)', color: '#888', fontSize: '0.8rem' }}>
          {t.copyright.replace('{year}', new Date().getFullYear().toString())}
        </div>
      </MenuPanel>
      {!isStandalone && showInstall && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 400 }} onClick={() => setShowInstall(false)}>
          <div style={{ maxWidth: 420, margin: '15vh auto', background: 'var(--surface, #1a1a1a)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: 0, color: 'inherit' }}>Install App</h3>
            <p style={{ color: 'inherit', opacity: 0.8 }}>Install Umoja‑Aware to your device for a native experience.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 }}>
              <button onClick={() => setShowInstall(false)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'inherit' }}>Cancel</button>
              <button onClick={handleInstall} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#FF8C00', color: '#000' }}>Install</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};