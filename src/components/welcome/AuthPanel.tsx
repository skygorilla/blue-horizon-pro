import React from 'react';
import { Ship, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CustomAuthForm from './CustomAuthForm';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface AuthPanelProps {
  loading: boolean;
}

const AuthPanel: React.FC<AuthPanelProps> = ({ loading }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleAboutClick = () => {
    navigate('/about');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white/40 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/50"
    >
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-maritime-navy mb-1 font-playfair dark:text-white">Blue Horizon Pro</h1>
        <p className="text-maritime-teal text-xs sm:text-sm mb-2 sm:mb-4 dark:text-maritime-sand/90">Smart Planning. Calm Seas.</p>
        <div className="w-12 sm:w-16 h-0.5 bg-maritime-sand mx-auto dark:bg-maritime-sand/70"></div>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <CustomAuthForm />
      </div>
      
      <div className="text-center mt-4 sm:mt-6">
        <Button 
          onClick={handleAboutClick} 
          variant="ghost"
          size="sm"
          className="text-xs text-maritime-teal hover:bg-maritime-teal/10 group dark:text-maritime-sand/90 dark:hover:bg-maritime-sand/10"
        >
          <Info className="h-3 w-3 mr-1 group-hover:text-maritime-teal dark:group-hover:text-maritime-sand" />
          About Blue Horizon Pro
        </Button>
      </div>
    </motion.div>
  );
};

export default AuthPanel;
