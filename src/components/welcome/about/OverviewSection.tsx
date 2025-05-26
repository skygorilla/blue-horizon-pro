
import React from 'react';
import { Ship } from 'lucide-react';

const OverviewSection: React.FC = () => {
  return (
    <section className="bg-maritime-sand/40 p-5 rounded-lg border border-maritime-teal/20">
      <h3 className="text-xl font-medium text-maritime-navy flex items-center gap-2 mb-3">
        <Ship className="h-5 w-5 text-maritime-teal" />
        <span>What is Blue Horizon Pro?</span>
      </h3>
      <p className="text-gray-700 leading-relaxed">
        Blue Horizon Pro is a comprehensive meal planning and inventory management system designed 
        specifically for maritime operations. It helps ship crews efficiently manage food, beverages, 
        and supplies while at sea, ensuring optimal provisioning and reducing waste.
      </p>
    </section>
  );
};

export default OverviewSection;
