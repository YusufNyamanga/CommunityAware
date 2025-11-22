import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookieOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: ${props => props.$show ? '20px' : '-300px'};
  left: 20px;
  right: 20px;
  max-width: 500px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: bottom 0.3s ease;
  
  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
    padding: 16px;
  }
`;

const CookieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CookieTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const CookieText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

const CookieActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const CookieButton = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$primary ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.$primary ? props.theme.colors.primary : props.theme.colors.border};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$primary ? props.theme.colors.primaryDark : props.theme.colors.primaryLight};
    color: white;
    border-color: ${props => props.$primary ? props.theme.colors.primaryDark : props.theme.colors.primaryLight};
  }
`;

const CookieLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const CookieConsent: React.FC = () => {
  const [showCookies, setShowCookies] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show cookie popup after 2 seconds
      const timer = setTimeout(() => {
        setShowCookies(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShowCookies(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setShowCookies(false);
  };

  const handleClose = () => {
    setShowCookies(false);
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacy');
  };

  if (!showCookies) return null;

  return (
    <CookieOverlay $show={showCookies}>
      <CookieHeader>
        <CookieTitle>
          🍪 Cookie Preferences
        </CookieTitle>
        <CloseButton onClick={handleClose} title="Close">
          <X />
        </CloseButton>
      </CookieHeader>
      
      <CookieText>
        We use essential cookies to run our site. Analytics, functional and personalization cookies
        are used only if you choose to accept all. You can manage preferences anytime. {' '}
        <CookieLink onClick={handlePrivacyPolicy}>
          Learn more in our Privacy Policy
        </CookieLink>
      </CookieText>
      
      <CookieActions>
        <CookieButton $primary onClick={handleAcceptAll}>
          Accept All Cookies
        </CookieButton>
        <CookieButton onClick={handleAcceptEssential}>
          Essential Only
        </CookieButton>
      </CookieActions>
    </CookieOverlay>
  );
};
