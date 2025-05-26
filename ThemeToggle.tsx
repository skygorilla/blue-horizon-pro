import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Cycle through themes: light → dark → system → light...
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  // Ensure we're mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={cycleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
      aria-label="Toggle theme"
    >
      {/* Sun icon (Light mode) */}
      <motion.div
        className="absolute"
        animate={{
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </motion.div>

      {/* Moon icon (Dark mode) */}
      <motion.div
        className="absolute"
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </motion.div>

      {/* Maritime Sailboat icon (System mode) */}
      <motion.div
        className="absolute"
        animate={{
          opacity: theme === 'system' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-maritime-teal"
        >
          <path d="M2 20a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3" />
          <path d="M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2c0 3.6-2.6 7-6 8.5A7.3 7.3 0 0 1 8 10" />
          <path d="M12 4v2" />
          <path d="M10 6h4" />
          <path d="m15 13-5-1" />
          <path d="m9 13 5-1" />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
