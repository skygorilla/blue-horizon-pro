
/**
 * Hook for fetching inventory items
 */

import { useState, useEffect } from 'react';
import { InventoryItem } from '@/types/mealPlanTypes';
import { fetchInventoryFromDatabase } from '../databaseUtils';
import { getInventoryFromLocalStorage } from '../localStorageUtils';

/**
 * Hook for fetching inventory items
 */
export const useFetchInventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInventoryFromDatabase();
        setInventoryItems(data);
      } catch (error) {
        console.error('Error in useFetchInventory:', error);
        // Fall back to localStorage
        const storedInventory = getInventoryFromLocalStorage();
        setInventoryItems(storedInventory);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return { inventoryItems, setInventoryItems, isLoading };
};
