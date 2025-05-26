
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleSelector from './RoleSelector';
import { Button } from '@/components/ui/button';

console.log('Navigation component loading...');

const Navigation = () => {
  console.log('Navigation component rendering...');
  const navigate = useNavigate();
  const { activeRole, signOut } = useAuth();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blue Horizon Pro</h1>
        
        <div className="flex items-center space-x-4">
          <button onClick={() => handleNavigation('/')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Dashboard
          </button>
          <button onClick={() => handleNavigation('/recipes')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Recipes
          </button>
          <button onClick={() => handleNavigation('/inventory')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Inventory
          </button>
          <button onClick={() => handleNavigation('/menus')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Menus
          </button>
          <button onClick={() => handleNavigation('/bookings')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Bookings
          </button>
          <button onClick={() => handleNavigation('/shopping')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Shopping
          </button>
          <button onClick={() => handleNavigation('/prep')} className="hover:bg-blue-700 px-3 py-2 rounded">
            Prep Items
          </button>
          <button onClick={() => handleNavigation('/admin')} className="hover:bg-blue-700 px-3 py-2 rounded bg-red-600">
            Admin
          </button>
          
          <div className="flex items-center space-x-4 border-l border-blue-500 pl-4">
            {activeRole && (
              <span className="text-sm bg-blue-700 px-2 py-1 rounded">
                {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
              </span>
            )}
            <RoleSelector />
            <Button 
              onClick={signOut}
              variant="outline"
              className="text-blue-600 border-white hover:bg-white"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
