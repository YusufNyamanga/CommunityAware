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

export const LeaveCalculator: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [monthsWorked, setMonthsWorked] = useState<number>(0);

  // Assumptions consistent with Bahrain practice:
  // Annual leave entitlement accrues at ~2.5 days/month (30 days/year).
  // Cash in lieu daily rate approximated as monthlySalary / 30.
  const entitlementDays = Math.min(30, monthsWorked * 2.5);
  const dailyRate = monthlySalary / 30;
  const cashInLieu = entitlementDays * dailyRate;

  return (
    <Container>
      <Title>Annual Leave Entitlement Calculator</Title>
      <Grid>
        <Field>
          Monthly Basic Salary (BHD)
          <Input type="number" value={monthlySalary} onChange={e => setMonthlySalary(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Months Worked in Leave Year
          <Input type="number" value={monthsWorked} onChange={e => setMonthsWorked(parseFloat(e.target.value) || 0)} />
        </Field>
      </Grid>
      <Result>
        <div>Accrued Leave Days: <strong>{entitlementDays.toFixed(2)} days</strong></div>
        <div>Daily Rate: <strong>BHD {dailyRate.toFixed(3)}</strong></div>
        <div>Cash in Lieu (if applicable): <strong>BHD {cashInLieu.toFixed(3)}</strong></div>
      </Result>
      <Note>
        Entitlements depend on contract, leave policy, and Bahrain Labour Law specifics. Confirm with HR/legal. Public holidays and sickness rules are separate.
      </Note>
    </Container>
  );
};

export default LeaveCalculator;