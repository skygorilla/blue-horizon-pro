import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// Add type definition for window.translations
declare global {
  interface Window {
    translations: Record<string, string>;
    registerClientLocalizations?: (translations: Record<string, string>) => void;
  }
}

// Initialize translations immediately before any other code runs
window.translations = {
  // Common UI elements
  'app.name': 'Blue Horizon Pro',
  'app.loading': 'Loading...',
  'app.error': 'An error occurred',
  
  // Navigation
  'nav.dashboard': 'Dashboard',
  'nav.recipes': 'Recipes',
  'nav.inventory': 'Inventory',
  'nav.mealPlanner': 'Meal Planner',
  'nav.reports': 'Reports',
  
  // Auth related
  'auth.login': 'Login',
  'auth.logout': 'Logout',
  'auth.signup': 'Sign Up',
  
  // Errors
  'error.generic': 'Something went wrong',
  'error.loading': 'Failed to load data',
  'error.notFound': 'Not found'
};

// Handle registration of client localizations
if (typeof window.registerClientLocalizations === 'function') {
  try {
    window.registerClientLocalizations(window.translations);
    console.log('Client localizations registered successfully');
  } catch (error) {
    console.error('Failed to register client localizations:', error);
  }
}

// Add global unhandled rejection listener for development
if (import.meta.env.DEV) {
  window.addEventListener('unhandledrejection', ev => {
    console.error('🔥 Unhandled promise rejection:', ev.reason);
    console.error('Rejection stack:', ev.promise);
    
    // Log more details if available
    if (ev.reason && ev.reason.stack) {
      console.error('Error stack:', ev.reason.stack);
    }
    
    // Log the source of the rejection if available
    if (ev.reason && ev.reason.source) {
      console.error('Error source:', ev.reason.source);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
