import { UserRole } from '../types/auth.ts';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastSeen: string;
}

export const mockUsers: AuthUser[] = [
  {
    id: '1',
    name: 'Wassim Mezghanni',
    email: 'wassim@quatelio.com',
    role: UserRole.ADMIN,
    status: 'active',
    lastSeen: '2 minutes ago',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@quatelio.com',
    role: UserRole.ADMIN,
    status: 'active',
    lastSeen: '1 hour ago',
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'smith@querai.com',
    role: UserRole.USER,
    status: 'active',
    lastSeen: '3 days ago',
  },
  {
    id: '4',
    name: 'Sarah Connor',
    email: 'sarah@querai.com',
    role: UserRole.USER,
    status: 'inactive',
    lastSeen: '2 weeks ago',
  },
];
