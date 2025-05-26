import { User } from '@supabase/supabase-js';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';

// Define types for team members and roles
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  avatarUrl?: string;
  lastActive?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

interface TeamContextType {
  currentTeam: Team | null;
  allTeams: Team[];
  isLoading: boolean;
  error: string | null;
  createTeam: (name: string, description?: string) => Promise<Team>;
  updateTeam: (teamId: string, updates: Partial<Team>) => Promise<Team>;
  deleteTeam: (teamId: string) => Promise<boolean>;
  switchTeam: (teamId: string) => void;
  inviteMember: (teamId: string, email: string, role: TeamMember['role']) => Promise<boolean>;
  removeMember: (teamId: string, memberId: string) => Promise<boolean>;
  updateMemberRole: (teamId: string, memberId: string, role: TeamMember['role']) => Promise<boolean>;
}

// Create the context
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Provider component
export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to create a team member from user
  const createMemberFromUser = (userData: User | string | null) => {
    // If user is null or a string, create a default member
    if (!userData || typeof userData === 'string') {
      return {
        id: typeof userData === 'string' ? userData : Math.random().toString(36).substring(2, 9),
        name: 'Current User',
        email: 'user@example.com',
        role: 'owner' as const,
        lastActive: new Date().toISOString()
      };
    }
    
    // Otherwise, use the User object properties
    return {
      id: userData.id,
      name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'Current User',
      email: userData.email || 'user@example.com',
      role: 'owner' as const,
      lastActive: new Date().toISOString()
    };
  };

  // Fetch teams for the current user
  useEffect(() => {
    if (!user) {
      setAllTeams([]);
      setCurrentTeam(null);
      setIsLoading(false);
      return;
    }

    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // For now, we're using mock data
        const mockTeams: Team[] = [
          {
            id: '1',
            name: 'Blue Horizon Dev Team',
            description: 'Main development team for Blue Horizon Pro',
            members: [
              createMemberFromUser(user),
              {
                id: '2',
                name: 'Team Member 1',
                email: 'member1@example.com',
                role: 'editor',
                lastActive: new Date().toISOString()
              }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        setAllTeams(mockTeams);
        if (mockTeams.length > 0) {
          setCurrentTeam(mockTeams[0]);
        }
      } catch (err) {
        setError('Failed to fetch teams');
        console.error('Error fetching teams:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [user]);

  // Create a new team
  const createTeam = async (name: string, description?: string): Promise<Team> => {
    if (!user) {
      throw new Error('You must be logged in to create a team');
    }
    
    try {
      // In a real implementation, this would be an API call
      const newTeam: Team = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        description,
        members: [createMemberFromUser(user)],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setAllTeams(prevTeams => [...prevTeams, newTeam]);
      setCurrentTeam(newTeam);
      return newTeam;
    } catch (err) {
      setError('Failed to create team');
      console.error('Error creating team:', err);
      throw err;
    }
  };

  // Update a team
  const updateTeam = async (teamId: string, updates: Partial<Team>): Promise<Team> => {
    try {
      // In a real implementation, this would be an API call
      const updatedTeams = allTeams.map(team => {
        if (team.id === teamId) {
          const updatedTeam = { 
            ...team, 
            ...updates,
            updatedAt: new Date().toISOString()
          };
          if (currentTeam?.id === teamId) {
            setCurrentTeam(updatedTeam);
          }
          return updatedTeam;
        }
        return team;
      });
      
      setAllTeams(updatedTeams);
      const updated = updatedTeams.find(t => t.id === teamId);
      if (!updated) {
        throw new Error('Team not found');
      }
      return updated;
    } catch (err) {
      setError('Failed to update team');
      console.error('Error updating team:', err);
      throw err;
    }
  };

  // Delete a team
  const deleteTeam = async (teamId: string): Promise<boolean> => {
    try {
      // In a real implementation, this would be an API call
      const filteredTeams = allTeams.filter(team => team.id !== teamId);
      setAllTeams(filteredTeams);
      
      if (currentTeam?.id === teamId) {
        setCurrentTeam(filteredTeams.length > 0 ? filteredTeams[0] : null);
      }
      
      return true;
    } catch (err) {
      setError('Failed to delete team');
      console.error('Error deleting team:', err);
      throw err;
    }
  };

  // Switch to a different team
  const switchTeam = (teamId: string) => {
    const team = allTeams.find(t => t.id === teamId);
    if (team) {
      setCurrentTeam(team);
    } else {
      setError('Team not found');
    }
  };

  // Invite a member to a team
  const inviteMember = async (teamId: string, email: string, role: TeamMember['role']): Promise<boolean> => {
    try {
      // In a real implementation, this would be an API call and email invitation
      const newMember: TeamMember = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0], // Placeholder name
        email,
        role,
      };
      
      const updatedTeams = allTeams.map(team => {
        if (team.id === teamId) {
          const updatedTeam = { 
            ...team, 
            members: [...team.members, newMember],
            updatedAt: new Date().toISOString()
          };
          if (currentTeam?.id === teamId) {
            setCurrentTeam(updatedTeam);
          }
          return updatedTeam;
        }
        return team;
      });
      
      setAllTeams(updatedTeams);
      return true;
    } catch (err) {
      setError('Failed to invite member');
      console.error('Error inviting member:', err);
      throw err;
    }
  };

  // Remove a member from a team
  const removeMember = async (teamId: string, memberId: string): Promise<boolean> => {
    try {
      // In a real implementation, this would be an API call
      const updatedTeams = allTeams.map(team => {
        if (team.id === teamId) {
          const updatedTeam = { 
            ...team, 
            members: team.members.filter(m => m.id !== memberId),
            updatedAt: new Date().toISOString()
          };
          if (currentTeam?.id === teamId) {
            setCurrentTeam(updatedTeam);
          }
          return updatedTeam;
        }
        return team;
      });
      
      setAllTeams(updatedTeams);
      return true;
    } catch (err) {
      setError('Failed to remove member');
      console.error('Error removing member:', err);
      throw err;
    }
  };

  // Update a member's role
  const updateMemberRole = async (teamId: string, memberId: string, role: TeamMember['role']): Promise<boolean> => {
    try {
      // In a real implementation, this would be an API call
      const updatedTeams = allTeams.map(team => {
        if (team.id === teamId) {
          const updatedMembers = team.members.map(member => {
            if (member.id === memberId) {
              return { ...member, role };
            }
            return member;
          });
          
          const updatedTeam = { 
            ...team, 
            members: updatedMembers,
            updatedAt: new Date().toISOString()
          };
          
          if (currentTeam?.id === teamId) {
            setCurrentTeam(updatedTeam);
          }
          return updatedTeam;
        }
        return team;
      });
      
      setAllTeams(updatedTeams);
      return true;
    } catch (err) {
      setError('Failed to update member role');
      console.error('Error updating member role:', err);
      throw err;
    }
  };

  const value = {
    currentTeam,
    allTeams,
    isLoading,
    error,
    createTeam,
    updateTeam,
    deleteTeam,
    switchTeam,
    inviteMember,
    removeMember,
    updateMemberRole
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

// Export the context for testing purposes
export { TeamContext };
