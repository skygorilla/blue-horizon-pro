
import React from 'react';
import { Anchor } from 'lucide-react';

const MaritimeSlideshow: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {/* Single beach background image instead of slideshow */}
      <div className="relative h-full w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1200 animate-fadeIn"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")', 
            filter: 'brightness(0.85)'
          }}
        />
        
        {/* Soft gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-maritime-navy/40 via-maritime-navy/30 to-maritime-navy/20 z-10"></div>
        
        {/* Maritime decoration elements */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Helm icon watermark */}
          <div className="absolute bottom-10 right-10 opacity-10">
            <Anchor className="h-32 w-32 text-white" />
          </div>
          {/* Wave line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-maritime-gold/10"></div>
        </div>
        
        {/* Subtle wave pattern */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-wave-pattern bg-repeat-x opacity-10 animate-wave z-20"
          style={{ backgroundSize: '100px 20px' }}
        ></div>
      </div>
    </div>
  );
};

export default MaritimeSlideshow;
