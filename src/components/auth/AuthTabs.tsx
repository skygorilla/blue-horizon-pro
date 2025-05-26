import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AuthForm, { AuthFormValues } from './AuthForm';
import { useLocation } from 'react-router-dom';

interface AuthTabsProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  submitting: boolean;
  onSubmit: (data: AuthFormValues) => Promise<void>;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ 
  isLogin, 
  setIsLogin, 
  submitting, 
  onSubmit 
}) => {
  const location = useLocation();
  
  // Check if this form is being used for admin login
  const isAdminLogin = location.pathname.includes('/admin') || 
                      new URLSearchParams(location.search).get('role') === 'admin';
  
  return (
    <Tabs 
      value={isLogin ? 'login' : 'signup'} 
      onValueChange={(v) => setIsLogin(v === 'login')}
    >
      <TabsList className={`grid w-full grid-cols-2 mb-4 ${isAdminLogin ? 'bg-gray-800 border border-gray-700' : ''}`}>
        <TabsTrigger 
          value="login"
          className={isAdminLogin ? 'data-[state=active]:bg-blue-900 data-[state=active]:text-white' : ''}
        >
          Login
        </TabsTrigger>
        
        <TabsTrigger 
          value="signup" 
          disabled={isAdminLogin}
          className={isAdminLogin ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      
      <AuthForm 
        isLogin={isLogin} 
        submitting={submitting} 
        onSubmit={onSubmit} 
      />
      
      {!isAdminLogin && (
        <p className="text-center text-sm text-muted-foreground w-full mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button 
            variant="link" 
            className="p-0" 
            onClick={() => setIsLogin(!isLogin)}
            disabled={submitting}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </Button>
        </p>
      )}
    </Tabs>
  );
};

export default AuthTabs;
