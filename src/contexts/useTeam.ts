import { useContext } from 'react';
import { TeamContext } from './TeamContext';

// Hook for using the team context
export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};