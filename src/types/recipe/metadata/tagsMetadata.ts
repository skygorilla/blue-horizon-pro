
import { Recipe } from '../core/baseTypes';
import { RecipeTag } from '../tagTypes';

export interface RecipeTagsMetadata {
  tags?: RecipeTag[];
}

export type RecipeWithTags = Recipe & RecipeTagsMetadata;
