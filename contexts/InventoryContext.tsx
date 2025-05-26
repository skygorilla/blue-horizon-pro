import React, { createContext, useContext, useState } from 'react';

// Define the shape of the inventory context
interface InventoryContextProps {
  inventory: Record<string, number>;
  addItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

// Create the context
const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

// Create a provider component
export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Record<string, number>>({});

  const addItem = (id: string, quantity: number) => {
    setInventory((prev) => ({ ...prev, [id]: (prev[id] || 0) + quantity }));
  };

  const removeItem = (id: string) => {
    setInventory((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext, InventoryContextProps };