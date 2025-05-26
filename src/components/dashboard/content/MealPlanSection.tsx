import React from 'react';
// Import the Meal type from MealTable
import MealTable, { Meal as MealTableType } from '@/components/MealTable';
import { useUISettings } from '@/contexts/useUISettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define a type for the individual meal items used in touch mode
// Removed calories as it seems to be daily total in source data
interface MealItem {
  day: string;
  mealType: string;
  recipe: string;
}

interface MealPlanSectionProps {
  // The prop type should match what MealTable expects
  meals: MealTableType[]; 
}

const MealPlanSection: React.FC<MealPlanSectionProps> = ({ meals }) => {
  const { touchMode } = useUISettings();
  
  if (touchMode) {
    // Transform MealTableType[] to MealItem[] grouped by day for touch view
    // This assumes MealTableType has day, breakfast, lunch, dinner properties
    // Store daily calories separately
    const mealsByDay: Record<string, { items: MealItem[], dailyCalories: string }> = meals.reduce<Record<string, { items: MealItem[], dailyCalories: string }>>((acc, dayPlan) => {
      acc[dayPlan.day] = { items: [], dailyCalories: dayPlan.calories }; // Store daily calories
      if (dayPlan.breakfast) acc[dayPlan.day].items.push({ day: dayPlan.day, mealType: 'Breakfast', recipe: dayPlan.breakfast });
      if (dayPlan.lunch) acc[dayPlan.day].items.push({ day: dayPlan.day, mealType: 'Lunch', recipe: dayPlan.lunch });
      if (dayPlan.dinner) acc[dayPlan.day].items.push({ day: dayPlan.day, mealType: 'Dinner', recipe: dayPlan.dinner });
      return acc;
    }, {});
    
    return (
      <div className="dashboard-card">
        <h3 className="section-heading text-xl mb-6 font-semibold">Weekly Meal Plan</h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {Object.entries(mealsByDay).map(([day, dayData]) => (
              <Card key={day} className="w-80 sm:w-96 flex-shrink-0 shadow-md border-primary/20">
                <CardHeader className="pb-2 bg-primary/10 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg sm:text-xl">{day}</CardTitle>
                  {/* Display daily calories in the header */}
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{dayData.dailyCalories}</div>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  {dayData.items.length > 0 ? (
                    dayData.items.map((meal: MealItem) => (
                      // Use a more stable key combining day and mealType
                      <div key={`${meal.day}-${meal.mealType}`} className="p-3 border rounded-md hover:shadow-sm transition-shadow bg-background">
                        <h4 className="font-medium text-base sm:text-lg">{meal.mealType}</h4>
                        <p className="text-sm sm:text-base mt-1 text-muted-foreground">{meal.recipe || 'N/A'}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground p-4">No meals planned for this day.</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Instructions for touch scrolling */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 italic">
          Swipe horizontally to see all days
        </p>
      </div>
    );
  }
  
  // Standard table layout for desktop - uses meals prop directly
  return (
    <div className="dashboard-card">
      <h3 className="section-heading text-lg font-semibold mb-4">Weekly Meal Plan</h3>
      {/* Pass the original meals prop which matches MealTableType[] */}
      <MealTable meals={meals} /> 
    </div>
  );
};

export default MealPlanSection;
