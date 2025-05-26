import { useContext } from 'react';
import { UISettingsContext, UISettingsContextType } from './UISettingsContextDefinition';

export const useUISettings = (): UISettingsContextType => {
  const context = useContext(UISettingsContext);
  if (context === undefined) {
    throw new Error('useUISettings must be used within a UISettingsProvider');
  }
  return context;
};