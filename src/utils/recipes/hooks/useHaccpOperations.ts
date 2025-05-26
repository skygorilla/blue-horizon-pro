import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { toast } from 'sonner';

// Define types for prepared items
export interface PreparedItem {
  id: string;
  name: string;
  prepared_at: string;
  shelf_life_h: number;
  expires_at: string;
  location?: string;
  owner?: string;
  temperature_c?: number;
  notes?: string;
}

// Define type for shelf life defaults
export interface ShelfLifeDefault {
  item_name: string;
  default_h: number;
  category?: string;
  critical_temp_c?: number;
  haccp_notes?: string;
}

export const useHaccpOperations = () => {
  const [preparedItems, setPreparedItems] = useState<PreparedItem[]>([]);
  const [shelfLifeDefaults, setShelfLifeDefaults] = useState<ShelfLifeDefault[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch prepared items from the database
  const fetchPreparedItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('prepared_items')
        .select('*')
        .order('expires_at', { ascending: true });

      if (error) {
        console.error('Error fetching prepared items:', error);
        setError(error.message);
        toast.error('Failed to load prepared items');
      } else if (data) {
        setPreparedItems(data as PreparedItem[]);
      }
    } catch (e) {
      console.error('Unexpected error in fetchPreparedItems:', e);
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch shelf life defaults - we can use a function to fetch from another source
  const fetchShelfLifeDefaults = useCallback(async () => {
    try {
      // For now, return a static list of defaults
      // In a real implementation, this would come from the database
      const defaults: ShelfLifeDefault[] = [
        { item_name: 'Cooked Rice', default_h: 72, category: 'Grains', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Cooked Pasta', default_h: 48, category: 'Grains', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Cooked Chicken', default_h: 72, category: 'Proteins', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Cooked Beef', default_h: 72, category: 'Proteins', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Cooked Fish', default_h: 48, category: 'Proteins', critical_temp_c: 2, haccp_notes: 'Store below 2°C' },
        { item_name: 'Cooked Eggs', default_h: 72, category: 'Proteins', critical_temp_c: 4, haccp_notes: 'Store below 4°C. Must be cooled rapidly after cooking. Discard after 3 days.' },
        { item_name: 'Hard-Boiled Eggs', default_h: 168, category: 'Proteins', critical_temp_c: 4, haccp_notes: 'Store below 4°C with shells intact. Can be stored for up to 7 days if properly refrigerated.' },
        { item_name: 'Egg Dishes', default_h: 72, category: 'Proteins', critical_temp_c: 4, haccp_notes: 'Store below 4°C. Must reach 74°C during cooking. Discard after 3 days.' },
        { item_name: 'Cooked Vegetables', default_h: 72, category: 'Vegetables', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Fresh Salad', default_h: 24, category: 'Vegetables', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Soup', default_h: 72, category: 'Mixed', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Sauce', default_h: 96, category: 'Sauces', critical_temp_c: 4, haccp_notes: 'Store below 4°C' },
        { item_name: 'Dessert', default_h: 48, category: 'Desserts', critical_temp_c: 4, haccp_notes: 'Store below 4°C' }
      ];
      
      setShelfLifeDefaults(defaults);
    } catch (e) {
      console.error('Error fetching shelf life defaults:', e);
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
  }, []);

  // Add a prepared item to the database
  const addPreparedItem = async (item: Omit<PreparedItem, 'id' | 'expires_at'>) => {
    try {
      const { data, error } = await supabase
        .from('prepared_items')
        .insert([item])
        .select();

      if (error) {
        console.error('Error adding prepared item:', error);
        toast.error('Failed to add prepared item');
        return null;
      }

      if (data && data.length > 0) {
        toast.success('Item added to HACCP tracker');
        fetchPreparedItems(); // Refresh the list
        return data[0] as PreparedItem;
      }
      
      return null;
    } catch (e) {
      console.error('Unexpected error in addPreparedItem:', e);
      toast.error('An unexpected error occurred');
      return null;
    }
  };

  // Delete a prepared item from the database
  const deletePreparedItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prepared_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting prepared item:', error);
        toast.error('Failed to delete prepared item');
        return false;
      }

      toast.success('Item removed from HACCP tracker');
      fetchPreparedItems(); // Refresh the list
      return true;
    } catch (e) {
      console.error('Unexpected error in deletePreparedItem:', e);
      toast.error('An unexpected error occurred');
      return false;
    }
  };

  // Prepare a recipe and add it to the prepared items
  const prepareRecipe = async (recipe: CompleteRecipe, location?: string, owner?: string) => {
    // Use a default shelf life if not available in the recipe
    const shelf_life_h = 72; // Default 3 days
    
    try {
      const preparedItem = {
        name: recipe.name,
        prepared_at: new Date().toISOString(),
        shelf_life_h,
        location,
        owner
      };
      
      return await addPreparedItem(preparedItem);
    } catch (e) {
      console.error('Error preparing recipe:', e);
      toast.error('Failed to add recipe to HACCP tracker');
      return null;
    }
  };

  // Initialize data
  useEffect(() => {
    fetchPreparedItems();
    fetchShelfLifeDefaults();
  }, [fetchPreparedItems, fetchShelfLifeDefaults]);

  return {
    preparedItems,
    shelfLifeDefaults,
    isLoading,
    error,
    fetchPreparedItems,
    addPreparedItem,
    deletePreparedItem,
    prepareRecipe
  };
};
