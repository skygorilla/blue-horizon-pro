
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - would be replaced with real data from Supabase
const sampleNutritionData = [
  { name: 'Monday', calories: 2400, protein: 120, carbs: 240, fat: 80 },
  { name: 'Tuesday', calories: 2100, protein: 110, carbs: 220, fat: 70 },
  { name: 'Wednesday', calories: 2200, protein: 115, carbs: 230, fat: 75 },
  { name: 'Thursday', calories: 2300, protein: 118, carbs: 235, fat: 78 },
  { name: 'Friday', calories: 2500, protein: 125, carbs: 245, fat: 85 },
  { name: 'Saturday', calories: 2600, protein: 130, carbs: 250, fat: 88 },
  { name: 'Sunday', calories: 2450, protein: 122, carbs: 242, fat: 82 },
];

const macroPercentages = [
  { name: 'Protein', value: 25 },
  { name: 'Carbs', value: 50 },
  { name: 'Fat', value: 25 },
];

const NutritionModule = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Overview</CardTitle>
          <CardDescription>
            Track calories and macronutrients for your meal plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <h3 className="text-sm font-medium mb-2">Weekly Calorie Intake</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleNutritionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calories" fill="#8884d8" name="Calories" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <h3 className="text-sm font-medium mb-2">Daily Macronutrient Targets</h3>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Protein</span>
                    <span>{macroPercentages[0].value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${macroPercentages[0].value}%` }}></div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Carbohydrates</span>
                    <span>{macroPercentages[1].value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${macroPercentages[1].value}%` }}></div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Fats</span>
                    <span>{macroPercentages[2].value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${macroPercentages[2].value}%` }}></div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nutrient Analysis</CardTitle>
            <CardDescription>Detailed breakdown of meal nutrition</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Nutrition analysis module coming soon.
              <br />
              <br />
              This will include detailed vitamin and mineral tracking,
              as well as personalized recommendations based on guest types.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Dietary Restrictions</CardTitle>
            <CardDescription>Guest type-specific nutritional needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Dietary restrictions module coming soon.
              <br />
              <br />
              This will track allergies, preferences, and special dietary needs
              across all guest types to ensure safe and appropriate meal planning.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionModule;
