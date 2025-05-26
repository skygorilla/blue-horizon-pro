
import React, { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingItem } from '@/types/mealPlanTypes';
import { cn } from '@/lib/utils';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, changes: Partial<ShoppingItem>) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onToggle,
  onRemove,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  return (
    <div 
      className={cn(
        "flex items-center p-2 border-b border-excel-border last:border-b-0",
        item.checked ? 'bg-gray-100' : 'bg-white'
      )}
    >
      <input 
        type="checkbox" 
        checked={item.checked} 
        onChange={() => onToggle(item.id)}
        className="mr-2"
      />
      
      {isEditing ? (
        // Edit mode
        <>
          <Input 
            value={item.name}
            onChange={(e) => onUpdate(item.id, { name: e.target.value })}
            className="text-xs w-24 md:w-auto mx-1"
          />
          <Input 
            value={item.amount}
            onChange={(e) => onUpdate(item.id, { amount: e.target.value })}
            className="text-xs w-16 md:w-24 mx-1"
          />
          <Input 
            type="number"
            value={item.unitPrice || ''}
            onChange={(e) => onUpdate(item.id, { 
              unitPrice: e.target.value ? parseFloat(e.target.value) : undefined 
            })}
            className="text-xs w-16 md:w-24 mx-1"
            placeholder="Price"
          />
          <Button size="sm" variant="outline" onClick={handleSaveEdit}>
            <Check className="w-4 h-4" />
          </Button>
        </>
      ) : (
        // View mode
        <>
          <span className={cn("text-xs flex-1", item.checked ? 'line-through text-gray-400' : '')}>
            {item.name}
          </span>
          <span className={cn("text-xs mr-2", item.checked ? 'line-through text-gray-400' : '')}>
            {item.amount}
          </span>
          {item.unitPrice && (
            <span className={cn("text-xs mr-2", item.checked ? 'line-through text-gray-400' : '')}>
              €{item.unitPrice.toFixed(2)}
            </span>
          )}
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0" 
              onClick={handleStartEdit}
            >
              <span className="sr-only">Edit</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                <path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-100" 
              onClick={() => onRemove(item.id)}
            >
              <span className="sr-only">Delete</span>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingListItem;
