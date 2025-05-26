import { Card } from '@/components/ui/card';
import { getMealTypeDisplayName } from '@/types/recipe/mealTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import React, { useMemo } from 'react';

interface RecipeGridProps {
  recipes: CompleteRecipe[];
  searchQuery?: string;
  onRecipeClick: (recipe: CompleteRecipe) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, searchQuery, onRecipeClick }) => {
  const highlightMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return null;
    
    return (text: string) => {
      if (!text) return "";
      
      const regex = new RegExp(`(${searchQuery.trim()})`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, i) => 
        regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
      );
    };
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <Card 
          key={recipe.id} 
          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onRecipeClick(recipe)}
        >
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                {getMealTypeDisplayName(recipe.mealType)}
              </span>
            </div>
            
            <h3 className="text-lg font-medium mb-2">
              {highlightMatches ? highlightMatches(recipe.title) : recipe.title}
            </h3>
            
            <div className="text-sm text-gray-600 mb-2 flex-grow">
              {highlightMatches && recipe.ingredients 
                ? (typeof recipe.ingredients === 'string' 
                    ? highlightMatches(recipe.ingredients) 
                    : "Multiple ingredients")
                : (typeof recipe.ingredients === 'string' 
                    ? recipe.ingredients 
                    : "Multiple ingredients")}
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {recipe.cookTime && (
                <span>Cook: {recipe.cookTime} min</span>
              )}
              {recipe.prepTime && (
                <span>Prep: {recipe.prepTime} min</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecipeGrid;
