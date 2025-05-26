
/**
 * Database operations for inventory items
 */

import { supabase } from '@/integrations/supabase/client';
import { InventoryItem } from '@/types/mealPlanTypes';
import { toast } from 'sonner';
import { getOrCreateCategory, getOrCreateSupplier } from './categorySupplier';

/**
 * Add a new inventory item to the database
 */
export const addInventoryItemToDatabase = async (item: InventoryItem): Promise<boolean> => {
  try {
    // Handle category and supplier
    const categoryId = await getOrCreateCategory(item.category);
    const supplierId = await getOrCreateSupplier(item.supplier);
    
    // Insert inventory item
    const { error } = await supabase
      .from('inventory')
      .insert({
        id: item.id,
        name: item.name,
        unit: item.unit,
        quantity_in_stock: item.quantityInStock,
        unit_price: item.unitPrice,
        category_id: categoryId,
        supplier_id: supplierId,
        last_updated: new Date().toISOString()
      });

    if (error) {
      console.error('Error adding inventory item:', error);
      toast.error('Failed to add item to inventory database');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in addInventoryItemToDatabase:', error);
    return false;
  }
};

/**
 * Update an inventory item in the database
 */
export const updateInventoryItemInDatabase = async (id: string, item: InventoryItem): Promise<boolean> => {
  try {
    // Handle category and supplier
    const categoryId = await getOrCreateCategory(item.category);
    const supplierId = await getOrCreateSupplier(item.supplier);
    
    // Update inventory item
    const { error } = await supabase
      .from('inventory')
      .update({
        name: item.name,
        unit: item.unit,
        quantity_in_stock: item.quantityInStock,
        unit_price: item.unitPrice,
        category_id: categoryId,
        supplier_id: supplierId,
        last_updated: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating inventory item:', error);
      toast.error('Failed to update inventory item in database');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateInventoryItemInDatabase:', error);
    return false;
  }
};

/**
 * Delete an inventory item from the database
 */
export const deleteInventoryItemFromDatabase = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting inventory item:', error);
      toast.error('Failed to delete inventory item from database');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteInventoryItemFromDatabase:', error);
    return false;
  }
};

/**
 * Adjust inventory stock in the database
 */
export const adjustInventoryStockInDatabase = async (id: string, newQuantity: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('inventory')
      .update({
        quantity_in_stock: newQuantity,
        last_updated: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error adjusting inventory stock:', error);
      toast.error('Failed to update inventory stock in database');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in adjustInventoryStockInDatabase:', error);
    return false;
  }
};
