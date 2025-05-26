
/**
 * Database operations for category and supplier management
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Handle category creation or retrieval
 */
export const getOrCreateCategory = async (categoryName: string): Promise<string | null> => {
  if (!categoryName) return null;
  
  try {
    // Check if category exists
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', categoryName)
      .single();
      
    if (existingCategory) {
      return existingCategory.id;
    }
    
    // Create new category
    const { data: newCategory, error: categoryError } = await supabase
      .from('categories')
      .insert({ name: categoryName })
      .select()
      .single();
    
    if (categoryError) {
      console.error('Error creating category:', categoryError);
      return null;
    }
    
    return newCategory?.id || null;
  } catch (error) {
    console.error('Error in getOrCreateCategory:', error);
    return null;
  }
};

/**
 * Handle supplier creation or retrieval
 */
export const getOrCreateSupplier = async (supplierName: string): Promise<string | null> => {
  if (!supplierName) return null;
  
  try {
    // Check if supplier exists
    const { data: existingSupplier } = await supabase
      .from('suppliers')
      .select('id')
      .eq('name', supplierName)
      .single();
      
    if (existingSupplier) {
      return existingSupplier.id;
    }
    
    // Create new supplier
    const { data: newSupplier, error: supplierError } = await supabase
      .from('suppliers')
      .insert({ name: supplierName })
      .select()
      .single();
    
    if (supplierError) {
      console.error('Error creating supplier:', supplierError);
      return null;
    }
    
    return newSupplier?.id || null;
  } catch (error) {
    console.error('Error in getOrCreateSupplier:', error);
    return null;
  }
};
