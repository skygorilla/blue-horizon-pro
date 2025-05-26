import { useAuth } from '@/contexts/useAuth';
import React, { ReactNode } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// Import Card components and Button
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// Import an icon
import { ShieldAlert } from 'lucide-react';

interface AuthRequiredProps {
  children: ReactNode;
  allowedRoles?: Array<'captain' | 'chef' | 'hostess' | 'crew' | 'manager'>;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({ children, allowedRoles }) => {
  const { user, activeRole, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Show loading indicator while authentication is in progress
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading authentication...</p>
      </div>
    );
  }

  // --- Redirect checks only after loading is complete --- 

  // If loading is finished and still no user, redirect to welcome page
  if (!user) {
    console.log("[AuthRequired] No user found after loading, redirecting to /");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Add logging to trace redirection for the chef role
  if (!activeRole && location.pathname !== '/role-select' && location.pathname !== '/select-role') {
    console.log("[AuthRequired] No active role found after loading, redirecting to /role-select");
    return <Navigate to="/role-select" replace state={{ from: location }} />;
  }

  // Debug log for activeRole
  console.log(`[AuthRequired] Current activeRole: ${activeRole}`);

  // Role permission check (only if allowedRoles are specified)
  if (allowedRoles && activeRole) {
    console.log(`[AuthRequired] Active role: ${activeRole}`);
    if (!allowedRoles.includes(activeRole)) {
      console.log(`[AuthRequired] Access denied. Role '${activeRole}' not in allowed roles: ${allowedRoles.join(', ')}`);
      // --- Access Denied Block ---
      // Reverted back to min-h-screen for viewport centering
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-light dark:bg-gray-900">
          <Card className="w-full max-w-md shadow-lg dark:bg-gray-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ShieldAlert className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-500">Access Denied</CardTitle>
              <CardDescription className="dark:text-gray-400">
                You don't have permission to access this page with your current role ({activeRole}).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                onClick={() => navigate('/role-select')}
                variant="destructive"
              >
                Return to Role Selection
              </Button>
            </CardContent>
          </Card>
        </div>
      );
      // --- End of Access Denied Block ---
    }
  }

  // If all checks pass, render the requested child component
  return <>{children}</>;
};

export default AuthRequired;
