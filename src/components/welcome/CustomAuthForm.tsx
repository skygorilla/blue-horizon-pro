import React, { useState } from 'react';
import { useAuth } from '@/contexts/useAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

const CustomAuthForm: React.FC = () => {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    // Quick validation for invalid email format to satisfy tests
    if (!email.includes('@')) {
      toast.error('Invalid email');
      setLoading(false);
      return;
    }

    try {
      // Store rememberMe preference in localStorage before signing in
      if (rememberMe) {
        localStorage.setItem('blue_horizon_remember_me', 'true');
      } else {
        localStorage.removeItem('blue_horizon_remember_me');
      }
      
      await signIn(email, password);
      toast.success('Signed in successfully');
    } catch (error: unknown) {
      console.error('Authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      console.log('Error passed to toast.error:', errorMessage);
      console.log('Resolved toast.error:', toast.error);
      console.log('toast.error invoked with:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address to reset your password.');
      return;
    }

    try {
      await resetPassword(email);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error: unknown) {
      console.error('Password reset error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send password reset email';
      console.log('toast.error invoked with:', errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <motion.form 
        onSubmit={handleSubmit} 
        noValidate
        className="space-y-3 sm:space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="email" className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 sm:h-10 text-sm bg-white/60 backdrop-blur-sm border-maritime-sand focus:border-maritime-teal dark:bg-gray-700/50 dark:border-gray-600 dark:focus:border-maritime-sand dark:text-white"
          />
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="password" className="text-xs font-medium text-gray-700 dark:text-gray-300">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-9 sm:h-10 text-sm bg-white/60 backdrop-blur-sm border-maritime-sand focus:border-maritime-teal dark:bg-gray-700/50 dark:border-gray-600 dark:focus:border-maritime-sand dark:text-white"
          />
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-maritime-navy hover:bg-maritime-teal text-white mt-3 sm:mt-4 transition-colors h-9 sm:h-10 text-sm dark:bg-maritime-teal dark:hover:bg-maritime-gold dark:text-maritime-navy"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </motion.form>
      
      <div className="text-center mt-3 sm:mt-4 text-xs">
        <button 
          type="button" 
          onClick={handleForgotPassword} 
          className="text-maritime-teal hover:underline dark:text-maritime-sand/90 dark:hover:text-maritime-sand"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};

export default CustomAuthForm;
