
import React from 'react';
import { Info, Ship } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AboutOverview: React.FC = () => {
  return (
    <>
      <div className="space-y-2">
        <p className="flex items-center text-neutral-800">
          <Info className="h-4 w-4 text-maritime-gold mr-2" /> 
          About Blue Horizon Pro
        </p>
        <p className="text-neutral-700">Legal Information</p>
        <p className="text-maritime-teal font-medium">
          Terms of Service and Privacy Policy for Blue Horizon Pro
        </p>
      </div>
      
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <Ship className="h-5 w-5 text-maritime-teal mr-3" /> 
          What is Blue Horizon Pro?
        </h2>
        <p className="text-neutral-800">
          Blue Horizon Pro is a comprehensive meal planning and inventory management system designed 
          specifically for maritime operations. It helps ship crews efficiently manage food, beverages, 
          and supplies while at sea, ensuring optimal provisioning and reducing waste.
        </p>
      </section>
    </>
  );
};

export default AboutOverview;
