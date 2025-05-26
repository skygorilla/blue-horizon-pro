import React from 'react';
import { Calendar, ChefHat, Info, Anchor, Ship } from 'lucide-react';
import { useUISettings } from '@/contexts/useUISettings';
import { useAuth } from '@/contexts/useAuth'; // Corrected import path
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardHeader: React.FC = () => {
  const { touchMode } = useUISettings();
  const { activeRole, userProfile } = useAuth();
  const isMobile = useIsMobile();
  
  // Get a greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  // Role-specific header content
  const getRoleSpecificContent = () => {
    switch (activeRole) {
      case 'chef':
        return "Plan meals, manage recipes, and track ingredients";
      case 'captain':
        return "Monitor provisioning and review meal plans";
      case 'hostess':
        return "Access menus and coordinate with kitchen staff";
      case 'crew':
        return "View meal schedules and update inventory";
      default:
        return "Plan, organize, and visualize your meals";
    }
  };
  
  // Format role name with proper capitalization
  const formatRoleName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };
  
  // Get user's display name from profile
  const getUserDisplayName = () => {
    if (userProfile) {
      const firstName = userProfile.first_name || '';
      const lastName = userProfile.last_name || '';
      if (firstName || lastName) {
        return `${firstName} ${lastName}`.trim();
      }
    }
    return formatRoleName(activeRole || 'sailor');
  };
  
  return (
    <div className="bg-maritime-gradient rounded-md p-3 sm:p-4 shadow-sm relative overflow-hidden">
      {/* Wave pattern background */}
      <div className="absolute inset-0 bg-wave-pattern bg-repeat-x bg-bottom opacity-10"></div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-white font-playfair text-lg sm:text-xl font-medium">
              {getGreeting()}, {getUserDisplayName()}
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-1 sm:ml-2 p-1 text-white/80 hover:text-white hover:bg-white/10">
                    <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>This dashboard gives you an overview of planned meals, inventory status, and upcoming tasks.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            <span className="font-medium text-white/90"></span> {getRoleSpecificContent()}
          </p>
        </div>
        
        <div className="hidden md:flex space-x-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 text-white flex items-center">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Today's Plan</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 text-white flex items-center">
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Recipe of the Day</span>
          </div>
        </div>
      </div>
      
      {/* For mobile, show action buttons in a more accessible way */}
      {isMobile && (
        <div className="flex mt-3 space-x-2">
          <button className="flex-1 bg-white/20 backdrop-blur-sm rounded-md py-2 px-3 text-white flex items-center justify-center text-xs">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Today's Plan</span>
          </button>
          <button className="flex-1 bg-white/20 backdrop-blur-sm rounded-md py-2 px-3 text-white flex items-center justify-center text-xs">
            <ChefHat className="h-4 w-4 mr-1" />
            <span>Recipe of the Day</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
