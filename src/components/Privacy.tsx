import React from 'react';
import styled from 'styled-components';
import { PrivacyContent } from './ContentModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';
import { SEO } from './SEO';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const PrivacyPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  
  const seoTitle = currentLanguage === 'ar' 
    ? 'سياسة الخصوصية - مجتمع واعي' 
    : 'Privacy Policy - Umoja-Aware';
    
  const seoDescription = currentLanguage === 'ar'
    ? 'اقرأ سياسة الخصوصية الخاصة بمنصة مجتمع واعي. تعرف على كيفية جمعنا واستخدامنا وحماية لمعلوماتك الشخصية.'
    : 'Read the Privacy Policy for Umoja-Aware platform. Learn how we collect, use, and protect your personal information.';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords="privacy policy, data protection, personal information, Umoja-Aware privacy, Bahrain legal platform privacy"
        canonicalUrl="https://umoja-aware.com/privacy"
      />
      <Container>
        <PrivacyContent />
      </Container>
    </>
  );
};

export default PrivacyPage;
