
import { Recipe } from '../recipe/recipeTypes';
import { GuestTypeCode } from '../guest/guestTypes';

export interface MenuPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  guestCounts: GuestCount[];
  mealAssignments: MealAssignment[];
}

export interface GuestCount {
  id: string;
  guestTypeId: string;
  guestTypeCode: GuestTypeCode;
  count: number;
  menuId: string;
}

export interface MealAssignment {
  id: string;
  menuId: string;
  recipeId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  dayOfWeek: number;
}

export interface Meal {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  calories: string;
}
