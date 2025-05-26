import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const AdminRimLightLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.success) {
        // Redirect based on the 'redirect' query parameter or default to '/admin/dashboard'
        const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';
        navigate(redirectUrl);
      } else {
        toast.error(`Authentication failed: ${result.error}`);
      }
    } catch (error: any) {
      toast.error(`Authentication error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md admin-form-card rim-light-container">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex justify-center mb-3">
            <ShieldAlert className="h-10 w-10 text-blue-400" />
          </div>
          <CardTitle className="text-center text-white">Administrator Access</CardTitle>
          <CardDescription className="text-center text-blue-300">
            Enter your admin credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <div className="p-6">
          <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </div>
      </Card>
      <style>
        {`
          .rim-light-container {
            position: relative;
            border-radius: 12px;
            background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
            overflow: hidden;
          }
          
          .rim-light-container::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: conic-gradient(
              from 0deg,
              #00d4ff 0deg,
              #0099cc 90deg,
              #006699 180deg,
              #003366 270deg,
              #00d4ff 360deg
            );
            border-radius: 14px;
            z-index: -1;
            animation: rim-rotate 3s linear infinite;
          }
          
          @keyframes rim-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .admin-form-card {
            background: rgba(15, 20, 25, 0.95);
            border: 1px solid rgba(0, 212, 255, 0.3);
            backdrop-filter: blur(10px);
          }
          
          .admin-form-card .card-header {
            border-bottom: 1px solid rgba(0, 212, 255, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default AdminRimLightLogin;
