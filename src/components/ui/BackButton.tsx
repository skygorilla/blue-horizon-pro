import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUISettings } from '@/contexts/useUISettings';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  label = "Back", 
  className = "" 
}) => {
  const navigate = useNavigate();
  const { touchMode } = useUISettings();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Button
      variant="outline"
      size={touchMode ? "default" : "sm"}
      onClick={handleClick}
      className={`flex items-center gap-1 border-maritime-teal/50 hover:text-maritime-teal hover:border-maritime-teal hover:bg-maritime-teal/5 text-maritime-teal transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${touchMode ? 'h-12 text-base' : ''} ${className}`}
    >
      <ArrowLeft className={touchMode ? "h-5 w-5" : "h-4 w-4"} />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
