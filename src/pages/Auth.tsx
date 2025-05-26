import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import AuthTabs from '@/components/auth/AuthTabs';
import EmbeddedAuth from '@/components/auth/EmbeddedAuth';
import { AuthFormValues } from '@/components/auth/AuthForm';
import { ShieldAlert } from 'lucide-react';

const Auth = () => {
  const { user, loading } = useAuthState();
  const { signIn, signUp } = useAuthActions({
    setLoading: () => {},
    setActiveRole: () => {},
  });
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  
  // Check if we're in embedded mode (for the welcome page iframe)
  const isEmbedded = new URLSearchParams(location.search).get('embedded') === 'true';
  
  // Check if this is an admin login
  const isAdminLogin = location.pathname.includes('/admin') || 
                       new URLSearchParams(location.search).get('role') === 'admin';

  const onSubmit = async (data: AuthFormValues) => {
    try {
      setSubmitting(true);
      if (isLogin) {
        // Updated to use the new result pattern
        const result = await signIn(data.email, data.password);
        if (!result.success) {
          console.error('Sign in error:', result.error);
          const errorMessage = result.error instanceof Error ? (result.error as Error).message : 'Failed to sign in';
          toast.error(errorMessage);
        }
        // Toast is already shown in the signIn method
      } else {
        // Updated to use the new result pattern
        const result = await signUp(data.email, data.password);
        if (!result.success) {
          console.error('Sign up error:', result.error);
          const errorMessage = result.error instanceof Error ? (result.error as Error).message : 'Failed to sign up';
          toast.error(errorMessage);
        } else {
          // Set login to true on successful signup
          setIsLogin(true);
        }
        // Toast is already shown in the signUp method
      }
    } catch (error: unknown) {
      // This catch block should only run if there's an unexpected error
      console.error('Unexpected authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage || `Failed to ${isLogin ? 'sign in' : 'sign up'}`);
    } finally {
      setSubmitting(false);
    }
  };

  // If user is logged in and we're not in embedded mode, redirect to role selection
  if (user && !loading && !isEmbedded) {
    return <Navigate to="/role-select" />;
  }

  // In embedded mode, use the simplified version
  if (isEmbedded) {
    return <EmbeddedAuth />;
  }

  // Normal non-embedded view
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isAdminLogin ? 'bg-black' : 'bg-gray-100'}`}>
      <Card className={`w-full max-w-md ${isAdminLogin ? 'admin-form-card rim-light-container' : 'shadow-lg'}`}>
        <CardHeader className="space-y-1 pb-2">
          {isAdminLogin && (
            <div className="flex justify-center mb-3">
              <ShieldAlert className="h-10 w-10 text-blue-400" />
            </div>
          )}
          <CardTitle className={`text-center ${isAdminLogin ? 'text-white' : 'text-primary'}`}>
            {isAdminLogin ? 'Administrator Access' : 'Vessel Manager'}
          </CardTitle>
          <CardDescription className={`text-center ${isAdminLogin ? 'text-blue-300' : ''}`}>
            {isAdminLogin 
              ? "Enter your admin credentials to access the system"
              : "Enter your credentials to access the system"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <AuthTabs
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            submitting={submitting}
            onSubmit={onSubmit}
          />
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
};

export default Auth;
