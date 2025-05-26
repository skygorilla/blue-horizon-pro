import { useMealPlan } from '@/contexts/MealPlanContext'; // Re-export the hook from the context file to maintain backward compatibility

// Re-export the hook
export { useMealPlan };

// Re-export necessary types/constants if they were moved here
export type { Recipe, InventoryItem } from '@/types/mealPlanTypes';
export { sampleShoppingItems } from '@/data/mealData';
