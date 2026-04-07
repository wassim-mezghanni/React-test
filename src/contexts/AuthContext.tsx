import { createContext, useContext, useState, type ReactNode } from 'react';
import { UserRole } from '../types/auth.ts';
import { clearToken } from '../services/api.ts';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  default_company_code?: string;
  default_currency?: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  login: (user: SessionUser) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const stored = localStorage.getItem('querai_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (u: SessionUser) => {
    setUser(u);
    localStorage.setItem('querai_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === UserRole.ADMIN }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
