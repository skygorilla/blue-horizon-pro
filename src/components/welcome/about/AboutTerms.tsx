
import React from 'react';
import { Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AboutTerms: React.FC = () => {
  return (
    <>
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <Info className="h-5 w-5 text-maritime-teal mr-3" /> 
          Terms and Conditions
        </h2>
        <p className="text-neutral-800">
          By using Blue Horizon Pro, you agree to these terms and conditions. This software is licensed, 
          not sold, for use in maritime planning operations only. The software is provided "as is" without 
          warranty of any kind.
        </p>
        <p className="text-neutral-800">
          The user is granted a non-exclusive, non-transferable license to use the software for 
          personal or business purposes related to maritime operations.
        </p>
      </section>
    </>
  );
};

export default AboutTerms;
