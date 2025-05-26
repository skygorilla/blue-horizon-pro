import React from 'react';

interface CenterProps {
  children: React.ReactNode;
  className?: string;
}

const Center: React.FC<CenterProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center justify-center h-full w-full ${className}`}>  
      {children}
    </div>
  );
};

export default Center;
