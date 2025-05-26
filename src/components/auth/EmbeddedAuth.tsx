import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/useAuth'; // Corrected import path
import { useUISettings } from '@/contexts/useUISettings';
import AuthTabs from './AuthTabs';
import { AuthFormValues } from './AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EmbeddedAuth: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const { touchMode } = useUISettings();
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const onSubmit = async (data: AuthFormValues) => {
    try {
      setSubmitting(true);
      if (isLogin) {
        await signIn(data.email, data.password);
        toast.success('Signed in successfully');
      } else {
        await signUp(data.email, data.password);
        toast.success('Signed up successfully. Please check your email for confirmation.');
        // Switch back to login mode after successful signup
        setIsLogin(true);
      }
    } catch (error: unknown) { // Changed from any to unknown
      console.error('Authentication error:', error);
      const message = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message: string }).message : `Failed to ${isLogin ? 'sign in' : 'sign up'}`;
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardHeader className="pb-2 sm:pb-4">
        <div className="flex justify-center mb-1 sm:mb-2">
          <Anchor className="h-5 w-5 sm:h-6 sm:w-6 text-maritime-teal" />
        </div>
        <CardTitle className="text-lg sm:text-xl font-playfair font-semibold text-maritime-navy">
          Sign {isLogin ? 'In' : 'Up'}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {isLogin 
            ? "Enter your credentials to access your maritime planner" 
            : "Create an account to set sail with Sea Planer Pro"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthTabs
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          submitting={submitting}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default EmbeddedAuth;
