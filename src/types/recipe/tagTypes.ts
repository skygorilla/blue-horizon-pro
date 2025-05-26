
export const RECIPE_TAGS = [
  'vegan',
  'vegetarian',
  'gluten-free',
  'high-protein',
  'low-carb',
  'lactose-free',
  'keto',
  'paleo',
  'diabetic',
  'halal',
  'kosher',
  'kid-friendly',
  'gourmet',
  'street-food',
  'quick',
  'zero-waste',
  'fermented',
  'traditional',
  'fusion',
  'spicy'
] as const;

export type RecipeTag = typeof RECIPE_TAGS[number];

// Helper function to check if a string is a valid RecipeTag
export function isRecipeTag(tag: string): tag is RecipeTag {
  return RECIPE_TAGS.includes(tag as RecipeTag);
}

// Helper function to filter an array of strings to only valid RecipeTags
export function filterValidTags(tags: string[]): RecipeTag[] {
  return tags.filter(isRecipeTag) as RecipeTag[];
}

