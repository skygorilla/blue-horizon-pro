import PinVerification from '@/components/auth/PinVerification';
import LoadingScreen from '@/components/welcome/LoadingScreen';
import RoleGrid from '@/components/welcome/RoleGrid';
import RoleSelectHeader from '@/components/welcome/RoleSelectHeader';
import RoleSelectLayout from '@/components/welcome/RoleSelectLayout';
import { getRoleData } from '@/components/welcome/roleData';
import { useAuth } from '@/contexts/useAuth';
import { UserRole } from '@/types/auth';
import { useEffect, useRef, useState } from 'react'; // Add useEffect, useRef
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RoleSelect = () => {
  const { user, loading, activeRole, setActiveRole, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPinVerification, setShowPinVerification] = useState(false);
  const pinVerificationWasActive = useRef(false); // Ref to track if PIN screen was active

  // Update the ref whenever showPinVerification changes
  useEffect(() => {
    pinVerificationWasActive.current = showPinVerification;
  }, [showPinVerification]);

  useEffect(() => {
    // Cleanup function when component unmounts
    return () => {
      // If the component unmounts while the PIN screen was active (ref value is true)
      // AND a role was selected for verification but not yet confirmed
      if (pinVerificationWasActive.current && selectedRole) {
         console.log(`[RoleSelect Unmount] Unmounting while PIN verification for '${selectedRole}' was active. Current activeRole: '${activeRole}'.`);

         // Reset activeRole if it matches the role that was pending verification
         // This prevents unauthorized access when navigating back during PIN entry
         if (activeRole === selectedRole) {
           console.log(`[RoleSelect Unmount] Resetting activeRole from ${activeRole} to null.`);
           setActiveRole(null);
         }
      }
    };
    // Add selectedRole and activeRole as dependencies
  }, [selectedRole, activeRole, setActiveRole]); // Added activeRole and setActiveRole to dependencies

  if (loading) {
    return <LoadingScreen />;
  }

  // If no user is logged in, redirect to welcome page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If user already has an active role, redirect to dashboard
  if (activeRole && location.pathname !== '/role-select') {
    if (activeRole === 'manager') {
      return <Navigate to="/manager/dashboard" />;
    }
    return <Navigate to="/dashboard" />;
  }

  // Get available roles
  const availableRoles = userProfile?.available_roles || ['crew'];
  const roleData = getRoleData(availableRoles);

  // Add logging to trace role selection and redirection
  const handleRoleSelect = (role: UserRole) => {
    console.log(`Role selected: ${role}`);
    console.log(`[RoleSelect] handleRoleSelect called with role: ${role}`);
    if (availableRoles.includes(role) || role === 'manager') { // Manager is always available
      // For roles that require PIN verification
      if (['captain', 'chef', 'manager'].includes(role)) {
        console.log(`Role ${role} requires PIN verification.`);
        setSelectedRole(role);
        setShowPinVerification(true);
      } else {
        // Hostess and Crew don't need PIN verification
        console.log(`Role ${role} does not require PIN verification. Setting active role and redirecting.`);
        setActiveRole(role);
        navigate('/dashboard');
      }
    } else {
      console.error(`Role ${role} is not available for the user.`);
    }
  };

  // Update redirection logic for the chef role
  const handlePinSuccess = () => {
    console.log(`[RoleSelect] handlePinSuccess called with selectedRole: ${selectedRole}`);
    if (selectedRole) {
      console.log(`PIN verification successful for role: ${selectedRole}`);
      setActiveRole(selectedRole);

      // Redirect to specific dashboards based on role
      if (selectedRole === 'manager') {
        console.log('Redirecting to manager dashboard.');
        navigate('/manager/dashboard'); 
      } else if (selectedRole === 'chef') {
        console.log('Redirecting to chef dashboard.');
        navigate('/chef-dashboard');
      } else {
        console.log('Redirecting to general dashboard.');
        navigate('/dashboard');
      }
    } else {
      console.error('No role selected after PIN verification.');
    }
  };

  const handlePinCancel = () => {
    setSelectedRole(null);
    setShowPinVerification(false);
  };

  // Handle sign out with the new result pattern
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (!result.success) {
        console.error('Sign out error:', result.error);
        toast.error('Failed to sign out. Please try again.');
      }
      // Success toast is already shown in the signOut method
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      toast.error('An unexpected error occurred while signing out');
    }
  };

  return (
    <RoleSelectLayout onSignOut={handleSignOut}>
      {showPinVerification ? (
        <PinVerification
          onSuccess={handlePinSuccess}
          onCancel={handlePinCancel}
          roleName={selectedRole || ""}
        />
      ) : (
        <>
          <RoleSelectHeader />
          <RoleGrid 
            roleData={roleData} 
            onRoleSelect={handleRoleSelect} 
          />
        </>
      )}
    </RoleSelectLayout>
  );
};

export default RoleSelect;
