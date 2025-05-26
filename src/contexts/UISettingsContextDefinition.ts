import { createContext } from 'react';

export type UISettingsContextType = {
  touchMode: boolean;
  toggleTouchMode: () => void;
  highContrastMode: boolean;
  toggleHighContrastMode: () => void;
  showPriceInfo: boolean;
  toggleShowPriceInfo: () => void;
};

export const UISettingsContext = createContext<UISettingsContextType | undefined>(undefined);