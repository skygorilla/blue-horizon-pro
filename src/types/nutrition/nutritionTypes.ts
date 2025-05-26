
export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  servingSize: string;
}

export interface NutritionTarget {
  guestTypeId: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
