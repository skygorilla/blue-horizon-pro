import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blue Horizon Pro</h1>
        <div className="flex space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
