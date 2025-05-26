
import { Recipe } from '../core/baseTypes';
import { Continent, Region } from '../geographyTypes';

export interface RecipeGeographyMetadata {
  continent?: Continent;
  region?: Region;
  localCuisine?: string;
}

export type RecipeWithGeography = Recipe & RecipeGeographyMetadata;
