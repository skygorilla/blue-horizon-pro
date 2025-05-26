import { supabase } from '@/integrations/supabase/client';
import { Database, Json } from '@/integrations/supabase/types'; // Import Json
import { GuestTypeCode } from '@/types/guest/guestTypes';
import { IngredientItem } from '@/types/recipe/core/baseTypes'; // Corrected import path
import { MealType } from '@/types/recipe/mealTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { v4 as uuidv4 } from 'uuid';

// Define the type for the recipes table row and update data
type RecipeRow = Database['public']['Tables']['recipes']['Row'];
type RecipeUpdate = Database['public']['Tables']['recipes']['Update'];

// Helper function to stringify ingredients if needed
const ensureIngredientsString = (ingredients: string | IngredientItem[] | Record<string, unknown>): string => {
  if (typeof ingredients === 'string') {
    return ingredients;
  }
  // For arrays or objects, stringify them
  try {
    return JSON.stringify(ingredients);
  } catch {
    return ''; // Fallback
  }
};

/**
 * Fetch all recipes from the database
 */
export const fetchRecipesFromDb = async () => {
  console.log('📊 databaseUtils: Starting fetchRecipesFromDb()');
  try {
    console.log('📊 databaseUtils: Calling supabase.from(recipes).select(*)');
    const result = await supabase
      .from('recipes')
      .select('*')
      .order('last_used', { ascending: false });
    
    console.log('📊 databaseUtils: Supabase response received', {
      status: result.status,
      statusText: result.statusText,
      dataExists: !!result.data,
      dataLength: result.data?.length || 0,
      error: result.error ? {
        message: result.error.message,
        details: result.error.details,
        hint: result.error.hint,
        code: result.error.code
      } : null
    });

    // If we have no data but also no error, try to fetch from localStorage
    if (!result.data || result.data.length === 0) {
      console.log('📊 databaseUtils: No recipes found in database, might need to check localStorage');
    }

    return result;
  } catch (error) {
    console.error('🔴 databaseUtils: Error in fetchRecipesFromDb:', error);
    return { error, data: null };
  }
};

/**
 * Add a new recipe to the database
 */
export const addRecipeToDb = async (recipe: CompleteRecipe) => {
  // Generate a proper UUID if not provided or if the ID is not in UUID format
  const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const recipeWithId = {
    ...recipe,
    id: isValidUuid.test(recipe.id || '') ? recipe.id : uuidv4()
  };

  try {
    // Create an object with the correct types for Supabase
    const recipeData = {
      id: recipeWithId.id,
      title: recipeWithId.title || recipeWithId.name,
      meal_type: recipeWithId.mealType,
      ingredients: ensureIngredientsString(recipeWithId.ingredients), // Ensure ingredients is a string
      ingredient_list: recipeWithId.ingredient_list as unknown as Json || null, // Cast via unknown
      instructions: recipeWithId.instructions,
      guest_type: Array.isArray(recipeWithId.guestType)
        ? recipeWithId.guestType.join(',')
        : recipeWithId.guestType, // Ensure guest_type is string
      prep_time: recipeWithId.prepTime,
      cook_time: recipeWithId.cookTime,
      servings: recipeWithId.servings,
      last_used: recipeWithId.lastUsed || new Date().toISOString(),
      cost_per_serving_usd: recipeWithId.costPerServingUSD
    };

    const result = await supabase
      .from('recipes')
      .insert(recipeData)
      .select();
    
    return { result, recipeWithId };
  } catch (error) {
    console.error('Error adding recipe to database:', error);
    return { 
      result: { error, data: null }, 
      recipeWithId 
    };
  }
};

/**
 * Update an existing recipe in the database
 */
