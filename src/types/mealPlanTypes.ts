import { Recipe } from './core/baseTypes';
import { RecipeGeographyMetadata, RecipeWithGeography } from './metadata/geographyMetadata';
import { RecipeTagsMetadata, RecipeWithTags } from './metadata/tagsMetadata';
import { RecipeFilters } from './filtering/filterTypes';
import { MealType } from './mealTypes'; // Import MealType

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
  imageUrl?: string; // For appealing photography
  mealType: MealType; // For visual distinction
  prepTimeMinutes?: number; // Key info
  cookTimeMinutes?: number; // Key info
  totalTimeMinutes?: number; // Calculated or stored
  servings?: number; // Key info
  difficulty?: RecipeDifficulty; // Key info
  averageRating?: number; // User ratings
  reviewCount?: number; // User reviews
  nutritionSummary?: NutritionSummary; // Nutritional info
  isFavorite?: boolean; // For saved/favorites section
}

// Complete recipe type with all metadata and new fields
export type CompleteRecipe = Recipe &
  RecipeGeographyMetadata &
  RecipeTagsMetadata &
  ExtendedRecipeData; // Add the new fields

export type GuestTypeCode = 'all' | 'owner' | 'guest' | 'crew' | 'both';

export interface GuestTypeInfo {
  code: GuestTypeCode;
  name: string;
  description: string;
}

export const GUEST_TYPES: GuestTypeInfo[] = [
  { code: 'all', name: 'All Guests', description: 'All guest types' },
  { code: 'owner', name: 'Owner', description: 'Boat owner' },
  { code: 'guest', name: 'Guest', description: 'Invited guests' },
  { code: 'crew', name: 'Crew', description: 'Crew members' },
  { code: 'both', name: 'Both', description: 'Owner and guests' }
];

export interface MenuPlan {
  id: string;
  name: string;
  meals: Record<string, any>;
}

// Update Recipe interface to include isVegetarian
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
  isVegetarian?: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  unit_price?: number; // Use snake_case to match the errors
  estimated_cost?: number;
  purchased?: boolean;
  notes?: string;
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
}

// Re-export all recipe-related types
export type {
  Recipe,
  RecipeGeographyMetadata,
  RecipeWithGeography,
  RecipeTagsMetadata,
  RecipeWithTags,
  RecipeFilters
};

// Re-export meal type related constants
export { MEAL_TYPE_ICONS } from './mealTypes';
