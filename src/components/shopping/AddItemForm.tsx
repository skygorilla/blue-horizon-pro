
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingItem } from '@/types/mealPlanTypes';

interface AddItemFormProps {
  onAddItem: (item: Omit<ShoppingItem, 'id'>) => void;
  onCancel?: () => void;
  availableCategories?: string[];
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onCancel, availableCategories = [] }) => {
  const [item, setItem] = useState({
    name: '',
    quantity: 1,
    unit: 'kg',
    category: 'food',
    unit_price: 0,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.name.trim()) {
      onAddItem({
        ...item,
        unit_price: item.unit_price,
        estimated_cost: item.quantity * item.unit_price,
        purchased: false,
        checked: false,
        amount: `${item.quantity} ${item.unit}`
      });
      setItem({
        name: '',
        quantity: 1,
        unit: 'kg',
        category: 'food',
        unit_price: 0,
        notes: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          value={item.name}
          onChange={(e) => setItem(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter item name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="0.1"
            step="0.1"
            value={item.quantity}
            onChange={(e) => setItem(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="unit">Unit</Label>
          <select
            id="unit"
            value={item.unit}
            onChange={(e) => setItem(prev => ({ ...prev, unit: e.target.value }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
            <option value="pack">pack</option>
            <option value="piece">piece</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={item.category}
          onChange={(e) => setItem(prev => ({ ...prev, category: e.target.value }))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        >
          <option value="food">Food</option>
          <option value="beverages">Beverages</option>
          <option value="cleaning">Cleaning</option>
          <option value="equipment">Equipment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="unit_price">Unit Price</Label>
        <Input
          id="unit_price"
          type="number"
          min="0"
          step="0.01"
          value={item.unit_price}
          onChange={(e) => setItem(prev => ({ ...prev, unit_price: parseFloat(e.target.value) || 0 }))}
          placeholder="Price per unit"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          value={item.notes}
          onChange={(e) => setItem(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Additional notes"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          Add Item
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;
