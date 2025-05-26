
import React from 'react';
import { Anchor, ChefHat, Compass, ReceiptText, ClipboardList } from 'lucide-react';

export interface RoleDataType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  color: string;
  size: 'small' | 'large';
}

export const getRoleData = (availableRoles: string[]): RoleDataType[] => [
  {
    id: 'captain',
    title: 'Captain',
    description: "Full access to menus, inventory, and reports. Approve menu plans and update pricing.",
    icon: <Compass className="h-12 w-12 sm:h-14 sm:w-14 text-maritime-navy" />,
    available: availableRoles.includes('captain'),
    color: 'border-maritime-navy/20 hover:border-maritime-navy',
    size: 'large'
  },
  {
    id: 'manager',
    title: 'Manager',
    description: "Manage weekly bookings and trip planning. Track reservations and meal plans.",
    icon: <ClipboardList className="h-12 w-12 sm:h-14 sm:w-14 text-violet-600" />,
    available: true, // Explicitly set to true
    color: 'border-violet-200 hover:border-violet-500',
    size: 'large' // Matching captain's size
  },
  {
    id: 'chef',
    title: 'Chef',
    description: "Manage recipes and meal planning. Assign meals per day and guest type.",
    icon: <ChefHat className="h-12 w-12 sm:h-14 sm:w-14 text-maritime-teal" />,
    available: availableRoles.includes('chef'),
    color: 'border-maritime-teal/20 hover:border-maritime-teal',
    size: 'small'
  },
  {
    id: 'hostess',
    title: 'Hostess',
    description: "View current and upcoming menus. Export/print menus and manage restock lists.",
    icon: <ReceiptText className="h-12 w-12 sm:h-14 sm:w-14 text-maritime-gold" />,
    available: availableRoles.includes('hostess'),
    color: 'border-maritime-gold/20 hover:border-maritime-gold',
    size: 'small'
  },
  {
    id: 'crew',
    title: 'Crew',
    description: "Inventory access optimized for mobile. Mark items as used and suggest restock.",
    icon: <Anchor className="h-12 w-12 sm:h-14 sm:w-14 text-gray-600" />,
    available: availableRoles.includes('crew'),
    color: 'border-gray-200 hover:border-gray-500',
    size: 'small'
  }
];
