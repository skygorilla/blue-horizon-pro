import React from 'react';
import { Map, Anchor } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth'; // Corrected import path
import type { UserRole } from '@/types/auth'; // Corrected import path for type
import { useUISettings } from '@/contexts/useUISettings'; // Corrected import path
import { cn } from '@/lib/utils'; // Import cn

// Helper function to get role icon with theme-aware colors
const getRoleIcon = (role: string) => {
  switch (role) {
    case 'captain':
      // Use theme-aware color for captain icon
      return <Map className={cn("h-5 w-5 mr-2", "text-maritime-navy dark:text-blue-300")} />;
    case 'chef':
      // Emoji doesn't need theme color
      return <span className="h-5 w-5 mr-2">👨‍🍳</span>;
    case 'hostess':
      // Emoji doesn't need theme color
      return <span className="h-5 w-5 mr-2">👩‍💼</span>;
    case 'crew':
      // Use theme-aware color for crew icon
      return <Anchor className={cn("h-5 w-5 mr-2", "text-gray-600 dark:text-gray-400")} />;
    default:
      // Use theme-aware color for default icon
      return <Anchor className={cn("h-5 w-5 mr-2", "text-gray-500 dark:text-gray-400")} />;
  }
};

const RoleBadge: React.FC = () => {
  const { activeRole, userDisplayName } = useAuth();
  const { touchMode } = useUISettings();
  
  if (!activeRole) return null;
  
  return (
    <div className="ml-4 flex items-center">
      {/* Apply theme-aware badge styling */}
      <span className={cn(
        touchMode ? 'px-4 py-2' : 'px-3 py-1',
        'rounded-full text-sm flex items-center',
        'bg-gray-200 dark:bg-white/10', // Theme-aware background
        'text-gray-800 dark:text-white', // Theme-aware text
        'border border-gray-300 dark:border-white/20' // Theme-aware border
      )}>
        {getRoleIcon(activeRole)}
        <span className={cn(
          'font-medium',
          touchMode ? 'text-base' : 'text-sm'
        )}>
          {userDisplayName ? `${userDisplayName}` : 'User'} 
          <span className="mx-1">|</span>
          <span className="font-semibold">
            {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
          </span>
        </span>
      </span>
    </div>
  );
};

export default RoleBadge;
