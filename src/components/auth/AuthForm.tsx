import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Lock, ShieldAlert } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  isLogin: boolean;
  submitting: boolean;
  onSubmit: (data: AuthFormValues) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, submitting, onSubmit }) => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const location = useLocation();
  
  // Check if this form is being used for admin login
  const isAdminLogin = location.pathname.includes('/admin') || 
                      new URLSearchParams(location.search).get('role') === 'admin';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-3 sm:space-y-4 ${isAdminLogin ? 'rim-light-container' : ''}`}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${isAdminLogin ? 'text-white' : ''}`}>
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="your.email@example.com" 
                  {...field} 
                  autoComplete="email"
                  type="email"
                  disabled={submitting}
                  className={`h-9 sm:h-10 text-xs sm:text-sm ${isAdminLogin ? 'admin-input' : 'bg-white'}`}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${isAdminLogin ? 'text-white' : ''}`}>
                <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
                Password
              </FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  {...field} 
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  disabled={submitting}
                  className={`h-9 sm:h-10 text-xs sm:text-sm ${isAdminLogin ? 'admin-input' : 'bg-white'}`}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className={`w-full h-9 sm:h-10 text-xs sm:text-sm ${isAdminLogin ? 'admin-button' : ''}`} 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              {isLogin ? 'Signing in...' : 'Signing up...'}
            </>
          ) : (
            <>
              {isAdminLogin && <ShieldAlert className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
              {isLogin ? 'Sign In' : 'Sign Up'}
            </>
          )}
        </Button>
        
        {isAdminLogin && (
          <div className="text-xs text-center text-blue-300 mt-2">
            Administrative access requires proper authorization
          </div>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
