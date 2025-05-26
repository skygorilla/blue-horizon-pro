import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthActions, UserRole } from '@/types/auth';

interface UseAuthActionsParams {
  setLoading: (loading: boolean) => void;
  setActiveRole: (role: UserRole | null) => void;
}

export function useAuthActions({ 
  setLoading, 
  setActiveRole 
}: UseAuthActionsParams): AuthActions {
  
  // Authentication methods
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
      return { success: true }; // Return success object instead of nothing
    } catch (error: unknown) {
      const message = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message: string }).message : 'Error signing in';
      toast.error(message);
      console.error('Sign in error:', error); // Log the error for debugging
      return { success: false, error }; // Return error object instead of throwing
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast.success('Signed up successfully. Please check your email for confirmation.');
      return { success: true }; // Return success object
    } catch (error: unknown) {
      const message = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message: string }).message : 'Error signing up';
      toast.error(message);
      console.error('Sign up error:', error); // Log the error for debugging
      return { success: false, error }; // Return error object instead of throwing
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setActiveRole(null);
      toast.success('Signed out successfully');
      return { success: true }; // Return success object
    } catch (error: unknown) {
      const message = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message: string }).message : 'Error signing out';
      toast.error(message);
      console.error('Sign out error:', error); // Log the error for debugging
      return { success: false, error }; // Return error object
    } finally {
      setLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent. Please check your inbox.');
      return { success: true }; // Return success object
    } catch (error: unknown) {
      const message = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message: string }).message : 'Error sending password reset email';
      toast.error(message);
      console.error('Reset password error:', error); // Log the error for debugging
      return { success: false, error }; // Return error object instead of throwing
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    setActiveRole
  };
}
