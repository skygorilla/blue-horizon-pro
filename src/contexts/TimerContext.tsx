
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TimerInstance } from '@/types/timer';

interface TimerContextType {
  timers: TimerInstance[];
  addTimer: (name: string, duration: number) => string;
  removeTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  clearAllTimers: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<TimerInstance[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (timer.isActive && timer.remainingTime > 0) {
            const newRemainingTime = timer.remainingTime - 1;
            
            // Check if timer just completed
            if (newRemainingTime === 0) {
              // Show notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(`Timer "${timer.name}" completed!`);
              }
              
              return {
                ...timer,
                remainingTime: 0,
                isActive: false,
                notified: true
              };
            }
            
            return {
              ...timer,
              remainingTime: newRemainingTime
            };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = (name: string, duration: number): string => {
    const id = Date.now().toString();
    const newTimer: TimerInstance = {
      id,
      name,
      duration,
      remainingTime: duration,
      isActive: false,
      notified: false
    };
    
    setTimers(prev => [...prev, newTimer]);
    return id;
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const pauseTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isActive: false } : timer
    ));
  };

  const resumeTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isActive: true } : timer
    ));
  };

  const resetTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, remainingTime: timer.duration, isActive: false, notified: false }
        : timer
    ));
  };

  const clearAllTimers = () => {
    setTimers([]);
  };

  return (
    <TimerContext.Provider value={{
      timers,
      addTimer,
      removeTimer,
      pauseTimer,
      resumeTimer,
      resetTimer,
      clearAllTimers
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

// Export useTimers as an alias for useTimer for backward compatibility
export const useTimers = useTimer;
