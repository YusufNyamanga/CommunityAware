import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const Container = styled.div`
  width: 100%;
  margin: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const Select = styled.select`
  padding: 8px 36px 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  appearance: none;
  width: 100%;
  
  /* Match language dropdown hover effect */
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight}10;
  }
  
  /* Remove default blue highlight on focus */
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SelectIcon = styled(ChevronDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

const Result = styled.div`
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Note = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-top: 8px;
`;

export const IndemnityCalculator: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [resignation, setResignation] = useState<'no' | 'yes'>('no');

  // Assumption (commonly referenced in GCC):
  // First 3 years: 0.5 month salary per year; thereon 1 month per year.
  // If resignation, reduce entitlement to 0.5 of above (varies by context).
  const calculateIndemnity = () => {
    const totalYears = Math.max(0, years) + Math.max(0, months) / 12;
    const firstYears = Math.min(totalYears, 3);
    const remainingYears = Math.max(totalYears - 3, 0);
    let monthsEquivalent = firstYears * 0.5 + remainingYears * 1.0;
    if (resignation === 'yes') monthsEquivalent *= 0.5;
    const amount = monthlySalary * monthsEquivalent;
    return { monthsEquivalent, amount };
  };

  const { monthsEquivalent, amount } = calculateIndemnity();

  return (
    <Container>
      <Title>Indemnity (End of Service) Calculator</Title>
      <Grid>
        <Field>
          Monthly Basic Salary (BHD)
          <Input type="number" value={monthlySalary} onChange={e => setMonthlySalary(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Years of Service
          <Input type="number" value={years} onChange={e => setYears(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Months of Service
          <Input type="number" min="0" max="11" value={months} onChange={e => setMonths(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Resignation
          <SelectContainer>
            <Select value={resignation} onChange={e => setResignation(e.target.value as 'no' | 'yes')}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Select>
            <SelectIcon />
          </SelectContainer>
        </Field>
      </Grid>
      <Result>
        <div>Months Equivalent: <strong>{monthsEquivalent.toFixed(2)} months</strong></div>
        <div>Estimated Indemnity: <strong>BHD {amount.toFixed(3)}</strong></div>
      </Result>
      <Note>
        This calculator uses commonly referenced EOS formulas. Actual entitlement depends on Bahrain Labour Law applicability, social insurance coverage, contract type, and specific circumstances. Please verify with HR/legal.
        
        If termination is for gross misconduct under Bahrain Labour Law, end‑of‑service and related benefits may be forfeited.
      </Note>
    </Container>
  );
};

export default IndemnityCalculator;