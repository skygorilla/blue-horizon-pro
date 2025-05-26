import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import RoleBadge from './RoleBadge';
import { cn } from '@/lib/utils'; // Import cn

interface HeaderLogoProps {
  showBackButton: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ showBackButton }) => {
  return (
    <div className="flex items-center z-10">
      {showBackButton && (
        <BackButton 
          // Apply theme-aware styling using cn
          className={cn(
            "mr-3",
            "text-gray-700 dark:text-white/90", // Base text color
            "hover:text-gray-900 dark:hover:text-white", // Hover text color
            "hover:bg-gray-200 dark:hover:bg-white/10", // Hover background
            "border-gray-300 dark:border-white/20" // Border color
          )}
        />
      )}
      <Link to="/dashboard" className="flex items-center">
        {/* text-maritime-gold should adapt via theme config */}
        <Anchor className="h-6 w-6 mr-2 text-maritime-gold" />
      </Link>
      <RoleBadge />
    </div>
  );
};

export default HeaderLogo;
