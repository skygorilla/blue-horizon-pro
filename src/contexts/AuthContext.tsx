
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  available_roles: string[];
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  activeRole: string | null;
  loading: boolean;
  setActiveRole: (role: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  const handleSetActiveRole = (role: string) => {
    if (profile?.available_roles.includes(role)) {
      setActiveRole(role);
      localStorage.setItem('activeRole', role);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setActiveRole(null);
    localStorage.removeItem('activeRole');
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then((profileData) => {
          setProfile(profileData);
          
          // Set active role from localStorage or default to first available role
          const savedRole = localStorage.getItem('activeRole');
          if (savedRole && profileData?.available_roles.includes(savedRole)) {
            setActiveRole(savedRole);
          } else if (profileData?.available_roles.length > 0) {
            setActiveRole(profileData.available_roles[0]);
          }
        });
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
          
          // Set active role from localStorage or default to first available role
          const savedRole = localStorage.getItem('activeRole');
          if (savedRole && profileData?.available_roles.includes(savedRole)) {
            setActiveRole(savedRole);
          } else if (profileData?.available_roles.length > 0) {
            setActiveRole(profileData.available_roles[0]);
          }
        } else {
          setProfile(null);
          setActiveRole(null);
          localStorage.removeItem('activeRole');
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    profile,
    activeRole,
    loading,
    setActiveRole: handleSetActiveRole,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
