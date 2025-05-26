import React from 'react';
import { Slider } from '@/components/ui/slider';

interface PrepTimeFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

const PrepTimeFilter = ({ value, onChange }: PrepTimeFilterProps) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        {/* Translate from Croatian */}
        <h4 className="text-xs text-neutral-medium font-sans font-normal">Maximum preparation time</h4>
        <span className="text-xs text-neutral-medium font-sans font-normal">
          {/* Translate from Croatian */}
          {value ? `${value} min` : 'Any'}
        </span>
      </div>
      <Slider
        defaultValue={[60]}
        max={120}
        step={5}
        onValueChange={([value]) => onChange(value)}
      />
    </div>
  );
};

export default PrepTimeFilter;
