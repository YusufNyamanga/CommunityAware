import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import IndemnityCalculator from './IndemnityCalculator';
import LeaveCalculator from './LeaveCalculator';
import OTCalculator from './OTCalculator';
import SickLeaveCalculator from './SickLeaveCalculator';

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.select`
  padding: 8px 36px 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  appearance: none;
  
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
  
  /* Style the dropdown options to match language dropdown */
  option {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    padding: 12px;
    font-size: 0.9rem;
  }
  
  /* Style the selected/highlighted option */
  option:checked {
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
  
  /* Hover effect for options */
  option:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const DropdownIcon = styled(ChevronDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

export const CalculatorsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSelected = (): 'indemnity' | 'leave' | 'ot' | 'sick' => {
    const parts = location.pathname.split('/').filter(Boolean);
    // path: /calculators or /calculators/<type>
    const type = parts[1];
    if (type === 'leave' || type === 'ot' || type === 'indemnity' || type === 'sick') return type as any;
    return 'indemnity';
  };

  const selected = getSelected();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as 'indemnity' | 'leave' | 'ot' | 'sick';
    navigate(`/calculators/${val}`, { replace: true });
  };

  return (
    <Wrapper>
      <Controls>
        <DropdownContainer>
          <Dropdown value={selected} onChange={handleChange} aria-label="Select calculator">
            <option value="indemnity">Indemnity</option>
            <option value="leave">Leave</option>
            <option value="ot">Overtime</option>
            <option value="sick">Sick Leave</option>
          </Dropdown>
          <DropdownIcon />
        </DropdownContainer>
      </Controls>
      <Routes>
        <Route path="" element={<Navigate to="indemnity" replace />} />
        <Route path="indemnity" element={<IndemnityCalculator />} />
        <Route path="leave" element={<LeaveCalculator />} />
        <Route path="ot" element={<OTCalculator />} />
        <Route path="sick" element={<SickLeaveCalculator />} />
        {/* Normalize any deep paths like /calculators/indemnity/leave */}
        <Route path="*" element={<Navigate to={selected} replace />} />
      </Routes>
    </Wrapper>
  );
};

export default CalculatorsPage;