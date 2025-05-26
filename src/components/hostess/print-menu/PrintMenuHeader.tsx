
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrintMenuHeaderProps {
  onPrint: () => void;
}

const PrintMenuHeader: React.FC<PrintMenuHeaderProps> = ({ onPrint }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl font-playfair font-bold text-maritime-gold mb-2 sm:mb-0">Print Menu</h1>
      <div className="flex items-center space-x-2">
        <Button 
          variant="default" 
          size={isMobile ? "sm" : "default"}
          className="flex items-center bg-maritime-teal hover:bg-maritime-teal/80 text-xs sm:text-sm"
          onClick={onPrint}
        >
          <Printer className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Print Selected
        </Button>
      </div>
    </div>
  );
};

export default PrintMenuHeader;
