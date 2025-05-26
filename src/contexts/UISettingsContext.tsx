import React, { useState, useEffect, useContext } from 'react';
import { UISettingsContext, UISettingsContextType } from './UISettingsContextDefinition';

// Add the hook to use the context
export const useUISettings = (): UISettingsContextType => {
  const context = useContext(UISettingsContext);
  if (context === undefined) {
    throw new Error('useUISettings must be used within a UISettingsProvider');
  }
  return context;
};

export const UISettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to false
  const [touchMode, setTouchMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('touchMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [highContrastMode, setHighContrastMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('highContrastMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [showPriceInfo, setShowPriceInfo] = useState<boolean>(() => {
    const saved = localStorage.getItem('showPriceInfo');
    return saved ? JSON.parse(saved) : true; // Default to true
  });

  useEffect(() => {
    localStorage.setItem('touchMode', JSON.stringify(touchMode));
    
    // Apply touch mode classes to document
    if (touchMode) {
      document.documentElement.classList.add('touch-mode');
    } else {
      document.documentElement.classList.remove('touch-mode');
    }
  }, [touchMode]);

  useEffect(() => {
    localStorage.setItem('highContrastMode', JSON.stringify(highContrastMode));
    
    // Apply high contrast mode classes to document
    if (highContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrastMode]);

  useEffect(() => {
    localStorage.setItem('showPriceInfo', JSON.stringify(showPriceInfo));
  }, [showPriceInfo]);

  const toggleTouchMode = () => {
    setTouchMode(prev => !prev);
  };

  const toggleHighContrastMode = () => {
    setHighContrastMode(prev => !prev);
  };

  const toggleShowPriceInfo = () => {
    setShowPriceInfo(prev => !prev);
  };

  return (
    <UISettingsContext.Provider 
      value={{ 
        touchMode, 
        toggleTouchMode, 
        highContrastMode, 
        toggleHighContrastMode, 
        showPriceInfo, 
        toggleShowPriceInfo 
      }}
    >
      {children}
    </UISettingsContext.Provider>
  );
};
