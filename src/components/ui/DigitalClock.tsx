import React, { useState, useEffect } from 'react';

interface DigitalClockProps {
  className?: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ className }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => {
      clearInterval(timerId);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`font-mono text-sm ${className}`}>
      {formatTime(time)}
    </div>
  );
};

export default DigitalClock;
