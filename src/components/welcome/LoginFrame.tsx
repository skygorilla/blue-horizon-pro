
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Anchor } from 'lucide-react';
import CustomAuthForm from './CustomAuthForm';

interface LoginFrameProps {
  onBack: () => void;
}

const LoginFrame: React.FC<LoginFrameProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full">
          <Anchor className="h-8 w-8 text-maritime-gold" />
        </div>
        <h2 className="text-white font-playfair text-3xl ml-3 font-bold">
          Blue Horizon Pro
        </h2>
      </div>
      
      <Card className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Anchor className="h-10 w-10 text-maritime-teal" />
          </div>
          
          <h2 className="text-2xl font-bold text-maritime-navy mb-2 font-playfair">Welcome Aboard</h2>
          <p className="text-gray-500 mb-6">Sign in to access your ship's planning system</p>
          
          <div className="flex justify-center mb-6">
            <Anchor className="h-6 w-6 text-maritime-teal" />
          </div>
          
          <CustomAuthForm />
        </div>
      </Card>
      
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mt-6 text-white/90 hover:text-white hover:bg-white/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Welcome Screen
      </Button>
    </div>
  );
};

export default LoginFrame;
