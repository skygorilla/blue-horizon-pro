
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DailyMenuViewProps {
  today: Date;
}

const DailyMenuView: React.FC<DailyMenuViewProps> = ({ today }) => {
  return (
    <Card className="border-maritime-teal/20">
      <CardHeader className="bg-maritime-navy/5 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-maritime-navy">Today's Menu</CardTitle>
          <div className="text-sm text-gray-600">
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
            <div key={mealType} className="pb-4 border-b last:border-b-0">
              <h3 className="text-lg font-medium mb-3">{mealType}</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Continental Breakfast
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Fresh Fruit Selection
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Greek Yogurt with Honey
                </li>
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMenuView;
