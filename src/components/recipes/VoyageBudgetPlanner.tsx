
import React, { useState } from 'react';
import { useInventory } from '@/contexts/useInventory';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const VoyageBudgetPlanner: React.FC = () => {
  const { inventoryItems } = useInventory();
  const { mealPlanRecipes } = useMealPlan();

  const [voyageDuration, setVoyageDuration] = useState<number>(7);
  const [crewSize, setCrewSize] = useState<number>(10);
  const [dietaryMultiplier, setDietaryMultiplier] = useState<number>(1.0);

  const calculateBudget = () => {
    const dailyCostPerCrew = mealPlanRecipes.reduce((total, meal) => {
      // Handle string ingredients by checking if it's an array first
      const ingredientsList = Array.isArray(meal.ingredients) 
        ? meal.ingredients 
        : typeof meal.ingredients === 'string' 
          ? [] 
          : [];
      
      const mealCost = ingredientsList.reduce((mealTotal: number, ingredient: any) => {
        const inventoryItem = inventoryItems.find(item => item.name === ingredient.name);
        if (inventoryItem && inventoryItem.unit_price) {
          return mealTotal + (inventoryItem.unit_price * ingredient.quantity);
        }
        return mealTotal;
      }, 0);
      return total + mealCost;
    }, 0);

    return dailyCostPerCrew * crewSize * voyageDuration * dietaryMultiplier;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Voyage Budget Planner</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Voyage Duration (days)</label>
        <Input
          type="number"
          value={voyageDuration}
          onChange={(e) => setVoyageDuration(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Crew Size</label>
        <Input
          type="number"
          value={crewSize}
          onChange={(e) => setCrewSize(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Dietary Multiplier</label>
        <Input
          type="number"
          step="0.1"
          value={dietaryMultiplier}
          onChange={(e) => setDietaryMultiplier(Number(e.target.value))}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Estimated Budget: ${calculateBudget().toFixed(2)}</h3>
      </div>

      <Button className="mt-4">Generate Detailed Report</Button>
    </div>
  );
};

export default VoyageBudgetPlanner;
