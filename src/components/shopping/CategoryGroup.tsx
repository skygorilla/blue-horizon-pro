
import React from 'react';
import { ShoppingItem } from '@/types/mealPlanTypes';
import ShoppingListItem from './ShoppingListItem';

interface CategoryGroupProps {
  category: string;
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, changes: Partial<ShoppingItem>) => void;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  items,
  onToggleItem,
  onRemoveItem,
  onUpdateItem
}) => {
  return (
    <div className="mb-4">
      <h4 className="excel-table-header rounded-t-md text-sm">{category}</h4>
      <div className="border border-excel-border rounded-b-md">
        {items.map((item) => (
          <ShoppingListItem
            key={item.id}
            item={item}
            onToggle={onToggleItem}
            onRemove={onRemoveItem}
            onUpdate={onUpdateItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
