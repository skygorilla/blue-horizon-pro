
import React, { useMemo } from 'react';
import { useMealData } from '@/contexts/MealDataContext';
import { useShopping } from '@/contexts/shopping';
import { useInventory } from '@/contexts/useInventory';
import { useRecipes } from '@/contexts/RecipeContext';
import { ChartDataItem } from '@/types/chart/chartTypes';

// Import the extracted components
import DashboardHeader from './content/DashboardHeader';
import DashboardCards from './content/DashboardCards';
import UserControls from './content/UserControls';
import StatCards from './content/StatCards';
import MealPlanSection from './content/MealPlanSection';
import ChartSection from './content/ChartSection';

// Constants for configuration
const LOW_STOCK_THRESHOLD = 5;
const SUPPLIER_CHART_COLORS = ['#4DB6AC', '#00796B', '#3949AB', '#FFC107', '#FF9800', '#43A047'];
const CATEGORY_CHART_COLORS = ['#00796B', '#4DB6AC', '#3949AB', '#FFC107', '#FF9800', '#43A047'];

const DashboardContent: React.FC = () => {
  const { 
    guestType, 
    setGuestType,
    getMealsForCurrentType,
    getCaloriesForCurrentType,
    getCostData,
    dailyBudget
  } = useMealData();

  const {
    groupSize,
    setGroupSize,
    calculateTotalCost
  } = useShopping();

  const { recipes } = useRecipes();
  const { inventoryItems } = useInventory();

  // Calculate weekly budget
  const weeklyBudget = dailyBudget * 7;
  
  // Calculate total shopping list cost
  const totalShoppingCost = calculateTotalCost();
  
  // Calculate cost per person
  const costPerPerson = groupSize > 0 ? (totalShoppingCost / groupSize).toFixed(2) : '0.00';
  
  // Find low stock items - using correct property name
  const lowStockItems = useMemo(() => {
    return inventoryItems.filter(item => item.quantity_in_stock < LOW_STOCK_THRESHOLD);
  }, [inventoryItems]);
  
  // Calculate meal statistics
  const mealStats = useMemo(() => {
    const breakfastCount = recipes.filter(r => r.mealType === 'breakfast').length;
    const lunchCount = recipes.filter(r => r.mealType === 'lunch').length;
    const dinnerCount = recipes.filter(r => r.mealType === 'dinner').length;
    
    // Use the new isVegetarian flag for a more accurate count
    const vegetarianCount = recipes.filter(r => r.isVegetarian === true).length;
    
    const vegetarianRatio = recipes.length > 0 ? 
      Math.round((vegetarianCount / recipes.length) * 100) : 0;
    
    return {
      totalMeals: recipes.length,
      breakfastCount,
      lunchCount,
      dinnerCount,
      vegetarianCount,
      vegetarianRatio
    };
  }, [recipes]);
  
  // Generate supplier chart data - using supplier_id since supplier doesn't exist directly
  const supplierChartData = useMemo(() => {
    const supplierCounts: Record<string, number> = {};
    
    // Count items by supplier_id (convert to string for display)
    inventoryItems.forEach(item => {
      if (item.supplier_id) {
        const supplierKey = item.supplier_id;
        supplierCounts[supplierKey] = (supplierCounts[supplierKey] || 0) + 1;
      }
    });
    
    // Convert to chart data format using the constant for colors
    return Object.entries(supplierCounts)
      .map(([supplier, count], index) => ({
        label: supplier,
        value: count,
        color: SUPPLIER_CHART_COLORS[index % SUPPLIER_CHART_COLORS.length]
      })) as ChartDataItem[];
  }, [inventoryItems]);
  
  // Generate inventory by category chart data - using category_id since category doesn't exist directly
  const inventoryCategoryData = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    
    // Count items by category_id
    inventoryItems.forEach(item => {
      if (item.category_id) {
        const categoryKey = item.category_id;
        categoryCounts[categoryKey] = (categoryCounts[categoryKey] || 0) + 1;
      }
    });
    
    // Convert to chart data format using the constant for colors
    return Object.entries(categoryCounts)
      .map(([category, count], index) => ({
        label: category,
        value: count,
        color: CATEGORY_CHART_COLORS[index % CATEGORY_CHART_COLORS.length]
      })) as ChartDataItem[];
  }, [inventoryItems]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <DashboardHeader />
      
      {/* Quick Stats Overview */}
      <DashboardCards 
        mealCount={mealStats.totalMeals}
        weeklyBudget={weeklyBudget}
        groupSize={groupSize}
        lowStockCount={lowStockItems.length}
      />
      
      {/* Group size and guest type selector */}
      <UserControls 
        guestType={guestType}
        onGuestTypeChange={setGuestType}
        groupSize={groupSize}
        onGroupSizeChange={setGroupSize}
      />
      
      {/* Stats cards */}
      <StatCards 
        dailyBudget={dailyBudget}
        weeklyBudget={weeklyBudget}
        totalShoppingCost={totalShoppingCost}
        costPerPerson={costPerPerson}
        mealStats={mealStats}
        inventoryItemsLength={inventoryItems.length}
        lowStockItemsLength={lowStockItems.length}
        supplierCount={new Set(inventoryItems.map(i => i.supplier_id)).size}
      />
      
      {/* Meal table */}
      <MealPlanSection meals={getMealsForCurrentType()} />
      
      {/* Charts */}
      <ChartSection 
        supplierChartData={supplierChartData}
        caloriesData={getCaloriesForCurrentType()}
        inventoryCategoryData={inventoryCategoryData}
        costData={getCostData()}
      />
    </div>
  );
};

export default DashboardContent;
