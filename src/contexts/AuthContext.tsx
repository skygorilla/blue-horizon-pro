import { createContext, useContext, useState, useEffect } from 'react';
import { Session, User, AuthResponse } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Define the Profile interface
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar_url: string | null;
  updated_at?: string;
  available_roles: string[];
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  activeRole: string | null;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  setActiveRole: (role: string | null) => void;
  createProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };

    fetchSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });
  }, []);

  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else {
        setProfile(profileData as Profile);
        setActiveRole(profileData?.available_roles?.[0] || null);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, firstName?: string, lastName?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            firstName,
            lastName,
          },
        },
      });

      if (error) throw error;
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setProfile(null);
      setActiveRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) {
      console.error("User is null, cannot create profile");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ id: user.id, email: user.email, firstName: '', lastName: '', avatar_url: null, available_roles: ['owner'] }])
        .select()
        .single();

      if (error) {
        console.error("Error creating profile:", error);
      } else {
        setProfile(data as Profile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      console.error("User is null, cannot update profile");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        setProfile(data as Profile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    activeRole,
    isLoading,
    signUp,
    signIn,
    signOut,
    setActiveRole,
    createProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Loading auth...</div>}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
