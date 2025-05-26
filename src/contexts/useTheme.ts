import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from './ThemeContextDefinition';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  // No need to check if context is undefined since we provide default values
  return context;
};