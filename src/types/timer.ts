
export interface TimerInstance {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  isActive: boolean;
  notified: boolean;
}
