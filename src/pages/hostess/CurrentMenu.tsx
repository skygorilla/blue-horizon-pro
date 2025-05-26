import React from 'react';
// Correct the import path for useAuth
import { useAuth } from '@/contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { PageHeader as PageHeaderComponent } from '@/components/ui/section-header';

const CurrentMenu: React.FC = () => {
  const navigate = useNavigate();
  const { activeRole } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Create breadcrumb items matching the navigation hierarchy
  const breadcrumbItems = [
    { label: 'Hostess Dashboard', path: '/dashboard' },
    { label: 'Current Menu', path: '/current-menu' }
  ];

  // Sample menu data - in a real app, this would come from your context or API
  const todaysMenu = [
    { 
      mealType: 'Breakfast', 
      time: '7:00 - 9:00', 
      dishes: [
        { name: 'Continental Breakfast', guestTypes: ['A', 'B', 'C'] },
        { name: 'Fruit Platter', guestTypes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
        { name: 'Greek Yogurt with Honey', guestTypes: ['A', 'B', 'C', 'E'] }
      ] 
    },
    { 
      mealType: 'Lunch', 
      time: '12:30 - 14:00', 
      dishes: [
        { name: 'Mediterranean Seafood Pasta', guestTypes: ['B', 'C'] },
        { name: 'Greek Salad', guestTypes: ['A', 'B', 'C', 'E'] },
        { name: 'Vegetable Soup', guestTypes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }
      ] 
    },
    { 
      mealType: 'Dinner', 
      time: '19:00 - 21:00', 
      dishes: [
        { name: 'Grilled Sea Bass', guestTypes: ['A', 'C'] },
        { name: 'Vegetable Risotto', guestTypes: ['A', 'C', 'E', 'G'] },
        { name: 'Fresh Fruit and Cheese Platter', guestTypes: ['A', 'C', 'E', 'G'] }
      ] 
    }
  ];

  // Only allow access to hostess role
  if (activeRole !== 'hostess') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <div className="text-center p-6 bg-background rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-red-600">Access Restricted</h1>
          <p className="mt-4">This page is only accessible to users with the Hostess role.</p>
          <button 
            onClick={() => navigate('/role-select')}
            className="mt-6 px-4 py-2 bg-maritime-teal text-white rounded hover:bg-maritime-teal/80"
          >
            Return to Role Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto pt-6 px-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <BackButton to="/role-select" label="Return to Role Selection" />
          <div className="sm:block">
            <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <PageHeaderComponent
              title="Today's Menu"
              description="Current meals and dishes for today's service"
              icon={<Calendar className="text-maritime-gold" />}
              className="text-maritime-gold mb-0"
            />
            <div className="mt-2 px-3 py-1.5 bg-neutral-light rounded-md text-sm text-muted-foreground">
              {today}
            </div>
          </div>
          
          <div className="space-y-8">
            {todaysMenu.map((meal, index) => (
              <Card key={index} className="border-maritime-teal/20">
                <CardHeader className="bg-maritime-navy/5 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-maritime-navy">{meal.mealType}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {meal.dishes.map((dish, dishIndex) => (
                      <li key={dishIndex} className="p-3 border border-gray-100 rounded-md hover:bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-medium">{dish.name}</span>
                          <div className="mt-1 sm:mt-0">
                            <span className="text-xs text-gray-500 mr-2">For guest types:</span>
                            <div className="inline-flex gap-1 mt-1">
                              {dish.guestTypes.map((type) => (
                                <span key={type} className="px-1.5 py-0.5 text-xs rounded bg-gray-100">
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8 mb-4">
          <p>This menu is subject to change based on ingredient availability and guest preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentMenu;
