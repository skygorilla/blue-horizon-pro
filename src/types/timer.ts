
export interface TimerInstance {
  id: string;
  name: string;
  duration: number; // in seconds
  remainingTime: number; // in seconds
  isActive: boolean;
  notified: boolean;
}

export interface TimerContextType {
  timers: TimerInstance[];
  addTimer: (name: string, duration: number) => string;
  removeTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  clearAllTimers: () => void;
}
