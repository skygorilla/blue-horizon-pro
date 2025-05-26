import React from 'react';
import { Continent, Region, CONTINENTS, REGIONS } from '@/types/recipe/geographyTypes';
import { cn } from '@/lib/utils';

interface GeographyFilterProps {
  selectedContinents: Continent[];
  selectedRegions: Region[];
  selectedCuisines: string[];  // added to handle local cuisines
  onToggleContinent: (continent: Continent) => void;
  onToggleRegion: (region: Region) => void;
  onToggleLocalCuisine: (cuisine: string) => void;  // added to handle cuisine toggling
  continentCounts?: Record<Continent, number>;
}

const GeographyFilter = ({
  selectedContinents,
  selectedRegions,
  selectedCuisines,  // added
  onToggleContinent,
  onToggleRegion,
  onToggleLocalCuisine,  // added
  continentCounts = {} as Record<Continent, number>
}: GeographyFilterProps) => {
  return (
    <div className="space-y-4">
      {/* Continent & Region as dropdowns */}
      {CONTINENTS.map(continent => {
        const isContActive = selectedContinents.includes(continent.value);
        const contCount = continentCounts[continent.value] || 0;
        const regions = REGIONS[continent.value] || [];
        return (
          <details key={continent.value} open={isContActive} className="border border-gray-200 rounded-lg">
            <summary
              onClick={e => { e.preventDefault(); onToggleContinent(continent.value); }}
              className={cn(
                "flex items-center py-2 px-4 cursor-pointer select-none",
                isContActive ? "bg-primary/10 text-primary-dark font-semibold" : "text-neutral-700",
                "hover:bg-primary/10"
              )}
            >
              <span>{continent.label}</span>
              <span className="ml-auto text-xs text-white bg-accent py-1 px-2 rounded-full">
                {contCount}
              </span>
            </summary>
            <div className="flex flex-col pl-6 pb-2">
              {regions.map(region => {
                const isRegActive = selectedRegions.includes(region.value);
                return (
                  <div
                    key={region.value}
                    onClick={() => onToggleRegion(region.value)}
                    className={cn(
                      "flex items-center py-2 px-4 cursor-pointer rounded-md",
                      isRegActive ? "bg-primary/10 text-primary-dark font-semibold" : "text-neutral-700",
                      "hover:bg-primary/10"
                    )}
                  >
                    <span className="mr-2 w-5 h-5 text-primary shrink-0"></span>
                    <span className="flex-grow capitalize">{region.label}</span>
                  </div>
                );
              })}
            </div>
          </details>
        );
      })}
      {/* Optionally, local cuisine filter could be implemented here using selectedCuisines and onToggleLocalCuisine */}
    </div>
  );
};

export default GeographyFilter;
