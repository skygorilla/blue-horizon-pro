import { createContext } from 'react';
import { InventoryItem } from '@/types/mealPlanTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';

// Define the context type
export interface InventoryContextType {
  inventoryItems: InventoryItem[];
  addInventoryItem: (item: InventoryItem) => Promise<void>;
  updateInventoryItem: (id: string, item: InventoryItem) => Promise<void>;
  deleteInventoryItem: (id: string) => Promise<void>;
  adjustStock: (id: string, amount: number) => Promise<void>;
  findByName: (name: string) => InventoryItem | undefined;
  calculateRecipeCost: (recipe: CompleteRecipe) => number;
  isLoading: boolean;
}

// Create the context itself
export const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
