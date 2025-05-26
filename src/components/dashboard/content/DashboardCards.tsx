import React from 'react';
import { Calendar, ShoppingCart, CookingPot, AlertTriangle } from 'lucide-react';
import { useUISettings } from '@/contexts/useUISettings';
import { Card } from '@/components/ui/card';

interface DashboardCardsProps {
  mealCount: number;
  weeklyBudget: number;
  groupSize: number;
  lowStockCount: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ 
  mealCount, 
  weeklyBudget, 
  groupSize, 
  lowStockCount 
}) => {
  const { touchMode } = useUISettings();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center items-center h-screen">
      <Card size="xs" padding="sm" className="flex items-center w-[280px] h-[282px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className={`card-icon bg-primary/10 mr-4 ${touchMode ? 'card-icon-lg' : 'card-icon'}`}>
          <Calendar className={`${touchMode ? 'h-10 w-10' : 'h-8 w-8'} text-primary`} />
        </div>
        <div>
          <p className={`text-neutral-medium ${touchMode ? 'text-base mb-1' : 'text-sm'}`}>Total Recipes</p>
          <p className={`font-semibold text-primary ${touchMode ? 'text-3xl' : 'text-2xl'}`}>{mealCount}</p>
        </div>
      </Card>
      
      <Card size="xs" padding="sm" className="flex items-center w-[280px] h-[282px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className={`card-icon bg-accent-gold/10 mr-4 ${touchMode ? 'card-icon-lg' : 'card-icon'}`}>
          <ShoppingCart className={`${touchMode ? 'h-10 w-10' : 'h-8 w-8'} text-accent-gold`} />
        </div>
        <div>
          <p className={`text-neutral-medium ${touchMode ? 'text-base mb-1' : 'text-sm'}`}>Shopping Budget</p>
          <p className={`font-semibold text-accent-gold ${touchMode ? 'text-3xl' : 'text-2xl'}`}>€{weeklyBudget}</p>
        </div>
      </Card>
      
      <Card size="xs" padding="sm" className="flex items-center w-[280px] h-[282px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className={`card-icon bg-accent-blue/10 mr-4 ${touchMode ? 'card-icon-lg' : 'card-icon'}`}>
          <CookingPot className={`${touchMode ? 'h-10 w-10' : 'h-8 w-8'} text-accent-blue`} />
        </div>
        <div>
          <p className={`text-neutral-medium ${touchMode ? 'text-base mb-1' : 'text-sm'}`}>Group Size</p>
          <p className={`font-semibold text-accent-blue ${touchMode ? 'text-3xl' : 'text-2xl'}`}>{groupSize}</p>
        </div>
      </Card>
      
      <Card size="xs" padding="sm" className="flex items-center w-[280px] h-[282px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className={`card-icon bg-functional-warning/10 mr-4 ${touchMode ? 'card-icon-lg' : 'card-icon'}`}>
          <AlertTriangle className={`${touchMode ? 'h-10 w-10' : 'h-8 w-8'} text-functional-warning`} />
        </div>
        <div>
          <p className={`text-neutral-medium ${touchMode ? 'text-base mb-1' : 'text-sm'}`}>Low Stock Items</p>
          <p className={`font-semibold text-functional-warning ${touchMode ? 'text-3xl' : 'text-2xl'}`}>{lowStockCount}</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCards;
