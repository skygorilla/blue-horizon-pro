import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import Center from '@/components/ui/Center';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import React, { ReactNode } from 'react';

interface RoleSelectLayoutProps {
  children: ReactNode;
  onSignOut: () => void;
}

const RoleSelectLayout: React.FC<RoleSelectLayoutProps> = ({ children, onSignOut }) => {
  const isMobile = useIsMobile();

  return (
    <Center className="p-4 relative bg-neutral-light dark:bg-gray-900">
      {/* Navigation buttons at the top - Showing sign out */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          variant="outline" 
          onClick={onSignOut} 
          size={isMobile ? "sm" : "default"}
          className="border-maritime-navy/20 text-maritime-navy text-xs sm:text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Sign Out
        </Button>
      </div>
      
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-12 w-20 sm:w-32 h-20 sm:h-32 opacity-10 dark:opacity-5">
          <img src="/images/anchor-watermark.svg" alt="" className="w-full h-full" />
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl flex flex-col items-center justify-center"
      >
        {children}
        
        {/* Footer - Fixing the text visibility by using a darker color */}
        <div className="w-full py-3 sm:py-4 text-center text-maritime-navy font-medium mt-6 sm:mt-8 text-sm flex items-center justify-center gap-2 dark:text-gray-400">
          Built for Life at Sea
          <ThemeToggle />
        </div>
      </motion.div>
    </Center>
  );
};

export default RoleSelectLayout;
