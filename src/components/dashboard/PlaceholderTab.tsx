
import React from 'react';

interface PlaceholderTabProps {
  tabName: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ tabName }) => {
  return (
    <div className="flex items-center justify-center h-[500px] excel-card">
      <p className="text-lg text-gray-500">
        {tabName.charAt(0).toUpperCase() + tabName.slice(1)} tab content would go here.
      </p>
    </div>
  );
};

export default PlaceholderTab;
