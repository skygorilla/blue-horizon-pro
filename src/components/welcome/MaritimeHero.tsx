import React from 'react';
import { useUISettings } from '@/contexts/useUISettings';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Settings } from 'lucide-react';
import AboutModal from './AboutModal';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';

const MaritimeHero: React.FC<{
  onLoginClick: () => void;
}> = ({ onLoginClick }) => {
  const { touchMode } = useUISettings();
  const [showAbout, setShowAbout] = React.useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full max-w-3xl mx-auto text-center relative z-10">
      {/* Brand logo and name - centered */}
      <div className="mb-6 sm:mb-8 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-full">
          <ThemeToggle />
        </div>
        <h1 className="text-white font-playfair text-3xl sm:text-5xl ml-3 sm:ml-4 font-bold">
          Blue Horizon Pro
        </h1>
      </div>
      
      {/* Tagline */}
      <p className="text-white/90 mb-4 sm:mb-6 text-lg sm:text-2xl font-medium max-w-2xl mx-auto">
        Smart Meal & Inventory Planning for Maritime Operations
      </p>
      
      {/* Highlighted tagline */}
      <h2 className="text-white/80 mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-lg">
        <span className="font-bold italic text-maritime-gold">Designed for Life at Sea</span> — Plan meals, 
        manage inventory, and coordinate provisioning for your ship – 
        even offline. Crafted for chefs, captains, and crew.
      </h2>
      
      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-8">
        <Button 
          onClick={onLoginClick} 
          size={isMobile ? "default" : "lg"}
          className={`${isMobile ? 'text-sm px-6 py-2' : 'text-base px-8 py-6'} bg-maritime-gold hover:bg-maritime-gold/90 text-maritime-navy font-medium h-auto rounded-full shadow-lg`}
        >
          Start Planning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* About button - positioned at the bottom */}
      <div className="mt-4">
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "lg"}
          onClick={() => setShowAbout(true)}
          className={`${isMobile ? 'text-xs py-2 px-4' : 'py-4 px-6'} bg-maritime-navy/40 border-maritime-gold/30 text-white hover:bg-maritime-navy/60 hover:border-maritime-gold h-auto rounded-full backdrop-blur-sm shadow-lg transition-all group whitespace-nowrap`}
        >
          <div className="bg-maritime-teal/40 p-1.5 rounded-full mr-2 group-hover:bg-maritime-gold/50 transition-all flex-shrink-0">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-white group-hover:text-white transition-colors" />
          </div>
          <span className="font-medium">Learn More About Blue Horizon Pro</span>
        </Button>
      </div>
      
      {/* About modal */}
      <AboutModal open={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

export default MaritimeHero;
