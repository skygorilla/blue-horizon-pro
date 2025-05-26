
/**
 * Utility functions for handling inventory data in local storage
 */

import { InventoryItem } from '@/types/mealPlanTypes';

const STORAGE_KEY = 'mealplanner_inventory';

/**
 * Get inventory items from local storage
 * @returns Array of InventoryItem objects
 */
export const getInventoryFromLocalStorage = (): InventoryItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedInventory = localStorage.getItem(STORAGE_KEY);
    return storedInventory ? JSON.parse(storedInventory) : [];
  } catch (error) {
    console.error('Error retrieving inventory from local storage:', error);
    return [];
  }
};

/**
 * Save inventory items to local storage
 * @param items Array of InventoryItem objects to save
 */
export const saveInventoryToLocalStorage = (items: InventoryItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving inventory to local storage:', error);
  }
};

/**
 * Add a single inventory item to local storage
 * @param item InventoryItem object to add
 * @returns Updated array of inventory items
 */
export const addInventoryItemToLocalStorage = (item: InventoryItem): InventoryItem[] => {
  const inventoryItems = getInventoryFromLocalStorage();
  const updatedInventory = [...inventoryItems, item];
  saveInventoryToLocalStorage(updatedInventory);
  return updatedInventory;
};

/**
 * Update an inventory item in local storage
 * @param id ID of the inventory item to update
 * @param updatedItem Updated InventoryItem object
 * @returns Updated array of inventory items
 */
export const updateInventoryItemInLocalStorage = (id: string, updatedItem: InventoryItem): InventoryItem[] => {
  const inventoryItems = getInventoryFromLocalStorage();
  const updatedInventory = inventoryItems.map(item => 
    item.id === id ? updatedItem : item
  );
  saveInventoryToLocalStorage(updatedInventory);
  return updatedInventory;
};

/**
 * Delete an inventory item from local storage
 * @param id ID of the inventory item to delete
 * @returns Updated array of inventory items without the deleted item
 */
export const deleteInventoryItemInLocalStorage = (id: string): InventoryItem[] => {
  const inventoryItems = getInventoryFromLocalStorage();
  const updatedInventory = inventoryItems.filter(item => item.id !== id);
  saveInventoryToLocalStorage(updatedInventory);
  return updatedInventory;
};

/**
 * Adjust the stock of an inventory item in local storage
 * @param id ID of the inventory item to adjust
 * @param amount Amount to adjust (positive to add, negative to subtract)
 * @returns Updated array of inventory items
 */
export const adjustInventoryStockInLocalStorage = (id: string, amount: number): InventoryItem[] => {
  const inventoryItems = getInventoryFromLocalStorage();
  const updatedInventory = inventoryItems.map(item => {
    if (item.id === id) {
      const newQuantity = Math.max(0, item.quantityInStock + amount);
      return {
        ...item,
        quantityInStock: newQuantity,
        lastUpdated: new Date().toISOString()
      };
    }
    return item;
  });
  saveInventoryToLocalStorage(updatedInventory);
  return updatedInventory;
};
