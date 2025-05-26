
import { useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import { UserRole, UserProfile } from '@/types/auth';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  activeRole: UserRole | null;
  setActiveRole: (role: UserRole | null) => void;
  setUser: (user: User | null) => void;
  userDisplayName: string | null;
  userProfile: UserProfile | null;
}

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    activeRole: null,
    setActiveRole: () => {},
    setUser: () => {},
    userDisplayName: null,
    userProfile: null,
  });

  useEffect(() => {
    logger.info('Setting up auth state listener', {
      component: 'useAuthState',
      tags: ['auth']
    });

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          // Handle specific auth errors more gracefully
          if (error.message.includes('refresh_token_not_found') || 
              error.message.includes('Invalid Refresh Token')) {
            logger.info('Refresh token not found, clearing session', {
              component: 'useAuthState',
              tags: ['auth']
            });
            // Clear any stored auth data
            await supabase.auth.signOut();
          } else {
            logger.error('Session fetch error', {
              component: 'useAuthState',
              error,
              tags: ['auth']
            });
          }
        }
        
        logger.info('Initial session fetched', {
          component: 'useAuthState', 
          details: { userId: session?.user?.id || 'null' },
          tags: ['auth']
        });
        setAuthState(prev => ({
          ...prev,
          session: session,
          user: session?.user ?? null,
          loading: false,
        }));
      } catch (error) {
        logger.error('Unexpected error getting session', {
          component: 'useAuthState',
          error,
          tags: ['auth']
        });
        setAuthState(prev => ({
          ...prev,
          session: null,
          user: null,
          loading: false,
        }));
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.info('Supabase auth event', {
          component: 'useAuthState',
          details: { event, userId: session?.user?.id || 'null' },
          tags: ['auth']
        });
        
        // Handle specific auth events
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          setAuthState(prev => ({
            ...prev,
            session: session,
            user: session?.user ?? null,
            loading: false,
          }));
        } else {
          setAuthState(prev => ({
            ...prev,
            session: session,
            user: session?.user ?? null,
            loading: false,
          }));
        }
      }
    );

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const setActiveRole = (role: UserRole | null) => {
    setAuthState(prev => ({ ...prev, activeRole: role }));
  };

  const setUser = (user: User | null) => {
    setAuthState(prev => ({ ...prev, user }));
  };

  return {
    ...authState,
    setActiveRole,
    setUser
  };
};
