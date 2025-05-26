import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { MEAL_TYPE_ICONS } from '@/types/recipe/mealTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { Clock, Eye, Users } from 'lucide-react';
import React from 'react';

interface RecipeListProps {
  recipes: CompleteRecipe[];
  onRecipeClick: (recipe: CompleteRecipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onRecipeClick }) => {
  const displayRecipes = recipes;

  if (displayRecipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-medium">No recipes to display.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Recipe Name</TableHead>
            <TableHead>Meal Type</TableHead>
            <TableHead>Prep Time</TableHead>
            <TableHead>Servings</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRecipes.map((recipe) => (
            <TableRow key={recipe.id} className="cursor-pointer" onClick={() => onRecipeClick(recipe)}>
              <TableCell className="font-medium">{recipe.title}</TableCell>
              <TableCell>
                <Badge className="capitalize">
                  {recipe.mealType && React.createElement(MEAL_TYPE_ICONS[recipe.mealType], { size: 16, className: "mr-1" })} 
                  {recipe.mealType === 'starter' ? 'Starter' : 
                    recipe.mealType === 'main' ? 'Main Course' :
                    recipe.mealType === 'soup' ? 'Soup' :
                    recipe.mealType === 'side' ? 'Side Dish' :
                    recipe.mealType === 'dessert' ? 'Dessert' :
                    recipe.mealType === 'breakfast' ? 'Breakfast' :
                    recipe.mealType === 'brunch' ? 'Brunch' :
                    recipe.mealType === 'light-dinner' ? 'Light Dinner' :
                    recipe.mealType === 'beverage' ? 'Beverage' :
                    recipe.mealType === 'snack' ? 'Snack' :
                    recipe.mealType === 'sauce' ? 'Sauce' :
                    recipe.mealType === 'baked' ? 'Baked Good' :
                    recipe.mealType === 'cocktail' ? 'Cocktail' :
                    recipe.mealType === 'salad' ? 'Salad' : recipe.mealType}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-neutral-medium" />
                  {recipe.prepTime} min
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-neutral-medium" />
                  {recipe.servings}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {recipe.tags?.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.tags && recipe.tags.length > 2 && (
                    <Badge variant="outline">+{recipe.tags.length - 2}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  onRecipeClick(recipe);
                }}>
                  <Eye className="h-4 w-4 mr-2" /> Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeList;
