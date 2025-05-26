
import { createContext } from 'react';
import { ChartDataItem } from '@/types/chart/chartTypes';
import { GuestTypeCode } from '@/types/guest/guestTypes';
import { Meal } from '@/types/menu/menuTypes';

export interface MealDataContextType {
  guestType: GuestTypeCode;
  setGuestType: (type: GuestTypeCode) => void;
  getMealsForCurrentType: () => Meal[];
  getCaloriesForCurrentType: () => ChartDataItem[];
  getCostData: () => ChartDataItem[];
  dailyBudget: number;
  setDailyBudget: (budget: number) => void;
  addRecipeToMealPlan?: (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => void;
}

// Create the context with a default value (or undefined if you handle it)
export const MealDataContext = createContext<MealDataContextType | undefined>(undefined);
