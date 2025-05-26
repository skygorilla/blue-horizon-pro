import React from 'react';
// Correct the import path for UserRole (assuming it's in auth types)
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/useAuth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Map, ChefHat, Users, Anchor, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Helper function for role icons
const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'captain':
      return <Map className="mr-2 h-4 w-4 text-blue-600" />;
    case 'chef':
      return <ChefHat className="mr-2 h-4 w-4 text-green-600" />;
    case 'hostess':
      return <Users className="mr-2 h-4 w-4 text-orange-600" />;
    case 'manager':
      return <ClipboardList className="mr-2 h-4 w-4 text-violet-600" />;
    case 'crew':
      return <Anchor className="mr-2 h-4 w-4 text-gray-600" />;
    default:
      return <Anchor className="mr-2 h-4 w-4" />;
  }
};

// Helper function for role names
const getRoleName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    captain: 'Captain',
    chef: 'Chef',
    hostess: 'Hostess',
    manager: 'Manager',
    crew: 'Crew'
  };
  
  return roleNames[role] || 'Crew';
};

interface RoleSwitcherProps {
  variant?: 'default' | 'header';
  className?: string;
}

const RoleSwitcher = ({ variant = 'default', className = '' }: RoleSwitcherProps) => {
  const { activeRole, setActiveRole, userProfile } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  // Available roles from user profile
  const availableRoles = userProfile?.available_roles || ['crew'];

  const handleRoleChange = (role: UserRole) => {
    if (role !== activeRole) {
      // For roles that need PIN verification, redirect to the role selection page
      if (['captain', 'chef', 'manager'].includes(role)) {
        navigate('/role-select');
      } else {
        setActiveRole(role);
        toast.success(`Switched to ${getRoleName(role)} role`);
        
        // Redirect to the appropriate dashboard
        if (role === 'manager') {
          navigate('/manager');
        } else {
          navigate('/dashboard');
        }
      }
    }
    setIsOpen(false);
  };

  if (!activeRole) return null;

  // Different styling based on variant
  const buttonVariant = variant === 'header' ? 'ghost' : 'outline';
  const buttonClass = variant === 'header' 
    ? `text-white/90 hover:text-white hover:bg-white/10 ${className}`
    : className;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} className={`flex items-center gap-1 px-3 ${buttonClass}`}>
          {getRoleIcon(activeRole)}
          <span className="hidden sm:inline">{getRoleName(activeRole)}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {availableRoles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleChange(role as UserRole)}
            className={`flex items-center ${role === activeRole ? 'bg-accent' : ''}`}
            disabled={role === activeRole}
          >
            {getRoleIcon(role as UserRole)}
            {getRoleName(role as UserRole)}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => navigate('/role-select')}
          className="mt-1 pt-1"
        >
          Full Role Selection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
