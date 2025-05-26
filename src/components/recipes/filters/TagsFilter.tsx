import React from 'react';
import { RECIPE_TAGS } from '@/types/recipe/tagTypes';
import { cn } from '@/lib/utils'; // Import cn utility

interface TagsFilterProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  searchQuery?: string;
  tagCounts?: Record<string, number>;
}

// Helper function to get display name
const getTagDisplayName = (tag: string): string => {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Define SVGs for dietary tags based on the HTML example (using the same leaf icon)
const dietaryTagSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 5h-9.586L6.83 1.415A2 2 0 004.414 1H2v2h2.414L8 6.586V17a2 2 0 002 2h9a2 2 0 002-2V7a2 2 0 00-2-2z"/></svg>;

// You might want a more generic tag icon for non-dietary tags
const genericTagSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;

// Map specific dietary tags to their icon
const tagSvgs: Record<string, JSX.Element> = {
  vegan: dietaryTagSvg,
  vegetarian: dietaryTagSvg,
  'gluten-free': dietaryTagSvg,
  keto: dietaryTagSvg,
  paleo: dietaryTagSvg,
  'low-carb': dietaryTagSvg,
  // Add other tags if needed, potentially using genericTagSvg
};

const TagsFilter = ({ selectedTags, onToggleTag, searchQuery = '', tagCounts = {} }: TagsFilterProps) => {
  const filteredTags = searchQuery
    ? RECIPE_TAGS.filter(tag =>
        getTagDisplayName(tag).toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : RECIPE_TAGS;

  return (
    <div className="flex flex-col gap-1">
      {filteredTags.map(tag => {
        const isActive = selectedTags?.includes(tag);
        const count = tagCounts[tag] || 0;
        const displayName = getTagDisplayName(tag);
        const SvgIcon = tagSvgs[tag] || genericTagSvg; // Use specific icon or fallback to generic

        return (
          <div
            key={tag}
            onClick={() => onToggleTag(tag)}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`Filter by ${displayName}`}
            className={cn(
              "flex items-center py-[10px] px-[14px] rounded-lg cursor-pointer transition-colors duration-200 ease-in-out relative text-left font-medium text-sm",
              "hover:bg-primary/10",
              isActive ? "bg-primary/10 text-primary-dark font-semibold" : "text-neutral-700"
            )}
          >
            <span className="mr-[10px] w-5 h-5 text-primary shrink-0">
              {SvgIcon}
            </span>
            <span className="flex-grow capitalize">{displayName}</span>
            <span className="ml-auto text-xs text-white bg-accent py-1 px-[10px] rounded-full">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TagsFilter;
