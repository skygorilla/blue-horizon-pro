import { useEffect, useState, ReactNode, useContext } from 'react';
import applyThemeClass from '@/utils/applyThemeClass';
import { ThemeContext, Theme, ThemeContextType, defaultThemeContext } from './ThemeContextDefinition';

// Add the hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (['light', 'dark', 'system', 'high-contrast'].includes(savedTheme || '')) {
        return savedTheme as Theme;
      }
    } catch (error) {
      console.error("[ThemeProvider] Error reading localStorage:", error);
    }
    return 'system';
  });

  useEffect(() => {
    applyThemeClass(theme);

    let mediaQuery: MediaQueryList | undefined;
    let handler: (() => void) | undefined;

    if (theme === 'system') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handler = () => {
        applyThemeClass('system');
      };
      mediaQuery.addEventListener('change', handler);
    }

    return () => {
      if (mediaQuery && handler) {
        mediaQuery.removeEventListener('change', handler);
      }
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error("[ThemeProvider] Error writing to localStorage:", error);
    }
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
