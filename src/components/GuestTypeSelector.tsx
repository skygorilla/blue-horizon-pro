
import React from 'react';
import { GuestTypeCode, GUEST_TYPES } from '@/types/guest/guestTypes';

interface GuestTypeSelectorProps {
  guestType: GuestTypeCode;
  onGuestTypeChange: (type: GuestTypeCode) => void;
}

const GuestTypeSelector: React.FC<GuestTypeSelectorProps> = ({ 
  guestType, 
  onGuestTypeChange 
}) => {
  return (
    <div className="flex items-center space-x-2 bg-white border border-excel-blue rounded p-2">
      <span className="text-xs text-excel-darkgray">Guest Type:</span>
      <div className="flex space-x-1">
        {GUEST_TYPES.filter(type => type.code !== 'both').map(type => (
          <button
            key={type.code}
            onClick={() => onGuestTypeChange(type.code)}
            className={`px-3 py-1 text-sm rounded ${
              guestType === type.code 
                ? 'bg-excel-blue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Guest {type.code}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuestTypeSelector;
