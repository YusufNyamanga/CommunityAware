import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send, Paperclip } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
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

const TextArea = styled.textarea`
  flex: 1;
  min-height: 50px;
  max-height: 120px;
  padding: 0.875rem 1rem;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AttachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  margin: 0.25rem 0.5rem 0.25rem 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary}10;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: ${({ disabled, theme }) => 
    disabled 
      ? theme.colors.textSecondary + '40'
      : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
  };
  color: ${({ theme }) => theme.isDark ? '#000' : '#fff'};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  /* Better touch target for mobile */
  min-width: 50px;
  min-height: 50px;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const CharacterCount = styled.span<{ isNearLimit: boolean }>`
  position: absolute;
  bottom: -1.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  color: ${({ isNearLimit, theme }) => 
    isNearLimit ? theme.colors.warning : theme.colors.textSecondary
  };
`;

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false,
  placeholder
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const maxLength = 1000;
  
  const defaultPlaceholder = placeholder || t.typeYourMessage;

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
        <TextArea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={defaultPlaceholder}
          disabled={isLoading}
        />
        <AttachButton 
          type="button"
          title="Attach files (Coming soon)"
          disabled
        >
          <Paperclip />
        </AttachButton>
        {message.length > 0 && (
          <CharacterCount isNearLimit={isNearLimit}>
            {message.length}/{maxLength}
          </CharacterCount>
        )}
      </InputWrapper>
      
      <SendButton 
        onClick={handleSubmit}
        disabled={!canSend}
        title={canSend ? t.send : t.typeYourMessage}
      >
        <Send />
      </SendButton>
    </InputContainer>
  );
};
