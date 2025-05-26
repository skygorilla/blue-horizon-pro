import { MealType } from '../mealTypes';
import { GuestTypeCode } from '../../guest/guestTypes';
import { NutritionInfo } from '../../nutrition/nutritionTypes';

// Define an interface for ingredient list
export interface IngredientItem {
  ingredient: string;
  qty_g?: number;
  qty_ml?: number;
}

export interface Recipe {
  id: string;
  name: string;
  title?: string; // For backwards compatibility
  type?: string;
  ingredients: string | IngredientItem[] | Record<string, unknown>; // Support string, structured list, or generic JSONB
  ingredient_list?: IngredientItem[];
  instructions: string;
  mealType: MealType;
  guestType: GuestTypeCode | GuestTypeCode[];
  isVegetarian?: boolean; // Add optional vegetarian flag
  servings?: number;
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  difficulty?: string;
  calories?: number;
  costPerServingUSD?: number;
  lastUsed?: string;
  nutritionInfo?: NutritionInfo;
  description?: string;
  shelf_life_h?: number;
  imageUrl?: string; // Add optional image URL property
}
