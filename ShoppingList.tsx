
import React from 'react';
import { ShoppingItem } from '@/types/mealPlanTypes';
import ControlPanel from './shopping/ControlPanel';
import AddItemForm from './shopping/AddItemForm';
import CategoryGroup from './shopping/CategoryGroup';
import { useUISettings } from '@/contexts/useUISettings';
import { Card } from './ui/card';

interface ShoppingListProps {
  items: ShoppingItem[];
  groupSize: number;
  buffer: number;
  onToggleItem: (id: string) => void;
  onGenerateList: () => void;
  onResetChecks: () => void;
  onPrintList: () => void;
  onChangeGroupSize: (size: number) => void;
  onChangeBuffer: (buffer: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, changes: Partial<ShoppingItem>) => void;
  onAddItem: (item: ShoppingItem) => void;
  totalCost: number;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  groupSize,
  buffer,
  onToggleItem,
  onGenerateList,
  onResetChecks,
  onPrintList,
  onChangeGroupSize,
  onChangeBuffer,
  onRemoveItem,
  onUpdateItem,
  onAddItem,
  totalCost
}) => {
  const { touchMode } = useUISettings();
  
  // Group items by category
  const categories = items.reduce<Record<string, ShoppingItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  
  // Get available categories from current items
  const availableCategories = Array.from(
    new Set(['Produce', 'Dairy', 'Meat', 'Dry Goods', 'Cleaning', 'Miscellaneous', ...Object.keys(categories)])
  ).sort();

  return (
    <div className={`space-y-4 ${touchMode ? 'space-y-6' : ''}`}>
      {/* Control panel */}
      <ControlPanel
        groupSize={groupSize}
        buffer={buffer}
        onGenerateList={onGenerateList}
        onResetChecks={onResetChecks}
        onPrintList={onPrintList}
        onChangeGroupSize={onChangeGroupSize}
        onChangeBuffer={onChangeBuffer}
      />
      
      {/* Add new item form */}
      <AddItemForm 
        availableCategories={availableCategories}
        onAddItem={onAddItem}
      />
      
      {/* Shopping list */}
      <div className="excel-card">
        <div className="bg-excel-blue rounded-t-md p-2">
          <div className="flex justify-between items-center">
            <h3 className={`text-white ${touchMode ? 'text-lg font-medium py-1' : 'text-base font-light'}`}>
              Shopping List
            </h3>
            <div className={`text-white ${touchMode ? 'text-base font-medium' : 'text-sm font-light'}`}>
              Total: €{totalCost.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className={`p-2 max-h-[500px] overflow-y-auto ${touchMode ? 'p-3 max-h-[600px]' : ''}`}>
          {touchMode ? (
            // Card layout for touch mode
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(categories).map(([category, categoryItems]) => (
                <Card key={category} className="p-3">
                  <h4 className="text-lg font-medium mb-3">{category}</h4>
                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div key={item.id} 
                        className={`p-3 border rounded-md ${item.checked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => onToggleItem(item.id)}
                              className="mt-1 h-5 w-5"
                            />
                            <div className="ml-3">
                              <h5 className="font-medium">{item.name}</h5>
                              <p className="text-sm">{item.amount}</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => onUpdateItem(item.id, { amount: item.amount + 1 })}
                              className="p-2 bg-blue-100 rounded-full text-blue-700"
                            >
                              +
                            </button>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-2 bg-red-100 rounded-full text-red-700"
                            >
                              X
                            </button>
                          </div>
                        </div>
                        {item.unit_price && (
                          <div className="mt-2 text-right text-sm">
                            €{item.unit_price.toFixed(2)} per unit
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            // Standard table layout for desktop
            <>
              {Object.entries(categories).map(([category, categoryItems]) => (
                <CategoryGroup
                  key={category}
                  category={category}
                  items={categoryItems}
                  onToggleItem={onToggleItem}
                  onRemoveItem={onRemoveItem}
                  onUpdateItem={onUpdateItem}
                />
              ))}
            </>
          )}
          
          {Object.keys(categories).length === 0 && (
            <div className={`text-center p-4 text-gray-500 ${touchMode ? 'text-lg p-6' : ''}`}>
              No items in the shopping list. Add some items or generate from inventory.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
