
/**
 * Hook for finding inventory items
 */

import { InventoryItem } from '@/types/mealPlanTypes';

/**
 * Hook for finding inventory items by name
 */
export const useFindInventoryItem = (inventoryItems: InventoryItem[]) => {
  // Find an inventory item by name
  const findByName = (name: string): InventoryItem | undefined => {
    return inventoryItems.find(item => 
      item.name.toLowerCase() === name.toLowerCase()
    );
  };

  return { findByName };
};
