import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { UISettingsProvider } from '@/contexts/UISettingsContext';
import MaritimeSlideshow from '@/components/welcome/MaritimeSlideshow';
import AuthPanel from '@/components/welcome/AuthPanel';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Welcome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Disable body scrolling on welcome screen
  useEffect(() => {
    // Save original overflow value
    const originalOverflow = document.body.style.overflow;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Re-enable on cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  
  // Redirect logged in users to the dashboard or role select
  useEffect(() => {
    if (user) {
      navigate('/role-select');
    }
  }, [user, navigate]);
  
  if (user) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }
  
  return (
    <UISettingsProvider>
      <div className="min-h-screen h-screen flex items-center justify-center overflow-hidden relative">
        {/* Background */}
        <MaritimeSlideshow />
        
        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute z-50 flex flex-col items-center justify-center text-white"
        >
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mb-2 sm:mb-3" />
          <span className="text-base sm:text-lg">Loading Blue Horizon Pro...</span>
        </motion.div>
        
        {/* Centered auth panel */}
        <div className="relative z-10 w-full max-w-md px-4">
          <AuthPanel loading={loading} />
        </div>
      </div>
    </UISettingsProvider>
  );
};

export default Welcome;
