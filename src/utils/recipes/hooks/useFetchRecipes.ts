
import { useState, useEffect } from 'react';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { Recipe } from '@/types/mealPlanTypes';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<CompleteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching recipes', { error, component: 'useFetchRecipes' });
        throw error;
      }

      // Convert Recipe to CompleteRecipe by adding required extended fields
      const completeRecipes: CompleteRecipe[] = (data as Recipe[]).map(recipe => ({
        ...recipe,
        // Add default values for ExtendedRecipeData fields
        difficulty: 'medium' as const,
        averageRating: 0,
        reviewCount: 0,
        isFavorite: false,
        // Map existing fields
        prepTimeMinutes: recipe.prepTime,
        cookTimeMinutes: recipe.cookTime,
        totalTimeMinutes: (recipe.prepTime || 0) + (recipe.cookTime || 0),
      }));

      setRecipes(completeRecipes);
      logger.info(`Fetched ${completeRecipes.length} recipes`, { component: 'useFetchRecipes' });
    } catch (error) {
      logger.error('Failed to fetch recipes', { error, component: 'useFetchRecipes' });
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const refetch = async () => {
    await fetchRecipes();
  };

  return {
    recipes,
    setRecipes,
    isLoading,
    refetch
  };
};
