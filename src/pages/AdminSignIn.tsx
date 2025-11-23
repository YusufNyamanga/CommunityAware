import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  max-width: 420px;
  margin: 40px auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 8px;
`;

const AdminSignIn: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const authed = localStorage.getItem('admin_auth') === 'true';
    if (authed) navigate('/admin', { replace: true });
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = localStorage.getItem('admin_pin') || '0000';
    if (!username.trim()) {
      setError('Enter a username');
      return;
    }
    if (pin.trim() !== savedPin) {
      setError('Invalid PIN');
      return;
    }
    localStorage.setItem('admin_auth', 'true');
    localStorage.setItem('admin_user', username.trim());
    navigate('/admin', { replace: true });
  };

  return (
    <Container>
      <Title>Admin Sign In</Title>
      <form onSubmit={handleSubmit}>
        <Field>
          Username
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
        </Field>
        <Field>
          PIN
          <Input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="Enter PIN" />
        </Field>
        <Button type="submit">Sign In</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </form>
    </Container>
  );
};

export default AdminSignIn;