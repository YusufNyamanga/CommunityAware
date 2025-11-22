import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../locales';

const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  direction: ltr;
`;

const SelectorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight}10;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const FlagText = styled.span`
  font-size: 1.1rem;
  margin-right: 4px;
`;

const DropdownOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  display: ${props => props.$show ? 'block' : 'none'};
  background: rgba(0, 0, 0, 0.3);
  
  /* Enhanced mobile overlay */
  @media (max-width: 768px) {
    z-index: 999998;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const DropdownMenu = styled.div<{ $show: boolean }>`
  position: fixed;
  width: 320px;
  max-width: calc(100vw - 20px);
  max-height: 60vh;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 99999; /* Much higher z-index to ensure it's above everything */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* momentum scrolling on iOS */
  touch-action: pan-y; /* allow finger scroll from any area */
  overscroll-behavior: contain; /* prevent background scroll chaining */
  display: ${props => props.$show ? 'block' : 'none'};
  margin-top: 0;
  direction: ltr;
  
  /* Mobile-specific positioning fixes */
  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    left: 10px;
    right: 10px;
    width: auto;
    max-width: none;
    bottom: 20px;
    transform: translateY(${props => props.$show ? '0' : '100%'});
    transition: transform 0.3s ease;
    z-index: 999999; /* Even higher for mobile */
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LanguageOption = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: ${props => props.$isSelected ? props.theme.colors.primary + '20' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
  direction: ltr;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const GroupHeader = styled.div`
  padding: 10px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const LanguageFlag = styled.span`
  font-size: 1.2rem;
  min-width: 24px;
`;

const LanguageInfo = styled.div`
  flex: 1;
  text-align: left;
  direction: ltr;
`;

const LanguageName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const NativeName = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`;

interface LanguageSelectorProps {
  showLabel?: boolean;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  showLabel = true, 
  compact = false 
}) => {
  const { currentLanguage, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{left: number; top: number}>({ left: 10, top: 80 });
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('recent_languages');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  });

  const currentLangInfo = SUPPORTED_LANGUAGES[currentLanguage];

  // Define language groups
  const PRIMARY: SupportedLanguage[] = ['en', 'zh'];
  const BETA: SupportedLanguage[] = ['ar', 'es', 'fr', 'pt', 'ru', 'tr', 'id', 'ms', 'th', 'hi'];
  const EXPERIMENTAL: SupportedLanguage[] = ['ur', 'bn', 'ta', 'te', 'ml', 'pa', 'ne', 'am', 'sw', 'lg', 'tl', 'om', 'pcm'];

  const matches = (code: SupportedLanguage) => {
    const info = SUPPORTED_LANGUAGES[code];
    const q = searchTerm.toLowerCase();
    return (
      info.name.toLowerCase().includes(q) ||
      info.nativeName.toLowerCase().includes(q) ||
      code.toLowerCase().includes(q)
    );
  };

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setIsOpen(false);
    setSearchTerm('');
    // Update recent languages
    const updated = [langCode, ...recent.filter(c => c !== langCode)].slice(0, 3);
    setRecent(updated);
    localStorage.setItem('recent_languages', JSON.stringify(updated));
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
      const rect = selectorRef.current?.getBoundingClientRect();
      const menuWidth = 320;
      const padding = 10;
      const desiredTop = (rect?.bottom || 80) + 8;
      let left = rect?.left || 10;
      const maxLeft = (window.innerWidth || 360) - menuWidth - padding;
      const minLeft = padding;
      left = Math.max(minLeft, Math.min(left, maxLeft));
      const menuHeight = Math.min((window.innerHeight || 600) * 0.6, 500);
      let top = desiredTop;
      if (top + menuHeight + padding > (window.innerHeight || 600)) {
        top = Math.max(padding, (rect?.top || 40) - menuHeight - 8);
      }
      top = Math.max(padding, Math.min(top, (window.innerHeight || 600) - menuHeight - padding));
      setMenuPos({ left, top });
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const rect = selectorRef.current?.getBoundingClientRect();
    const menuWidth = 320;
    const padding = 10;
    const desiredTop = (rect?.bottom || 80) + 8;
    let left = rect?.left || 10;
    const maxLeft = (window.innerWidth || 360) - menuWidth - padding;
    const minLeft = padding;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    const menuHeight = Math.min((window.innerHeight || 600) * 0.6, 500);
    let top = desiredTop;
    if (top + menuHeight + padding > (window.innerHeight || 600)) {
      top = Math.max(padding, (rect?.top || 40) - menuHeight - 8);
    }
    top = Math.max(padding, Math.min(top, (window.innerHeight || 600) - menuHeight - padding));
    setMenuPos({ left, top });
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SelectorContainer ref={selectorRef}>
      <SelectorButton onClick={handleToggle} title="Select Language">
        <Globe />
        {!compact && showLabel && <span>{currentLangInfo.nativeName}</span>}
        <ChevronDown style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }} />
      </SelectorButton>

      <DropdownOverlay $show={isOpen} onClick={() => setIsOpen(false)} />
      <DropdownMenu $show={isOpen} style={{ left: menuPos.left, top: menuPos.top }} aria-expanded={isOpen} role="listbox">
        <SearchInput
          type="text"
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {recent.length > 0 && (
          <div style={{ padding: '8px 12px', display: 'flex', gap: 8 }}>
            {recent.map(code => {
              const langCode = code as SupportedLanguage;
              const langInfo = SUPPORTED_LANGUAGES[langCode];
              if (!langInfo) return null;
              return (
                <button key={code} onClick={() => handleLanguageSelect(langCode)} style={{ border: '1px solid #ddd', borderRadius: 12, padding: '4px 8px', cursor: 'pointer' }}>
                  {langInfo.nativeName || code}
                </button>
              );
            })}
          </div>
        )}
        
        {/* Primary */}
        {PRIMARY.filter(matches).length > 0 && (
          <GroupHeader>Primary</GroupHeader>
        )}
        {PRIMARY.filter(matches).map(code => {
          const info = SUPPORTED_LANGUAGES[code];
          return (
            <LanguageOption
              key={code}
              $isSelected={code === currentLanguage}
              onClick={() => handleLanguageSelect(code)}
              aria-selected={code === currentLanguage}
            >
              <LanguageInfo>
                <LanguageName>{info.name}</LanguageName>
                <NativeName>{info.nativeName}</NativeName>
              </LanguageInfo>
            </LanguageOption>
          );
        })}

        {/* Beta */}
        {BETA.filter(matches).length > 0 && (
          <GroupHeader>Beta</GroupHeader>
        )}
        {BETA.filter(matches).map(code => {
          const info = SUPPORTED_LANGUAGES[code];
          return (
            <LanguageOption
              key={code}
              $isSelected={code === currentLanguage}
              onClick={() => handleLanguageSelect(code)}
              aria-selected={code === currentLanguage}
            >
              <LanguageInfo>
                <LanguageName>{info.name}</LanguageName>
                <NativeName>{info.nativeName}</NativeName>
              </LanguageInfo>
            </LanguageOption>
          );
        })}

        {/* Experimental */}
        {EXPERIMENTAL.filter(matches).length > 0 && (
          <GroupHeader>Experimental</GroupHeader>
        )}
        {EXPERIMENTAL.filter(matches).map(code => {
          const info = SUPPORTED_LANGUAGES[code];
          return (
            <LanguageOption
              key={code}
              $isSelected={code === currentLanguage}
              onClick={() => handleLanguageSelect(code)}
              aria-selected={code === currentLanguage}
            >
              <LanguageInfo>
                <LanguageName>{info.name}</LanguageName>
                <NativeName>{info.nativeName}</NativeName>
              </LanguageInfo>
            </LanguageOption>
          );
        })}
        
        {PRIMARY.filter(matches).length + BETA.filter(matches).length + EXPERIMENTAL.filter(matches).length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No languages found
          </div>
        )}
      </DropdownMenu>
    </SelectorContainer>
  );
};
