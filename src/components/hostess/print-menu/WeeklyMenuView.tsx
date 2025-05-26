
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MealItem {
  type: string;
  items: string[];
}

interface DayMenu {
  day: string;
  date: Date;
  meals: MealItem[];
}

interface WeeklyMenuViewProps {
  weeklyMenu: DayMenu[];
}

const WeeklyMenuView: React.FC<WeeklyMenuViewProps> = ({ weeklyMenu }) => {
  return (
    <div className="space-y-6">
      {weeklyMenu.map((day, index) => (
        <Card key={index} className="border-maritime-teal/20">
          <CardHeader className="bg-maritime-navy/5 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-maritime-navy">{day.day}</CardTitle>
              <div className="text-sm text-gray-600">
                {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {day.meals.map((meal, mealIndex) => (
                <div key={mealIndex} className="pb-3 border-b last:border-b-0">
                  <h3 className="text-base font-medium mb-2">{meal.type}</h3>
                  <ul className="space-y-1">
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeeklyMenuView;
