
import React from 'react';
import RoleCard from '@/components/welcome/RoleCard';
import { UserRole } from '@/types/auth';
import { motion } from 'framer-motion';

interface RoleData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  color: string;
  size: 'small' | 'large'; // Restore use of size from data
}

interface RoleGridProps {
  roleData: RoleData[];
  onRoleSelect: (role: UserRole) => void;
}

const RoleGrid: React.FC<RoleGridProps> = ({ roleData, onRoleSelect }) => {
  // Restore filtering for large/small roles
  const largeRoles = roleData.filter(role => role.size === 'large');
  const smallRoles = roleData.filter(role => role.size === 'small');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Revert stagger
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col space-y-8" // Revert to flex column layout
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top row - larger cards (Captain and Manager) - Restore this section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {largeRoles.map(role => (
          <motion.div key={role.id} variants={itemVariants}>
            <RoleCard
              title={role.title}
              description={role.description}
              icon={role.icon}
              onClick={() => onRoleSelect(role.id as UserRole)}
              available={role.available}
              colorClass={role.color}
              size="large" // Use 'large' size
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom row - smaller cards (Chef, Hostess, Crew) - Restore this section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {smallRoles.map(role => (
          <motion.div key={role.id} variants={itemVariants}>
            <RoleCard
              title={role.title}
              description={role.description}
              icon={role.icon}
              onClick={() => onRoleSelect(role.id as UserRole)}
              available={role.available}
              colorClass={role.color}
              size="small" // Use 'small' size
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RoleGrid;
