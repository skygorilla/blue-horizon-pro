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
