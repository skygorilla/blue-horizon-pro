
// Basic types
export interface Ingredient {
  name: string;
  amount: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  quantity_in_stock: number;
  unit_price?: number;
  category_id?: string;
  supplier_id?: string;
  last_updated?: string;
  created_at?: string;
}

export interface Recipe {
  id: string;
  title: string;
  name: string;
  ingredients: string;
  instructions: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  guestType: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  lastUsed?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  amount: string;
  checked: boolean;
  unit_price?: number;
  supplier_id?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';
