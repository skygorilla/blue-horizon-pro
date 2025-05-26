
/**
 * Core database operations for inventory management
 */

import { supabase } from '@/integrations/supabase/client';
import { InventoryItem } from '@/types/mealPlanTypes';
import { toast } from 'sonner';

/**
 * Fetch inventory items from the database
 */
export const fetchInventoryFromDatabase = async (): Promise<InventoryItem[]> => {
  const { data, error } = await supabase
    .from('inventory')
    .select(`
      id, 
      name, 
      unit, 
      quantity_in_stock, 
      unit_price,
      last_updated,
      categories(name),
      suppliers(name)
    `);

  if (error) {
    console.error('Error fetching inventory:', error);
    toast.error('Failed to load inventory from database');
    throw error;
  }

  if (!data) return [];

  // Convert Supabase data to InventoryItem format
  return data.map(item => ({
    id: item.id,
    name: item.name,
    unit: item.unit,
    quantityInStock: item.quantity_in_stock,
    unitPrice: item.unit_price || 0,
    category: item.categories?.name || 'Uncategorized',
    supplier: item.suppliers?.name || 'Unknown',
    lastUpdated: item.last_updated || new Date().toISOString()
  }));
};
