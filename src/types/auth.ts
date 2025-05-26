
import { Session, User } from '@supabase/supabase-js';

// Define all possible roles in the system
export type UserRole = 'captain' | 'chef' | 'hostess' | 'crew' | 'manager';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  available_roles: UserRole[];
}

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  activeRole: UserRole | null;
  userDisplayName: string | null;
  userProfile: UserProfile | null;
  // Add setter methods to the AuthState interface
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setActiveRole: (role: UserRole | null) => void;
}

export interface AuthResult {
  success: boolean;
  error?: unknown;
}

export interface AuthActions {
  setActiveRole: (role: UserRole | null) => void;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

export interface AuthContextType extends AuthState, AuthActions {}
