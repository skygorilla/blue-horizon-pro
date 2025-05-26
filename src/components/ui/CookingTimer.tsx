
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface TimerInstance {
  id: string;
  label: string;
  initialDuration: number; // seconds
  remainingTime: number; // seconds
  isRunning: boolean;
  createdAt: number; // timestamp
}

interface CookingTimerProps {
  timer: TimerInstance;
  onUpdate: (id: string, updates: Partial<TimerInstance>) => void;
  onRemove: (id: string) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const CookingTimer: React.FC<CookingTimerProps> = ({ timer, onUpdate, onRemove }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timer.isRunning && timer.remainingTime > 0) {
      intervalId = setInterval(() => {
        onUpdate(timer.id, { remainingTime: timer.remainingTime - 1 });
      }, 1000);
    } else if (timer.remainingTime <= 0 && !isFinished) {
      setIsFinished(true);
      onUpdate(timer.id, { isRunning: false }); // Stop the timer logically
      // Trigger alert logic here (e.g., via context or prop)
      console.log(`Timer "${timer.label}" finished!`);
    }

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer.isRunning, timer.remainingTime, timer.id, onUpdate, isFinished]);

  const handleTogglePlayPause = () => {
    if (timer.remainingTime <= 0) return; // Don't restart finished timer
    setIsFinished(false); // Reset finished state if paused and restarted
    onUpdate(timer.id, { isRunning: !timer.isRunning });
  };

  const handleReset = () => {
    setIsFinished(false);
    onUpdate(timer.id, {
      remainingTime: timer.initialDuration,
      isRunning: false,
    });
  };

  const handleRemove = () => {
    onRemove(timer.id);
  };

  const progress = (timer.initialDuration - timer.remainingTime) / timer.initialDuration * 100;

  return (
    <div className={cn(
      "p-3 border rounded-md mb-2",
      isFinished 
        ? 'bg-red-100 dark:bg-red-900/50 border-red-400 dark:border-red-700 animate-pulse' 
        : 'bg-background'
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm truncate pr-2" title={timer.label}>{timer.label || 'Timer'}</span>
        <span className={cn(
          "font-mono text-lg font-semibold",
          isFinished ? 'text-red-600 dark:text-red-400' : 'text-foreground'
        )}>
          {formatTime(timer.remainingTime)}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-1.5 mb-3">
        <div
          className={cn(
            "h-1.5 rounded-full",
            isFinished ? 'bg-red-500 dark:bg-red-400' : 'bg-primary'
          )}
          style={{ width: `${isFinished ? 100 : progress}%` }}
        ></div>
      </div>
      <div className="flex justify-end space-x-1">
        <Button variant="ghost" size="icon" onClick={handleTogglePlayPause} disabled={timer.remainingTime <= 0 && !isFinished} aria-label={timer.isRunning ? 'Pause' : 'Play'}>
          {timer.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleReset} aria-label="Reset">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRemove} aria-label="Remove">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default CookingTimer;
