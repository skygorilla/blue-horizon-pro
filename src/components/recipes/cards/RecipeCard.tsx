import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { MEAL_TYPE_ICONS } from '@/types/recipe/mealTypes';
import { Button } from '@/components/ui/button';
import { Clock, Users, Eye, Plus, Leaf, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RecipeCardProps {
  recipe: CompleteRecipe;
  onClick: (recipe: CompleteRecipe) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const [showMealPlanDialog, setShowMealPlanDialog] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<string>("");
  const [selectedMeal, setSelectedMeal] = React.useState<string>("");

  const getMealTypeLabel = (type: string): string => {
    switch(type) {
      case 'starter': return 'Appetizer';
      case 'main': return 'Main Course';
      case 'soup': return 'Soup';
      case 'side': return 'Side Dish';
      case 'dessert': return 'Dessert';
      case 'breakfast': return 'Breakfast';
      case 'brunch': return 'Brunch';
      case 'light-dinner': return 'Light Dinner';
      default: return type;
    }
  };

  const price = recipe.costPerServingUSD ? `$${recipe.costPerServingUSD.toFixed(2)}` : 'N/A';
  const calories = recipe.calories ? `${recipe.calories} kcal` : 'N/A';
  const isVegetarian = recipe.tags?.includes('vegetarian') || recipe.tags?.includes('vegan');

  const handleAddToMealPlan = () => {
    if (selectedDay && selectedMeal) {
      // Logic to add recipe to meal plan
      setShowMealPlanDialog(false);
      setSelectedDay("");
      setSelectedMeal("");
    }
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
      onClick={() => onClick(recipe)}
    >
      <div className="h-2 bg-primary w-full" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            {isVegetarian && <Leaf className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" aria-label="Vegetarian/Vegan" />}
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">{recipe.title}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); /* Add to favorites */ }}>
            <Heart className="h-5 w-5 text-red-500" aria-label="Favorite" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-blue-900 mb-4">
          <div className="flex items-center" title="Preparation time">
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            <span className="font-medium text-blue-900">{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center" title="Cooking time">
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            <span className="font-medium text-blue-900">{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center" title="Servings">
            <Users className="mr-1 h-4 w-4 text-blue-500" />
            <span className="font-medium text-blue-900">{recipe.servings}</span>
          </div>
          <div className="flex items-center" title="Calories">
            <span className="font-medium text-blue-900">{calories}</span>
          </div>
        </div>
        <div className="text-lg font-semibold text-green-600">Price: {price}</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {recipe.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="capitalize bg-blue-100 text-blue-900">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mb-auto" />
        <div className="flex justify-end items-center pt-4 mt-4 border-t border-gray-100 space-x-2">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onClick(recipe); }}>
            <Eye className="h-5 w-5 text-neutral-700" aria-label="View" />
          </Button>
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setShowMealPlanDialog(true); }}>
            <Plus className="h-5 w-5 text-neutral-700" aria-label="Add to Menu" />
          </Button>
        </div>
      </div>

      <Dialog open={showMealPlanDialog} onOpenChange={setShowMealPlanDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add to Weekly Menu</DialogTitle>
            <DialogDescription>Select the week, day, and meal type to add "{recipe.title}".</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Day of Week</h4>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Meal</h4>
              <Select value={selectedMeal} onValueChange={setSelectedMeal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent>
                  {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                    <SelectItem key={meal} value={meal}>{meal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowMealPlanDialog(false)}>Cancel</Button>
            <Button onClick={handleAddToMealPlan}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeCard;
