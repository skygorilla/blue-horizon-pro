
import React from 'react';

interface EmptyRecipeStateProps {
  searchQuery?: string;
}

export const EmptyRecipeState: React.FC<EmptyRecipeStateProps> = ({ searchQuery }) => {
  return (
    <div className="text-center py-8">
      <p className="text-neutral-medium">
        {searchQuery ? 'No recipes match your criteria.' : 'No recipes available.'}
      </p>
    </div>
  );
};
