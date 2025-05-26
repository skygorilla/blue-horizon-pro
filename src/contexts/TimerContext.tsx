import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { TimerInstance } from '@/components/ui/CookingTimer'; // Import the interface
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface TimerContextType {
  timers: TimerInstance[];
  addTimer: (label: string, duration: number) => void; // duration in seconds
  updateTimer: (id: string, updates: Partial<TimerInstance>) => void;
  removeTimer: (id: string) => void;
  getRunningTimersCount: () => number;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Hook for persisting timers to local storage
const usePersistentTimers = (initialValue: TimerInstance[] = []) => {
  const [timers, setTimers] = useState<TimerInstance[]>(() => {
    try {
      const item = window.localStorage.getItem('cookingTimers');
      // Add validation/migration logic if needed
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading timers from localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('cookingTimers', JSON.stringify(timers));
    } catch (error) {
      console.error("Error saving timers to localStorage", error);
    }
  }, [timers]);

  return [timers, setTimers] as const;
};

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = usePersistentTimers([]);
  const { toast } = useToast();

  // Check for finished timers periodically to show toast
  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach(timer => {
        if (timer.remainingTime <= 0 && !timer.isRunning && !timer.notified) { // Check if not already notified
          toast({
            title: "Timer Finished!",
            description: `Your timer "${timer.label || 'Timer'}" is done.`,
            variant: "destructive", // Use a distinct variant
            duration: 15000, // Keep toast longer
          });
          // Mark as notified to prevent repeated toasts
          updateTimer(timer.id, { notified: true });
        }
      });
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timers, toast]); // Rerun when timers change

  const addTimer = useCallback((label: string, duration: number) => {
    const newTimer: TimerInstance = {
      id: uuidv4(),
      label,
      initialDuration: duration,
      remainingTime: duration,
      isRunning: true,
      createdAt: Date.now(),
      notified: false, // Add notified flag
    };
    setTimers(prev => [...prev, newTimer]);
  }, [setTimers]);

  const updateTimer = useCallback((id: string, updates: Partial<TimerInstance>) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.id === id ? { ...timer, ...updates } : timer
      )
    );
  }, [setTimers]);

  const removeTimer = useCallback((id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  }, [setTimers]);

  const getRunningTimersCount = useCallback(() => {
    return timers.filter(timer => timer.isRunning).length;
  }, [timers]);

  const value = {
    timers,
    addTimer,
    updateTimer,
    removeTimer,
    getRunningTimersCount,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimers = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimers must be used within a TimerProvider');
  }
  return context;
};
