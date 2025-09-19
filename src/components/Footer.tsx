import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentModal, TermsContent, PrivacyContent, AboutContent } from './ContentModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px 20px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const QuickLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Footer: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<'about' | 'terms' | 'privacy' | null>(null);

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const getModalContent = () => {
    switch (activeModal) {
      case 'about':
        return { title: t.about, content: <AboutContent /> };
      case 'terms':
        return { title: t.terms, content: <TermsContent /> };
      case 'privacy':
        return { title: t.privacy, content: <PrivacyContent /> };
      default:
        return { title: '', content: null };
    }
  };

  const modalData = getModalContent();

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <Copyright>
            {t.copyright.replace('{year}', currentYear.toString())}
          </Copyright>
          
          <QuickLinks>
            <QuickLink onClick={() => setActiveModal('about')}>
              {t.about}
            </QuickLink>
            <QuickLink onClick={() => setActiveModal('terms')}>
              {t.terms}
            </QuickLink>
            <QuickLink onClick={() => setActiveModal('privacy')}>
              {t.privacy}
            </QuickLink>
          </QuickLinks>
        </FooterContent>
      </FooterContainer>
      
      <ContentModal
        show={activeModal !== null}
        onClose={handleCloseModal}
        title={modalData.title}
        content={modalData.content}
      />
    </>
  );
};
