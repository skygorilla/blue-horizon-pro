import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface CookModeProps {
  steps: string[];
  onExit: () => void;
}

const CookModeView: React.FC<CookModeProps> = ({ steps, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(null); // Reset timer for the next step
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(null); // Reset timer for the previous step
    }
  };

  const startTimer = (duration: number) => {
    setTimer(duration);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="cook-mode bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cook Mode</h2>
      <p className="text-gray-700 mb-6">Step {currentStep + 1} of {steps.length}</p>
      <div className="step-content mb-6">
        <p className="text-lg">{steps[currentStep]}</p>
      </div>

      {timer !== null && (
        <div className="timer mb-6 flex items-center gap-2">
          <Clock className="text-gray-500" />
          <span className="text-lg font-semibold">{timer} seconds remaining</span>
        </div>
      )}

      <div className="actions flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => startTimer(30)}
        >
          Start 30s Timer
        </Button>
        <Button
          variant="outline"
          onClick={handleNextStep}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>

      <div className="exit mt-6">
        <Button variant="destructive" onClick={onExit}>
          Exit Cook Mode
        </Button>
      </div>
    </div>
  );
};

export default CookModeView;