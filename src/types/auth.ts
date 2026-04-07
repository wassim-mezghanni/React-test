export const UserRole = {
  ADMIN: 'ADMIN',   // Quatelio (Provider)
  USER: 'USER',     // Standard User
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const FeatureModule = {
  CHAT: 'chat',
  SELECTION: 'selection',
  TABLES: 'tables',
  LIBRARY: 'library',
  ANALYTICS: 'analytics',
  WORKFLOWS: 'workflows',
} as const;

export type FeatureModule = typeof FeatureModule[keyof typeof FeatureModule];

export interface UserPermissions {
  modules: FeatureModule[];
  actions: string[]; // e.g. ['export', 'delete_project']
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  permissions: UserPermissions;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
