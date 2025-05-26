
import React, { createContext, useContext, ReactNode } from 'react';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { GuestTypeCode } from '@/types/guest/guestTypes';
import { useFetchRecipes, useRecipeOperations, useFindRecipe } from '@/utils/recipes/recipeHooks';

interface RecipeContextType {
  recipes: CompleteRecipe[];
  addRecipe: (recipe: CompleteRecipe) => Promise<void>;
  updateRecipe: (id: string, recipe: CompleteRecipe) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  isLoading: boolean;
  findById: (id: string) => CompleteRecipe | undefined;
  findByMealType: (mealType: 'breakfast' | 'lunch' | 'dinner') => CompleteRecipe[];
  findByGuestType: (guestType: GuestTypeCode) => CompleteRecipe[];
  findByIngredient: (ingredientQuery: string) => CompleteRecipe[];
  findSuitableRecipes: (mealType: 'breakfast' | 'lunch' | 'dinner', guestTypes: GuestTypeCode[]) => CompleteRecipe[];
  refetch: () => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use custom hooks for fetching recipes and recipe operations
  const { recipes, setRecipes, isLoading, refetch } = useFetchRecipes();
  const { addRecipe, updateRecipe, deleteRecipe } = useRecipeOperations(recipes, setRecipes);
  const { findById, findByMealType, findByGuestType, findByIngredient } = useFindRecipe(recipes);

  // Find suitable recipes for meal planning based on meal type and guest types
  const findSuitableRecipes = (mealType: 'breakfast' | 'lunch' | 'dinner', guestTypes: GuestTypeCode[]) => {
    return recipes.filter(recipe => {
      // Match meal type
      const matchesMealType = recipe.mealType === mealType;
      
      // Match guest type - recipe is suitable if it's for 'both' or matches any of the specified guest types
      const matchesGuestType = recipe.guestType === 'both' as GuestTypeCode || 
        (Array.isArray(recipe.guestType) 
          ? guestTypes.some(gt => recipe.guestType.includes(gt)) 
          : guestTypes.includes(recipe.guestType as GuestTypeCode));
      
      return matchesMealType && matchesGuestType;
    });
  };

  // Create the context value
  const value = {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    isLoading,
    findById,
    findByMealType,
    findByGuestType,
    findByIngredient,
    findSuitableRecipes,
    refetch
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
