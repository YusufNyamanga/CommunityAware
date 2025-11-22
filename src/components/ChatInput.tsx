import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

interface ChatInputProps {
  onSendMessage: (message: string, category?: any) => void;
  isLoading?: boolean;
  placeholder?: string;
  ghostPlaceholder?: string;
}

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.primary}20;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
    gap: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary}20;
  border-radius: 24px;
  transition: border-color 0.3s ease;
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const GhostPlaceholder = styled.div<{ $rtl: boolean }>`
  position: absolute;
  left: ${({ $rtl }) => ($rtl ? 'auto' : '1rem')};
  right: ${({ $rtl }) => ($rtl ? '1rem' : 'auto')};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
  pointer-events: none;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: nowrap;
  z-index: 1;
  max-width: calc(100% - 4rem);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ $rtl }) => ($rtl ? 'right' : 'left')};
  direction: ${({ $rtl }) => ($rtl ? 'rtl' : 'ltr')};
  @media (max-width: 768px) {
    font-size: 0.85rem;
    max-width: calc(100% - 3.5rem);
  }
`;

const BarTop = styled.div`
  position: absolute;
  top: -2.25rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const SuggestionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;
`;

const SuggestionChip = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  height: 28px;
  padding: 0 10px;
  cursor: pointer;
  white-space: nowrap;
`;

const ClearButton = styled.button`
  height: 32px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 0.75rem;
`;

const HelperHint = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TextArea = styled.textarea<{ $rtl: boolean }>`
  flex: 1;
  min-height: 50px;
  max-height: 120px;
  padding: ${({ $rtl }) => $rtl ? '0.875rem 1rem 0.875rem 2.5rem' : '0.875rem 2.5rem 0.875rem 1rem'};
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
  transition: opacity 0.3s ease;
  position: relative;
  z-index: 0;
  text-align: ${({ $rtl }) => ($rtl ? 'right' : 'left')};
  direction: ${({ $rtl }) => ($rtl ? 'rtl' : 'ltr')};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.8;
    transition: opacity 0.3s ease;
    font-size: 0.95rem;
  }
  
  &:focus-visible {
    outline: none;
  }
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;


const SendButton = styled.button<{ $disabled: boolean; $rtl: boolean }>`
  position: absolute;
  right: ${({ $rtl }) => ($rtl ? 'auto' : '8px')};
  left: ${({ $rtl }) => ($rtl ? '8px' : 'auto')};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: ${({ $disabled, theme }) => 
    $disabled 
      ? theme.colors.textSecondary + '40'
      : theme.colors.primary
  };
  color: ${({ theme }) => (theme.isDark ? '#000' : '#fff')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease, transform 0.1s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const CharacterCount = styled.span<{ $isNearLimit: boolean }>`
  position: absolute;
  bottom: -1.5rem;
  right: 3.5rem;
  font-size: 0.75rem;
  color: ${({ $isNearLimit, theme }) => 
    $isNearLimit ? theme.colors.warning : theme.colors.textSecondary
  };
`;

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false,
  placeholder,
  ghostPlaceholder
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentLanguage, isRTL } = useLanguage();
  const t = useTranslations(currentLanguage);
  const maxLength = 1000;
  
  const defaultPlaceholder = placeholder ?? t.typeYourMessage;

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '50px';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [message]);

  const canSend = message.trim().length > 0 && !isLoading;
  const isNearLimit = message.length > maxLength * 0.8;

  return (
    <InputContainer>
      
      <InputWrapper>
        {message.length === 0 && ghostPlaceholder && (
          <GhostPlaceholder $rtl={isRTL}>{ghostPlaceholder}</GhostPlaceholder>
        )}
        <TextArea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={defaultPlaceholder}
          disabled={isLoading}
          $rtl={isRTL}
        />
        <SendButton 
          onClick={handleSubmit}
          $disabled={!canSend}
          $rtl={isRTL}
          disabled={!canSend}
          title={canSend ? t.send : t.typeYourMessage}
        >
          <ArrowUp />
        </SendButton>
        {message.length > 0 && (
          <CharacterCount $isNearLimit={isNearLimit}>
            {message.length}/{maxLength}
          </CharacterCount>
        )}
      </InputWrapper>
    </InputContainer>
  );
};
