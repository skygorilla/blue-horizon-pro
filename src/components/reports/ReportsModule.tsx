
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, PieChart as PieChartIcon, DollarSign } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Import refactored components
import ReportHeader from './ReportHeader';
import ReportControls from './ReportControls';
import FinancialReportTab from './tabs/FinancialReportTab';
import InventoryReportTab from './tabs/InventoryReportTab';
import MealsReportTab from './tabs/MealsReportTab';

const ReportsModule: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ 
    from: new Date(),
    to: undefined 
  });
  const [reportType, setReportType] = useState('financial');

  return (
    <div className="space-y-6">
      <ReportHeader />
      
      <div className="bg-muted/40 rounded-lg p-4">
        <Tabs defaultValue="financial" onValueChange={setReportType} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList className="mb-2 sm:mb-0">
              <TabsTrigger value="financial" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Financial</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden sm:inline">Inventory</span>
              </TabsTrigger>
              <TabsTrigger value="meals" className="flex items-center gap-1">
                <PieChartIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Meals</span>
              </TabsTrigger>
            </TabsList>
            
            <ReportControls dateRange={dateRange} setDateRange={setDateRange} />
          </div>

          <TabsContent value="financial" className="mt-0">
            <FinancialReportTab />
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-0">
            <InventoryReportTab />
          </TabsContent>
          
          <TabsContent value="meals" className="mt-0">
            <MealsReportTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsModule;
