import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useUISettings } from '@/contexts/useUISettings';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  available: boolean;
  colorClass?: string;
  size?: 'small' | 'large';
}

const RoleCard: React.FC<RoleCardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  available,
  colorClass = 'border-primary-200 hover:border-primary-500',
  size = 'large'
}) => {
  const { touchMode } = useUISettings();
  const isLarge = size === 'large';
  
  const cardVariants = {
    initial: { 
      y: 0,
      scale: 1, // Reset scale to default
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      borderImage: "linear-gradient(to right, transparent, transparent) 1",
    },
    hover: { 
      scale: 1.02, // Match hover scale with DashboardCard
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)", // Match shadow with DashboardCard
      borderImage: "linear-gradient(45deg, var(--maritime-teal), var(--maritime-gold)) 1",
      transition: {
        type: "spring",
        stiffness: 300, // Adjust stiffness for smoother animation
        damping: 20     
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        rotate: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover={available ? "hover" : "initial"}
      variants={cardVariants}
    >
      <Card
        className={`relative overflow-hidden backdrop-blur-sm 
          ${available 
            ? 'cursor-pointer bg-white/80 hover:bg-white/90 dark:bg-gray-800/70 dark:hover:bg-gray-700/80' 
            : 'opacity-50 cursor-not-allowed bg-white/60 dark:bg-gray-800/40'} 
          border-2 transition-all duration-500 ${colorClass} dark:border-gray-700/50 ${isLarge ? 'h-[280px]' : 'h-[220px]'}`}
        onClick={available ? onClick : undefined}
      >
        <CardHeader className="card-header">
          <motion.div 
            variants={iconVariants}
            className={`card-icon ${isLarge ? 'card-icon-lg' : 'card-icon'} bg-gradient-to-br from-gray-50 to-white shadow-sm mx-auto dark:from-gray-700 dark:to-gray-800`}
          >
            <div className={isLarge ? 'transform scale-150' : 'transform scale-125'}>
              {icon}
            </div>
          </motion.div>

          <CardTitle 
            className={`${isLarge ? 'text-2xl' : 'text-xl'} font-playfair 
              bg-clip-text text-transparent bg-gradient-to-r from-maritime-navy to-maritime-teal dark:from-white dark:to-gray-300
              text-center ${touchMode ? 'mb-1' : ''}`}
          >
            {title}
          </CardTitle>
          
          {!available && (
            <span className="text-xs font-medium text-red-500 mt-1 text-center dark:text-red-400">Not available for your account</span>
          )}
        </CardHeader>

        <CardContent className={`text-center card-content-spacing`}>
          <CardDescription className={`${isLarge ? 'text-sm' : 'text-xs'} text-gray-600 dark:text-gray-400`}>
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoleCard;
