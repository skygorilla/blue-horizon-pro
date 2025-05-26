
import React from 'react';
import { Ship, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AboutModal from './AboutModal';

interface WelcomeHeroProps {
  setShowAbout: (show: boolean) => void;
  showAbout: boolean;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({ setShowAbout, showAbout }) => {
  return (
    <div className="max-w-lg mx-auto text-white">
      <div className="mb-8 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-full">
          <Ship className="h-10 w-10 text-maritime-gold" />
        </div>
        <h1 className="text-4xl font-playfair ml-4 font-bold">
          Blue Horizon Pro
        </h1>
      </div>
      
      <p className="text-white/90 mb-8 text-xl text-center">
        Smart meal & inventory planning for maritime operations
      </p>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={() => setShowAbout(true)} 
          variant="outline"
          className="py-3 px-6 bg-maritime-navy/50 border-maritime-gold/30 text-white hover:bg-maritime-navy/70 hover:border-maritime-gold backdrop-blur-sm group transition-all flex items-center justify-center shadow-md overflow-hidden"
        >
          <div className="bg-maritime-teal/40 p-1.5 rounded-full mr-3 group-hover:bg-maritime-gold/50 transition-all flex-shrink-0">
            <Info className="h-4 w-4 text-white group-hover:text-white transition-colors" />
          </div>
          <span className="text-white group-hover:text-maritime-gold transition-colors font-medium">About Blue Horizon Pro</span>
        </Button>
      </div>
      
      <AboutModal open={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

export default WelcomeHero;
