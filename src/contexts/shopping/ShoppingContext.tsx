import { createContext, useContext } from 'react';
import { ShoppingContextType } from './types';

export const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

// Create a hook to use the Shopping context
export const useShopping = (): ShoppingContextType => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};
