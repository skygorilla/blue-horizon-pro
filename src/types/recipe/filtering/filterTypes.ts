import { MealType } from '../mealTypes';
import { Continent, Region } from '../geographyTypes';
import { RecipeTag } from '../tagTypes';
import { DifficultyLevel } from '../difficultyTypes'; // Import DifficultyLevel

export interface RecipeFilters {
  mealType?: MealType[];
  continent?: Continent[];
  region?: Region[];
  localCuisine?: string[];
  tags?: RecipeTag[];
  search?: string;
  prepTime?: number | null;
  difficulty?: DifficultyLevel[]; // Add difficulty property
}
