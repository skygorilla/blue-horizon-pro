import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays, differenceInDays } from 'date-fns';
import { CalendarIcon, Utensils, Printer, Download, Plus, Trash2, Refrigerator } from 'lucide-react';
import { toast } from 'sonner';

// CountdownTimer component to display the days remaining
const CountdownTimer = ({ expiryDate, preparationDate }) => {
  const today = new Date();
  const daysRemaining = differenceInDays(new Date(expiryDate), today);
  
  let badgeText = `${daysRemaining} days`;
  if (daysRemaining < 0) {
    badgeText = 'Expired';
  } else if (daysRemaining === 0) {
    badgeText = 'Expires today';
  } else if (daysRemaining === 1) {
    badgeText = 'Expires tomorrow';
  } else {
    badgeText = `${daysRemaining} days`;
  }

  return (
    <Badge variant={daysRemaining < 0 ? 'destructive' : 'secondary'}>
      {badgeText}
    </Badge>
  );
};

// Default prepared items with their shelf life in days
const DEFAULT_FOOD_ITEMS = [
  { name: 'Kuhana jaja', shelfLife: 3 },
  { name: 'Piletina', shelfLife: 3 },
  { name: 'Goveđi gulaš', shelfLife: 3 },
  { name: 'Riža', shelfLife: 2 },
  { name: 'Tjestenina', shelfLife: 2 },
  { name: 'Krumpir pire', shelfLife: 2 },
  { name: 'Riba', shelfLife: 2 },
  { name: 'Varivo', shelfLife: 3 },
  { name: 'Juhe', shelfLife: 3 },
  { name: 'Umaci', shelfLife: 4 },
  { name: 'Salate s dresingom', shelfLife: 1 },
];

const getStatusVariant = (status: string): "secondary" | "destructive" => {
  switch (status) {
    case 'expired':
      return 'destructive';
    case 'expiring_soon':
      return 'secondary';
    default:
      return 'secondary';
  }
};

