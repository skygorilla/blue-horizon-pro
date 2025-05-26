
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, X } from 'lucide-react';

interface AboutFooterProps {
  onClose?: () => void;
}

const AboutFooter: React.FC<AboutFooterProps> = ({ onClose }) => {
  return (
    <div className="pt-4 border-t border-neutral-200 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center rounded-b-lg p-4 gap-4">
      <p className="text-sm text-neutral-500">
        © 2025 Blue Horizon Pro. All rights reserved.
      </p>
      {onClose && (
        <div className="flex gap-3 w-full md:w-auto justify-center">
          <Button 
            onClick={onClose} 
            className="rounded-full px-6 py-2 bg-maritime-teal hover:bg-maritime-teal/90 transition-colors duration-300 font-medium"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            I Agree & Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default AboutFooter;
