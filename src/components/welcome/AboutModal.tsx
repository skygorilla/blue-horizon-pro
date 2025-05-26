
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AboutContent } from './about';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const AboutModal = ({ children, open, onClose }: AboutModalProps) => {
  const handleDialogChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  
  if (children) {
    // Trigger version (with children as trigger)
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-full w-full h-full max-h-screen inset-0 p-0 border-0 rounded-none bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200">
          <div className="h-full flex flex-col items-center justify-center">
            <DialogTitle className="sr-only">Sea Planer Pro - Terms and Conditions</DialogTitle>
            <DialogDescription className="sr-only">Legal information and app details</DialogDescription>
            <DialogClose className="absolute right-6 top-6 z-50 rounded-full bg-white/20 backdrop-blur-md p-2 hover:bg-white/30 transition-colors">
              <X className="h-6 w-6 text-white" />
            </DialogClose>
            <div className="w-full max-w-4xl mx-auto">
              <AboutContent onClose={onClose} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Controlled version (with open/onClose props)
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-full w-full h-full max-h-screen inset-0 p-0 border-0 rounded-none bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200">
        <div className="h-full flex flex-col items-center justify-center">
          <DialogTitle className="sr-only">Sea Planer Pro - Terms and Conditions</DialogTitle>
          <DialogDescription className="sr-only">Legal information and app details</DialogDescription>
          <DialogClose className="absolute right-6 top-6 z-50 rounded-full bg-white/20 backdrop-blur-md p-2 hover:bg-white/30 transition-colors">
            <X className="h-6 w-6 text-white" />
          </DialogClose>
          <div className="w-full max-w-4xl mx-auto">
            <AboutContent onClose={onClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
