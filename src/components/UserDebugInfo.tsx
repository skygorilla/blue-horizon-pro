
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserDebugInfo = () => {
  const { user, profile, activeRole } = useAuth();

  const createMissingProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          first_name: user.email?.split('@')[0] || 'User',
          last_name: '',
          available_roles: ['captain', 'chef', 'hostess', 'manager', 'crew']
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        alert('Error creating profile: ' + error.message);
      } else {
        console.log('Profile created:', data);
        alert('Profile created successfully! Please refresh the page.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating profile');
    }
  };

  const updateExistingProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          available_roles: ['captain', 'chef', 'hostess', 'manager', 'crew']
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + error.message);
      } else {
        console.log('Profile updated:', data);
        alert('Profile updated successfully! Please refresh the page.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating profile');
    }
  };

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>User Debug Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>User ID:</strong> {user?.id || 'Not logged in'}
        </div>
        <div>
          <strong>Email:</strong> {user?.email || 'No email'}
        </div>
        <div>
          <strong>Profile exists:</strong> {profile ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Available roles:</strong> {profile?.available_roles?.join(', ') || 'None'}
        </div>
        <div>
          <strong>Active role:</strong> {activeRole || 'None'}
        </div>
        
        <div className="space-y-2">
          {!profile && (
            <Button onClick={createMissingProfile} variant="outline">
              Create Missing Profile
            </Button>
          )}
          {profile && (!profile.available_roles || profile.available_roles.length === 0) && (
            <Button onClick={updateExistingProfile} variant="outline">
              Add All Roles to Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDebugInfo;
