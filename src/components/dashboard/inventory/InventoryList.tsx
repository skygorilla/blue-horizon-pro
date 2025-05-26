
import React, { useState } from 'react';
import { useInventory } from '@/contexts/useInventory';
import { InventoryItem } from '@/types/mealPlanTypes';
import { Search, Filter, Plus, Minus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface InventoryListProps {
  onEdit: (item: InventoryItem) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ onEdit }) => {
  const { inventoryItems, deleteInventoryItem, adjustStock } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [adjustmentAmount, setAdjustmentAmount] = useState<Record<string, string>>({});

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      deleteInventoryItem(id);
      toast.success("Item deleted from inventory");
    }
  };

  const handleAdjustStock = (id: string, currentAmount: string) => {
    const amount = parseFloat(currentAmount);
    if (!isNaN(amount) && amount !== 0) {
      adjustStock(id, amount);
      setAdjustmentAmount(prev => ({ ...prev, [id]: '' }));
      toast.success(`Stock adjusted successfully`);
    }
  };

  // Filter items using correct property names
  const filteredItems: InventoryItem[] = inventoryItems.filter((item: InventoryItem) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.supplier_id && item.supplier_id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || item.category_id === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Group items by category using correct property names
  const groupedItems: Record<string, InventoryItem[]> = filteredItems.reduce((acc, item) => {
    const category = item.category_id || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div className="mb-4 space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search inventory by name or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-1 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm bg-white border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All Categories</option>
              <option value="food">Food</option>
              <option value="beverages">Beverages</option>
              <option value="cleaning">Cleaning</option>
              <option value="equipment">Equipment</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          {inventoryItems.length === 0 
            ? "No inventory items yet. Add some items to get started!" 
            : "No items match your search criteria."}
        </p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h3 className="excel-table-header rounded-t-md text-sm">{category}</h3>
              <div className="border border-excel-border rounded-b-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-excel-lightgray">
                      <th className="px-2 py-1 text-left text-xs">Item</th>
                      <th className="px-2 py-1 text-left text-xs">Supplier</th>
                      <th className="px-2 py-1 text-right text-xs">Stock</th>
                      <th className="px-2 py-1 text-right text-xs">Unit</th>
                      <th className="px-2 py-1 text-right text-xs">Price (€)</th>
                      <th className="px-2 py-1 text-center text-xs">Adjust</th>
                      <th className="px-2 py-1 text-center text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-2 py-1 text-sm">{item.name}</td>
                        <td className="px-2 py-1 text-sm">{item.supplier_id || 'N/A'}</td>
                        <td className="px-2 py-1 text-right text-sm">{item.quantity_in_stock.toFixed(2)}</td>
                        <td className="px-2 py-1 text-right text-sm">{item.unit}</td>
                        <td className="px-2 py-1 text-right text-sm">{(item.unit_price || 0).toFixed(2)}</td>
                        <td className="px-2 py-1">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleAdjustStock(item.id, '-1')}
                              className="p-1 text-red-500 hover:bg-red-100 rounded"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <Input
                              value={adjustmentAmount[item.id] || ''}
                              onChange={(e) => setAdjustmentAmount(prev => ({ ...prev, [item.id]: e.target.value }))}
                              onKeyPress={(e) => e.key === 'Enter' && handleAdjustStock(item.id, adjustmentAmount[item.id] || '0')}
                              className="h-6 w-16 text-xs mx-1 text-center"
                              placeholder="Amt"
                            />
                            <button
                              onClick={() => handleAdjustStock(item.id, '1')}
                              className="p-1 text-green-500 hover:bg-green-100 rounded"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-center">
                          <div className="flex justify-center space-x-1">
                            <button 
                              onClick={() => onEdit(item)}
                              className="p-1 text-excel-blue hover:bg-blue-100 rounded"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1 text-red-500 hover:bg-red-100 rounded"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryList;
