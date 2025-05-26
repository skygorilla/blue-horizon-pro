/// <reference types="vite/client" />

// Extend the Window interface to include the `translations` property
declare global {
  interface Window {
    translations?: Record<string, string>;
  }
}
