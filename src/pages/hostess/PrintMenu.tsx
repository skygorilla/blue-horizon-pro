import React, { useState } from 'react';
// Correct the import path for useAuth
import { useAuth } from '@/contexts/useAuth'; 
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import AccessRestricted from '@/components/hostess/print-menu/AccessRestricted';
import GuestTypeSelector from '@/components/hostess/print-menu/GuestTypeSelector';
import PrintMenuHeader from '@/components/hostess/print-menu/PrintMenuHeader';
import MenuTabs from '@/components/hostess/print-menu/MenuTabs';
import { GuestTypeCode } from '@/types/mealPlanTypes';

const PrintMenu: React.FC = () => {
  const navigate = useNavigate();
  const { activeRole } = useAuth();
  const [selectedGuestTypes, setSelectedGuestTypes] = useState<GuestTypeCode[]>(['A', 'C']);
  const today = new Date();
  
  // Create breadcrumb items matching the navigation hierarchy
  const breadcrumbItems = [
    { label: 'Hostess Dashboard', path: '/dashboard' },
    { label: 'Print Menu', path: '/print-menu' }
  ];

  // Sample menu data for the week
  const weeklyMenu = [
    {
      day: 'Monday',
      date: new Date(today.getTime() + (1 - today.getDay()) * 24 * 60 * 60 * 1000),
      meals: [
        { type: 'Breakfast', items: ['Continental Breakfast', 'Fresh Fruit', 'Yogurt'] },
        { type: 'Lunch', items: ['Greek Salad', 'Grilled Chicken', 'Fresh Bread'] },
        { type: 'Dinner', items: ['Seafood Paella', 'Mixed Vegetables', 'Tiramisu'] },
      ]
    },
    {
      day: 'Tuesday',
      date: new Date(today.getTime() + (2 - today.getDay()) * 24 * 60 * 60 * 1000),
      meals: [
        { type: 'Breakfast', items: ['Eggs Benedict', 'Fresh Fruit', 'Pastries'] },
        { type: 'Lunch', items: ['Caprese Salad', 'Grilled Fish', 'Fresh Bread'] },
        { type: 'Dinner', items: ['Beef Tenderloin', 'Roasted Potatoes', 'Chocolate Cake'] },
      ]
    },
    {
      day: 'Wednesday',
      date: new Date(today.getTime() + (3 - today.getDay()) * 24 * 60 * 60 * 1000),
      meals: [
        { type: 'Breakfast', items: ['American Breakfast', 'Fresh Fruit', 'Yogurt'] },
        { type: 'Lunch', items: ['Caesar Salad', 'Club Sandwich', 'Fresh Bread'] },
        { type: 'Dinner', items: ['Lobster Linguine', 'Mixed Vegetables', 'Fruit Tart'] },
      ]
    },
    // More days would follow...
  ];

  const handleGuestTypeToggle = (type: GuestTypeCode) => {
    if (selectedGuestTypes.includes(type)) {
      setSelectedGuestTypes(selectedGuestTypes.filter(t => t !== type));
    } else {
      setSelectedGuestTypes([...selectedGuestTypes, type]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Only allow access to hostess role
  if (activeRole !== 'hostess') {
    return <AccessRestricted />;
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto pt-6 px-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <BackButton to="/dashboard" label="Return to Dashboard" />
          <div className="sm:block">
            <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md p-6 mb-6">
          <PrintMenuHeader onPrint={handlePrint} />
          
          <GuestTypeSelector 
            selectedGuestTypes={selectedGuestTypes}
            onToggleGuestType={handleGuestTypeToggle}
          />
          
          <MenuTabs today={today} weeklyMenu={weeklyMenu} />
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8 mb-4">
          <p>Please verify menu items with the chef for any last-minute changes.</p>
        </div>
      </div>
    </div>
  );
};

export default PrintMenu;
