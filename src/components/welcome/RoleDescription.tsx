
import React from 'react';

interface RoleDescriptionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const RoleDescription = ({ title, icon, description }: RoleDescriptionProps) => (
  <div className="flex space-x-3">
    <div className="flex-shrink-0 pt-1">
      {icon}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default RoleDescription;
