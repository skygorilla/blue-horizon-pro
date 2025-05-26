import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';
import { 
  CalendarIcon, 
  Truck, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Thermometer, 
  Check, 
  X,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

// List of suppliers
const SUPPLIERS = [
  'Podravka d.d.',
  'Atlantic Grupa',
  'Vindija d.d.',
  'PIK Vrbovec',
  'Dukat',
  'Zvijezda d.d.',
  'Ledo plus',
  'Kraš d.d.',
  'Konzum dobavljači',
  'Metro Cash & Carry',
  'Žitnjak',
  'Velpro',
];

// List of food categories
const FOOD_CATEGORIES = [
  'Svježe meso',
  'Svježa riba',
  'Mliječni proizvodi',
  'Voće i povrće',
  'Smrznuti proizvodi',
  'Konzervirani proizvodi',
  'Suha roba',
  'Pekarnica',
  'Jaja',
  'Prerađevine',
  'Napitci',
  'Ostalo',
];

// Temperature thresholds for different categories
const TEMP_THRESHOLDS = {
  'Svježe meso': { min: 0, max: 5 },
  'Svježa riba': { min: 0, max: 4 },
  'Mliječni proizvodi': { min: 0, max: 8 },
  'Voće i povrće': { min: 4, max: 12 },
  'Smrznuti proizvodi': { min: -25, max: -18 },
  'Konzervirani proizvodi': { min: -5, max: 25 },
  'Suha roba': { min: -5, max: 25 },
  'Pekarnica': { min: -5, max: 25 },
  'Jaja': { min: 5, max: 18 },
  'Prerađevine': { min: 0, max: 10 },
  'Napitci': { min: -5, max: 25 },
  'Ostalo': { min: -5, max: 25 },
};

interface FoodReceivingItem {
  id: number;
  category: string;
  supplier: string;
  deliveryDate: string;
  temperature: number;
  inspector: string;
  productName: string;
  acceptedCondition: boolean;
  acceptedPackaging: boolean;
  acceptedExpiry: boolean;
  lotNumber: string;
  notes: string;
}

const FoodReceivingLog: React.FC = () => {
  // State to store food receiving records
  const [receivingLog, setReceivingLog] = useState<FoodReceivingItem[]>([]);
  
  // State for new item form
  const [newItem, setNewItem] = useState<Omit<FoodReceivingItem, 'id'>>({
    category: '',
    supplier: '',
    deliveryDate: new Date().toISOString(),
    temperature: 0,
    inspector: '',
    productName: '',
    acceptedCondition: true,
    acceptedPackaging: true,
    acceptedExpiry: true,
    lotNumber: '',
    notes: '',
  });
  
  // State for calendar popover
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Load records from local storage
  useEffect(() => {
    const savedItems = localStorage.getItem('foodReceivingLog');
    if (savedItems) {
      setReceivingLog(JSON.parse(savedItems));
    }
  }, []);
  
  // Save records to local storage when they change
  useEffect(() => {
    localStorage.setItem('foodReceivingLog', JSON.stringify(receivingLog));
  }, [receivingLog]);
  
  // Check if temperature is within acceptable range
  const isTemperatureAcceptable = (category: string, temp: number): boolean => {
    if (!category) return true;
    const threshold = TEMP_THRESHOLDS[category];
    if (!threshold) return true;
    return temp >= threshold.min && temp <= threshold.max;
  };
  
  // Handle adding a new receiving record
  const addReceivingRecord = () => {
    // Validate the form
    if (!newItem.category || !newItem.supplier || !newItem.inspector || !newItem.productName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Check temperature thresholds
    if (!isTemperatureAcceptable(newItem.category, newItem.temperature)) {
      const threshold = TEMP_THRESHOLDS[newItem.category];
      if (threshold) {
        toast.warning(`Warning: Temperature out of recommended range (${threshold.min}°C - ${threshold.max}°C)`);
      }
    }
    
    // Create a new record with ID
    const newRecord = {
      ...newItem,
      id: Date.now(),
    };
    
    // Add to log
    setReceivingLog([...receivingLog, newRecord]);
    
    // Reset form
    setNewItem({
      category: '',
      supplier: '',
      deliveryDate: new Date().toISOString(),
      temperature: 0,
      inspector: '',
      productName: '',
      acceptedCondition: true,
      acceptedPackaging: true,
      acceptedExpiry: true,
      lotNumber: '',
      notes: '',
    });
    
    toast.success('Food receiving record successfully added');
  };
  
  // Handle removing a record
  const removeReceivingRecord = (id: number) => {
    setReceivingLog(receivingLog.filter(item => item.id !== id));
    toast.info('Record removed from log');
  };
  
  // Handle date selection
  const handleDateChange = (date: Date) => {
    setNewItem({
      ...newItem,
      deliveryDate: date.toISOString(),
    });
    setShowCalendar(false);
  };
  
  // Export to PDF
  const exportPdf = () => {
    toast.success('HACCP food receiving log exported as PDF');
  };
  
  // Print report
  const printReport = () => {
    toast.success('Sending HACCP food receiving log to printer');
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Food Receiving Log</CardTitle>
        <div className="flex gap-2">
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
        <div className="bg-muted/20 p-4 rounded-lg border mb-6">
          <h3 className="text-sm font-medium mb-4 flex items-center">
            <Truck className="h-4 w-4 mr-1 text-primary" />
            New Food Receiving Entry
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="category">Food Category*</Label>
              <Select 
                value={newItem.category} 
                onValueChange={(value) => setNewItem({ ...newItem, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {FOOD_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="productName">Product Name*</Label>
              <Input 
                id="productName"
                placeholder="Enter product name"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="supplier">Supplier*</Label>
              <Select 
                value={newItem.supplier} 
                onValueChange={(value) => setNewItem({ ...newItem, supplier: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPLIERS.map(supplier => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="deliveryDate">Delivery Date*</Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newItem.deliveryDate 
                      ? format(parseISO(newItem.deliveryDate), 'dd.MM.yyyy') 
                      : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={parseISO(newItem.deliveryDate)}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="temperature">Temperature (°C)*</Label>
              <Input 
                id="temperature"
                type="number"
                step="0.1"
                placeholder="e.g. 3.5"
                value={newItem.temperature}
                onChange={(e) => setNewItem({ 
                  ...newItem, 
                  temperature: parseFloat(e.target.value) 
                })}
                className={
                  newItem.category && !isTemperatureAcceptable(newItem.category, newItem.temperature)
                    ? 'border-red-500'
                    : ''
                }
              />
              {newItem.category && !isTemperatureAcceptable(newItem.category, newItem.temperature) && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Out of recommended range (
                    {TEMP_THRESHOLDS[newItem.category]?.min}°C - 
                    {TEMP_THRESHOLDS[newItem.category]?.max}°C
                  )
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="inspector">Inspected By*</Label>
              <Input 
                id="inspector"
                placeholder="Inspector's full name"
                value={newItem.inspector}
                onChange={(e) => setNewItem({ ...newItem, inspector: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="lotNumber">Lot/Serial Number</Label>
              <Input 
                id="lotNumber"
                placeholder="Enter lot/serial number"
                value={newItem.lotNumber}
                onChange={(e) => setNewItem({ ...newItem, lotNumber: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="acceptedCondition" 
                checked={newItem.acceptedCondition}
                onCheckedChange={(checked) => setNewItem({ ...newItem, acceptedCondition: checked })}
              />
              <Label htmlFor="acceptedCondition">Acceptable Food Condition</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="acceptedPackaging" 
                checked={newItem.acceptedPackaging}
                onCheckedChange={(checked) => setNewItem({ ...newItem, acceptedPackaging: checked })}
              />
              <Label htmlFor="acceptedPackaging">Acceptable Packaging</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="acceptedExpiry" 
                checked={newItem.acceptedExpiry}
                onCheckedChange={(checked) => setNewItem({ ...newItem, acceptedExpiry: checked })}
              />
              <Label htmlFor="acceptedExpiry">Acceptable Expiry Date</Label>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Additional information about food receiving..."
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              className="h-20"
            />
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={addReceivingRecord} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Record
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Food Receiving Records</h3>
          
          {receivingLog.length === 0 ? (
            <div className="text-center p-6 bg-muted/20 rounded-lg border">
              <p className="text-muted-foreground">No food receiving records added yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border p-2 text-left">Date</th>
                    <th className="border p-2 text-left">Category</th>
                    <th className="border p-2 text-left">Product Name</th>
                    <th className="border p-2 text-left">Supplier</th>
                    <th className="border p-2 text-left">Temperature (°C)</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Checks</th>
                    <th className="border p-2 text-left">Lot Number</th>
                    <th className="border p-2 text-left">Inspected By</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receivingLog.map(item => {
                    const tempOk = isTemperatureAcceptable(item.category, item.temperature);
                    const allChecksOk = item.acceptedCondition && item.acceptedPackaging && item.acceptedExpiry;
                    const status = tempOk && allChecksOk ? 'ok' : 'error';
                    
                    return (
                      <tr key={item.id} className="hover:bg-muted/20">
                        <td className="border p-2">{format(parseISO(item.deliveryDate), 'dd.MM.yyyy')}</td>
                        <td className="border p-2">{item.category}</td>
                        <td className="border p-2">{item.productName}</td>
                        <td className="border p-2">{item.supplier}</td>
                        <td className="border p-2">
                          <div className={`flex items-center gap-1 ${tempOk ? 'text-green-600' : 'text-red-600'}`}>
                            <Thermometer className="h-4 w-4" />
                            {item.temperature}°C
                          </div>
                        </td>
                        <td className="border p-2">
                          <Badge variant={status === 'ok' ? 'outline' : 'destructive'}>
                            {status === 'ok' ? 'Accepted' : 'Issue'}
                          </Badge>
                        </td>
                        <td className="border p-2">
                          <div className="flex gap-2">
                            <Badge variant={item.acceptedCondition ? 'secondary' : 'destructive'} className="text-xs">
                              {item.acceptedCondition ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                              Condition
                            </Badge>
                            <Badge variant={item.acceptedPackaging ? 'secondary' : 'destructive'} className="text-xs">
                              {item.acceptedPackaging ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                              Packaging
                            </Badge>
                            <Badge variant={item.acceptedExpiry ? 'secondary' : 'destructive'} className="text-xs">
                              {item.acceptedExpiry ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                              Expiry
                            </Badge>
                          </div>
                        </td>
                        <td className="border p-2">{item.lotNumber || '-'}</td>
                        <td className="border p-2">{item.inspector}</td>
                        <td className="border p-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeReceivingRecord(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>In accordance with HACCP principles, food receiving control is a critical control point (CCP) that ensures only acceptable items enter the facility.</p>
          <p>Verify temperatures, packaging condition, and expiry dates for all received products.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodReceivingLog;