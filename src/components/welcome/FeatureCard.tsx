import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  svgAccent?: 'wave' | 'dots' | 'grid' | 'none';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, description, svgAccent = 'none' }) => {
  const renderSvgAccent = () => {
    switch (svgAccent) {
      case 'wave':
        return (
          <svg className="absolute right-0 bottom-0 w-20 h-16 text-maritime-teal/10" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C15,50 35,30 50,40 C65,50 85,30 100,40 L100,80 L0,80 Z" fill="currentColor" />
            <path d="M0,55 C20,65 30,45 60,55 C80,62 90,42 100,55 L100,80 L0,80 Z" fill="currentColor" />
          </svg>
        );
      case 'dots':
        return (
          <svg className="absolute right-0 bottom-0 w-24 h-16 text-maritime-teal/10" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
            {[...Array(20)].map((_, i) => (
              <circle 
                key={i} 
                cx={Math.floor(Math.random() * 120)} 
                cy={Math.floor(Math.random() * 80)} 
                r={Math.floor(Math.random() * 3) + 1} 
                fill="currentColor" 
              />
            ))}
          </svg>
        );
      case 'grid':
        return (
          <svg className="absolute right-0 bottom-0 w-24 h-16 text-maritime-teal/10" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
            {[...Array(5)].map((_, i) => (
              <line 
                key={`h-${i}`} 
                x1="0" 
                y1={i * 20} 
                x2="100" 
                y2={i * 20} 
                stroke="currentColor" 
                strokeWidth="1" 
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <line 
                key={`v-${i}`} 
                x1={i * 20} 
                y1="0" 
                x2={i * 20} 
                y2="80" 
                stroke="currentColor" 
                strokeWidth="1" 
              />
            ))}
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' }}
      transition={{ duration: 0.2 }}
    >
      <Card
        size="sm"
        padding="md"
        className="relative overflow-hidden flex flex-col items-center text-center h-full border border-gray-100"
      >
        <div className="relative z-10 flex flex-col items-center card-content-spacing">
          <div className="card-icon bg-maritime-teal/5 text-maritime-teal">
            {icon}
          </div>
          <h3 className="font-semibold text-maritime-navy text-lg">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {renderSvgAccent()}
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
