import React from 'react';
import styled from 'styled-components';
import { TermsContent } from './ContentModal';
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

const TermsPage: React.FC = () => {
  return (
    <Container>
      <TermsContent />
    </Container>
  );
};

export default TermsPage;
