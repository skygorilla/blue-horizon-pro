
import React from 'react';
import StatCard from '@/components/StatCard';

interface StatCardsProps {
  dailyBudget: number;
  weeklyBudget: number;
  totalShoppingCost: number;
  costPerPerson: string;
  mealStats: {
    totalMeals: number;
    breakfastCount: number;
    lunchCount: number;
    dinnerCount: number;
    vegetarianCount: number;
    vegetarianRatio: number;
  };
  inventoryItemsLength: number;
  lowStockItemsLength: number;
  supplierCount: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  dailyBudget,
  weeklyBudget,
  totalShoppingCost,
  costPerPerson,
  mealStats,
  inventoryItemsLength,
  lowStockItemsLength,
  supplierCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Weekly Budget Summary" 
        titleColor="#00796B"
        stats={[
          { label: 'Daily Budget', value: `€${dailyBudget}` },
          { label: 'Weekly Budget', value: `€${weeklyBudget}` },
          { label: 'Current Shopping Cost', value: `€${totalShoppingCost.toFixed(2)}` },
          { label: 'Cost Per Person', value: `€${costPerPerson}` }
        ]} 
      />
      
      <StatCard 
        title="Meal Statistics" 
        titleColor="#4DB6AC"
        stats={[
          { label: 'Total Recipes', value: mealStats.totalMeals.toString() },
          { label: 'Breakfast Options', value: mealStats.breakfastCount.toString() },
          { label: 'Lunch Options', value: mealStats.lunchCount.toString() },
          { label: 'Dinner Options', value: mealStats.dinnerCount.toString() },
          { label: 'Vegetarian Options', value: `${mealStats.vegetarianCount} (${mealStats.vegetarianRatio}%)` }
        ]} 
      />
      
      <StatCard 
        title="Inventory Summary" 
        titleColor="#3949AB"
        stats={[
          { label: 'Total Items', value: inventoryItemsLength.toString() },
          { label: 'Low Stock Items', value: lowStockItemsLength.toString() },
          { label: 'Suppliers Count', value: supplierCount.toString() }
        ]} 
      />
    </div>
  );
};

export default StatCards;
