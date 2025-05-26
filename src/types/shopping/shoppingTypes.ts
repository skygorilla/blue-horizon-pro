
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  unit_price?: number; // Use snake_case to match the errors
  estimated_cost?: number;
  purchased?: boolean;
  notes?: string;
}
