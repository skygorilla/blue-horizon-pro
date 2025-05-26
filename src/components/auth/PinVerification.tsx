import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
// Import role-specific icons
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChefHat, ClipboardList, Loader2, Map, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface PinVerificationProps {
  onSuccess: () => void;
  onCancel: () => void;
  roleName: string;
}

const PinVerification: React.FC<PinVerificationProps> = ({ 
  onSuccess, 
  onCancel,
  roleName 
}) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePinChange = (value: string) => {
    setPin(value);
    
    // Auto-submit when all 4 digits are entered
    if (value.length === 4) {
      validatePin(value);
    }
  };

  const validatePin = (pinToValidate = pin) => {
    if (loading) return;
    
    setLoading(true);
    
    // For now, we use a simple static pin authentication
    // In a production environment, this should be replaced with a secure auth system
    // Use role-specific PINs
    const validPins: Record<string, string> = {
      'captain': '1234',
      'chef': '1234',
      'manager': '1234'  // Specifically set manager PIN to 1234
    };
    
    const validPin = validPins[roleName.toLowerCase()] || '1234';
    
    setTimeout(() => {
      if (pinToValidate === validPin) {
        toast.success(`${roleName} access granted`);
        onSuccess();
      } else {
        setAttempts(prev => prev + 1);
        setPin(''); // Clear PIN on failure
        
        if (attempts >= 2) {
          toast.error("Maximum attempts reached. Access denied.");
          setTimeout(() => onCancel(), 1000); // Delay to show the error
        } else {
          toast.error(`Invalid PIN. ${3 - attempts - 1} attempts remaining.`);
        }
      }
      setLoading(false);
    }, 600); // Simulate server verification
  };

  // Helper function to get the correct icon based on roleName
  const getRoleIcon = (role: string) => {
    const lowerCaseRole = role.toLowerCase();
    switch (lowerCaseRole) {
      case 'captain':
        return <Map className="h-8 w-8 text-maritime-teal" />;
      case 'chef':
        return <ChefHat className="h-8 w-8 text-maritime-teal" />;
      case 'manager':
        return <ClipboardList className="h-8 w-8 text-maritime-teal" />;
      default:
        return <Shield className="h-8 w-8 text-maritime-teal" />; // Fallback to Shield
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full dark:bg-gray-800"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-16 h-16 bg-maritime-teal/10 rounded-full flex items-center justify-center mb-4 dark:bg-maritime-teal/20"
          >
            {/* Use the helper function to display the role-specific icon */}
            {getRoleIcon(roleName)}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xl font-semibold dark:text-white"
          >
            {roleName} Authentication
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-sm text-muted-foreground mt-1 text-center dark:text-gray-400"
          >
            Enter your 4-digit PIN to continue
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-2">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={handlePinChange}
              disabled={loading}
              containerClassName="gap-3"
              autoFocus
            >
              <InputOTPGroup>
                {/* Add dark mode styling to slots */}
                <InputOTPSlot index={0} className="h-14 w-14 text-xl dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <InputOTPSlot index={1} className="h-14 w-14 text-xl dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <InputOTPSlot index={2} className="h-14 w-14 text-xl dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <InputOTPSlot index={3} className="h-14 w-14 text-xl dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              onClick={onCancel}
              disabled={loading}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <Button 
              className="flex-1 bg-maritime-navy hover:bg-maritime-teal dark:bg-maritime-teal dark:hover:bg-maritime-gold dark:text-maritime-navy"
              onClick={() => validatePin()}
              disabled={pin.length < 4 || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-muted-foreground dark:text-gray-500"
          >
            Enter PIN "1234" for demo access
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PinVerification;
