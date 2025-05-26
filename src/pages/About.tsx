import React from 'react';
import { AboutContent } from '@/components/welcome/about';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Check if we're coming from the home page
  const isFromHomePage = location.state?.from === '/' || location.key === 'default';
  
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-maritime-navy to-maritime-teal/90 overflow-hidden">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col max-w-4xl relative z-10">
        {/* Only show back button if not coming from home page */}
        {!isFromHomePage && (
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="self-start mb-4 text-foreground hover:bg-foreground/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        <div className="bg-background/95 backdrop-blur-md rounded-xl shadow-xl flex-1 flex flex-col overflow-hidden">
          <AboutContent onClose={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default About;
