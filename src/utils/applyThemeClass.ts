import { Theme } from '@/contexts/ThemeContextDefinition';

/**
 * Applies the selected theme class to the document root element with smooth transitions
 * @param themeToApply - The theme to apply ('light', 'dark', 'system', or 'high-contrast')
 */
const applyThemeClass = (themeToApply: Theme) => {
  const root = window.document.documentElement;
  
  // First, add a transition class to enable animations
  root.classList.add('theme-transition');
  
  // Remove previous theme classes
  root.classList.remove('high-contrast', 'dark');

  // Apply the appropriate theme class
  if (themeToApply === 'high-contrast') {
    root.classList.add('high-contrast');
  } else if (themeToApply === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', systemDark);
  } else {
    const isDark = themeToApply === 'dark';
    root.classList.toggle('dark', isDark);
  }

  // Optional: Force a reflow to ensure transitions work properly
  // This is a small performance hit but ensures smoother transitions
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window.getComputedStyle(root).opacity;
  
  // Remove the transition class after animations complete
  const transitionDuration = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--transition-duration') || '0.3s'
  ) * 1000;
  
  setTimeout(() => {
    root.classList.remove('theme-transition');
  }, transitionDuration);
};

export default applyThemeClass;