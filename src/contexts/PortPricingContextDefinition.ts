import { createContext } from 'react';

export interface PortPricingContextType {
  currentPort: string;
  setCurrentPort: (port: string) => void;
  getPriceForIngredient: (ingredient: string) => number | null;
}

export const PortPricingContext = createContext<PortPricingContextType | undefined>(undefined);