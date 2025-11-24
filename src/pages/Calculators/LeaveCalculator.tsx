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

export const LeaveCalculator: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [monthsWorked, setMonthsWorked] = useState<string>('');

  // Assumptions consistent with Bahrain practice:
  // Annual leave entitlement accrues at ~2.5 days/month (30 days/year).
  // Cash in lieu daily rate approximated as monthlySalary / 30.
  const entitlementDays = (parseInt(monthsWorked || '0', 10) * 2.5);
  const dailyRate = (parseFloat(monthlySalary || '0') / 30);
  const cashInLieu = entitlementDays * dailyRate;

  return (
    <Container>
      <Title>Annual Leave Entitlement Calculator</Title>
      <Grid>
        <Field>
          Monthly Basic Salary (BHD)
          <Input type="number" value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} />
        </Field>
        <Field>
          Months Worked in Leave Year
          <Input type="number" value={monthsWorked} onChange={e => setMonthsWorked(e.target.value)} />
        </Field>
      </Grid>
      <Result>
        <div>Accrued Leave Days: <strong>{entitlementDays.toFixed(2)} days</strong></div>
        <div>Daily Rate: <strong>BHD {dailyRate.toFixed(3)}</strong></div>
        <div>Leave Salary: <strong>BHD {cashInLieu.toFixed(3)}</strong></div>
      </Result>
      <Note>
        Under Bahrain Labour Law (Law No. 36 of 2012), annual leave is not less than 30 calendar days per year and is pro‑rated at 2.5 days per month of service. Confirm exact application with HR/legal; public holidays and sickness rules are separate.
      </Note>
      <Explanation>
        How leave is calculated:
        • Accrued leave days = monthsWorked × 2.5.
        • Daily rate = monthlySalary ÷ 30.
        • Leave salary = accrued leave days × daily rate.
        This reflects the statutory 30‑day entitlement and monthly pro‑rata accrual under Bahrain Labour Law.
      </Explanation>
    </Container>
  );
};

export default LeaveCalculator;