import React, { useState } from 'react';
import styled from 'styled-components';
import { knowledgeBaseService } from '../services/knowledgeBaseService';
import { getKnowledgeCategories, getKnowledgeByCategory, KnowledgeBaseEntry } from '../data/knowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

const KnowledgeContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  margin: 0;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  padding: 8px 16px;
  margin: 4px 8px 4px 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.primaryLight};
    color: white;
  }
`;

const EntryCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const EntryTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const EntryContent = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const EntryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ArticleNumber = styled.span`
  background: ${props => props.theme.colors.primaryLight};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const ToggleButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const SummaryText = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-line;
`;

interface KnowledgeBaseProps {
  onTopicSelect?: (topic: string) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onTopicSelect }) => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetails, setShowDetails] = useState(true);
  const [entries, setEntries] = useState<KnowledgeBaseEntry[]>([]);

  const categories = ['all', ...getKnowledgeCategories()];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setEntries([]);
    } else {
      setEntries(getKnowledgeByCategory(category));
    }
  };

  const categoryDisplayNames: Record<string, string> = {
    'all': t.overview,
    'working-hours': t.workingHours,
    'overtime': t.overtime,
    'leave': t.leaveBenefits,
    'termination': t.termination,
    'employment': t.employment,
    'wages': t.wagesPayment,
    'disputes': t.disputes
  };

  return (
    <KnowledgeContainer>
      <Title>{t.knowledgeBaseTitle}</Title>
      
      <ToggleButton onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? t.hideDetails : t.showAvailableTopics}
      </ToggleButton>

      {!showDetails && (
        <SummaryText>
          {knowledgeBaseService.getLabourLawSummary()}
        </SummaryText>
      )}

      {showDetails && (
        <>
          <CategoryContainer>
            {categories.map(category => (
              <CategoryButton
                key={category}
                $active={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                {categoryDisplayNames[category] || category}
              </CategoryButton>
            ))}
          </CategoryContainer>

          {selectedCategory === 'all' && (
            <SummaryText>
              {t.selectCategoryMsg}
            </SummaryText>
          )}

          {entries.map(entry => (
            <EntryCard key={entry.id}>
              <EntryTitle>{entry.title}</EntryTitle>
              <EntryContent>{entry.content}</EntryContent>
              <EntryMeta>
                <div>
                  {entry.articleNumber && (
                    <ArticleNumber>{entry.articleNumber}</ArticleNumber>
                  )}
                </div>
                <div>{t.source}: {entry.source}</div>
              </EntryMeta>
            </EntryCard>
          ))}
        </>
      )}
    </KnowledgeContainer>
  );
};
