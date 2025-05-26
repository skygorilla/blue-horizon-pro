import React, { useState } from 'react';
import { MealPlanProvider } from '@/contexts/MealPlanContext';
import HaccpDashboard from '@/components/dashboard/haccp/HaccpDashboard';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageHeader } from '@/components/ui/section-header';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Thermometer, 
  Printer, 
  FileDown, 
  Plus, 
  Refrigerator, 
  ClipboardCheck, 
  Clock, 
  Download,
  Truck,
  ChefHat,
  ShieldCheck
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import PreparedItemsTracker from '@/components/dashboard/haccp/PreparedItemsTracker';
import TemperatureLog from '@/components/dashboard/haccp/TemperatureLog';
import HaccpAlerts from '@/components/dashboard/haccp/HaccpAlerts';
import HaccpReports from '@/components/dashboard/haccp/HaccpReports';
import FoodReceivingLog from '@/components/dashboard/haccp/FoodReceivingLog';
import CookingTemperatureLog from '@/components/dashboard/haccp/CookingTemperatureLog';

const RefrigeratorMonitor = () => {
  const [refrigerators, setRefrigerators] = useState([
    { id: 'FR1', name: 'Fridge 1', temp: 3.2, lastChecked: new Date(), inspector: 'Ivan', status: 'ok' },
    { id: 'FR2', name: 'Fridge 2', temp: 2.8, lastChecked: new Date(Date.now() - 3600000), inspector: 'Marko', status: 'ok' },
    { id: 'FRZ1', name: 'Freezer 1', temp: -18.5, lastChecked: new Date(Date.now() - 7200000), inspector: 'Ana', status: 'ok' }
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRefrigerator, setNewRefrigerator] = useState({
    id: '',
    name: '',
    temp: '',
    inspector: ''
  });

  const handleAddRefrigerator = () => {
    if (newRefrigerator.id && newRefrigerator.name && newRefrigerator.temp) {
      const tempValue = parseFloat(newRefrigerator.temp.toString());
      const status = tempValue < 5 ? 'ok' : 'high';
      
      setRefrigerators([...refrigerators, {
        id: newRefrigerator.id,
        name: newRefrigerator.name,
        temp: tempValue,
        lastChecked: new Date(),
        inspector: newRefrigerator.inspector || 'Chef',
        status: status
      }]);
      
      toast.success(`Temperature added for ${newRefrigerator.name}`);
      setShowAddDialog(false);
      setNewRefrigerator({ id: '', name: '', temp: '', inspector: '' });
    } else {
      toast.error('Please fill in all required fields');
    }
  };
  
  const exportPdf = () => {
    toast.success('HACCP temperature log exported as PDF');
  };
  
  const printReport = () => {
    toast.success('Sending HACCP temperature log to printer');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Fridge Temperature Log</CardTitle>
        <div className="flex gap-2">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-1">
                <Plus className="h-4 w-4" />
                <Refrigerator className="h-4 w-4" />
                Add Measurement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Temperature Measurement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fridgeId">Device ID</Label>
                    <Input
                      id="fridgeId"
                      placeholder="FR1, FRZ1..."
                      value={newRefrigerator.id}
                      onChange={(e) => setNewRefrigerator({...newRefrigerator, id: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fridgeName">Device Name</Label>
                    <Input
                      id="fridgeName"
                      placeholder="Kitchen Fridge..."
                      value={newRefrigerator.name}
                      onChange={(e) => setNewRefrigerator({...newRefrigerator, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fridgeTemp">Temperature (°C)</Label>
                    <Input
                      id="fridgeTemp"
                      type="number"
                      step="0.1"
                      placeholder="3.5"
                      value={newRefrigerator.temp}
                      onChange={(e) => setNewRefrigerator({...newRefrigerator, temp: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="inspector">Checked By</Label>
                    <Input
                      id="inspector"
                      placeholder="Chef's Name"
                      value={newRefrigerator.inspector}
                      onChange={(e) => setNewRefrigerator({...newRefrigerator, inspector: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddRefrigerator}>Add Measurement</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={printReport} className="gap-1">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          
          <Button variant="outline" onClick={exportPdf} className="gap-1">
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">Device Name</th>
                <th className="p-3 text-left font-medium">Temperature</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Check Time</th>
                <th className="p-3 text-left font-medium">Checked By</th>
              </tr>
            </thead>
            <tbody>
              {refrigerators.map((fridge, index) => (
                <tr key={fridge.id} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                  <td className="p-3">{fridge.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Refrigerator className="h-4 w-4 text-blue-500" />
                      {fridge.name}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className={`flex items-center gap-1 font-medium ${fridge.temp > 5 || fridge.temp < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      <Thermometer className="h-4 w-4" />
                      {fridge.temp}°C
                    </div>
                  </td>
                  <td className="p-3">
                    <div className={`px-2 py-1 text-xs rounded-full w-fit ${fridge.status === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {fridge.status === 'ok' ? 'OK' : 'Attention'}
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    {format(fridge.lastChecked, 'dd.MM.yyyy HH:mm')}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <ClipboardCheck className="h-4 w-4 text-gray-500" />
                      {fridge.inspector}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Daily Log of Cooling Device Temperatures
          </h4>
          <p className="text-xs text-blue-600 mt-1">
            According to HACCP standards, fridge temperatures should be below 5°C, and freezer temperatures below -18°C. 
            Logs are maintained at least twice daily (start and end of shift).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Haccp: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'HACCP Tracking', path: '/haccp' }
  ];

  return (
    <MealPlanProvider>
      <div className="min-h-screen bg-neutral-light">
        <div className="container mx-auto pt-6 px-4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <BackButton to="/dashboard" label="Back to Dashboard" />
            <div className="sm:block">
              <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
            </div>
          </div>
          
          <PageHeader 
            title="HACCP Food Safety Log"
            description="Monitor temperatures, track product shelf life, and maintain food safety compliance records."
            icon={<ShieldCheck />}
            className="text-maritime-teal"
          />
          
          <Tabs defaultValue="temperature" className="space-y-4">
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="temperature" className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                Fridges
              </TabsTrigger>
              <TabsTrigger value="cooking" className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                Cooking
              </TabsTrigger>
              <TabsTrigger value="prepared" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Shelf Life
              </TabsTrigger>
              <TabsTrigger value="receiving" className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Receiving
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1">
                <ClipboardCheck className="h-4 w-4" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-1">
                <FileDown className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="temperature" className="space-y-4">
              <RefrigeratorMonitor />
              <Separator className="my-6" />
              <TemperatureLog />
            </TabsContent>
            
            <TabsContent value="cooking">
              <CookingTemperatureLog />
            </TabsContent>
            
            <TabsContent value="prepared">
              <PreparedItemsTracker />
            </TabsContent>
            
            <TabsContent value="receiving">
              <FoodReceivingLog />
            </TabsContent>
            
            <TabsContent value="alerts">
              <HaccpAlerts />
            </TabsContent>
            
            <TabsContent value="reports">
              <HaccpReports />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MealPlanProvider>
  );
};

export default Haccp;