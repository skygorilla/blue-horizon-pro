import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChartDataItem } from '@/types/chart/chartTypes';
import { GuestTypeCode } from '@/types/guest/guestTypes';
import { Meal } from '@/types/menu/menuTypes';
import { Recipe, InventoryItem, ShoppingItem } from '@/types/mealPlanTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';

// Combined context type that includes all the context values
export interface MealDataContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Shopping
  groupSize: number;
  setGroupSize: (size: number) => void;
  buffer: number;
  setBuffer: (buffer: number) => void;
  shoppingItems: ShoppingItem[];
  setShoppingItems: (items: ShoppingItem[]) => void;
  
  // Meal Data
  guestType: GuestTypeCode;
  setGuestType: (type: GuestTypeCode) => void;
  getMealsForCurrentType: () => Meal[];
  getCaloriesForCurrentType: () => ChartDataItem[];
  getCostData: () => ChartDataItem[];
  dailyBudget: number;
  setDailyBudget: (budget: number) => void;
  
  // Recipes
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  
  // Inventory
  inventoryItems: InventoryItem[];
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;
  adjustStock: (id: string, amount: number) => void;
  findByName: (name: string) => InventoryItem | undefined;
  addRecipeToMealPlan?: (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => void;

  // Meal Plan Recipes
  mealPlanRecipes: CompleteRecipe[];
}

const MealDataContext = createContext<MealDataContextType | undefined>(undefined);

// Export the useMealData hook
export const useMealData = () => {
  const context = useContext(MealDataContext);
  if (!context) {
    throw new Error('useMealData must be used within a MealDataProvider');
  }
  return context;
};

export const useMealPlan = (): MealPlanContextType => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};

// Inner provider that actually composes all the context values
const MealPlanProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get values from individual contexts
  const navigation = useNavigation();
  const shopping = useShopping();
  const mealData = useMealData();
  const recipe = useRecipes(); // Fixed: useRecipe → useRecipes
  const inventory = useContext(InventoryContext); // Fixed: using useContext instead of non-existent useInventory
  
  if (!inventory) {
    throw new Error('InventoryContext must be used within an InventoryProvider');
  }
  
  // Default empty array for meal plan recipes
  const [mealPlanRecipes, setMealPlanRecipes] = useState<CompleteRecipe[]>([]);

  // Combine all contexts into one
  const combinedContext: MealPlanContextType = {
    ...navigation,
    ...shopping,
    ...mealData,
    ...recipe,
    ...inventory,
    mealPlanRecipes
  };

  return (
    <MealPlanContext.Provider value={combinedContext}>
      {children}
    </MealPlanContext.Provider>
  );
};

// Create a combined provider that wraps all the individual providers
export const MealPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NavigationProvider>
      <MealDataProvider>
        <ShoppingProvider>
          <RecipeProvider>
            <InventoryProvider>
              <MealPlanProviderInner>
                {children}
              </MealPlanProviderInner>
            </InventoryProvider>
          </RecipeProvider>
        </ShoppingProvider>
      </MealDataProvider>
    </NavigationProvider>
  );
};
