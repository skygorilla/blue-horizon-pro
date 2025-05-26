import { useContext } from 'react';
import { PortPricingContext, PortPricingContextType } from './PortPricingContextDefinition';

export const usePortPricing = (): PortPricingContextType => {
  const context = useContext(PortPricingContext);
  if (context === undefined) {
    throw new Error('usePortPricing must be used within a PortPricingProvider');
  }
  return context;
};