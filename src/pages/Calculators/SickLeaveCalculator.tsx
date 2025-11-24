import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  @media (max-width: 480px) {
    padding: 14px;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
  min-width: 0;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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

const Explanation = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const SickLeaveCalculator: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [sickDays, setSickDays] = useState<string>('');

  const days = Math.max(0, parseInt(sickDays || '0', 10));
  const dailyRate = parseFloat(monthlySalary || '0') / 30;
  const fullPayDays = Math.min(days, 15);
  const halfPayDays = Math.min(Math.max(days - 15, 0), 20);
  const unpaidDays = Math.min(Math.max(days - 35, 0), 20);
  const leaveSalary = fullPayDays * dailyRate + halfPayDays * dailyRate * 0.5;

  return (
    <Container>
      <Title>Sick Leave Calculator</Title>
      <Grid>
        <Field>
          Monthly Basic Salary (BHD)
          <Input type="number" value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} />
        </Field>
        <Field>
          Sick Leave Days Taken This Year
          <Input type="number" value={sickDays} onChange={e => setSickDays(e.target.value)} />
        </Field>
      </Grid>
      <Result>
        <div>Full Pay Days (100%): <strong>{fullPayDays}</strong></div>
        <div>Half Pay Days (50%): <strong>{halfPayDays}</strong></div>
        <div>Unpaid Days: <strong>{unpaidDays}</strong></div>
        <div>Leave Salary: <strong>BHD {leaveSalary.toFixed(3)}</strong></div>
      </Result>
      <Note>
        Under Bahrain Labour Law (Law No. 36 of 2012), sick leave entitlement per year is 15 days at full pay, next 20 days at half pay, and next 20 days unpaid, subject to medical certification and employer procedures.
      </Note>
      <Explanation>
        How sick leave is calculated:
        • Daily rate = monthlySalary ÷ 30.
        • Leave salary = (fullPayDays × dailyRate) + (halfPayDays × dailyRate × 0.5).
        • Entitlement sequence: 15 full‑pay days → 20 half‑pay days → 20 unpaid days.
      </Explanation>
    </Container>
  );
};

export default SickLeaveCalculator;