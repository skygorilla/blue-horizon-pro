import React, { useEffect } from 'react';
import { MealPlanProvider } from '@/contexts/MealPlanContext'; // Correct: Provider comes from context file
import { useMealPlan } from '@/hooks/useMealPlan'; // Correct: Hook comes from hooks file
import ExcelRibbon from './ExcelRibbon';
import DashboardContent from './dashboard/DashboardContent';
import ShoppingTabContent from './dashboard/ShoppingTabContent';
import RecipeTabContent from './dashboard/RecipeTabContent';
import InventoryTabContent from './dashboard/InventoryTabContent';
import PlaceholderTab from './dashboard/PlaceholderTab';
import HaccpDashboard from './dashboard/haccp/HaccpDashboard'; // Import the new HaccpDashboard component
import { useLocation, useNavigate } from 'react-router-dom';

const TabContent: React.FC = () => {
  const { activeTab } = useMealPlan();
  
  return (
    <div className="flex-1 p-4 sm:p-6 bg-neutral-light">
      {activeTab === 'dashboard' && <DashboardContent />}
      {activeTab === 'shopping' && <ShoppingTabContent />}
      {activeTab === 'recipes' && <RecipeTabContent />}
      {activeTab === 'inventory' && <InventoryTabContent />}
      {activeTab === 'haccp' && <HaccpDashboard />} {/* Replace PreparedItemsTracker with the comprehensive HaccpDashboard */}
      {(activeTab !== 'dashboard' && 
        activeTab !== 'shopping' && 
        activeTab !== 'recipes' && 
        activeTab !== 'inventory' &&
        activeTab !== 'haccp') && 
        <PlaceholderTab tabName={activeTab} />}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <MealPlanProvider>
      <DashboardInner />
    </MealPlanProvider>
  );
};

const DashboardInner: React.FC = () => {
  const { activeTab, setActiveTab } = useMealPlan();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check URL query parameters on component mount and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get('tab');
    
    // If there's a tab parameter in the URL, set it as active
    if (tabFromUrl) {
      console.log('Setting active tab from URL:', tabFromUrl);
      setActiveTab(tabFromUrl);
    }
  }, [location.search, setActiveTab]);
  
  // Update URL when tab is changed
  const handleTabClick = (tabId: string) => {
    console.log('Tab clicked:', tabId);
    setActiveTab(tabId);
    
    // Update URL query parameter but don't navigate (to avoid page refresh)
    if (tabId === 'dashboard') {
      // For the main dashboard tab, remove the query parameter
      navigate('/dashboard', { replace: true });
    } else {
      // For other tabs, add the tab as a query parameter
      navigate(`/dashboard?tab=${tabId}`, { replace: true });
    }
  };
  
  // Define tabs
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', active: activeTab === 'dashboard' },
    { id: 'recipes', label: 'Recipes', active: activeTab === 'recipes' },
    { id: 'inventory', label: 'Inventory', active: activeTab === 'inventory' },
    { id: 'menu', label: 'Menu Planning', active: activeTab === 'menu' },
    { id: 'shopping', label: 'Shopping List', active: activeTab === 'shopping' },
    { id: 'haccp', label: 'HACCP', active: activeTab === 'haccp' },
    { id: 'prep', label: 'Prep Schedule', active: activeTab === 'prep' },
    { id: 'reports', label: 'Reports', active: activeTab === 'reports', path: '/reports' }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <ExcelRibbon 
        title="Staff Meal Planner" 
        tabs={tabs}
        onTabClick={handleTabClick}
      />
      
      <TabContent />
    </div>
  );
};

export default Dashboard;
