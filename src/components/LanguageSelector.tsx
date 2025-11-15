import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../locales';

const SelectorContainer = styled.div<{ $isRTL: boolean }>`
  position: relative;
  display: inline-block;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
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

const DropdownMenu = styled.div<{ $show: boolean; $isRTL: boolean }>`
  position: absolute;
  top: 100%;
  ${props => props.$isRTL ? 'left: 0;' : 'right: 0;'}
  width: 280px;
  max-width: calc(100vw - 20px);
  max-height: 300px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 99999; /* Much higher z-index to ensure it's above everything */
  overflow-y: auto;
  display: ${props => props.$show ? 'block' : 'none'};
  margin-top: 4px;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  
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

const LanguageOption = styled.button<{ $isSelected: boolean; $isRTL: boolean }>`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: ${props => props.$isSelected ? props.theme.colors.primary + '20' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const LanguageFlag = styled.span`
  font-size: 1.2rem;
  min-width: 24px;
`;

const LanguageInfo = styled.div<{ $isRTL: boolean }>`
  flex: 1;
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
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

  const currentLangInfo = SUPPORTED_LANGUAGES[currentLanguage];

  // Filter languages based on search term
  const filteredLanguages = Object.entries(SUPPORTED_LANGUAGES).filter(([code, info]) =>
    info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    info.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

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
    <SelectorContainer ref={selectorRef} $isRTL={isRTL}>
      <SelectorButton onClick={handleToggle} title="Select Language">
        <Globe />
        {!compact && showLabel && <span>{currentLangInfo.nativeName}</span>}
        <ChevronDown style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }} />
      </SelectorButton>

      <DropdownOverlay $show={isOpen} onClick={() => setIsOpen(false)} />
      <DropdownMenu $show={isOpen} $isRTL={isRTL}>
        <SearchInput
          type="text"
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        
        {filteredLanguages.map(([code, info]) => (
          <LanguageOption
            key={code}
            $isSelected={code === currentLanguage}
                $isRTL={isRTL}
            onClick={() => handleLanguageSelect(code as SupportedLanguage)}
          >
            <LanguageInfo $isRTL={isRTL}>
              <LanguageName>{info.name}</LanguageName>
              <NativeName>{info.nativeName}</NativeName>
            </LanguageInfo>
          </LanguageOption>
        ))}
        
        {filteredLanguages.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No languages found
          </div>
        )}
      </DropdownMenu>
    </SelectorContainer>
  );
};