export const updateRecipeInDb = async (id: string, recipe: Partial<CompleteRecipe>) => {
  try {
    // Use the specific Supabase update type
    const updateData: RecipeUpdate = {};

    // Only include fields that are present in the recipe object
    if (recipe.title) updateData.title = recipe.title;
    if (recipe.mealType) updateData.meal_type = recipe.mealType;
    if (recipe.ingredients) updateData.ingredients = ensureIngredientsString(recipe.ingredients); // Ensure ingredients is a string
    // Ensure ingredient_list is handled correctly (assuming it's JSONB or similar)
    if (recipe.ingredient_list) updateData.ingredient_list = recipe.ingredient_list as unknown as Json; // Cast via unknown
    if (recipe.instructions) updateData.instructions = recipe.instructions;
    if (recipe.guestType) {
      updateData.guest_type = Array.isArray(recipe.guestType)
        ? recipe.guestType.join(',')
        : recipe.guestType; // Ensure guest_type is string
    }
    if (recipe.prepTime !== undefined) updateData.prep_time = recipe.prepTime;
    if (recipe.cookTime !== undefined) updateData.cook_time = recipe.cookTime;
    if (recipe.servings !== undefined) updateData.servings = recipe.servings;
    if (recipe.costPerServingUSD !== undefined) updateData.cost_per_serving_usd = recipe.costPerServingUSD;
    
    // Always update last used date
    updateData.last_used = recipe.lastUsed || new Date().toISOString();

    const result = await supabase
      .from('recipes')
      .update(updateData)
      .eq('id', id)
      .select();
    
    return result;
  } catch (error) {
    console.error('Error updating recipe in database:', error);
    return { error, data: null };
  }
};

/**
 * Delete a recipe from the database
 */
export const deleteRecipeFromDb = async (id: string) => {
  try {
    const result = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);
    
    return result;
  } catch (error) {
    console.error('Error deleting recipe from database:', error);
    return { error, data: null };
  }
};

/**
 * Format recipe data from database
 */
// Use the specific Supabase row type
export const formatRecipeFromDb = (dbRecipe: RecipeRow): CompleteRecipe => {
  console.log('📊 databaseUtils: Formatting recipe', { id: dbRecipe.id, title: dbRecipe.title });
  
  try {
    // Convert comma-separated guest types back to array if needed
    const guestTypeString = dbRecipe.guest_type;
    let guestType: GuestTypeCode | GuestTypeCode[];
    if (guestTypeString && guestTypeString.includes(',')) {
      // Ensure the split values are valid GuestTypeCodes
      guestType = guestTypeString.split(',').map(code => code.trim()) as GuestTypeCode[];
    } else {
      guestType = (guestTypeString || 'both') as GuestTypeCode;
    }
    
    const formattedRecipe = {
      id: dbRecipe.id,
      // Use nullish coalescing for potentially missing fields
      name: dbRecipe.title ?? '', 
      title: dbRecipe.title ?? '',
      mealType: (dbRecipe.meal_type ?? 'dinner') as MealType, // Cast to MealType
      ingredients: dbRecipe.ingredients ?? '',
      // Ensure ingredient_list is parsed correctly (assuming JSONB)
      ingredient_list: (dbRecipe.ingredient_list as unknown as IngredientItem[] | null) ?? undefined, // Cast via unknown
      instructions: dbRecipe.instructions ?? '',
      guestType: guestType as GuestTypeCode | GuestTypeCode[], // Use the processed guestType and assert type
      prepTime: dbRecipe.prep_time ?? undefined,
      cookTime: dbRecipe.cook_time ?? undefined,
      servings: dbRecipe.servings ?? undefined,
      lastUsed: dbRecipe.last_used ?? new Date().toISOString(),
      costPerServingUSD: dbRecipe.cost_per_serving_usd ?? undefined,
      // Add any additional fields here
    };
    
    console.log('📊 databaseUtils: Recipe formatted successfully', { id: dbRecipe.id });
    return formattedRecipe;
  } catch (error) {
    console.error('🔴 databaseUtils: Error formatting recipe', { id: dbRecipe.id, error });
    // Return a minimal valid recipe to prevent the app from crashing
    return {
      id: dbRecipe.id || uuidv4(),
      name: dbRecipe.title || 'Error Loading Recipe',
      title: dbRecipe.title || 'Error Loading Recipe',
      mealType: 'dinner' as MealType,
      ingredients: 'Error loading ingredients',
      instructions: 'Error loading instructions',
      guestType: 'both' as GuestTypeCode,
    };
  }
};
