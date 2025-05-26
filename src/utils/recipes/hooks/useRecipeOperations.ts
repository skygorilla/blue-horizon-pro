
import { useState } from 'react';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { Recipe } from '@/types/recipe/core/baseTypes';
import { addRecipeToDb, updateRecipeInDb, deleteRecipeFromDb, formatRecipeFromDb } from '../databaseUtils';
import { toast } from 'sonner';

/**
 * Custom hook for recipe CRUD operations
 */
export const useRecipeOperations = (
  recipes: CompleteRecipe[],
  setRecipes: React.Dispatch<React.SetStateAction<CompleteRecipe[]>>
) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Add a new recipe
   */
  const addRecipe = async (recipe: CompleteRecipe) => {
    try {
      setIsSubmitting(true);
      const { result, recipeWithId } = await addRecipeToDb(recipe);
      
      if (result.error) {
        toast.error('Failed to add recipe');
        console.error('Error adding recipe:', result.error);
        return;
      }
      
      // Format the returned recipe to ensure consistency
      const formattedRecipe = result.data ? formatRecipeFromDb(result.data) : formatRecipeFromDb(recipeWithId);
      
      setRecipes(prevRecipes => [...prevRecipes, formattedRecipe]);
      toast.success('Recipe added successfully');
    } catch (error) {
      console.error('Error in addRecipe:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Update an existing recipe
   */
  const updateRecipe = async (id: string, updatedRecipe: CompleteRecipe) => {
    try {
      setIsSubmitting(true);
      const result = await updateRecipeInDb(id, updatedRecipe);
      
      if (result.error) {
        toast.error('Failed to update recipe');
        console.error('Error updating recipe:', result.error);
        return;
      }
      
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
        )
      );
      
      toast.success('Recipe updated successfully');
    } catch (error) {
      console.error('Error in updateRecipe:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete a recipe
   */
  const deleteRecipe = async (id: string) => {
    try {
      setIsSubmitting(true);
      const result = await deleteRecipeFromDb(id);
      
      if (result.error) {
        toast.error('Failed to delete recipe');
        console.error('Error deleting recipe:', result.error);
        return;
      }
      
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
      toast.success('Recipe deleted successfully');
    } catch (error) {
      console.error('Error in deleteRecipe:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    addRecipe,
    updateRecipe,
    deleteRecipe,
    isSubmitting
  };
};
