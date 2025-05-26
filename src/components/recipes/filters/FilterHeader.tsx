import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterHeaderProps {
  onReset: () => void;
}

const FilterHeader = ({
  onReset
}: FilterHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-xl">Filters</h3>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="text-neutral-700 hover:text-primary"
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterHeader;
