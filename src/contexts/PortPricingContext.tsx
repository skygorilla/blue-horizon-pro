import React, { useState, ReactNode } from 'react';
import portPricingData from '@/data/portPricingData';
import { PortPricingContext, PortPricingContextType } from './PortPricingContextDefinition';

export const PortPricingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPort, setCurrentPort] = useState<string>('Port A');

  const getPriceForIngredient = (ingredient: string): number | null => {
    return portPricingData[currentPort]?.[ingredient] || null;
  };

  return (
    <PortPricingContext.Provider value={{ currentPort, setCurrentPort, getPriceForIngredient }}>
      {children}
    </PortPricingContext.Provider>
  );
};