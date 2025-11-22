import React from 'react';
import styled from 'styled-components';
import { AboutContent } from './ContentModal';
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

const AboutPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  
  const seoTitle = currentLanguage === 'ar' 
    ? 'حول منصة مساعد التوعية المجتمعية بالذكاء الاصطناعي' 
    : 'About the AI Community Awareness Assistant Platform';
    
  const seoDescription = currentLanguage === 'ar'
    ? 'تعرف على مجتمع واعي، منصة مساعد التوعية المجتمعية المبتكرة التي تعمل بالذكاء الاصطناعي والمصممة خصيصًا للمجتمع البحريني. اكتشف خدماتنا ومجالات تركيزنا.'
    : 'Learn about Umoja-Aware, an innovative AI-powered community awareness assistant platform specifically designed for the Bahrain community. Discover our services and focus areas.';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords="Umoja-Aware, AI community awareness assistant, Bahrain services, community information platform, AI chat assistant, knowledge base, Bahrain community"
        canonicalUrl="https://umoja-aware.com/about"
      />
      <Container>
        <AboutContent />
      </Container>
    </>
  );
};

export default AboutPage;
