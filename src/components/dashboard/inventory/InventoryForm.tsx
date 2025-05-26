
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInventory } from '@/contexts/useInventory';
import { InventoryItem } from '@/types/mealPlanTypes';
import { toast } from 'sonner';

interface InventoryFormProps {
  onComplete: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onComplete }) => {
  const { addInventoryItem } = useInventory();
  
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'last_updated'>>({
    name: '',
    category: 'food',
    unit: 'kg',
    quantity: 0,
    unit_price: 0,
    quantity_in_stock: 0,
    category_id: 'food',
    supplier_id: ''
  });
  
  const handleAddItem = () => {
    const itemId = Date.now().toString();
    const itemWithId: InventoryItem = { 
      ...newItem, 
      id: itemId,
      last_updated: new Date().toISOString()
    };
    
    addInventoryItem(itemWithId);
    
    setNewItem({
      name: '',
      category: 'food',
      unit: 'kg',
      quantity: 0,
      unit_price: 0,
      quantity_in_stock: 0,
      category_id: 'food',
      supplier_id: ''
    });
    
    toast.success("Inventory item added successfully");
    onComplete();
  };
  
  return (
    <>
      <h3 className="text-excel-blue text-lg font-semibold mb-4">Add New Inventory Item</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input 
            id="name" 
            value={newItem.name} 
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            placeholder="Enter item name"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <select 
              id="category"
              value={newItem.category_id || ''}
              onChange={(e) => setNewItem({...newItem, category_id: e.target.value, category: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="food">Food</option>
              <option value="beverages">Beverages</option>
              <option value="cleaning">Cleaning</option>
              <option value="equipment">Equipment</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="unit">Unit</Label>
            <select 
              id="unit"
              value={newItem.unit}
              onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="pack">pack</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantityInStock">Quantity in Stock</Label>
            <Input 
              id="quantityInStock" 
              type="number"
              min="0"
              step="0.01"
              value={newItem.quantity_in_stock} 
              onChange={(e) => setNewItem({...newItem, quantity_in_stock: parseFloat(e.target.value) || 0, quantity: parseFloat(e.target.value) || 0})}
              placeholder="Initial stock quantity"
            />
          </div>
          
          <div>
            <Label htmlFor="unitPrice">Unit Price (€)</Label>
            <Input 
              id="unitPrice" 
              type="number"
              min="0"
              step="0.01"
              value={newItem.unit_price || 0} 
              onChange={(e) => setNewItem({...newItem, unit_price: parseFloat(e.target.value) || 0})}
              placeholder="Price per unit"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="supplier">Supplier ID</Label>
          <Input 
            id="supplier" 
            value={newItem.supplier_id || ''} 
            onChange={(e) => setNewItem({...newItem, supplier_id: e.target.value})}
            placeholder="Enter supplier ID"
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleAddItem}
            disabled={!newItem.name}
            className="bg-excel-green text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600 transition-colors"
          >
            Add to Inventory
          </button>
        </div>
      </div>
    </>
  );
};

export default InventoryForm;
