
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Tab = {
  id: string;
  label: string;
  active: boolean;
  path?: string;
};

interface ExcelRibbonProps {
  title: string;
  tabs: Tab[];
  onTabClick: (id: string) => void;
}

const ExcelRibbon: React.FC<ExcelRibbonProps> = ({ title, tabs, onTabClick }) => {
  const location = useLocation();
  
  const getTabPath = (tab: Tab) => {
    if (tab.path) return tab.path;
    
    // Default paths for known tabs
    switch (tab.id) {
      case 'dashboard': return '/dashboard';
      case 'recipes': return '/recipes';
      case 'inventory': return '/inventory';
      case 'reports': return '/reports';
      default: return '/dashboard';
    }
  };
  
  return (
    <div>
      {/* Top navigation bar */}
      <div className="bg-primary h-12 flex items-center px-5 shadow-md">
        <h1 className="text-primary-foreground text-lg font-medium">{title}</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex bg-neutral h-10 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={getTabPath(tab)}
            className={`excel-tab h-full min-w-[100px] ${tab.active ? 'excel-tab-active' : 'excel-tab-inactive'}`}
            onClick={() => onTabClick(tab.id)}
          >
            <span className="text-sm font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExcelRibbon;
