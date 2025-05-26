import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecipeFilters } from '@/types/recipe/recipeTypes';
import { getDifficultyDisplayName } from '@/types/recipe/difficultyTypes';

interface ActiveFiltersProps {
  filters: RecipeFilters;
  onClearFilter: (filterKey: keyof RecipeFilters) => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onClearFilter, onClearAll }) => {
  const hasActiveFilters = Object.keys(filters).filter(key => filters[key as keyof RecipeFilters]).length > 0;

  return (
    <div className="mb-4">
      {hasActiveFilters ? (
        <div className="flex items-center flex-wrap gap-2">
          {filters.mealType && filters.mealType.length > 0 && (
            filters.mealType.map(mealType => (
              <Badge key={`mealType-${mealType}`} className="gap-x-1.5">
                {mealType}
                <Button variant="ghost" size="sm" onClick={() => onClearFilter('mealType')}>
                  <X className="h-3 w-3" aria-label="Clear filter" />
                </Button>
              </Badge>
            ))
          )}

          {filters.continent && filters.continent.length > 0 && (
            filters.continent.map(continent => (
              <Badge key={`continent-${continent}`} className="gap-x-1.5">
                {continent}
                <Button variant="ghost" size="sm" onClick={() => onClearFilter('continent')}>
                  <X className="h-3 w-3" aria-label="Clear filter" />
                </Button>
              </Badge>
            ))
          )}

          {filters.region && filters.region.length > 0 && (
            filters.region.map(region => (
              <Badge key={`region-${region}`} className="gap-x-1.5">
                {region}
                <Button variant="ghost" size="sm" onClick={() => onClearFilter('region')}>
                  <X className="h-3 w-3" aria-label="Clear filter" />
                </Button>
              </Badge>
            ))
          )}

          {filters.localCuisine && filters.localCuisine.length > 0 && (
            filters.localCuisine.map(cuisine => (
              <Badge key={`localCuisine-${cuisine}`} className="gap-x-1.5">
                {cuisine}
                <Button variant="ghost" size="sm" onClick={() => onClearFilter('localCuisine')}>
                  <X className="h-3 w-3" aria-label="Clear filter" />
                </Button>
              </Badge>
            ))
          )}

          {filters.tags && filters.tags.length > 0 && (
            filters.tags.map(tag => (
              <Badge key={`tag-${tag}`} className="gap-x-1.5">
                {tag}
                <Button variant="ghost" size="sm" onClick={() => onClearFilter('tags')}>
                  <X className="h-3 w-3" aria-label="Clear filter" />
                </Button>
              </Badge>
            ))
          )}

          {filters.search && (
            <Badge key="search" className="gap-x-1.5">
              {filters.search}
              <Button variant="ghost" size="sm" onClick={() => onClearFilter('search')}>
                <X className="h-3 w-3" aria-label="Clear filter" />
              </Button>
            </Badge>
          )}

          {filters.prepTime && (
            <Badge key="prepTime" className="gap-x-1.5">
              {filters.prepTime} minutes
              <Button variant="ghost" size="sm" onClick={() => onClearFilter('prepTime')}>
                <X className="h-3 w-3" aria-label="Clear filter" />
              </Button>
            </Badge>
          )}

          {filters.difficulty && filters.difficulty.length > 0 && (
            filters.difficulty.map(difficulty => (
              <Badge key={`difficulty-${difficulty}`} className="gap-x-1.5">
                {getDifficultyDisplayName(difficulty)}
                <Button variant="ghost" size="sm" onClick={() => onClearFilter('difficulty')}>
                  <X className="h-3 w-3" aria-label="Clear filter" />
                </Button>
              </Badge>
            ))
          )}

          <Button variant="link" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No filters applied.</p>
      )}
    </div>
  );
};

export default ActiveFilters;
