import React from 'react';
import { MealType, MEAL_TYPE_ICONS, MEAL_TYPE_COLORS, getMealTypeDisplayName } from '@/types/recipe/mealTypes';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

interface MealTypeFilterProps {
  selectedTypes: MealType[];
  onToggle: (type: MealType) => void;
  mealTypeCounts: Record<MealType, number>; // Added prop for counts
  searchQuery?: string;
}

const MealTypeFilter = ({
  selectedTypes,
  onToggle,
  mealTypeCounts,
  searchQuery = ''
}: MealTypeFilterProps) => {
  const MEAL_TYPES = Object.keys(MEAL_TYPE_ICONS) as MealType[];

  const filteredTypes = searchQuery
    ? MEAL_TYPES.filter(type =>
        getMealTypeDisplayName(type).toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MEAL_TYPES;

  // Map MealType values to the SVGs from the HTML example
  const mealTypeSvgs: Record<MealType, JSX.Element> = {
    starter: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M2 12h2m16 0h2M5 5l1.4 1.4M19 19l-1.4-1.4M19 5l-1.4 1.4M5 19l1.4-1.4M12 6a6 6 0 000 12 6 6 0 000-12z"/></svg>,
    main: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M5 8h11v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM12 2v6"/></svg>,
    soup: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 13.87A4 4 0 010 12V4a2 2 0 014 0v7h16"/></svg>,
    side: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2h18v10H3zM3 12h18l-9 10-9-10z"/></svg>,
    dessert: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.8 20v-4.1l7.9-7.9 4.1 4.1-7.9 7.9H8.8zM18.8 12l-4.1-4.1"/></svg>,
    breakfast: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8z"/></svg>,
    brunch: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8z"/></svg>, // Placeholder, same as breakfast
    lunch: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M5 8h11v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM12 2v6"/></svg>, // Placeholder, same as main
    dinner: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M5 8h11v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM12 2v6"/></svg>, // Placeholder, same as main
    'light-dinner': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M5 8h11v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM12 2v6"/></svg>, // Placeholder, same as main
    beverage: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M2 12h2m16 0h2M5 5l1.4 1.4M19 19l-1.4-1.4M19 5l-1.4 1.4M5 19l1.4-1.4M12 6a6 6 0 000 12 6 6 0 000-12z"/></svg>, // Placeholder, same as starter
    snack: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M2 12h2m16 0h2M5 5l1.4 1.4M19 19l-1.4-1.4M19 5l-1.4 1.4M5 19l1.4-1.4M12 6a6 6 0 000 12 6 6 0 000-12z"/></svg>, // Placeholder, same as starter
    sauce: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 13.87A4 4 0 010 12V4a2 2 0 014 0v7h16"/></svg>, // Placeholder, same as soup
    baked: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.8 20v-4.1l7.9-7.9 4.1 4.1-7.9 7.9H8.8zM18.8 12l-4.1-4.1"/></svg>, // Placeholder, same as dessert
    cocktail: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M2 12h2m16 0h2M5 5l1.4 1.4M19 19l-1.4-1.4M19 5l-1.4 1.4M5 19l1.4-1.4M12 6a6 6 0 000 12 6 6 0 000-12z"/></svg>, // Placeholder, same as starter
    salad: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2h18v10H3zM3 12h18l-9 10-9-10z"/></svg>, // Placeholder, same as side
  };

  return (
    <div className="flex flex-col gap-1">
      {filteredTypes.map(type => {
        const isActive = selectedTypes?.includes(type);
        const count = mealTypeCounts[type] || 0;
        const SvgIcon = mealTypeSvgs[type]; // Get the SVG for the type

        return (
          <div
            key={type}
            onClick={() => onToggle(type)}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`Filter by ${getMealTypeDisplayName(type)}`}
            // Apply styles similar to .filter-item from CSS
            className={cn(
              "flex items-center py-[10px] px-[14px] rounded-lg cursor-pointer transition-colors duration-200 ease-in-out relative text-left font-medium text-sm", // Base styles
              "hover:bg-primary/10", // Hover state from CSS (.filter-item:hover)
              isActive ? "bg-primary/10 text-primary-dark font-semibold" : "text-neutral-700" // Active state from CSS (.filter-item.active)
            )}
          >
            {/* Icon */} 
            {SvgIcon && (
              <span className="mr-[10px] w-5 h-5 text-primary shrink-0">
                {SvgIcon} 
              </span>
            )}
            {/* Meal Type Name */}
            <span className="flex-grow">{getMealTypeDisplayName(type)}</span> 
            {/* Counter - styled like .filter-item-counter */}
            <span className="ml-auto text-xs text-white bg-accent py-1 px-[10px] rounded-full">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MealTypeFilter;
