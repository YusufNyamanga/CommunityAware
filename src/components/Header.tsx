import React, { useState } from 'react';
import styled from 'styled-components';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';
import { LanguageSelector } from './LanguageSelector';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 85px;
  
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

const Logo = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  
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
  font-size: 2.5rem;
  line-height: 1.1;
  margin: 0;
  text-align: center;
  
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
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const TagLine = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
  margin: 0.5rem 0 0 0;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
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

const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MenuPanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-320px'};
  width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 300;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    width: 85vw;
    max-width: 280px;
    left: ${props => props.isOpen ? '0' : '-100vw'};
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

const MenuItem = styled.button`
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

type ActiveTab = 'chat' | 'knowledge' | 'community';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    // Reload the page to reset the chat
    window.location.reload();
  };

  const handleMenuItemClick = (tab: ActiveTab) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

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
          <Logo onClick={handleLogoClick}>
            <LogoText>Umoja Aware</LogoText>
          </Logo>
          <TagLine>AI Community Awareness Assistant</TagLine>
        </div>
        
        <Controls>
          <LanguageSelector />
          <ThemeToggle 
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun /> : <Moon />}
          </ThemeToggle>
        </Controls>
        
        {/* Invisible spacer to balance hamburger button on mobile */}
        <div style={{ width: '44px', height: '44px', visibility: 'hidden' }} className="mobile-only" />
      </HeaderContainer>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClick={closeMenu} />
      
      {/* Menu Panel */}
      <MenuPanel isOpen={isMenuOpen}>
        <MenuHeader>
          <MenuTitle>Navigation</MenuTitle>
          <CloseButton onClick={closeMenu}>
            <X />
          </CloseButton>
        </MenuHeader>
        
        <MenuContent>
          <MenuSection>
            <SectionTitle>Main Features</SectionTitle>
            <MenuItem onClick={() => handleMenuItemClick('chat')}>
              💬 {t.chat}
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('knowledge')}>
              📚 {t.knowledgeBase}
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('community')}>
              🌟 {t.community}
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
            <MenuItem onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'} {isDark ? 'Light Mode' : 'Dark Mode'}
            </MenuItem>
          </MenuSection>
          
          <MenuSection>
            <SectionTitle>Information</SectionTitle>
            <MenuItem onClick={closeMenu}>
              📖 About
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              📜 Terms of Service
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              🔒 Privacy Policy
            </MenuItem>
          </MenuSection>
        </MenuContent>
      </MenuPanel>
    </>
  );
};
