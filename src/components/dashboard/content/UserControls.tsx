
import React from 'react';
import GuestTypeSelector from '@/components/GuestTypeSelector';
import { GuestTypeCode } from '@/types/guest/guestTypes';

interface UserControlsProps {
  guestType: GuestTypeCode;
  onGuestTypeChange: (type: GuestTypeCode) => void;
  groupSize: number;
  onGroupSizeChange: (size: number) => void;
}

const UserControls: React.FC<UserControlsProps> = ({
  guestType,
  onGuestTypeChange,
  groupSize,
  onGroupSizeChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <GuestTypeSelector 
        guestType={guestType} 
        onGuestTypeChange={onGuestTypeChange} 
      />
      
      <div className="flex items-center space-x-2 bg-white border border-neutral rounded p-3 shadow-sm">
        <span className="text-sm text-neutral-medium">Group Size:</span>
        <select 
          value={groupSize}
          onChange={(e) => onGroupSizeChange(Number(e.target.value))}
          className="text-sm font-medium bg-white border border-neutral rounded px-2 py-1"
        >
          {[5, 10, 16, 20, 25, 30].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserControls;
