import React, { useState, useEffect } from 'react';
import { useInventory } from '@/contexts/useInventory';
import { usePortPricing } from '@/contexts/usePortPricing';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProvisioningItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

const portPricingData: Record<string, Record<string, number>> = {
  "Port A": { chicken: 5, beef: 10, carrot: 2 },
  "Port B": { chicken: 6, beef: 9, carrot: 1.5 },
  "Port C": { chicken: 4.5, beef: 11, carrot: 2.2 },
};

const PreProvisioningPlanner: React.FC = () => {
  const { currentPort, setCurrentPort, getPriceForIngredient } = usePortPricing();
  const { inventoryItems } = useInventory();
  const { loadCachedInventory, loadCachedPricing, isOnline } = useOfflineSync();
  const [provisioningList, setProvisioningList] = useState<ProvisioningItem[]>([]);
  const [cachedPricing, setCachedPricing] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isOnline) {
      loadCachedPricing().then(setCachedPricing);
    }
  }, [isOnline, loadCachedPricing]);

  const handleAddItem = () => {
    setProvisioningList([...provisioningList, { name: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleUpdateItem = (index: number, field: keyof ProvisioningItem, value: string | number) => {
    const updatedList = [...provisioningList];
    updatedList[index] = {
      ...updatedList[index],
      [field]: value,
    };
    setProvisioningList(updatedList);
  };

  const calculateTotalCost = () => {
    return provisioningList.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pre-Provisioning Planner</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Current Port</label>
        <select
          value={currentPort}
          onChange={(e) => setCurrentPort(e.target.value)}
          className="p-2 border rounded-md w-full"
          disabled={!isOnline}
        >
          {Object.keys(portPricingData).map((port) => (
            <option key={port} value={port}>
              {port}
            </option>
          ))}
        </select>
        {!isOnline && <p className="text-sm text-gray-500 mt-2">Offline mode: Using cached pricing data.</p>}
      </div>
      <div className="mb-4">
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>
      <div className="space-y-4">
        {provisioningList.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <Input
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleUpdateItem(index, 'quantity', Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Total Cost: ${calculateTotalCost().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default PreProvisioningPlanner;