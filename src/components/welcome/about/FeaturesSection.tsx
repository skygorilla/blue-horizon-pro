
import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const FeatureItem: React.FC<{ feature: string }> = ({ feature }) => (
  <motion.div 
    className="bg-white/70 backdrop-blur-sm p-3 pl-9 rounded-lg relative hover:translate-y-[-3px] transition-transform duration-300 hover:shadow-md border border-maritime-sand"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <CheckCircle className="h-4 w-4 text-maritime-gold absolute left-3 top-3.5" />
    {feature}
  </motion.div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    "Meal planning with nutritional tracking",
    "Recipe management with portion scaling",
    "Inventory control and usage tracking",
    "Automated shopping list generation",
    "Cost analysis and reporting"
  ];

  return (
    <>
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <Star className="h-5 w-5 text-maritime-teal mr-3" /> 
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
