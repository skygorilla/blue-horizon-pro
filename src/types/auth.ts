
import { Session, User } from '@supabase/supabase-js';

export type UserRole = 'captain' | 'chef' | 'hostess' | 'crew' | 'manager';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar_url: string | null;
  updated_at?: string;
  available_roles: UserRole[];
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: any }>;
  setActiveRole: (role: UserRole | null) => void;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  activeRole: UserRole | null;
  loading: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  setActiveRole: (role: UserRole | null) => void;
  resetPassword: (email: string) => Promise<any>;
  userDisplayName: string;
  userProfile: UserProfile | null;
  setLoading: (loading: boolean) => void;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
}
