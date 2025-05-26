
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingItem } from '@/types/mealPlanTypes';
import { Trash2, Edit2, Save, X } from 'lucide-react';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onUpdate: (id: string, updates: Partial<ShoppingItem>) => void;
  onDelete: (id: string) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    unit_price: item.unit_price || 0,
    notes: item.notes || '',
  });

  const handleSave = () => {
    onUpdate(item.id, {
      ...editData,
      unit_price: editData.unit_price,
      estimated_cost: editData.quantity * editData.unit_price,
      amount: `${editData.quantity} ${editData.unit}`
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      unit_price: item.unit_price || 0,
      notes: item.notes || '',
    });
    setIsEditing(false);
  };

  const toggleChecked = () => {
    onUpdate(item.id, { checked: !item.checked });
  };

  const totalCost = (item.unit_price || 0) * item.quantity;

  if (isEditing) {
    return (
      <tr className="border-b">
        <td className="p-2">
          <input
            type="checkbox"
            checked={item.checked || false}
            onChange={toggleChecked}
            className="mr-2"
          />
          <Input
            value={editData.name}
            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full"
          />
        </td>
        <td className="p-2">
          <Input
            type="number"
            min="0.1"
            step="0.1"
            value={editData.quantity}
            onChange={(e) => setEditData(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
            className="w-20"
          />
        </td>
        <td className="p-2">{editData.unit}</td>
        <td className="p-2">
          <Input
            type="number"
            min="0"
            step="0.01"
            value={editData.unit_price}
            onChange={(e) => setEditData(prev => ({ ...prev, unit_price: parseFloat(e.target.value) || 0 }))}
            className="w-24"
          />
        </td>
        <td className="p-2">€{(editData.quantity * editData.unit_price).toFixed(2)}</td>
        <td className="p-2">
          <Input
            value={editData.notes}
            onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full"
            placeholder="Notes"
          />
        </td>
        <td className="p-2">
          <div className="flex gap-1">
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`border-b ${item.checked ? 'opacity-60 line-through' : ''}`}>
      <td className="p-2">
        <input
          type="checkbox"
          checked={item.checked || false}
          onChange={toggleChecked}
          className="mr-2"
        />
        {item.name}
      </td>
      <td className="p-2">{item.amount || `${item.quantity} ${item.unit}`}</td>
      <td className="p-2">{item.unit}</td>
      <td className="p-2">€{(item.unit_price || 0).toFixed(2)}</td>
      <td className="p-2">€{totalCost.toFixed(2)}</td>
      <td className="p-2">{item.notes}</td>
      <td className="p-2">
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ShoppingListItem;
