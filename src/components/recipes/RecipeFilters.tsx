import React from 'react';
import { MealType, DietaryPreference, CulinaryStyle, DifficultyLevel } from '@/types/recipe/filterTypes';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const RecipeFilters = ({
  filters,
  totalRecipes,
  filteredRecipes: filteredRecipeCount,
  onToggleMealType,
  onToggleContinent,
  onToggleRegion,
  onToggleLocalCuisine,
  onToggleTag,
  setMaxPrepTime,
  onToggleDifficulty,
  resetFilters,
}) => {
  return (
    <div className="recipe-filters">
      <Accordion type="multiple" className="space-y-4">
        {/* Meal Type Filter */}
        <AccordionItem value="meal-type">
          <AccordionTrigger>Meal Type</AccordionTrigger>
          <AccordionContent>
            {Object.values(MealType).map((type) => (
              <button
                key={type}
                onClick={() => onToggleMealType(type)}
                className="filter-button"
              >
                {type}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Dietary Preference Filter */}
        <AccordionItem value="dietary-preferences">
          <AccordionTrigger>Dietary Preferences</AccordionTrigger>
          <AccordionContent>
            {Object.values(DietaryPreference).map((preference) => (
              <button
                key={preference}
                onClick={() => onToggleTag(preference)}
                className="filter-button"
              >
                {preference}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Culinary Style Filter */}
        <AccordionItem value="culinary-style">
          <AccordionTrigger>Culinary Style</AccordionTrigger>
          <AccordionContent>
            {Object.values(CulinaryStyle).map((style) => (
              <button
                key={style}
                onClick={() => onToggleTag(style)}
                className="filter-button"
              >
                {style}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Difficulty Level Filter */}
        <AccordionItem value="difficulty-level">
          <AccordionTrigger>Difficulty Level</AccordionTrigger>
          <AccordionContent>
            {Object.values(DifficultyLevel).map((level) => (
              <button
                key={level}
                onClick={() => onToggleDifficulty(level)}
                className="filter-button"
              >
                {level}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RecipeFilters;
