import React from 'react';
import { Search, Book, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeGridPlaceholderProps {
  searchQuery?: string;
  totalRecipes?: number;
}

const RecipeGridPlaceholder: React.FC<RecipeGridPlaceholderProps> = ({ 
  searchQuery,
  totalRecipes = 0 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-light rounded-lg border border-dashed border-gray-300">
      {searchQuery ? (
        <>
          <Search className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes match your search</h3>
          <p className="text-neutral-medium text-center max-w-md mb-6">
            We couldn't find any recipes matching the term "{searchQuery}". 
            Try using different keywords or adjusting the filters.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Adjust filters
            </Button>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add a new recipe
            </Button>
          </div>
        </>
      ) : totalRecipes === 0 ? (
        <>
          <Book className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
          <p className="text-neutral-medium text-center max-w-md mb-6">
            Add new recipes to build your cookbook.
          </p>
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add your first recipe
          </Button>
        </>
      ) : (
        <>
          <Filter className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Filters are too restrictive</h3>
          <p className="text-neutral-medium text-center max-w-md mb-6">
            Your current filters do not match any recipes. 
            Adjust the filters to see more recipes.
          </p>
          <Button variant="outline">
            Reset all filters
          </Button>
        </>
      )}
    </div>
  );
};

export default RecipeGridPlaceholder;
