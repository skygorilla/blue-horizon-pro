
import { Recipe } from './core/baseTypes';
import { RecipeGeographyMetadata, RecipeWithGeography } from './metadata/geographyMetadata';
import { RecipeTagsMetadata, RecipeWithTags } from './metadata/tagsMetadata';
import { RecipeFilters } from './filtering/filterTypes';
import { MealType } from './mealTypes';

// Define Difficulty levels
export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

// Define Nutrition Summary structure
export interface NutritionSummary {
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

// Extend the base Recipe type with new fields
export interface ExtendedRecipeData {
  imageUrl?: string;
  mealType: MealType;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  totalTimeMinutes?: number;
  servings?: number;
  difficulty?: RecipeDifficulty;
  averageRating?: number;
  reviewCount?: number;
  nutritionSummary?: NutritionSummary;
  isFavorite?: boolean;
}

// Complete recipe type with all metadata and new fields
export type CompleteRecipe = Recipe &
  RecipeGeographyMetadata &
  RecipeTagsMetadata &
  ExtendedRecipeData;

export type GuestTypeCode = 'A' | 'B' | 'C' | 'D' | 'all' | 'owner' | 'guest' | 'crew' | 'both';

export interface GuestTypeInfo {
  id: string;
  code: GuestTypeCode;
  name: string;
  description: string;
  shortDescription: string;
  mealPattern: string[];
  category: string;
  icon: string;
}

export const GUEST_TYPES: GuestTypeInfo[] = [
  { 
    id: '1', 
    code: 'A', 
    name: 'Adults', 
    description: 'Regular adult meals', 
    shortDescription: 'Breakfast and Lunch only',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Recreation',
    icon: 'Sun'
  },
  { 
    id: '2', 
    code: 'B', 
    name: 'Children', 
    description: 'Kid-friendly meals', 
    shortDescription: 'Kid-friendly meals',
    mealPattern: ['breakfast', 'lunch'],
    category: 'Kids',
    icon: 'Child'
  },
  { 
    id: '3', 
    code: 'C', 
    name: 'Vegetarian', 
    description: 'No meat or fish', 
    shortDescription: 'No meat or fish',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Dietary',
    icon: 'Leaf'
  },
  { 
    id: '4', 
    code: 'D', 
    name: 'Vegan', 
    description: 'Plant-based only', 
    shortDescription: 'Plant-based only',
    mealPattern: ['breakfast', 'dinner'],
    category: 'Dietary',
    icon: 'Seedling'
  }
];

export interface MenuPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  guestCounts: GuestCount[];
  mealAssignments: MealAssignment[];
}

export interface GuestCount {
  id: string;
  guestTypeId: string;
  guestTypeCode: GuestTypeCode;
  count: number;
}

export interface MealAssignment {
  id: string;
  menuId: string;
  recipeId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  dayOfWeek: number;
}

// Update Recipe interface to include isVegetarian and title as required
export interface Recipe {
  id: string;
  title: string; // Make title required
  name: string;
  ingredients: string;
  instructions: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  guestType: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  lastUsed?: string;
  isVegetarian?: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  unit_price?: number;
  estimated_cost?: number;
  purchased?: boolean;
  notes?: string;
  checked?: boolean;
  amount?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  unit_price?: number;
  restock_needed?: boolean;
  notes?: string;
  quantity_in_stock?: number;
  category_id?: string;
  supplier_id?: string;
  last_updated?: string;
}

// Re-export all recipe-related types
export type {
  Recipe as BaseRecipe,
  RecipeGeographyMetadata,
  RecipeWithGeography,
  RecipeTagsMetadata,
  RecipeWithTags,
  RecipeFilters
};

// Re-export meal type related constants
export { MEAL_TYPE_ICONS } from './mealTypes';
