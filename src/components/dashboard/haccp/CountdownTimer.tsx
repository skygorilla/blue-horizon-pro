import React from 'react';
import { parseISO, differenceInHours, differenceInMinutes } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle } from 'lucide-react';

interface CountdownTimerProps {
  expiresAt: string;
  preparedAt: string;
  shelfLife: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt, preparedAt, shelfLife }) => {
  const now = new Date();
  const expires = parseISO(expiresAt);
  const prepared = parseISO(preparedAt);
  
  // Calculate total duration and time elapsed
  const totalDurationHours = shelfLife;
  const elapsedHours = differenceInHours(now, prepared);
  const remainingHours = differenceInHours(expires, now);
  
  // Calculate progress percentage (how much time has elapsed)
  const progressPercentage = Math.min(100, Math.max(0, (elapsedHours / totalDurationHours) * 100));
  
  // Determine status based on remaining time
  let status = 'ok';
  let statusText = '';
  let progressColor = '';
  
  if (now > expires) {
    status = 'expired';
    statusText = 'Isteklo';
    progressColor = 'bg-red-500';
  } else if (remainingHours <= 12) {
    status = 'critical';
    statusText = 'Kritično';
    progressColor = 'bg-red-500';
  } else if (remainingHours <= 24) {
    status = 'warning';
    statusText = 'Upozorenje';
    progressColor = 'bg-amber-500';
  } else {
    statusText = 'U redu';
    progressColor = 'bg-green-500';
  }
  
  // Format remaining time
  const formatRemainingTime = () => {
    if (now > expires) {
      const minutesOverdue = differenceInMinutes(now, expires);
      const hoursOverdue = Math.floor(minutesOverdue / 60);
      const remainingMinutes = minutesOverdue % 60;
      
      return `Isteklo prije ${hoursOverdue}h ${remainingMinutes}m`;
    }
    
    const minutesRemaining = differenceInMinutes(expires, now);
    const hours = Math.floor(minutesRemaining / 60);
    const minutes = minutesRemaining % 60;
    
    return `${hours}h ${minutes}m preostalo`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Rok trajanja:</span>
        </div>
        
        <div className={`flex items-center text-sm font-medium ${
          status === 'expired' || status === 'critical' 
            ? 'text-red-600' 
            : status === 'warning' 
              ? 'text-amber-600' 
              : 'text-green-600'
        }`}>
          {status === 'expired' || status === 'critical' ? (
            <AlertTriangle className="w-4 h-4 mr-1" />
          ) : null}
          {formatRemainingTime()}
        </div>
      </div>
      
      <Progress
        value={progressPercentage}
        max={100}
        className={`h-2 w-full ${
          status === 'critical' ? '[&>*]:bg-red-500' :
          status === 'warning' ? '[&>*]:bg-yellow-500' :
          status === 'ok' ? '[&>*]:bg-green-500' : ''
        }`}
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0h</span>
        <span className={`font-medium ${
          status === 'expired' ? 'text-red-600' : ''
        }`}>
          {Math.round(totalDurationHours)}h ({Math.round(totalDurationHours/24)} dana)
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;