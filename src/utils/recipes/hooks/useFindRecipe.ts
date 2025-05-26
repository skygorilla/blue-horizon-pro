
/**
 * Hook for finding recipes
 */

import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { MealType } from '@/types/recipe/mealTypes';
import { Continent, Region } from '@/types/recipe/geographyTypes';
import { GuestTypeCode } from '@/types/guest/guestTypes';
import { isRecipeTag, filterValidTags } from '@/types/recipe/tagTypes';

/**
 * Custom hook for finding recipes by various criteria
 */
export const useFindRecipe = (recipes: CompleteRecipe[]) => {
  // Find a recipe by ID
  const findById = (id: string): CompleteRecipe | undefined => {
    return recipes.find(recipe => recipe.id === id);
  };

  // Find recipes by meal type
  const findByMealType = (mealType: MealType): CompleteRecipe[] => {
    return recipes.filter(recipe => recipe.mealType === mealType);
  };

  // Find recipes by guest type
  const findByGuestType = (guestType: GuestTypeCode): CompleteRecipe[] => {
    return recipes.filter(recipe => {
      if (Array.isArray(recipe.guestType)) {
        return recipe.guestType.includes(guestType) || recipe.guestType.includes('both' as GuestTypeCode);
      }
      return recipe.guestType === guestType || recipe.guestType === 'both';
    });
  };

  // Find recipes by continent
  const findByContinent = (continent: Continent): CompleteRecipe[] => {
    return recipes.filter(recipe => recipe.continent === continent);
  };

  // Find recipes by region
  const findByRegion = (region: Region): CompleteRecipe[] => {
    return recipes.filter(recipe => recipe.region === region);
  };

  // Find recipes by local cuisine
  const findByLocalCuisine = (localCuisine: string): CompleteRecipe[] => {
    return recipes.filter(recipe => recipe.localCuisine === localCuisine);
  };

  // Find recipes containing an ingredient
  const findByIngredient = (ingredientQuery: string): CompleteRecipe[] => {
    return recipes.filter(recipe => 
      recipe.ingredients.toLowerCase().includes(ingredientQuery.toLowerCase())
    );
  };

  // Find recipes by tags (must include ALL specified tags)
  const findByTags = (tagStrings: string[]): CompleteRecipe[] => {
    if (!tagStrings.length) return recipes;
    
    // Filter input tags to only valid RecipeTags
    const tags = filterValidTags(tagStrings);
    
    return recipes.filter(recipe => {
      const recipeTags = recipe.tags || [];
      return tags.every(tag => recipeTags.includes(tag));
    });
  };

  // Find recipes by tags (must include ANY of the specified tags)
  const findByAnyTag = (tagStrings: string[]): CompleteRecipe[] => {
    if (!tagStrings.length) return recipes;
    
    // Filter input tags to only valid RecipeTags
    const tags = filterValidTags(tagStrings);
    
    return recipes.filter(recipe => {
      const recipeTags = recipe.tags || [];
      return tags.some(tag => recipeTags.includes(tag));
    });
  };

  return { 
    findById, 
    findByMealType, 
    findByGuestType,
    findByContinent,
    findByRegion,
    findByLocalCuisine,
    findByIngredient,
    findByTags,
    findByAnyTag 
  };
};
