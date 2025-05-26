
import { UserRole } from '@/types/auth';
import { Map, Anchor } from 'lucide-react';

// Helper function to get page title from path
export const getPageTitle = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return 'Dashboard';
  
  const mainRoute = pathSegments[0];
  const subRoute = pathSegments[1];
  
  switch (mainRoute) {
    case 'dashboard':
      return 'Dashboard';
    case 'recipes':
      return subRoute === 'edit' ? 'Edit Recipe' : 
             subRoute === 'new' ? 'Add Recipe' : 'Recipes';
    case 'meal-planner':
      return 'Meal Planner';
    case 'inventory':
      return subRoute === 'edit' ? 'Edit Inventory Item' : 
             subRoute === 'new' ? 'Add Inventory Item' : 'Inventory';
    case 'shopping':
      return 'Shopping List';
    case 'reports':
      return 'Reports';
    case 'role-select':
    case 'select-role':
      return 'Select Role';
    default:
      return pathSegments.map(segment => 
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      ).join(' - ');
  }
};

// Helper function to get screen purpose description
export const getScreenPurpose = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return 'View key metrics and plan your day';
  
  const mainRoute = pathSegments[0];
  const subRoute = pathSegments[1];
  
  switch (mainRoute) {
    case 'dashboard':
      return 'View key metrics and plan your day';
    case 'recipes':
      if (subRoute === 'edit') return 'Update recipe details and ingredients';
      if (subRoute === 'new') return 'Create a new recipe for the menu';
      return 'Browse and manage all available recipes';
    case 'meal-planner':
      return 'Plan meals for different guest types and days';
    case 'inventory':
      if (subRoute === 'edit') return 'Update inventory item details';
      if (subRoute === 'new') return 'Add a new item to your inventory';
      return 'Track and manage all inventory items';
    case 'shopping':
      return 'View and manage shopping list for next provisioning';
    case 'reports':
      return 'View and export reports';
    case 'role-select':
    case 'select-role':
      return 'Choose your role to access appropriate features';
    default:
      return '';
  }
};

// Helper function to get breadcrumb items from path
export const getBreadcrumbItems = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return [];
  
  // Special case for dashboard - no breadcrumbs
  if (pathSegments.length === 1 && pathSegments[0] === 'dashboard') {
    return [];
  }
  
  return pathSegments.map((segment, index) => {
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    
    return { label, path };
  });
};
