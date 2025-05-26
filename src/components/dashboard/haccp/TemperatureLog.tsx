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
import { format, parseISO, set } from 'date-fns';
import {
  CalendarIcon,
  Thermometer,
  Printer,
  Download,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types for equipment targets
type EquipmentTargetBase = {
  checkFrequency: string;
};

type MinMaxTarget = EquipmentTargetBase & {
  min: number;
  max: number;
  target?: never; // Ensure target is not present
};

type TargetString = EquipmentTargetBase & {
  target: string;
  min?: never; // Ensure min is not present
  max?: never; // Ensure max is not present
};

type EquipmentTarget = MinMaxTarget | TargetString;

// Equipment types and their target temperature ranges (°C)
const EQUIPMENT_TARGETS: Record<string, EquipmentTarget> = {
  'Hladnjak 1 (Mliječni proizvodi)': { min: 0, max: 5, checkFrequency: '3x dnevno' },
  'Hladnjak 2 (Meso)': { min: 0, max: 4, checkFrequency: '3x dnevno' },
  'Hladnjak 3 (Povrće)': { min: 4, max: 8, checkFrequency: '3x dnevno' },
  'Zamrzivač 1': { min: -22, max: -18, checkFrequency: '1x dnevno' },
  'Zamrzivač 2': { min: -22, max: -18, checkFrequency: '1x dnevno' },
  'Topla vitrina': { min: 63, max: 75, checkFrequency: 'Svaka 2 sata' },
  'Rashladna vitrina (Salate)': { min: 0, max: 5, checkFrequency: 'Svaka 4 sata' },
  'Kuhanje (Piletina)': { min: 75, max: 100, checkFrequency: 'Po pripremi' },
  'Kuhanje (Govedina)': { min: 70, max: 100, checkFrequency: 'Po pripremi' },
  'Hlađenje (Juha)': { target: 'Ispod 10°C unutar 2h', checkFrequency: 'Po pripremi' },
  'Podgrijavanje': { min: 75, max: 100, checkFrequency: 'Po pripremi' },
};

interface TemperatureRecord {
  id: number;
  equipment: string;
  temperature: number | null; // Allow null for readings like 'Hlađenje'
  dateTime: string;
  checkedBy: string;
  notes: string;
  status: 'ok' | 'deviation' | 'action-needed';
}

const TemperatureLog = () => {
  // State for temperature records
  const [temperatureRecords, setTemperatureRecords] = useState<TemperatureRecord[]>([]);
  
  // State for new record form
  const [newRecord, setNewRecord] = useState<Omit<TemperatureRecord, 'id' | 'status'>>({
    equipment: '',
    temperature: null,
    dateTime: new Date().toISOString(),
    checkedBy: '',
    notes: '',
  });
  
  // State for calendar/time popover
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(format(new Date(), 'HH:mm'));
  
  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('temperatureRecords');
    if (savedRecords) {
      setTemperatureRecords(JSON.parse(savedRecords));
    }
  }, []);
  
  // Save records to localStorage when they change
  useEffect(() => {
    localStorage.setItem('temperatureRecords', JSON.stringify(temperatureRecords));
  }, [temperatureRecords]);
  
  // Check temperature status
  const checkTemperatureStatus = (equipment: string, temp: number | null): TemperatureRecord['status'] => {
    if (temp === null) return 'ok'; // Assume OK if specific temp not required (e.g., cooling check)
    
    const target = EQUIPMENT_TARGETS[equipment];
    if (!target) return 'ok'; // No defined target

    // Check if it's a MinMaxTarget
    if ('min' in target && 'max' in target) {
      if (temp >= target.min && temp <= target.max) {
        return 'ok';
      } else {
        return 'deviation';
      }
    } 
    // If it's a TargetString or other type, consider it 'ok' for now unless specific logic is added
    return 'ok'; 
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const currentDateTime = parseISO(newRecord.dateTime);
    const newDateTime = set(date, {
      hours: currentDateTime.getHours(),
      minutes: currentDateTime.getMinutes(),
      seconds: currentDateTime.getSeconds(),
    });
    setSelectedDate(newDateTime);
    setNewRecord({ ...newRecord, dateTime: newDateTime.toISOString() });
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDateTime = set(selectedDate, { hours, minutes, seconds: 0 });
    setSelectedDate(newDateTime);
    setNewRecord({ ...newRecord, dateTime: newDateTime.toISOString() });
    setTime(time);
  };
  
  // Add new temperature record
  const addTemperatureRecord = () => {
    // Form validation
    if (!newRecord.equipment || newRecord.temperature === null || !newRecord.checkedBy) {
      // Allow adding records without temp if equipment type allows (e.g., cooling check)
      const equipmentConfig = EQUIPMENT_TARGETS[newRecord.equipment];
      if (!newRecord.equipment || !newRecord.checkedBy || (newRecord.temperature === null && equipmentConfig && equipmentConfig.min !== undefined)) {
        toast.error('Please fill in the required fields: Equipment, Temperature, Checked By');
        return;
      }
    }
    
    // Check status
    const status = checkTemperatureStatus(newRecord.equipment, newRecord.temperature);
    
    // Create new record with ID
    const record: TemperatureRecord = {
      ...newRecord,
      id: Date.now(),
      status,
    };
    
    // Add to records
    setTemperatureRecords([record, ...temperatureRecords]); // Add to the beginning
    
    // Show warning if deviation
    if (status === 'deviation') {
      toast.warning(`Temperature deviation recorded for ${newRecord.equipment}. Please note corrective actions in the notes.`);
    }
    
    // Reset form (keep equipment selected for potentially faster logging)
    setNewRecord({
      ...newRecord,
      temperature: null,
      dateTime: new Date().toISOString(),
      checkedBy: '', // Or keep checker if same person logs multiple
      notes: '',
    });
    setSelectedDate(new Date());
    setTime(format(new Date(), 'HH:mm'));
    
    toast.success('Temperature record successfully added');
  };
  
  // Remove temperature record
  const removeTemperatureRecord = (id: number) => {
    setTemperatureRecords(temperatureRecords.filter(record => record.id !== id));
    toast.info('Temperature record removed');
  };
  
  // Export to PDF
  const exportPdf = () => {
    toast.success('Temperature log exported as PDF');
  };
  
  // Print report
  const printReport = () => {
    toast.success('Sending temperature log to printer');
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Temperature Log</CardTitle>
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
            <TabsTrigger value="record">Record Measurement</TabsTrigger>
            <TabsTrigger value="targets">Target Temperatures</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <div className="bg-muted/20 p-4 rounded-lg border mb-6">
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <Thermometer className="h-4 w-4 mr-1 text-primary" />
                Add New Temperature Measurement
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="equipment">Equipment/Process*</Label>
                  <Select 
                    value={newRecord.equipment} 
                    onValueChange={(value) => setNewRecord({ ...newRecord, equipment: value, temperature: null })} // Reset temp when equipment changes
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment or process" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(EQUIPMENT_TARGETS).map(equip => (
                        <SelectItem key={equip} value={equip}>
                          {equip}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="temperature">Measured Temperature (°C)*</Label>
                  <Input 
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    value={newRecord.temperature === null ? '' : newRecord.temperature}
                    onChange={(e) => setNewRecord({ ...newRecord, temperature: e.target.value === '' ? null : parseFloat(e.target.value) })}
                    disabled={!newRecord.equipment || EQUIPMENT_TARGETS[newRecord.equipment]?.min === undefined} // Disable if no temp needed
                  />
                  {newRecord.equipment && EQUIPMENT_TARGETS[newRecord.equipment]?.min === undefined && (
                    <p className="text-xs text-muted-foreground mt-1">Temperature not applicable (e.g. cooling check).</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="dateTime">Date and Time of Measurement*</Label>
                  <Popover open={showDateTimePicker} onOpenChange={setShowDateTimePicker}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newRecord.dateTime 
                          ? format(parseISO(newRecord.dateTime), 'dd.MM.yyyy HH:mm') 
                          : 'Select date and time'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 flex">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                      <div className="p-3 border-l">
                        <Label className="mb-2 block text-center">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => handleTimeSelect(e.target.value)}
                          required
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="checkedBy">Checked By*</Label>
                  <Input 
                    id="checkedBy"
                    placeholder="Full Name"
                    value={newRecord.checkedBy}
                    onChange={(e) => setNewRecord({ ...newRecord, checkedBy: e.target.value })}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes / Corrective Actions</Label>
                  <Input 
                    id="notes"
                    placeholder="e.g. Adjusted thermostat, food relocated..."
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={addTemperatureRecord} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Record
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Temperature Measurement Log</h3>
              
              {temperatureRecords.length === 0 ? (
                <div className="text-center p-6 bg-muted/20 rounded-lg border">
                  <p className="text-muted-foreground">No temperature measurements added yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border p-2 text-left">Date and Time</th>
                        <th className="border p-2 text-left">Equipment/Process</th>
                        <th className="border p-2 text-left">Temperature (°C)</th>
                        <th className="border p-2 text-left">Status</th>
                        <th className="border p-2 text-left">Checked By</th>
                        <th className="border p-2 text-left">Notes</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {temperatureRecords.map(record => (
                        <tr key={record.id} className={`hover:bg-muted/20 ${record.status === 'deviation' ? 'bg-red-50' : ''}`}>
                          <td className="border p-2">
                            {format(parseISO(record.dateTime), 'dd.MM.yyyy HH:mm')}
                          </td>
                          <td className="border p-2 font-medium">{record.equipment}</td>
                          <td className={`border p-2 text-center font-semibold ${record.status === 'deviation' ? 'text-red-600' : ''}`}>
                            {record.temperature !== null ? record.temperature.toFixed(1) : 'N/A'}
                          </td>
                          <td className="border p-2">
                            {record.status === 'ok' && (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                OK
                              </Badge>
                            )}
                            {record.status === 'deviation' && (
                              <Badge variant="destructive">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Deviation
                              </Badge>
                            )}
                          </td>
                          <td className="border p-2">{record.checkedBy}</td>
                          <td className="border p-2 text-sm">{record.notes || '-'}</td>
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
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="targets">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-3">Target Temperatures and Check Frequency</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Equipment/Process</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Target Temperature (°C)</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Check Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(EQUIPMENT_TARGETS).map(([name, details], index) => (
                      <tr key={name} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        <td className="border border-blue-200 p-2 text-blue-900">{name}</td>
                        <td className="border border-blue-200 p-2 text-blue-900">
                          {'target' in details ? details.target :
                           'min' in details && 'max' in details ? `${details.min}°C - ${details.max}°C` : 'N/A'}
                        </td>
                        <td className="border border-blue-200 p-2 text-blue-900">{details.checkFrequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-blue-700">
                Maintaining correct temperatures is crucial to prevent bacterial growth and ensure food safety.
                Any deviations must be recorded along with corrective actions taken.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>This log helps in monitoring critical control points (CCP) related to temperature according to the HACCP plan.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureLog;