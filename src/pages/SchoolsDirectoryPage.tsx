import React from 'react';
import styled from 'styled-components';
import SchoolsTable from '../components/SchoolsTable';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 40px 20px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const DirectoryCard = styled.div`
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const InfoSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 18px 0 8px 0;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 10px 0;
`;

const List = styled.ul`
  margin: 8px 0 12px 18px;
`;

const Item = styled.li`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 4px 0;
`;

const SchoolsDirectoryPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  return (
    <>
      <SEO 
        title="Major Expatriate Schools in Bahrain - Complete Directory"
        description="Comprehensive directory of 17 major international schools in Bahrain with contact details, curriculum information, and admission guidance for expatriate families."
        keywords="expatriate schools Bahrain, international schools, British schools, American schools, Indian CBSE schools, school admissions, contact information"
        canonicalUrl="/schools-directory"
      />
      <PageWrapper>
        <DirectoryCard>
          <InfoSection>
            <SectionTitle>{t.schoolingInfoTitle || t.educationSchooling}</SectionTitle>
            <Paragraph>{t.schoolingOverviewText}</Paragraph>

            <SubTitle>{t.schoolRegistrationTitle}</SubTitle>
            <Paragraph>{t.schoolRegistrationText}</Paragraph>
            <List>
              <Item>{t.schoolRegistrationItem1}</Item>
              <Item>{t.schoolRegistrationItem2}</Item>
              <Item>{t.schoolRegistrationItem3}</Item>
              <Item>{t.schoolRegistrationItem4}</Item>
              <Item>{t.schoolRegistrationItem5}</Item>
              <Item>{t.schoolRegistrationItem6}</Item>
            </List>
            <SubTitle>{t.schoolCalendarTitle}</SubTitle>
            <Paragraph>{t.schoolCalendarText}</Paragraph>

            <SubTitle>{t.schoolHolidaysTitle}</SubTitle>
            <List>
              <Item>{t.schoolHolidayItem1}</Item>
              <Item>{t.schoolHolidayItem2}</Item>
              <Item>{t.schoolHolidayItem3}</Item>
            </List>
            <SubTitle>{t.familyConsiderationsTitle}</SubTitle>
            <List>
              <Item>{t.familyConsiderationItem1}</Item>
              <Item>{t.familyConsiderationItem2}</Item>
              <Item>{t.familyConsiderationItem3}</Item>
              <Item>{t.familyConsiderationItem4}</Item>
              <Item>{t.familyConsiderationItem5}</Item>
            </List>
          </InfoSection>
          <SchoolsTable />
        </DirectoryCard>
      </PageWrapper>
    </>
  );
};

export default SchoolsDirectoryPage;