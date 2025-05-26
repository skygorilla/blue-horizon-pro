import React from 'react';

export type Meal = {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  calories: string;
  price?: number; // Optional price field
};

interface MealTableProps {
  meals: Meal[];
}

const MealTable: React.FC<MealTableProps> = ({ meals }) => {
  return (
    <div className="excel-card">
      <div className="bg-excel-blue rounded-t-md p-2">
        <h3 className="text-white text-base font-light text-center">Weekly Menu Overview</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="excel-table-header">
              <th className="text-left px-4 py-2 text-xs w-1/10">Day</th>
              <th className="text-left px-4 py-2 text-xs w-3/10">Breakfast</th>
              <th className="text-left px-4 py-2 text-xs w-3/10">Lunch</th>
              <th className="text-left px-4 py-2 text-xs w-3/10">Dinner</th>
              <th className="text-right px-4 py-2 text-xs w-1/10">Daily Cal</th>
              <th className="text-right px-4 py-2 text-xs w-1/10">Price</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr key={index} className={index % 2 === 0 ? 'excel-table-row-even' : 'excel-table-row-odd'}>
                <td className="px-4 py-2 text-xs">{meal.day}</td>
                <td className="px-4 py-2 text-xs">{meal.breakfast}</td>
                <td className="px-4 py-2 text-xs">{meal.lunch}</td>
                <td className="px-4 py-2 text-xs">{meal.dinner}</td>
                <td className="px-4 py-2 text-xs text-right">{meal.calories}</td>
                <td className="px-4 py-2 text-xs text-right">{meal.price ? `$${meal.price.toFixed(2)}` : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end p-2">
        <button className="w-6 h-6 rounded-full bg-excel-blue flex items-center justify-center">
          <span className="text-white text-xs">▼</span>
        </button>
      </div>
    </div>
  );
};

export default MealTable;
