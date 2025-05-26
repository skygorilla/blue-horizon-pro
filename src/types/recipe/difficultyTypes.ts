export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_LEVELS: DifficultyLevel[] = ['easy', 'medium', 'hard'];

// Optional: Define icons or colors if needed later
// export const DIFFICULTY_ICONS: Record<DifficultyLevel, string> = {
//   'easy': '...', 
//   'medium': '...', 
//   'hard': '...'
// };

export const getDifficultyDisplayName = (level: DifficultyLevel): string => {
  switch (level) {
    case 'easy': return 'Easy';
    case 'medium': return 'Medium';
    case 'hard': return 'Hard';
    default: return level;
  }
};
