
import React, { useState, useEffect, ReactNode } from 'react';
import { ShoppingItem, InventoryItem } from '@/types/mealPlanTypes';
import { sampleShoppingItems } from '@/data/mealData';
import { toast } from 'sonner';
import { ShoppingContext } from './ShoppingContext';
import { 
  fetchShoppingList,
  addShoppingItemToDatabase,
  updateShoppingItemInDatabase,
  removeShoppingItemFromDatabase,
  insertSampleShoppingItems
} from './utils/shoppingDatabaseUtils';
import {
  saveSettingsToLocalStorage,
  loadSettingsFromLocalStorage,
  loadShoppingItemsFromLocalStorage
} from './utils/shoppingLocalStorageUtils';
import {
  calculateTotalCost,
  convertInventoryToShoppingItems
} from './utils/shoppingUtils';

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [groupSize, setGroupSize] = useState(16);
  const [buffer, setBuffer] = useState(10);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load shopping list data from Supabase
  useEffect(() => {
    const loadShoppingList = async () => {
      try {
        setIsLoading(true);
        const data = await fetchShoppingList();
        
        if (data && data.length > 0) {
          setShoppingItems(data);
        } else {
          // If no data in Supabase, use sample data
          setShoppingItems(sampleShoppingItems);
          
          // Save sample data to Supabase for future use
          await insertSampleShoppingItems(sampleShoppingItems);
        }
      } catch (error) {
        console.error("Error loading shopping list:", error);
        // Fall back to localStorage
        const items = loadShoppingItemsFromLocalStorage(sampleShoppingItems);
        setShoppingItems(items);
      } finally {
        setIsLoading(false);
      }
    };

    loadShoppingList();
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    saveSettingsToLocalStorage(groupSize, buffer);
  }, [groupSize, buffer]);

  // Load settings from localStorage
  useEffect(() => {
    const settings = loadSettingsFromLocalStorage();
    if (settings) {
      setGroupSize(settings.groupSize);
      setBuffer(settings.buffer);
    }
  }, []);

  const addShoppingItem = async (item: ShoppingItem) => {
    try {
      await addShoppingItemToDatabase(item);
      
      // Add to local state
      setShoppingItems(prevItems => [...prevItems, item]);
      toast.success("Item added to shopping list");
    } catch (error) {
      // Error is already logged and toasted in the utility function
    }
  };

  const updateShoppingItem = async (id: string, changes: Partial<ShoppingItem>) => {
    try {
      await updateShoppingItemInDatabase(id, changes);
      
      // Update local state
      setShoppingItems(prevItems => 
        prevItems.map(item => item.id === id ? { ...item, ...changes } : item)
      );
    } catch (error) {
      // Error is already logged and toasted in the utility function
    }
  };

  const removeShoppingItem = async (id: string) => {
    try {
      await removeShoppingItemFromDatabase(id);
      
      // Update local state
      setShoppingItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success("Item removed from shopping list");
    } catch (error) {
      // Error is already logged and toasted in the utility function
    }
  };

  const toggleItemChecked = async (id: string) => {
    const item = shoppingItems.find(item => item.id === id);
    if (item) {
      await updateShoppingItem(id, { checked: !item.checked });
    }
  };

  const generateFromInventory = async (inventoryItems: InventoryItem[]) => {
    try {
      // Convert inventory items to shopping items
      const uniqueNewItems = convertInventoryToShoppingItems(inventoryItems, shoppingItems);

      // Batch insert new items
      if (uniqueNewItems.length > 0) {
        await insertSampleShoppingItems(uniqueNewItems);

        // Update local state
        setShoppingItems([...shoppingItems, ...uniqueNewItems]);
        toast.success(`Added ${uniqueNewItems.length} items to shopping list`);
      } else {
        toast.info("No new items to add to shopping list");
      }
    } catch (error) {
      console.error("Unexpected error in generateFromInventory:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const value = {
    groupSize,
    setGroupSize,
    buffer,
    setBuffer,
    shoppingItems,
    setShoppingItems,
    addShoppingItem,
    updateShoppingItem,
    removeShoppingItem,
    toggleItemChecked,
    generateFromInventory,
    calculateTotalCost: () => calculateTotalCost(shoppingItems),
    isLoading
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};
