import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { InventoryItem } from '@/types/mealPlanTypes';

// Update IngredientItem type to include name and quantity
interface IngredientItem {
  name: string;
  quantity: number;
}

const calculateRecipeCost = (recipe: CompleteRecipe, inventoryItems: InventoryItem[]): number => {
  if (!Array.isArray(recipe.ingredients)) {
    return 0; // Return 0 if ingredients are not an array
  }

  return recipe.ingredients.reduce((totalCost, ingredient) => {
    const inventoryItem = inventoryItems.find(item => item.name.toLowerCase() === ingredient.ingredient.toLowerCase());
    if (inventoryItem) {
      const quantity = ingredient.qty_g || ingredient.qty_ml || 1; // Use qty_g or qty_ml as quantity
      const ingredientCost = (inventoryItem.unitPrice || 0) * quantity;
      return totalCost + ingredientCost;
    }
    return totalCost;
  }, 0);
};

export default calculateRecipeCost;