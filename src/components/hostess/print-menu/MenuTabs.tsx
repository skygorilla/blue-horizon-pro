
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText } from 'lucide-react';
import DailyMenuView from './DailyMenuView';
import WeeklyMenuView from './WeeklyMenuView';
import { useIsMobile } from '@/hooks/use-mobile';

interface MenuTabsProps {
  today: Date;
  weeklyMenu: {
    day: string;
    date: Date;
    meals: {
      type: string;
      items: string[];
    }[];
  }[];
}

const MenuTabs: React.FC<MenuTabsProps> = ({ today, weeklyMenu }) => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="daily" className="w-full">
      <TabsList className="mb-3 sm:mb-4">
        <TabsTrigger value="daily" className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Daily</span>
        </TabsTrigger>
        <TabsTrigger value="weekly" className="flex items-center gap-1 text-xs sm:text-sm">
          <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Weekly</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="daily" className="mt-0">
        <DailyMenuView today={today} />
      </TabsContent>
      
      <TabsContent value="weekly" className="mt-0">
        <WeeklyMenuView weeklyMenu={weeklyMenu} />
      </TabsContent>
    </Tabs>
  );
};

export default MenuTabs;
