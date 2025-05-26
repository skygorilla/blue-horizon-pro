import MainLayout from '@/components/MainLayout';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/useAuth';
import { BookOpen, Box, Calendar, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChefDashboard: React.FC = () => {
  const { setActiveRole } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    setActiveRole(null);
    navigate('/role-select', { replace: true });
  };

  const cards = [
    { title: 'Recipe Management', icon: <BookOpen size={48} />, link: '/chef/recipes' },
    { title: 'Meal Planning', icon: <Calendar size={48} />, link: '/chef/meal-planning' },
    { title: 'Inventory', icon: <Box size={48} />, link: '/chef/inventory' },
    { title: 'HACCP Tracking', icon: <ShieldCheck size={48} />, link: '/chef/haccp' },
  ];

  return (
    <MainLayout
      showHeader={false}
      showSidebar={false}
      bodyClassName="flex flex-col items-center justify-center min-h-screen overflow-hidden p-4"
    >
      {/* Header row: Back button and breadcrumbs */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded p-2"
        >
          Return to Role Selection
        </button>
        <div className="flex items-center gap-4">
          <PageBreadcrumbs items={[{ label: 'Chef Dashboard' }]} />
          <ThemeToggle />
        </div>
      </div>
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
        Chef Dashboard
      </h1>
      {/* Cards grid */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
        {cards.map(card => (
          <button
            key={card.title}
            onClick={() => navigate(card.link)}
            className="flex flex-col items-center rounded-2xl shadow-md transition transform hover:scale-105 border-2 border-transparent bg-white dark:bg-gray-800 p-6 w-full sm:w-1/2 lg:w-1/3 max-w-xs min-h-[44px] min-w-[44px] hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
          >
            {card.icon}
            <span className="mt-4 text-lg font-medium">
              {card.title}
            </span>
          </button>
        ))}
      </div>
    </MainLayout>
  );
};

export default ChefDashboard;
