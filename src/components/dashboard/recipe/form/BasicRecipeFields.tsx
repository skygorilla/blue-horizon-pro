import React from 'react';
import { Recipe } from '@/types/mealPlanTypes';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox
import { Label } from '@/components/ui/label'; // Import Label
import { GuestTypeCode, GUEST_TYPES } from '@/types/guest/guestTypes';

interface BasicRecipeFieldsProps {
  recipe: Omit<Recipe, 'id'> | Recipe;
  // Use a more specific type for the onChange handler
  onChange: (updatedRecipe: Omit<Recipe, 'id'> | Recipe) => void;
}

const BasicRecipeFields: React.FC<BasicRecipeFieldsProps> = ({ recipe, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox type specifically
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      onChange({ ...recipe, [name]: checked });
    } else {
      onChange({ ...recipe, [name]: value });
    }
  };

  const handleGuestTypeChange = (value: GuestTypeCode) => {
    onChange({ ...recipe, guestType: value });
  };

  return (
    <div className="bg-white p-4 rounded-md border border-excel-border">
      <h3 className="text-excel-blue text-lg font-semibold mb-4">Basic Information</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            name="title"
            value={recipe.title || ''}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-1">
              Meal Type <span className="text-red-500">*</span>
            </label>
            <select
              id="mealType"
              name="mealType"
              value={recipe.mealType || 'dinner'}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="guestType" className="block text-sm font-medium text-gray-700 mb-1">
              Guest Type <span className="text-red-500">*</span>
            </label>
            <select
              id="guestType"
              name="guestType"
              value={recipe.guestType || 'both'}
              onChange={(e) => handleGuestTypeChange(e.target.value as GuestTypeCode)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {GUEST_TYPES.map(type => (
                <option key={type.code} value={type.code}>
                  {type.name} ({type.code})
                </option>
              ))}
              <option value="both">All Guests (Both)</option>
            </select>
          </div>
        </div>
        
        {/* Add Vegetarian Checkbox */}
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox 
            id="isVegetarian"
            name="isVegetarian"
            checked={!!recipe.isVegetarian} 
            onCheckedChange={(checked) => onChange({ ...recipe, isVegetarian: !!checked })}
          />
          <Label htmlFor="isVegetarian" className="text-sm font-medium text-gray-700">
            Vegetarian Recipe
          </Label>
        </div>
      </div>
    </div>
  );
};

export default BasicRecipeFields;
