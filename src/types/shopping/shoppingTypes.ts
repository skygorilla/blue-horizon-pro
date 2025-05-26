
export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  category: string;
  checked: boolean;
  unitPrice?: number;
  supplier?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantityInStock: number;
  unitPrice: number;
  supplier: string;
  lastUpdated: string;
}
