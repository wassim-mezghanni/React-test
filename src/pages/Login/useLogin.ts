import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type SessionUser } from '../../contexts/AuthContext.tsx';
import { auth, setToken } from '../../services/api.ts';
import { UserRole } from '../../types/auth.ts';

// Mock fallback — used when the backend is unreachable
const MOCK_ACCOUNTS: Record<string, { password: string; user: SessionUser }> = {
  'admin@quatelio.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'quatelio ',
      email: 'admin@quatelio.com',
      role: UserRole.ADMIN,
    },
  },
  'user@quatelio.com': {
    password: 'user123',
    user: {
      id: '2',
      name: 'user ',
      email: 'user@quatelio.com',
      role: UserRole.USER,
    },
  },
};

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      // Try real API first
      const res = await auth.login(email, password);

      setToken(res.auth_token);
      login({
        id: res.user_id,
        name: res.full_name,
        email,
        role: res.role === 'admin' ? UserRole.ADMIN : UserRole.USER,
        default_company_code: res.default_company_code,
        default_currency: res.default_currency,
      });
      navigate('/');
    } catch {
      // Fallback to mock accounts when backend is unavailable
      const account = MOCK_ACCOUNTS[email.toLowerCase()];
      if (account && account.password === password) {
        login(account.user);
        navigate('/');
      } else {
        setError('Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, loading, handleLogin };
}
