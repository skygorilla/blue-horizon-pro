import React from 'react';
import { HelpCircle, AlarmClock } from 'lucide-react'; // Import AlarmClock
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/useAuth'; // Corrected import path
import OfflineIndicator from '@/components/OfflineIndicator';
import UIModeToggle from '@/components/ui/UIModeToggle';
import UserMenu from './UserMenu';
import RoleSwitcher from '@/components/RoleSwitcher';
import DigitalClock from '@/components/ui/DigitalClock';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover components
import TimerPopoverContent from '@/components/ui/TimerPopoverContent'; // Import the timer popover content
import { useTimers } from '@/contexts/TimerContext'; // Import useTimers hook
import { cn } from '@/lib/utils'; // Import cn

interface HeaderActionsProps {
  onAboutClick: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ onAboutClick }) => {
  const { activeRole } = useAuth();
  const { getRunningTimersCount } = useTimers(); // Get timer count function
  const runningTimersCount = getRunningTimersCount();

  return (
    <div className="flex items-center space-x-2 z-10">
      <OfflineIndicator />
      
      {/* Apply theme-aware text color to clock */}
      <DigitalClock className={cn("hidden sm:block", "text-gray-700 dark:text-white/90")} />
      
      {/* Timer Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="Cooking Timers"
            // Apply theme-aware button styling
            className={cn(
              "relative",
              "text-gray-700 dark:text-white/90",
              "hover:text-gray-900 dark:hover:text-white",
              "hover:bg-gray-200 dark:hover:bg-white/10"
            )}
          >
            <AlarmClock className="h-5 w-5" />
            {/* Badge for running timers */}
            {runningTimersCount > 0 && (
              // Apply theme-aware ring color
              <span className={cn(
                "absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2",
                "ring-gray-300 dark:ring-maritime-navy"
              )} />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <TimerPopoverContent />
        </PopoverContent>
      </Popover>
      
      <UIModeToggle />
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onAboutClick}
        aria-label="About Sea Planer Pro"
        // Apply theme-aware button styling
        className={cn(
          "text-gray-700 dark:text-white/90",
          "hover:text-gray-900 dark:hover:text-white",
          "hover:bg-gray-200 dark:hover:bg-white/10"
        )}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
      
      {activeRole && (
        <RoleSwitcher variant="header" />
      )}
      
      <UserMenu />
    </div>
  );
};

export default HeaderActions;
