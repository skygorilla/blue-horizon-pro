import React, { ReactNode } from 'react';
import { InventoryItem } from '@/types/mealPlanTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { 
  useFetchInventory, 
  useInventoryOperations,
  useFindInventoryItem
} from '@/utils/inventory/inventoryHooks';
import calculateRecipeCost from '@/utils/calculateRecipeCost';
// Import context and type from the definition file
import { InventoryContext, InventoryContextType } from './InventoryContextDefinition';

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use custom hooks for fetching inventory and inventory operations
  const { inventoryItems, setInventoryItems, isLoading } = useFetchInventory();
  const { addInventoryItem, updateInventoryItem, deleteInventoryItem, adjustStock } = 
    useInventoryOperations(inventoryItems, setInventoryItems);
  const { findByName } = useFindInventoryItem(inventoryItems);

  // Create the context value - ensure it matches InventoryContextType
  const value: InventoryContextType = {
    inventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    adjustStock,
    findByName,
    calculateRecipeCost: (recipe: CompleteRecipe) => calculateRecipeCost(recipe, inventoryItems),
    isLoading
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
