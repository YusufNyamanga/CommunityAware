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

const Info = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
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

export const OTCalculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [dayHours, setDayHours] = useState<number>(0);
  const [nightHours, setNightHours] = useState<number>(0);
  const [restDayHours, setRestDayHours] = useState<number>(0);

  // Typical multipliers used in the region (verify against company policy and law):
  const [dayMultiplier, setDayMultiplier] = useState<number>(1.25); // 125%
  const [nightMultiplier, setNightMultiplier] = useState<number>(1.50); // 150%
  const [restMultiplier, setRestMultiplier] = useState<number>(2.00); // 200%

  const dayOT = hourlyRate * dayHours * dayMultiplier;
  const nightOT = hourlyRate * nightHours * nightMultiplier;
  const restOT = hourlyRate * restDayHours * restMultiplier;
  const totalOT = dayOT + nightOT + restOT;

  return (
    <Container>
      <Title>Overtime (OT) Calculator</Title>
      <Info>
        Definitions (Bahrain Labour Law): Day OT hours are work performed between 7:00 AM and 7:00 PM; Night OT hours are work performed between 7:00 PM and 7:00 AM; Rest day OT refers to hours worked on the employee's weekly rest day (minimum 24 consecutive hours). Confirm exact policy with HR/legal.
      </Info>
      <Grid>
        <Field>
          Hourly Base Rate (BHD)
          <Input type="number" value={hourlyRate} onChange={e => setHourlyRate(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Day OT Hours (7:00 AM – 7:00 PM)
          <Input type="number" value={dayHours} onChange={e => setDayHours(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Night OT Hours (7:00 PM – 7:00 AM)
          <Input type="number" value={nightHours} onChange={e => setNightHours(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Rest Day OT Hours (weekly rest day)
          <Input type="number" value={restDayHours} onChange={e => setRestDayHours(parseFloat(e.target.value) || 0)} />
        </Field>
        <Field>
          Day OT Multiplier
          <Input type="number" step="0.01" value={dayMultiplier} onChange={e => setDayMultiplier(parseFloat(e.target.value) || 1)} />
        </Field>
        <Field>
          Night OT Multiplier
          <Input type="number" step="0.01" value={nightMultiplier} onChange={e => setNightMultiplier(parseFloat(e.target.value) || 1)} />
        </Field>
        <Field>
          Rest Day OT Multiplier
          <Input type="number" step="0.01" value={restMultiplier} onChange={e => setRestMultiplier(parseFloat(e.target.value) || 1)} />
        </Field>
      </Grid>
      <Result>
        <div>Day OT: <strong>BHD {dayOT.toFixed(3)}</strong></div>
        <div>Night OT: <strong>BHD {nightOT.toFixed(3)}</strong></div>
        <div>Rest Day OT: <strong>BHD {restOT.toFixed(3)}</strong></div>
        <div>Total OT Pay: <strong>BHD {totalOT.toFixed(3)}</strong></div>
      </Result>
      <Note>
        Overtime rates in Bahrain depend on timing, rest days, and applicable law/company policy. Verify multipliers with HR/legal.
      </Note>
    </Container>
  );
};

export default OTCalculator;