import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ClipboardList, 
  Thermometer, 
  FileText, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import PreparedItemsTracker from './PreparedItemsTracker';
import TemperatureLog from './TemperatureLog'; // Removed .tsx extension
import HaccpReports from './HaccpReports'; // Removed .tsx extension
import HaccpAlerts from './HaccpAlerts'; // Removed .tsx extension
import { useHaccpOperations } from '@/utils/recipes/hooks/useHaccpOperations';

const HaccpDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('items');
  const { preparedItems, isLoading } = useHaccpOperations();

  // Count expired items for alerts badge
  const expiredCount = preparedItems.filter(item => {
    const now = new Date();
    const expires = new Date(item.expires_at);
    return expires < now;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">HACCP Food Safety Tracking</h1>
          <p className="text-muted-foreground">
            Monitor prepared items, temperature logs, and food safety compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="items" className="flex items-center justify-center">
            <ClipboardList className="w-4 h-4 mr-2" />
            <span>Prepared Items</span>
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center justify-center">
            <Thermometer className="w-4 h-4 mr-2" />
            <span>Temperature Log</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center justify-center">
            <FileText className="w-4 h-4 mr-2" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center justify-center relative">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span>Alerts</span>
            {expiredCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {expiredCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="items" className="space-y-4">
            <PreparedItemsTracker />
          </TabsContent>

          <TabsContent value="temperature" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <TemperatureLog />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <HaccpReports />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <HaccpAlerts />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HaccpDashboard;