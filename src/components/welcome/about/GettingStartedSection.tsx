import React from 'react';
import { Rocket } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

interface StepItemProps {
  step: string;
  index: number;
}

const StepItem: React.FC<StepItemProps> = ({ step, index }) => (
  <motion.div 
    className="bg-white/70 backdrop-blur-sm p-3 pl-9 rounded-lg relative hover:translate-y-[-3px] transition-transform duration-300 hover:shadow-md border border-maritime-sand"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="absolute left-3 top-3.5 h-5 w-5 rounded-full bg-maritime-teal text-white flex items-center justify-center text-xs font-medium">
      {index + 1}
    </div>
    {step}
  </motion.div>
);

const GettingStartedSection: React.FC = () => {
  const steps = [
    "Login with your crew credentials",
    "Select your role (Captain, Chef, Hostess, Crew, or Manager)",
    "Access role-specific features through the dashboard",
    "Plan meals, manage inventory, or submit requests based on your role"
  ];

  return (
    <>
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <Rocket className="h-5 w-5 text-maritime-teal mr-3" /> 
          Getting Started
        </h2>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <StepItem key={index} step={step} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default GettingStartedSection;
