
/**
 * Hook for inventory operations
 */

import { InventoryItem } from '@/types/mealPlanTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  addInventoryItemToDatabase,
  updateInventoryItemInDatabase,
  deleteInventoryItemFromDatabase,
  adjustInventoryStockInDatabase
} from '../databaseUtils';
import {
  addInventoryItemToLocalStorage,
  updateInventoryItemInLocalStorage,
  deleteInventoryItemInLocalStorage,
  adjustInventoryStockInLocalStorage
} from '../localStorageUtils';

/**
 * Hook for inventory operations
 */
export const useInventoryOperations = (
  inventoryItems: InventoryItem[],
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
) => {
  // Add a new inventory item
  const addInventoryItem = async (item: InventoryItem) => {
    try {
      // Generate UUID if not provided
      const itemWithId = item.id ? item : { ...item, id: uuidv4() };
      
      // Try to add to database
      const success = await addInventoryItemToDatabase(itemWithId);
      
      if (!success) {
        // Fallback to local storage
        const updatedInventory = addInventoryItemToLocalStorage(itemWithId);
        setInventoryItems(updatedInventory);
      } else {
        // Update local state
        setInventoryItems(prevItems => [...prevItems, itemWithId]);
        toast.success('Inventory item added successfully');
      }
    } catch (error) {
      console.error('Error in addInventoryItem:', error);
      toast.error('An unexpected error occurred');
      
      // Fallback to local storage
      const updatedInventory = addInventoryItemToLocalStorage(item);
      setInventoryItems(updatedInventory);
    }
  };

  // Update an existing inventory item
  const updateInventoryItem = async (id: string, updatedItem: InventoryItem) => {
    try {
      // Try to update in database
      await updateInventoryItemInDatabase(id, updatedItem);
      
      // Update local state regardless of database result
      const updatedInventory = updateInventoryItemInLocalStorage(id, updatedItem);
      setInventoryItems(updatedInventory);
      toast.success('Inventory item updated successfully');
    } catch (error) {
      console.error('Error in updateInventoryItem:', error);
      toast.error('An unexpected error occurred');
      
      // Fallback to local storage update
      const updatedInventory = updateInventoryItemInLocalStorage(id, updatedItem);
      setInventoryItems(updatedInventory);
    }
  };

  // Delete an inventory item
  const deleteInventoryItem = async (id: string) => {
    try {
      // Try to delete from database
      await deleteInventoryItemFromDatabase(id);
      
      // Update local state
      const filteredInventory = deleteInventoryItemInLocalStorage(id);
      setInventoryItems(filteredInventory);
      toast.success('Inventory item deleted successfully');
    } catch (error) {
      console.error('Error in deleteInventoryItem:', error);
      toast.error('An unexpected error occurred');
      
      // Fallback to local storage update
      const filteredInventory = deleteInventoryItemInLocalStorage(id);
      setInventoryItems(filteredInventory);
    }
  };

  // Adjust inventory stock
  const adjustStock = async (id: string, amount: number) => {
    try {
      const item = inventoryItems.find(item => item.id === id);
      if (!item) return;
      
      // Try to update in database
      await adjustInventoryStockInDatabase(id, item.quantityInStock + amount);
      
      // Update local state
      const updatedInventory = adjustInventoryStockInLocalStorage(id, amount);
      setInventoryItems(updatedInventory);
      
      if (amount > 0) {
        toast.success(`Added ${amount} to ${item.name} stock`);
      } else {
        toast.success(`Removed ${Math.abs(amount)} from ${item.name} stock`);
      }
    } catch (error) {
      console.error('Error in adjustStock:', error);
      toast.error('An unexpected error occurred');
      
      // Fallback to local storage update
      const updatedInventory = adjustInventoryStockInLocalStorage(id, amount);
      setInventoryItems(updatedInventory);
    }
  };

  return {
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    adjustStock
  };
};
