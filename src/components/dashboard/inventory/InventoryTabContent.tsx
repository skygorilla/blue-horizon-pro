import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import InventoryList from './InventoryList';
import InventoryForm from './InventoryForm';
import InventoryEdit from './InventoryEdit';
import { InventoryItem } from '@/types/mealPlanTypes';
import { useInventory } from '@/contexts/useInventory';

const InventoryTabContent: React.FC = () => {
  const { isLoading } = useInventory();
  const [activeTab, setActiveTab] = useState('view');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setActiveTab('edit');
  };
  
  const handleAddComplete = () => {
    setActiveTab('view');
  };
  
  const handleUpdateComplete = () => {
    setSelectedItem(null);
    setActiveTab('view');
  };
  
  if (isLoading) {
    return <div className="text-center p-6">Loading inventory data...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-maritime-navy rounded-md p-3">
        <h2 className="text-white text-xl font-light text-center">Inventory Management</h2>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-md">
        <div className="p-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="view">View Inventory</TabsTrigger>
            <TabsTrigger value="add">Add Item</TabsTrigger>
            <TabsTrigger value="edit" disabled={!selectedItem}>Edit Item</TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="mt-4">
            <InventoryList 
              onEdit={handleEditItem}
            />
          </TabsContent>
          
          <TabsContent value="add" className="mt-4">
            <InventoryForm onComplete={handleAddComplete} />
          </TabsContent>
          
          <TabsContent value="edit" className="mt-4">
            {selectedItem && (
              <InventoryEdit 
                item={selectedItem} 
                onComplete={handleUpdateComplete} 
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default InventoryTabContent;