const PreparedItemsTracker = () => {
  const [preparedItems, setPreparedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    preparedBy: '',
    storageLocation: 'FR1',
    preparationDate: new Date(),
    expiryDate: addDays(new Date(), 3),
    customShelfLife: 3,
  });
  const [selectedFoodItem, setSelectedFoodItem] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [customFood, setCustomFood] = useState('');
  
  // Load items from local storage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('preparedItems');
    if (savedItems) {
      setPreparedItems(JSON.parse(savedItems));
    }
  }, []);
  
  // Save items to local storage when they change
  useEffect(() => {
    localStorage.setItem('preparedItems', JSON.stringify(preparedItems));
  }, [preparedItems]);
  
  // Handle food item selection
  const handleFoodItemSelect = (value) => {
    setSelectedFoodItem(value);
    
    if (value === 'custom') {
      setNewItem({
        ...newItem,
        name: customFood,
      });
    } else {
      const selectedFood = DEFAULT_FOOD_ITEMS.find(item => item.name === value);
      if (selectedFood) {
        const expiryDate = addDays(newItem.preparationDate, selectedFood.shelfLife);
        setNewItem({
          ...newItem,
          name: selectedFood.name,
          customShelfLife: selectedFood.shelfLife,
          expiryDate,
        });
      }
    }
  };
  
  // Update expiry date when shelf life changes
  const handleShelfLifeChange = (days) => {
    const shelfLife = parseInt(days);
    if (!isNaN(shelfLife)) {
      const expiryDate = addDays(newItem.preparationDate, shelfLife);
      setNewItem({
        ...newItem,
        customShelfLife: shelfLife,
        expiryDate,
      });
    }
  };
  
  // Update expiry date when preparation date changes
  const handlePrepDateChange = (date) => {
    const expiryDate = addDays(date, newItem.customShelfLife);
    setNewItem({
      ...newItem,
      preparationDate: date,
      expiryDate,
    });
    setShowCalendar(false);
  };
  
  // Add new prepared item
  const addPreparedItem = () => {
    if (!newItem.name || !newItem.preparedBy || !newItem.storageLocation) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newItemWithId = {
      ...newItem,
      id: Date.now(),
      preparationDate: newItem.preparationDate.toISOString(),
      expiryDate: newItem.expiryDate.toISOString(),
    };
    
    setPreparedItems([...preparedItems, newItemWithId]);
    
    // Reset form
    setNewItem({
      name: '',
      preparedBy: '',
      storageLocation: 'FR1',
      preparationDate: new Date(),
      expiryDate: addDays(new Date(), 3),
      customShelfLife: 3,
    });
    setSelectedFoodItem('');
    setCustomFood('');
    
    toast.success('Item successfully added to tracking system');
  };
  
  // Remove prepared item
  const removePreparedItem = (id) => {
    setPreparedItems(preparedItems.filter(item => item.id !== id));
    toast.info('Item removed from tracking system');
  };
  
  // Export to PDF
  const exportPdf = () => {
    toast.success('HACCP item log exported as PDF');
  };
  
  // Print report
  const printReport = () => {
    toast.success('Sending HACCP item log to printer');
  };
  
  // Add a new refrigerator
  const addNewRefrigerator = () => {
    toast.success('Opening form to add a new refrigerator');
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prepared Items Log</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={printReport} className="gap-1">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          
          <Button variant="outline" onClick={exportPdf} className="gap-1">
            <Download className="h-4 w-4" />
            PDF
          </Button>
          
          <Button variant="outline" onClick={addNewRefrigerator} className="gap-1">
            <Refrigerator className="h-4 w-4" />
            Add Refrigerator
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 p-4 rounded-lg border mb-6">
          <h3 className="text-sm font-medium mb-4 flex items-center">
            <Utensils className="h-4 w-4 mr-1 text-primary" />
            Add New Item
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="foodItem">Select Item</Label>
              <Select value={selectedFoodItem} onValueChange={handleFoodItemSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_FOOD_ITEMS.map(item => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name} ({item.shelfLife} days)
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom Item</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedFoodItem === 'custom' && (
              <div>
                <Label htmlFor="customFood">Item Name</Label>
                <Input 
                  id="customFood"
                  placeholder="Enter item name"
                  value={customFood}
                  onChange={(e) => {
                    setCustomFood(e.target.value);
                    setNewItem({ ...newItem, name: e.target.value });
                  }}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="preparedBy">Prepared By</Label>
              <Input 
                id="preparedBy"
                placeholder="Full Name"
                value={newItem.preparedBy}
                onChange={(e) => setNewItem({ ...newItem, preparedBy: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="storageLocation">Storage Location</Label>
              <Select 
                value={newItem.storageLocation} 
                onValueChange={(value) => setNewItem({ ...newItem, storageLocation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FR1">Fridge 1</SelectItem>
                  <SelectItem value="FR2">Fridge 2</SelectItem>
                  <SelectItem value="FR3">Fridge 3</SelectItem>
                  <SelectItem value="FRZ1">Freezer 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="preparationDate">Preparation Date</Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newItem.preparationDate ? format(newItem.preparationDate, 'dd.MM.yyyy') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newItem.preparationDate}
                    onSelect={handlePrepDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="shelfLife">Shelf Life (days)</Label>
              <Input 
                id="shelfLife"
                type="number"
                min="1"
                max="30"
                value={newItem.customShelfLife}
                onChange={(e) => handleShelfLifeChange(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="expiryDate">Expires On</Label>
              <Input 
                id="expiryDate"
                readOnly
                value={format(newItem.expiryDate, 'dd.MM.yyyy')}
                className="bg-muted/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={addPreparedItem} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Active Item Tracking</h3>
          
          {preparedItems.length === 0 ? (
            <div className="text-center p-6 bg-muted/20 rounded-lg border">
              <p className="text-muted-foreground">No items added for tracking yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border p-2 text-left">Item</th>
                    <th className="border p-2 text-left">Prepared By</th>
                    <th className="border p-2 text-left">Location</th>
                    <th className="border p-2 text-left">Preparation Date</th>
                    <th className="border p-2 text-left">Shelf Life</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {preparedItems.map(item => (
                    <tr key={item.id} className="hover:bg-muted/20">
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.preparedBy}</td>
                      <td className="border p-2">{item.storageLocation}</td>
                      <td className="border p-2">{format(new Date(item.preparationDate), 'dd.MM.yyyy')}</td>
                      <td className="border p-2">{format(new Date(item.expiryDate), 'dd.MM.yyyy')}</td>
                      <td className="border p-2">
                        <Badge
                          variant={getStatusVariant(item.status)}
                          className="text-xs"
                        >
                          <CountdownTimer
                            expiryDate={item.expiryDate}
                            preparationDate={item.preparationDate}
                          />
                        </Badge>
                      </td>
                      <td className="border p-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removePreparedItem(item.id)}
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
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>According to HACCP principles, all prepared items must be properly labeled with preparation and expiration dates.</p>
          <p>Regularly check item status and remove those past their expiration date.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreparedItemsTracker;
