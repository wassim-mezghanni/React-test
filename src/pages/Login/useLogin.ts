import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_CREDENTIALS = {
  email: 'wassim@querai.com',
  password: 'querai123',
};

export function useLogin() {
  const navigate = useNavigate();
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

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    if (
      email === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password
    ) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }

    setLoading(false);
  };

  return { email, setEmail, password, setPassword, error, loading, handleLogin };
}
