
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PrivacySection: React.FC = () => {
  return (
    <>
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <ShieldAlert className="h-5 w-5 text-maritime-teal mr-3" /> 
          Privacy Policy
        </h2>
        <p className="text-neutral-800">
          Blue Horizon Pro collects and processes certain data to provide its services. We respect your 
          privacy and are committed to protecting your personal data. Our full privacy policy details 
          how we collect, use, and store your information.
        </p>
        <p className="text-neutral-800">
          Data collected includes: account information, usage statistics, and inventory records. 
          This data is stored securely and only used to provide and improve our services.
        </p>
        <p className="text-neutral-800">
          You have the right to access, correct, and delete your personal data at any time.
        </p>
      </section>
    </>
  );
};

export default PrivacySection;
