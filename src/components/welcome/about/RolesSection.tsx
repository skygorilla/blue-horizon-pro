import React from 'react';
import { Users, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface RoleCardProps {
  role: string;
  description: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, description }) => (
  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl hover:translate-y-[-3px] transition-transform duration-300 hover:shadow-md border border-maritime-sand">
    <p className="flex items-start text-neutral-800">
      <CheckCircle className="h-4 w-4 text-maritime-gold mt-1 mr-2 flex-shrink-0" /> 
      <span>
        <span className="font-medium text-maritime-navy">{role}</span>: {description}
      </span>
    </p>
  </div>
);

const RolesSection: React.FC = () => {
  const roles = [
    {
      role: "Captain",
      description: "Oversees operations, approves menus, views cost reports, and ensures compliance with budget constraints."
    },
    {
      role: "Chef",
      description: "Creates recipes, plans daily menus, manages food inventory, and coordinates meal preparation."
    },
    {
      role: "Hostess",
      description: "Views and prints menus, manages guest information, coordinates service, and assists with restock requests."
    },
    {
      role: "Crew",
      description: "Tracks inventory usage, marks items as used, suggests restocks, and helps maintain accurate inventory counts."
    },
    {
      role: "Manager",
      description: "Oversees team coordination, monitors performance, and ensures smooth operations across all roles."
    }
  ];

  return (
    <>
      <Separator className="bg-neutral-200" />
      
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-neutral-900 flex items-center border-b border-maritime-teal/30 pb-2">
          <Users className="h-5 w-5 text-maritime-teal mr-3" /> 
          Who Uses Blue Horizon Pro?
        </h2>
        <div className="space-y-3 mt-2">
          {roles.map((role, index) => (
            <RoleCard key={index} role={role.role} description={role.description} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RolesSection;
