
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingItem } from '@/types/mealPlanTypes';

interface AddItemFormProps {
  availableCategories: string[];
  onAddItem: (item: ShoppingItem) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ availableCategories, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    amount: '',
    category: 'Miscellaneous',
    unitPrice: undefined as number | undefined
  });
  
  const handleAddItem = () => {
    if (newItem.name && newItem.amount) {
      const item: ShoppingItem = {
        id: `item-${Date.now()}`,
        name: newItem.name,
        amount: newItem.amount,
        category: newItem.category,
        checked: false,
        unitPrice: newItem.unitPrice
      };
      onAddItem(item);
      setNewItem({
        name: '',
        amount: '',
        category: 'Miscellaneous',
        unitPrice: undefined
      });
    }
  };

  return (
    <div className="excel-card p-4">
      <h4 className="text-sm font-semibold mb-2">Add New Item</h4>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <Input 
          value={newItem.name}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          placeholder="Item name"
          className="md:col-span-2"
        />
        <Input 
          value={newItem.amount}
          onChange={(e) => setNewItem({...newItem, amount: e.target.value})}
          placeholder="Amount (e.g. 2 kg)"
          className="md:col-span-1"
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
          className="border border-input rounded-md px-3 py-2 text-sm md:col-span-1"
        >
          {availableCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <Input 
          type="number"
          value={newItem.unitPrice || ''}
          onChange={(e) => setNewItem({...newItem, unitPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
          placeholder="Unit price (optional)"
          className="md:col-span-1"
        />
        <Button 
          onClick={handleAddItem}
          disabled={!newItem.name || !newItem.amount}
          className="md:col-span-1"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddItemForm;
