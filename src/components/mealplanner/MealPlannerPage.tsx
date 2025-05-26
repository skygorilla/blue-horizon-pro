
import React, { useState, useEffect } from 'react';
import WeeklyMealPlanner from './WeeklyMealPlanner';
import GuestTypeManager from './GuestTypeManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecipes } from '@/contexts/RecipeContext';
import BackButton from '@/components/ui/BackButton';
import { useUISettings } from '@/contexts/UISettingsContext';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { GuestTypeInfo, MenuPlan, GuestTypeCode } from '@/types/mealPlanTypes';
import { v4 as uuidv4 } from 'uuid';

const MealPlannerPage: React.FC = () => {
  const { recipes, isLoading, findSuitableRecipes } = useRecipes();
  const [activeTab, setActiveTab] = useState('planner');
  const { touchMode } = useUISettings();
  const [menuPlan, setMenuPlan] = useState<MenuPlan>({
    id: uuidv4(),
    name: 'Weekly Menu Plan',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    guestCounts: [],
    mealAssignments: []
  });
  
  // Sample guest types with all required properties
  const [guestTypes, setGuestTypes] = useState<GuestTypeInfo[]>([
    { 
      id: '1', 
      code: 'A' as GuestTypeCode, 
      name: 'Adults', 
      description: 'Regular adult meals', 
      shortDescription: 'Breakfast and Lunch only',
      mealPattern: ['breakfast', 'lunch', 'dinner'],
      category: 'Recreation',
      icon: 'Sun'
    },
    { 
      id: '2', 
      code: 'B' as GuestTypeCode, 
      name: 'Children', 
      description: 'Kid-friendly meals', 
      shortDescription: 'Kid-friendly meals',
      mealPattern: ['breakfast', 'lunch'],
      category: 'Kids',
      icon: 'Child'
    },
    { 
      id: '3', 
      code: 'C' as GuestTypeCode, 
      name: 'Vegetarian', 
      description: 'No meat or fish', 
      shortDescription: 'No meat or fish',
      mealPattern: ['breakfast', 'lunch', 'dinner'],
      category: 'Dietary',
      icon: 'Leaf'
    },
    { 
      id: '4', 
      code: 'D' as GuestTypeCode, 
      name: 'Vegan', 
      description: 'Plant-based only', 
      shortDescription: 'Plant-based only',
      mealPattern: ['breakfast', 'dinner'],
      category: 'Dietary',
      icon: 'Seedling'
    }
  ]);
  
  useEffect(() => {
    // Set the document title
    document.title = 'Meal Planner';
  }, []);

  // Function to handle recipe assignments
  const handleAssignRecipe = (dayOfWeek: number, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => {
    // Check if there's already an assignment for this day and meal
    const existingAssignmentIndex = menuPlan.mealAssignments.findIndex(
      ma => ma.dayOfWeek === dayOfWeek && ma.mealType === mealType
    );
    
    // Create a copy of the meal assignments
    const updatedAssignments = [...menuPlan.mealAssignments];
    
    if (existingAssignmentIndex >= 0) {
      // Update the existing assignment
      updatedAssignments[existingAssignmentIndex] = {
        ...updatedAssignments[existingAssignmentIndex],
        recipeId
      };
    } else {
      // Add a new assignment
      updatedAssignments.push({
        id: uuidv4(),
        menuId: menuPlan.id,
        recipeId,
        mealType,
        dayOfWeek
      });
    }
    
    // Update the menu plan with new assignments
    setMenuPlan({
      ...menuPlan,
      mealAssignments: updatedAssignments
    });
  };

  // Function to handle updates to guest types
  const handleGuestTypeUpdate = (updatedGuestTypes: GuestTypeInfo[]) => {
    setGuestTypes(updatedGuestTypes);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading meal planning data...</div>;
  }

  const breadcrumbItems = [
    { label: 'Meal Planner', path: '/meal-planner' }
  ];

  return (
    <div className="container mx-auto pt-6 px-4">
      <div className="mb-6 flex justify-between items-center">
        <BackButton to="/dashboard" label="Return to Dashboard" />
        <div className="hidden sm:block">
          <PageBreadcrumbs items={breadcrumbItems} />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className={touchMode ? "h-12" : ""}>
            <TabsTrigger 
              value="planner" 
              className={touchMode ? "text-base px-6 py-3" : ""}
            >
              Weekly Planner
            </TabsTrigger>
            <TabsTrigger 
              value="guests" 
              className={touchMode ? "text-base px-6 py-3" : ""}
            >
              Guest Types
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="planner">
          <Card>
            <CardHeader className={touchMode ? "pb-2" : ""}>
              <CardTitle className={touchMode ? "text-2xl" : ""}>Weekly Meal Plan</CardTitle>
            </CardHeader>
            <CardContent className={touchMode ? "pt-2" : ""}>
              <WeeklyMealPlanner 
                plan={menuPlan}
                recipes={recipes}
                onAssignRecipe={handleAssignRecipe}
                isLoading={isLoading}
                findSuitableRecipes={findSuitableRecipes}
                guestTypes={guestTypes}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guests">
          <Card>
            <CardHeader className={touchMode ? "pb-2" : ""}>
              <CardTitle className={touchMode ? "text-2xl" : ""}>Guest Type Management</CardTitle>
            </CardHeader>
            <CardContent className={touchMode ? "pt-2" : ""}>
              <GuestTypeManager 
                guestTypes={guestTypes}
                onUpdate={handleGuestTypeUpdate}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlannerPage;
