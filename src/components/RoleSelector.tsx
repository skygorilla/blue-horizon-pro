
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RoleSelector = () => {
  const { profile, activeRole, setActiveRole } = useAuth();

  if (!profile || !profile.available_roles || profile.available_roles.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Role:</span>
      <Select value={activeRole || undefined} onValueChange={setActiveRole}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {profile.available_roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
