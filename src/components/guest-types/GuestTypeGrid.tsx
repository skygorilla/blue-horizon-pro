
import React from 'react';
import { GUEST_TYPES } from '@/types/guest/guestTypes';
import GuestTypeCard from './GuestTypeCard';

const GuestTypeGrid = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Guest Types</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {GUEST_TYPES.map((guestType) => (
          <GuestTypeCard key={guestType.code} guestType={guestType} />
        ))}
      </div>
    </div>
  );
};

export default GuestTypeGrid;
