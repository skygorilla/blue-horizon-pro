
import React from 'react';
import { Wifi } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const OfflineSection: React.FC = () => {
  return (
    <>
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <Wifi className="h-5 w-5 text-maritime-teal mr-3" /> 
          Offline Mode
        </h2>
        <p className="text-neutral-800">
          Blue Horizon Pro is designed to work in maritime environments with limited or intermittent internet 
          connectivity. All essential functions remain available offline, with data automatically 
          synchronizing when a connection is reestablished.
        </p>
      </section>
    </>
  );
};

export default OfflineSection;
