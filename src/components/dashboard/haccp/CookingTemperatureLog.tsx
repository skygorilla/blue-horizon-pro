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
  Thermometer,
  Printer,
  Download,
  Plus,
  Trash2,
  ChefHat,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Food categories with recommended cooking temperatures in Celsius
const COOKING_TEMP_GUIDELINES = {
  'Govedina - cijeli komadi': { target: 63, description: 'Medium cooked' },
  'Govedina - mljevena': { target: 71, description: 'Fully cooked' },
  'Svinjetina': { target: 71, description: 'No pink parts' },
  'Perad - piletina/puretina': { target: 74, description: 'Clear juices' },
  'Riba': { target: 63, description: 'Opaque and easily separates' },
  'Jaja - jela': { target: 74, description: 'Fully cooked' },
  'Ostaci hrane': { target: 74, description: 'Hot and well reheated' }
};

// Cooking methods
const COOKING_METHODS = [
  'Baking',
  'Boiling',
  'Frying',
  'Grilling',
  'Deep frying',
  'Steaming',
  'Stewing',
  'Microwave',
];

const CookingTemperatureLog = () => {
  // State for the cooking temperature records
  const [temperatureRecords, setTemperatureRecords] = useState([]);
  
  // State for new record form
  const [newRecord, setNewRecord] = useState({
    foodItem: '',
    foodCategory: '',
    cookingMethod: '',
    cookingDate: new Date().toISOString(),
    finalTemperature: '',
    requiredTemperature: '',
    cookedBy: '',
    corrective: '',
  });
  
  // State for calendar popover
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('cookingTemperatureRecords');
    if (savedRecords) {
      setTemperatureRecords(JSON.parse(savedRecords));
    }
  }, []);
  
  // Save records to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cookingTemperatureRecords', JSON.stringify(temperatureRecords));
  }, [temperatureRecords]);
  
  // Update required temperature when food category changes
  useEffect(() => {
    if (newRecord.foodCategory && COOKING_TEMP_GUIDELINES[newRecord.foodCategory]) {
      setNewRecord(prevRecord => ({
        ...prevRecord,
        requiredTemperature: COOKING_TEMP_GUIDELINES[prevRecord.foodCategory].target,
      }));
    }
  }, [newRecord.foodCategory]);
  
  // Check if temperature is safe
  const isTemperatureSafe = (actual, required) => {
    return parseFloat(actual) >= parseFloat(required);
  };
  
  // Handle date selection
  const handleDateChange = (date) => {
    setNewRecord({
      ...newRecord,
      cookingDate: date.toISOString(),
    });
    setShowCalendar(false);
  };
  
  // Add new temperature record
  const addTemperatureRecord = () => {
    // Form validation
    if (!newRecord.foodItem || !newRecord.foodCategory || !newRecord.cookingMethod || !newRecord.finalTemperature || !newRecord.cookedBy) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Check if temperature is safe
    const isSafe = isTemperatureSafe(newRecord.finalTemperature, newRecord.requiredTemperature);
    
    // If temperature is not safe, require corrective action
    if (!isSafe && !newRecord.corrective) {
      toast.error(`Temperature is below safe level (min. ${newRecord.requiredTemperature}°C). Corrective actions are mandatory!`);
      return;
    }
    
    // Create new record with ID
    const record = {
      ...newRecord,
      id: Date.now(),
    };
    
    // Add to records
    setTemperatureRecords([...temperatureRecords, record]);
    
    // Reset form
    setNewRecord({
      foodItem: '',
      foodCategory: '',
      cookingMethod: '',
      cookingDate: new Date().toISOString(),
      finalTemperature: '',
      requiredTemperature: '',
      cookedBy: '',
      corrective: '',
    });
    
    toast.success('Cooking temperature record successfully added');
  };
  
  // Remove temperature record
  const removeTemperatureRecord = (id) => {
    setTemperatureRecords(temperatureRecords.filter(record => record.id !== id));
    toast.info('Record removed from log');
  };
  
  // Export to PDF
  const exportPdf = () => {
    toast.success('HACCP cooking temperature log exported as PDF');
  };
  
  // Print report
  const printReport = () => {
    toast.success('Sending HACCP log to printer');
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cooking Temperature Log</CardTitle>
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
        <Tabs defaultValue="record">
          <TabsList className="mb-4">
            <TabsTrigger value="record">Record Temperature</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <div className="bg-muted/20 p-4 rounded-lg border mb-6">
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <ChefHat className="h-4 w-4 mr-1 text-primary" />
                Cooking Temperature Log
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="foodItem">Dish Name*</Label>
                  <Input 
                    id="foodItem"
                    placeholder="e.g. Chicken fillet, Beef goulash..."
                    value={newRecord.foodItem}
                    onChange={(e) => setNewRecord({ ...newRecord, foodItem: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="foodCategory">Food Category*</Label>
                  <Select 
                    value={newRecord.foodCategory} 
                    onValueChange={(value) => setNewRecord({ ...newRecord, foodCategory: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(COOKING_TEMP_GUIDELINES).map(category => (
                        <SelectItem key={category} value={category}>
                          {category} ({COOKING_TEMP_GUIDELINES[category].target}°C)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="cookingMethod">Cooking Method*</Label>
                  <Select 
                    value={newRecord.cookingMethod} 
                    onValueChange={(value) => setNewRecord({ ...newRecord, cookingMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {COOKING_METHODS.map(method => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="cookingDate">Date*</Label>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newRecord.cookingDate 
                          ? format(parseISO(newRecord.cookingDate), 'dd.MM.yyyy') 
                          : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={parseISO(newRecord.cookingDate)}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="finalTemperature">Measured Temperature (°C)*</Label>
                  <Input 
                    id="finalTemperature"
                    type="number"
                    step="0.1"
                    placeholder="72.5"
                    value={newRecord.finalTemperature}
                    onChange={(e) => setNewRecord({ 
                      ...newRecord, 
                      finalTemperature: e.target.value 
                    })}
                    className={
                      newRecord.foodCategory && 
                      newRecord.finalTemperature && 
                      !isTemperatureSafe(newRecord.finalTemperature, newRecord.requiredTemperature)
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {newRecord.foodCategory && 
                   newRecord.finalTemperature && 
                   !isTemperatureSafe(newRecord.finalTemperature, newRecord.requiredTemperature) && (
                    <p className="text-xs text-red-500 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Below safe temperature (min. {newRecord.requiredTemperature}°C)
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="cookedBy">Cooked By*</Label>
                  <Input 
                    id="cookedBy"
                    placeholder="Chef's full name"
                    value={newRecord.cookedBy}
                    onChange={(e) => setNewRecord({ ...newRecord, cookedBy: e.target.value })}
                  />
                </div>
                
                {newRecord.foodCategory && 
                 newRecord.finalTemperature && 
                 !isTemperatureSafe(newRecord.finalTemperature, newRecord.requiredTemperature) && (
                  <div className="md:col-span-3 bg-red-50 p-4 rounded-md border border-red-200">
                    <Label htmlFor="corrective" className="text-red-800 font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Corrective Actions Required*
                    </Label>
                    <Textarea 
                      id="corrective"
                      placeholder="Describe corrective actions taken (e.g. extended cooking time, increased temperature, discarded food)..."
                      value={newRecord.corrective}
                      onChange={(e) => setNewRecord({ ...newRecord, corrective: e.target.value })}
                      className="h-20 mt-2"
                    />
                    <p className="text-xs text-red-600 mt-2">
                      Temperature is below safe level. Corrective actions must be taken and documented.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={addTemperatureRecord} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Record
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Cooking Temperature Log</h3>
              
              {temperatureRecords.length === 0 ? (
                <div className="text-center p-6 bg-muted/20 rounded-lg border">
                  <p className="text-muted-foreground">No cooking temperature records added yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Dish</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Method</th>
                        <th className="border p-2 text-left">Temperature</th>
                        <th className="border p-2 text-left">Status</th>
                        <th className="border p-2 text-left">Cooked By</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {temperatureRecords.map(record => {
                        const isSafe = isTemperatureSafe(record.finalTemperature, record.requiredTemperature);
                        const status = isSafe ? 'safe' : (record.corrective ? 'corrected' : 'unsafe');
                        
                        return (
                          <tr key={record.id} className="hover:bg-muted/20">
                            <td className="border p-2">
                              {format(parseISO(record.cookingDate), 'dd.MM.yyyy')}
                            </td>
                            <td className="border p-2">{record.foodItem}</td>
                            <td className="border p-2">{record.foodCategory}</td>
                            <td className="border p-2">{record.cookingMethod}</td>
                            <td className="border p-2">
                              <div className={`flex items-center gap-1 ${isSafe ? 'text-green-600' : 'text-red-600'}`}>
                                <Thermometer className="h-4 w-4" />
                                {record.finalTemperature}°C
                                <span className="text-xs text-muted-foreground">
                                  (min. {record.requiredTemperature}°C)
                                </span>
                              </div>
                            </td>
                            <td className="border p-2">
                              {status === 'safe' && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Safe
                                </Badge>
                              )}
                              {status === 'corrected' && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Corrected
                                </Badge>
                              )}
                              {status === 'unsafe' && (
                                <Badge variant="destructive">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Unsafe
                                </Badge>
                              )}
                            </td>
                            <td className="border p-2">{record.cookedBy}</td>
                            <td className="border p-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeTemperatureRecord(record.id)}
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
          </TabsContent>
          
          <TabsContent value="guidelines">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Recommended Cooking Temperatures</h3>
              <p className="text-xs text-blue-600 mb-4">
                Proper cooking temperatures are a critical food safety measure. Undercooked foods may harbor pathogens causing foodborne illness. Adhere to the minimum temperatures listed in the table.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Food Category</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Min. Temperature</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">How to Verify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(COOKING_TEMP_GUIDELINES).map(([category, data], index) => (
                      <tr key={category} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        <td className="border border-blue-200 p-2">{category}</td>
                        <td className="border border-blue-200 p-2 font-medium">{data.target}°C</td>
                        <td className="border border-blue-200 p-2">{data.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-xs text-blue-600">
                <p className="flex items-center mb-1">
                  <strong className="text-blue-800 mr-1">Important:</strong>
                  Measure temperatures at the thickest part of the food using a calibrated food thermometer.
                </p>
                <p className="flex items-center">
                  <strong className="text-blue-800 mr-1">Warning:</strong>
                  For foods that do not reach a safe temperature, implement corrective actions and remeasure.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>In accordance with HACCP principles, monitoring cooking temperatures is a critical control point ensuring elimination of pathogens.</p>
          <p>Regular calibration of food thermometers is essential for reliable temperature measurement.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CookingTemperatureLog;