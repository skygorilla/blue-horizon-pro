
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  unit_price?: number;
  estimated_cost?: number;
  purchased?: boolean;
  notes?: string;
  checked?: boolean; // Add missing checked property
  amount?: string; // Add missing amount property
}
