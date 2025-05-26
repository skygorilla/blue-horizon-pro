import React, { createContext, useContext, useState } from 'react';

// Define the shape of the UI settings context
interface UISettingsContextProps {
  touchMode: boolean;
  highContrastMode: boolean;
  toggleTouchMode: () => void;
  toggleHighContrastMode: () => void;
}

// Create the context
const UISettingsContext = createContext<UISettingsContextProps | undefined>(undefined);

// Create a provider component
export const UISettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [touchMode, setTouchMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);

  const toggleTouchMode = () => setTouchMode((prev) => !prev);
  const toggleHighContrastMode = () => setHighContrastMode((prev) => !prev);

  return (
    <UISettingsContext.Provider
      value={{ touchMode, highContrastMode, toggleTouchMode, toggleHighContrastMode }}
    >
      {children}
    </UISettingsContext.Provider>
  );
};

export { UISettingsContext, UISettingsContextProps };