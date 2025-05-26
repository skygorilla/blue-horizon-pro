import { CompleteRecipe } from '@/types/recipe/recipeTypes';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  validRecipes: number;
  totalRecipes: number;
}

// Use Partial<CompleteRecipe> for potentially incomplete recipe data during validation
export const validateRecipe = (recipe: Partial<CompleteRecipe>): string[] => {
  const errors: string[] = [];
  
  if (!recipe.name && !recipe.title) errors.push('Recipe must have a name or title');
  if (!recipe.ingredients) errors.push('Recipe must have ingredients');
  if (!recipe.instructions) errors.push('Recipe must have instructions');
  if (!recipe.mealType) errors.push('Recipe must have a meal type');
  
  return errors;
};

// Use Partial<CompleteRecipe>[] for the array of potentially incomplete recipes
export const validateRecipes = (recipes: Partial<CompleteRecipe>[]): ValidationResult => {
  const allErrors: string[] = [];
  let validRecipesCount = 0;

  const validRecipes = recipes.filter((recipe, index) => {
    const recipeErrors = validateRecipe(recipe);
    
    if (recipeErrors.length > 0) {
      allErrors.push(`Recipe ${index + 1} (${recipe.name || recipe.title || 'Unnamed'}):`);
      recipeErrors.forEach(error => allErrors.push(`  - ${error}`));
      return false;
    }
    
    validRecipesCount++;
    return true;
  });

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    validRecipes: validRecipesCount,
    totalRecipes: recipes.length
  };
};

// Use Promise<Partial<CompleteRecipe>[]> for the return type
export const parseRecipeFile = async (file: File): Promise<Partial<CompleteRecipe>[]> => {
  const text = await file.text();
  // Use Partial<CompleteRecipe>[] for the recipes array
  let recipes: Partial<CompleteRecipe>[] = [];

  // Try JSON array format first
  try {
    const parsed = JSON.parse(text);
    // Ensure parsed data conforms to Partial<CompleteRecipe>[]
    recipes = Array.isArray(parsed) ? parsed : [parsed]; 
  } catch (e) {
    // Try JSONL (one object per line)
    recipes = text
      .split('\n')
      .filter(line => line.trim())
      .map((line, index) => {
        try {
          // Ensure parsed line conforms to Partial<CompleteRecipe>
          return JSON.parse(line) as Partial<CompleteRecipe>; 
        } catch (e) {
          throw new Error(`Line ${index + 1}: Invalid JSON - ${line.substring(0, 30)}...`);
        }
      })
      .filter(Boolean);
  }

  if (recipes.length === 0) {
    throw new Error('No valid recipes found in file. Please check the format.');
  }

  return recipes;
};
