import React, { useState } from 'react';
import styled from 'styled-components';
import { LegalCategory } from '../types';

const FormContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.4;
  resize: vertical;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLight}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
  margin: 12px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Checkbox = styled.input`
  accent-color: ${props => props.theme.colors.primary};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.$primary ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.$primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$primary ? 'white' : props.theme.colors.text};

  &:hover {
    background: ${props => props.$primary ? props.theme.colors.primaryDark : props.theme.colors.primaryLight};
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TagsInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

interface NewPostFormProps {
  onSubmit: (postData: {
    content: string;
    category: LegalCategory;
    tags: string[];
    isAnonymous: boolean;
  }) => void;
  onCancel: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<LegalCategory>('other');
  const [tagsInput, setTagsInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      content: content.trim(),
      category,
      tags,
      isAnonymous
    });

    // Reset form
    setContent('');
    setCategory('other');
    setTagsInput('');
    setIsAnonymous(false);
  };

  const categories: { value: LegalCategory; label: string }[] = [
    { value: 'labour-law', label: 'Labour Law' },
    { value: 'company-formation', label: 'Company Formation' },
    { value: 'visa-services', label: 'Visa Services' },
    { value: 'grace-period', label: 'Grace Period' },
    { value: 'lmra', label: 'LMRA' },
    { value: 'sijilat', label: 'Sijilat' },
    { value: 'general-legal', label: 'General Legal' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <FormContainer>
      <FormTitle>✍️ Share Your Question or Experience</FormTitle>
      
      <form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What would you like to ask or share with the community? Be as detailed as possible to get the best help..."
          required
        />
        
        <FormRow>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as LegalCategory)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
          
          <TagsInput
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Tags (comma separated, e.g: overtime, salary, contract)"
          />
        </FormRow>

        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Post anonymously
        </CheckboxContainer>

        <ButtonRow>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" $primary disabled={!content.trim()}>
            Post Question
          </Button>
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default NewPostForm;
