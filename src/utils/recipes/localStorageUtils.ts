/**
 * Utility functions for handling recipe data in local storage
 */

import { Recipe } from '@/types/mealPlanTypes';

const STORAGE_KEY = 'mealplanner_recipes';

/**
 * Get recipes from local storage
 * @returns Array of Recipe objects
 */
export const getRecipesFromLocalStorage = (): Recipe[] => {
  console.log('💾 localStorageUtils: Getting recipes from localStorage');
  
  if (typeof window === 'undefined') {
    console.log('💾 localStorageUtils: Window is undefined, returning empty array');
    return [];
  }
  
  try {
    const storedRecipes = localStorage.getItem(STORAGE_KEY);
    console.log('💾 localStorageUtils: Raw localStorage data:', storedRecipes ? `${storedRecipes.substring(0, 100)}...` : 'null');
    
    if (!storedRecipes) {
      console.log('💾 localStorageUtils: No recipes found in localStorage');
      return [];
    }
    
    const recipes = JSON.parse(storedRecipes);
    console.log('💾 localStorageUtils: Parsed recipes count:', Array.isArray(recipes) ? recipes.length : 'not an array');
    return Array.isArray(recipes) ? recipes : [];
  } catch (error) {
    console.error('🔴 localStorageUtils: Error retrieving recipes from localStorage:', error);
    return [];
  }
};

/**
 * Save recipes to local storage
 * @param recipes Array of Recipe objects to save
 */
export const saveRecipesToLocalStorage = (recipes: Recipe[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving recipes to local storage:', error);
  }
};

/**
 * Add a single recipe to local storage
 * @param recipe Recipe object to add
 * @returns Updated array of recipes
 */
export const addRecipeToLocalStorage = (recipe: Recipe): Recipe[] => {
  const recipes = getRecipesFromLocalStorage();
  const updatedRecipes = [...recipes, recipe];
  saveRecipesToLocalStorage(updatedRecipes);
  return updatedRecipes;
};

/**
 * Update a recipe in local storage
 * @param id ID of the recipe to update
 * @param updatedRecipe Updated Recipe object
 * @returns Updated array of recipes
 */
export const updateRecipeInLocalStorage = (id: string, updatedRecipe: Recipe): Recipe[] => {
  const recipes = getRecipesFromLocalStorage();
  const updatedRecipes = recipes.map(recipe => 
    recipe.id === id ? updatedRecipe : recipe
  );
  saveRecipesToLocalStorage(updatedRecipes);
  return updatedRecipes;
};

/**
 * Delete a recipe from local storage
 * @param id ID of the recipe to delete
 * @returns Updated array of recipes without the deleted recipe
 */
export const deleteRecipeFromLocalStorage = (id: string): Recipe[] => {
  const recipes = getRecipesFromLocalStorage();
  const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
  saveRecipesToLocalStorage(updatedRecipes);
  return updatedRecipes;
};
