
import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserRole, UserProfile } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';
import debounce from 'lodash.debounce';
import { Session, User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use local state for action-related loading
  const [actionLoading, setActionLoading] = useState(false);

  const { 
    session, 
    user,
    loading: authStateLoading,
    activeRole, setActiveRole,
    setUser,
    userDisplayName, userProfile
  } = useAuthState();

  // Update global logger context when user changes
  useEffect(() => {
    if (user) {
      logger.setGlobalContext({
        user: user.email || user.id,
        userId: user.id,
        userRole: activeRole,
      });
      logger.info('User authenticated', {
        component: 'AuthContext',
        tags: ['auth', 'session-start'],
        details: {
          email: user.email,
          id: user.id,
          role: activeRole,
        }
      });
    } else if (!authStateLoading) {
      // Only log when loading is complete to avoid spurious logout events during initialization
      logger.setGlobalContext({
        user: null,
        userId: null,
        userRole: null,
      });
      logger.info('User signed out or session expired', {
        component: 'AuthContext',
        tags: ['auth', 'session-end']
      });
    }
  }, [user, activeRole, authStateLoading]);

  const { signIn, signUp, signOut, resetPassword } = useAuthActions({ 
    setLoading: setActionLoading,
    setActiveRole 
  });

  // Enhanced versions of auth actions with logging
  const enhancedSignIn = async (email: string, password: string) => {
    logger.info('Sign in attempt', { 
      component: 'AuthContext', 
      tags: ['auth', 'sign-in-attempt'],
      details: { email } 
    });
    
    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        logger.info('Sign in successful', { 
          component: 'AuthContext', 
          tags: ['auth', 'sign-in-success'],
          details: { email } 
        });
      } else {
        logger.warn('Sign in failed', { 
          component: 'AuthContext', 
          tags: ['auth', 'sign-in-failure'],
          details: { 
            email,
            error: result.error 
          } 
        });
      }
      
      return result;
    } catch (error) {
      logger.error('Sign in error', { 
        component: 'AuthContext', 
        tags: ['auth', 'sign-in-error'],
        error,
        details: { email } 
      });
      throw error;
    }
  };

  const enhancedSignOut = async () => {
    logger.info('Sign out attempt', { 
      component: 'AuthContext', 
      tags: ['auth', 'sign-out-attempt'] 
    });
    
    try {
      const result = await signOut();
      
      if (result.success) {
        logger.info('Sign out successful', { 
          component: 'AuthContext', 
          tags: ['auth', 'sign-out-success'] 
        });
      } else {
        logger.warn('Sign out failed', { 
          component: 'AuthContext', 
          tags: ['auth', 'sign-out-failure'],
          details: { error: result.error } 
        });
      }
      
      return result;
    } catch (error) {
      logger.error('Sign out error', { 
        component: 'AuthContext', 
        tags: ['auth', 'sign-out-error'],
        error 
      });
      throw error;
    }
  };

  const debouncedSaveRole = debounce((role) => {
    if (role) {
      localStorage.setItem('seaplaner_active_role', role);
      logger.debug('Active role saved to localStorage', { 
        component: 'AuthContext',
        details: { role } 
      });
    } else {
      localStorage.removeItem('seaplaner_active_role');
      logger.debug('Active role removed from localStorage', { 
        component: 'AuthContext' 
      });
    }
  }, 300);

  useEffect(() => {
    debouncedSaveRole(activeRole);
  }, [activeRole, debouncedSaveRole]);

  const loading = authStateLoading || actionLoading;
  
  const value: AuthContextType = {
    session,
    setSession: () => console.warn("setSession should be managed within useAuthState"),
    user,
    setUser,
    loading,
    setLoading: setActionLoading,
    activeRole,
    setActiveRole: (role) => {
      logger.info('Role changed', { 
        component: 'AuthContext',
        details: { previousRole: activeRole, newRole: role },
        tags: ['auth', 'role-change']
      });
      setActiveRole(role);
    },
    signIn: enhancedSignIn,
    signUp,
    signOut: enhancedSignOut,
    resetPassword,
    userDisplayName,
    userProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export type { UserRole };
export { type UserProfile } from '@/types/auth';
export { AuthContext };
