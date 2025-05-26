import React from 'react';
import { DifficultyLevel, DIFFICULTY_LEVELS, getDifficultyDisplayName } from '@/types/recipe/difficultyTypes';
import { cn } from '@/lib/utils';

interface DifficultyFilterProps {
  selectedLevels: DifficultyLevel[];
  onToggle: (level: DifficultyLevel) => void;
  difficultyCounts: Record<DifficultyLevel, number>;
  searchQuery?: string;
}

// Define SVGs for difficulty levels based on the HTML example
const difficultySvgs: Record<DifficultyLevel, JSX.Element> = {
  easy: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17V3m-3 14h6"/></svg>,
  medium: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17V3m-3 14h6"/></svg>,
  hard: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17V3m-3 14h6"/></svg>,
};

const DifficultyFilter = ({
  selectedLevels,
  onToggle,
  difficultyCounts,
  searchQuery = ''
}: DifficultyFilterProps) => {

  const filteredLevels = searchQuery
    ? DIFFICULTY_LEVELS.filter(level =>
        getDifficultyDisplayName(level).toLowerCase().includes(searchQuery.toLowerCase()) ||
        level.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : DIFFICULTY_LEVELS;

  return (
    <div className="flex flex-col gap-1">
      {filteredLevels.map(level => {
        const isActive = selectedLevels?.includes(level);
        const count = difficultyCounts[level] || 0;
        const SvgIcon = difficultySvgs[level];

        return (
          <div
            key={level}
            onClick={() => onToggle(level)}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`Filter by ${getDifficultyDisplayName(level)}`}
            className={cn(
              "flex items-center py-[10px] px-[14px] rounded-lg cursor-pointer transition-colors duration-200 ease-in-out relative text-left font-medium text-sm",
              "hover:bg-primary/10",
              isActive ? "bg-primary/10 text-primary-dark font-semibold" : "text-neutral-700"
            )}
          >
            <span className="mr-[10px] w-5 h-5 text-primary shrink-0">
              {SvgIcon}
            </span>
            <span className="flex-grow">{getDifficultyDisplayName(level)}</span>
            <span className="ml-auto text-xs text-white bg-accent py-1 px-[10px] rounded-full">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DifficultyFilter;
