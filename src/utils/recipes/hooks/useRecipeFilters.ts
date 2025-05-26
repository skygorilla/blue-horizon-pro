import { useState, useMemo } from 'react';
import { CompleteRecipe, RecipeFilters } from '@/types/recipe/recipeTypes';
import { MealType } from '@/types/recipe/mealTypes';
import { Continent, Region } from '@/types/recipe/geographyTypes';
import { filterValidTags, RecipeTag } from '@/types/recipe/tagTypes';
import { DifficultyLevel } from '@/types/recipe/difficultyTypes'; // Import DifficultyLevel

export const useRecipeFilters = (recipes: CompleteRecipe[]) => {
  const [filters, setFilters] = useState<RecipeFilters>({
    search: '',
    mealType: [],
    continent: [],
    region: [],
    localCuisine: [],
    tags: [],
    prepTime: null,
    difficulty: [], // Add difficulty state
  });

  const updateFilter = <K extends keyof RecipeFilters>(filterKey: K, value: RecipeFilters[K]) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const setSearchQuery = (query: string) => {
    updateFilter('search', query);
  };

  const toggleMealType = (type: MealType) => {
    updateFilter('mealType', 
      filters.mealType?.includes(type)
        ? filters.mealType.filter(t => t !== type)
        : [...(filters.mealType || []), type]
    );
  };

  const toggleContinent = (continent: Continent) => {
    const newContinents = filters.continent?.includes(continent)
      ? filters.continent.filter(c => c !== continent)
      : [...(filters.continent || []), continent];
    
    updateFilter('continent', newContinents);
    
    // If we removed a continent, remove its regions too
    if (filters.continent?.includes(continent) && filters.region?.length) {
      const regionsToKeep = filters.region.filter(r => {
        // Logic to determine if a region belongs to any of the remaining continents
        // This is a simplified approach; you might need more specific mapping
        return newContinents.length > 0;
      });
      updateFilter('region', regionsToKeep);
    }
  };

  const toggleRegion = (region: Region) => {
    updateFilter('region', 
      filters.region?.includes(region)
        ? filters.region.filter(r => r !== region)
        : [...(filters.region || []), region]
    );
  };

  const toggleLocalCuisine = (cuisine: string) => {
    updateFilter('localCuisine', 
      filters.localCuisine?.includes(cuisine)
        ? filters.localCuisine.filter(c => c !== cuisine)
        : [...(filters.localCuisine || []), cuisine]
    );
  };

  const toggleTag = (tagString: string) => {
    // Filter to make sure we only have valid RecipeTags
    const validTags = filterValidTags([tagString]);
    
    if (validTags.length === 0) {
      return; // Not a valid tag, don't update state
    }
    
    const validTag = validTags[0];
    
    updateFilter('tags', 
      filters.tags?.includes(validTag)
        ? filters.tags.filter(t => t !== validTag)
        : [...(filters.tags || []), validTag]
    );
  };

  const setMaxPrepTime = (time: number | null) => {
    updateFilter('prepTime', time);
  };

  // Add toggleDifficulty function
  const toggleDifficulty = (level: DifficultyLevel) => {
    updateFilter('difficulty',
      filters.difficulty?.includes(level)
        ? filters.difficulty.filter(l => l !== level)
        : [...(filters.difficulty || []), level]
    );
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search filter
      if (filters.search && !recipe.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Meal type filter
      if (filters.mealType && filters.mealType.length > 0 && !filters.mealType.includes(recipe.mealType)) {
        return false;
      }
      
      // Continent filter
      if (filters.continent && filters.continent.length > 0 && recipe.continent) {
        if (!filters.continent.includes(recipe.continent)) {
          return false;
        }
      }
      
      // Region filter
      if (filters.region && filters.region.length > 0 && recipe.region) {
        if (!filters.region.includes(recipe.region)) {
          return false;
        }
      }
      
      // Local cuisine filter
      if (filters.localCuisine && filters.localCuisine.length > 0 && recipe.localCuisine) {
        if (!filters.localCuisine.includes(recipe.localCuisine)) {
          return false;
        }
      }
      
      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const recipeTags = recipe.tags || [];
        if (!filters.tags.some(tag => recipeTags.includes(tag))) {
          return false;
        }
      }
      
      // Preparation time filter
      if (filters.prepTime && recipe.prepTime && recipe.prepTime > filters.prepTime) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && filters.difficulty.length > 0 && recipe.difficulty) {
        // Ensure comparison is between DifficultyLevel types
        if (!filters.difficulty.includes(recipe.difficulty as DifficultyLevel)) {
          return false;
        }
      }
      
      return true;
    });
  }, [recipes, filters]);

  const resetFilters = () => {
    setFilters({
      search: '',
      mealType: [],
      continent: [],
      region: [],
      localCuisine: [],
      tags: [],
      prepTime: null,
      difficulty: [], // Reset difficulty
    });
  };

  return {
    filters,
    filteredRecipes,
    setSearchQuery,
    toggleMealType,
    toggleContinent,
    toggleRegion,
    toggleLocalCuisine,
    toggleTag,
    setMaxPrepTime,
    toggleDifficulty, // Return toggleDifficulty
    resetFilters
  };
};
