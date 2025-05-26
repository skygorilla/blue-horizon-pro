
import { ShoppingItem, InventoryItem } from '@/types/mealPlanTypes';

export interface ShoppingContextType {
  groupSize: number;
  setGroupSize: (size: number) => void;
  buffer: number;
  setBuffer: (buffer: number) => void;
  shoppingItems: ShoppingItem[];
  setShoppingItems: (items: ShoppingItem[]) => void;
  addShoppingItem: (item: ShoppingItem) => void;
  updateShoppingItem: (id: string, changes: Partial<ShoppingItem>) => void;
  removeShoppingItem: (id: string) => void;
  toggleItemChecked: (id: string) => void;
  generateFromInventory: (inventoryItems: InventoryItem[]) => void;
  calculateTotalCost: () => number;
  isLoading: boolean;
}
