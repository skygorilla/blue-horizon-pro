import React, { useEffect, useRef } from 'react';
import './RimLight.css';

interface RimLightProps {
  color?: string;
  borderRadius?: number;
  glowIntensity?: number;
  rotationSpeed?: number;
  active?: boolean;
  className?: string;
  pulseEffect?: boolean;
}

/**
 * RimLight component creates a glowing outline effect for UI elements
 * It can be wrapped around any component to add a futuristic edge glow
 */
const RimLight: React.FC<RimLightProps> = ({
  color = '#00ffff',
  borderRadius = 8,
  glowIntensity = 1,
  rotationSpeed = 30,
  active = true,
  className = '',
  pulseEffect = false
}) => {
  const rimRef = useRef<HTMLDivElement>(null);
  
  // Animate the rim light rotation
  useEffect(() => {
    if (!active || !rimRef.current) return;
    
    let angle = 0;
    let animationFrameId: number;
    
    const animate = () => {
      angle = (angle + 0.1) % 360;
      if (rimRef.current) {
        rimRef.current.style.setProperty('--rim-angle', `${angle}deg`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);
  
  return (
    <div 
      ref={rimRef}
      className={`o-rimlight ${pulseEffect ? 'pulse' : ''} ${className}`}
      style={{
        '--rim-angle': '0deg',
        '--border-radius': `${borderRadius}px`,
        '--rim-color': color,
        '--glow-intensity': glowIntensity,
        '--rotation-duration': `${rotationSpeed}s`,
        opacity: active ? 1 : 0,
        visibility: active ? 'visible' : 'hidden'
      } as React.CSSProperties}
    />
  );
};

export default RimLight;