import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeFilterSummaryProps {
  totalRecipes: number;
  selectedCount: number;
  onToggleFilters: () => void;
  onResetFilters: () => void;
}

const RecipeFilterSummary: React.FC<RecipeFilterSummaryProps> = ({
  totalRecipes,
  selectedCount,
  onToggleFilters,
  onResetFilters,
}) => {
  return (
    <div className="bg-blue-50 shadow-sm rounded-2xl p-6 gap-4 flex flex-wrap items-center justify-between">
      {/* Filters button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleFilters}
        className="flex items-center text-blue-900 hover:bg-blue-100 border-blue-200"
      >
        <Filter className="mr-2 h-5 w-5" />
        <span className="font-medium">Filters</span>
      </Button>

      {/* Reset link */}
      <button
        onClick={onResetFilters}
        className="text-blue-900 text-sm underline hover:text-blue-700"
      >
        Reset
      </button>

      {/* Counters */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-blue-900">{totalRecipes}</span>
          <span className="text-sm text-blue-700">Total Recipes</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-blue-900">{selectedCount}</span>
          <span className="text-sm text-blue-700">Selected Filters</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilterSummary;
