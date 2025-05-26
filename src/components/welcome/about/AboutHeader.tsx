
import React from 'react';
import { Anchor } from 'lucide-react';

const AboutHeader: React.FC = () => {
  return (
    <div className="text-center py-8 bg-white/85 backdrop-blur-lg rounded-t-xl">
      <div className="flex justify-center items-center mb-2">
        <Anchor className="h-8 w-8 text-maritime-gold mr-3" />
        <h1 className="text-3xl font-medium text-neutral-900 font-playfair tracking-tight">
          Blue Horizon Pro
        </h1>
      </div>
      <p className="text-xl text-maritime-teal font-light">
        Smart Planning. Calm Seas.
      </p>
      <p className="mt-2 text-maritime-navy font-semibold text-sm">
        Built for Life at Sea ⛵
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        Last Updated: April 15, 2025 • v1.2.4
      </p>
    </div>
  );
};

export default AboutHeader;
