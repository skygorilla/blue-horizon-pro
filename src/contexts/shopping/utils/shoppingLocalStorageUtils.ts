
import { ShoppingItem } from '@/types/mealPlanTypes';

/**
 * Save settings to local storage
 */
export const saveSettingsToLocalStorage = (groupSize: number, buffer: number): void => {
  localStorage.setItem('mealplanner_settings', JSON.stringify({ groupSize, buffer }));
};

/**
 * Load settings from local storage
 * @returns An object with groupSize and buffer or null if not found
 */
export const loadSettingsFromLocalStorage = (): { groupSize: number, buffer: number } | null => {
  const savedSettings = localStorage.getItem('mealplanner_settings');
  if (savedSettings) {
    try {
      const { groupSize, buffer } = JSON.parse(savedSettings);
      return { 
        groupSize: groupSize || 16, 
        buffer: buffer || 10 
      };
    } catch (error) {
      console.error("Error parsing saved settings:", error);
      return null;
    }
  }
  return null;
};

/**
 * Load shopping items from local storage
 */
export const loadShoppingItemsFromLocalStorage = (fallbackItems: ShoppingItem[]): ShoppingItem[] => {
  const savedItems = localStorage.getItem('mealplanner_shopping');
  return savedItems ? JSON.parse(savedItems) : fallbackItems;
};

/**
 * Save shopping items to local storage
 */
export const saveShoppingItemsToLocalStorage = (items: ShoppingItem[]): void => {
  localStorage.setItem('mealplanner_shopping', JSON.stringify(items));
};
