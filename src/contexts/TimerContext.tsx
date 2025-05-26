
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { TimerInstance } from '@/types/timer';

interface TimerContextType {
  timers: TimerInstance[];
  addTimer: (name: string, duration: number) => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<TimerInstance[]>([]);

  const addTimer = useCallback((name: string, duration: number) => {
    const newTimer: TimerInstance = {
      id: Date.now().toString(),
      name,
      duration,
      startTime: 0,
      isActive: false,
      notified: false,
    };
    setTimers(prev => [...prev, newTimer]);
  }, []);

  const removeTimer = useCallback((id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  }, []);

  const startTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, isActive: true, startTime: Date.now(), notified: false }
        : timer
    ));
  }, []);

  const pauseTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, isActive: false }
        : timer
    ));
  }, []);

  const resetTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, isActive: false, startTime: 0, notified: false }
        : timer
    ));
  }, []);

  // Check for timer completion
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.isActive && !timer.notified && timer.startTime > 0) {
          const elapsed = Date.now() - timer.startTime;
          if (elapsed >= timer.duration * 1000) {
            // Timer completed - send notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer Complete!', {
                body: `${timer.name} timer has finished`,
                icon: '/favicon.ico'
              });
            }
            return { ...timer, isActive: false, notified: true };
          }
        }
        return timer;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    timers,
    addTimer,
    removeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
