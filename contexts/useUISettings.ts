import { useContext } from 'react';
import { UISettingsContext, UISettingsContextProps } from './UISettingsContext';

export const useUISettings = (): UISettingsContextProps => {
  const context = useContext(UISettingsContext);
  if (!context) {
    throw new Error('useUISettings must be used within a UISettingsProvider');
  }
  return context;
};