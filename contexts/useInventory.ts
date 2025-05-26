import { useContext } from 'react';
import { InventoryContext, InventoryContextProps } from './InventoryContext';

export const useInventory = (): InventoryContextProps => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};