import type { Icon } from 'lucide-react';
import {
  Salad, Utensils, Soup, SquareStack, CakeSlice, EggFried, Sandwich, Box, UtensilsCrossed,
  Moon, GlassWater, Cookie, CookingPot, Wheat, Martini
} from 'lucide-react';

// Ensure MealType is the single source of truth for meal categories
export type MealType = 
  | 'starter' 
  | 'main' 
  | 'soup' 
  | 'side' 
  | 'dessert' 
  | 'breakfast' 
  | 'brunch' 
  | 'lunch'
  | 'dinner'
  | 'light-dinner' 
  | 'beverage' 
  | 'snack' 
  | 'sauce' 
  | 'baked' 
  | 'cocktail' 
  | 'salad';

// Correct Icon type usage
export const MEAL_TYPE_ICONS: Record<MealType, typeof Salad> = {
  'starter': Salad,
  'main': Utensils,
  'soup': Soup,
  'side': SquareStack,
  'dessert': CakeSlice,
  'breakfast': EggFried,
  'brunch': Sandwich,
  'lunch': Box, // Represents a lunch box/bento
  'dinner': UtensilsCrossed,
  'light-dinner': Moon,
  'beverage': GlassWater,
  'snack': Cookie,
  'sauce': CookingPot, // Placeholder, consider Pipette or similar
  'baked': Wheat, // Represents baked goods
  'cocktail': Martini,
  'salad': Salad
};

// Keep MEAL_TYPE_COLORS as is for now, might be removed later
export const MEAL_TYPE_COLORS: Record<MealType, string> = {
  'starter': 'bg-orange-400', // Like appetizer
  'main': 'bg-red-500',
  'soup': 'bg-purple-500',
  'side': 'bg-blue-500',
  'dessert': 'bg-yellow-400',
  'breakfast': 'bg-green-500',
  'brunch': 'bg-teal-500',
  'lunch': 'bg-indigo-500',
  'dinner': 'bg-gray-700',
  'light-dinner': 'bg-gray-500',
  'beverage': 'bg-cyan-500',
  'snack': 'bg-amber-500',
  'sauce': 'bg-lime-500',
  'baked': 'bg-pink-500',
  'cocktail': 'bg-rose-500',
  'salad': 'bg-emerald-500'
};

// Fix type inference issue in getMealTypeDisplayName
export const getMealTypeDisplayName = (type: MealType): string => {
  switch (type) {
    case 'starter': return 'Appetizer';
    case 'main': return 'Main Course';
    case 'soup': return 'Soup';
    case 'side': return 'Side Dish';
    case 'dessert': return 'Dessert';
    case 'breakfast': return 'Breakfast';
    case 'brunch': return 'Brunch';
    case 'lunch': return 'Lunch';
    case 'dinner': return 'Dinner';
    case 'light-dinner': return 'Light Dinner';
    case 'beverage': return 'Beverage';
    case 'snack': return 'Snack';
    case 'sauce': return 'Sauce';
    case 'baked': return 'Bakery Product';
    case 'cocktail': return 'Cocktail';
    case 'salad': return 'Salad';
    default: return (type as string).charAt(0).toUpperCase() + (type as string).slice(1);
  }
};
