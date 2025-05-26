
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInventory } from '@/contexts/useInventory';
import { InventoryItem } from '@/types/mealPlanTypes';
import { toast } from 'sonner';

interface InventoryEditProps {
  item: InventoryItem;
  onComplete: () => void;
}

const InventoryEdit: React.FC<InventoryEditProps> = ({ item, onComplete }) => {
  const { updateInventoryItem } = useInventory();
  const [editedItem, setEditedItem] = useState<InventoryItem>(item);
  
  const handleUpdateItem = () => {
    const updatedItem = {
      ...editedItem,
      last_updated: new Date().toISOString()
    };
    
    updateInventoryItem(updatedItem.id, updatedItem);
    toast.success("Inventory item updated successfully");
    onComplete();
  };
  
  return (
    <>
      <h3 className="text-excel-blue text-lg font-semibold mb-4">Edit Inventory Item</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input 
            id="name" 
            value={editedItem.name} 
            onChange={(e) => setEditedItem({...editedItem, name: e.target.value})}
            placeholder="Enter item name"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <select 
              id="category"
              value={editedItem.category_id || ''}
              onChange={(e) => setEditedItem({...editedItem, category_id: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select category</option>
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
              value={editedItem.unit}
              onChange={(e) => setEditedItem({...editedItem, unit: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="pcs">pcs</option>
              <option value="box">box</option>
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
              value={editedItem.quantity_in_stock} 
              onChange={(e) => setEditedItem({...editedItem, quantity_in_stock: parseFloat(e.target.value) || 0})}
              placeholder="Current stock quantity"
            />
          </div>
          
          <div>
            <Label htmlFor="unitPrice">Unit Price (€)</Label>
            <Input 
              id="unitPrice" 
              type="number"
              min="0"
              step="0.01"
              value={editedItem.unit_price || 0} 
              onChange={(e) => setEditedItem({...editedItem, unit_price: parseFloat(e.target.value) || 0})}
              placeholder="Price per unit"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="supplier">Supplier ID</Label>
          <Input 
            id="supplier" 
            value={editedItem.supplier_id || ''} 
            onChange={(e) => setEditedItem({...editedItem, supplier_id: e.target.value})}
            placeholder="Enter supplier ID"
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleUpdateItem}
            disabled={!editedItem.name}
            className="bg-excel-green text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600 transition-colors"
          >
            Update Inventory
          </button>
        </div>
      </div>
    </>
  );
};

export default InventoryEdit;
