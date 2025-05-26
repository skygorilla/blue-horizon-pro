
import React from 'react';
import { Users } from 'lucide-react';
import RoleDescription from '../RoleDescription';
import { Ship, ChefHat, Anchor } from 'lucide-react';

const RoleSection: React.FC = () => {
  return (
    <section>
      <h3 className="text-xl font-medium text-maritime-navy flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-maritime-teal" />
        <span>Who Uses Sea Planer Pro?</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
          <RoleDescription 
            title="Captain" 
            icon={<Ship className="h-6 w-6 text-blue-600" />}
            description="Oversees operations, approves menus, views cost reports, and ensures compliance with budget constraints."
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
          <RoleDescription 
            title="Chef" 
            icon={<ChefHat className="h-6 w-6 text-green-600" />}
            description="Creates recipes, plans daily menus, manages food inventory, and coordinates meal preparation."
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-orange-600 hover:shadow-lg transition-shadow">
          <RoleDescription 
            title="Hostess" 
            icon={<Users className="h-6 w-6 text-orange-600" />}
            description="Views and prints menus, manages guest information, coordinates service, and assists with restock requests."
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-gray-600 hover:shadow-lg transition-shadow">
          <RoleDescription 
            title="Crew" 
            icon={<Anchor className="h-6 w-6 text-gray-600" />}
            description="Tracks inventory usage, marks items as used, suggests restocks, and helps maintain accurate inventory counts."
          />
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
