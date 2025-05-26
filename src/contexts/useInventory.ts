import { useContext } from 'react';
// Update import path to the definition file
import { InventoryContext, InventoryContextType } from './InventoryContextDefinition';

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};