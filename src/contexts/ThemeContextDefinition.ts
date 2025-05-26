import { createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system' | 'high-contrast';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Default value for the context
export const defaultThemeContext: ThemeContextType = {
  theme: 'system',
  setTheme: () => console.warn('setTheme called outside of ThemeProvider'),
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);