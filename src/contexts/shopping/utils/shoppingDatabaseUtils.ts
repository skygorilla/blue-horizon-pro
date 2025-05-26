import { ShoppingItem, InventoryItem } from '@/types/mealPlanTypes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Fetch shopping list data from Supabase
 */
export const fetchShoppingList = async (): Promise<ShoppingItem[]> => {
  try {
    const { data, error } = await supabase
      .from('shopping_list')
      .select('*');

    if (error) {
      console.error("Error fetching shopping list:", error);
      throw error;
    }

    if (data && data.length > 0) {
      // Convert Supabase data to ShoppingItem format
      return data.map(item => ({
        id: item.id,
        name: item.name,
        amount: item.amount,
        category: item.category || '',
        checked: item.checked || false,
        unitPrice: item.unit_price || 0,
        supplier: item.supplier_id ? 'Unknown' : '' // We'll need to fetch supplier names in a separate query
      }));
    }

    return [];
  } catch (error) {
    console.error("Unexpected error in fetchShoppingList:", error);
    throw error;
  }
};

/**
 * Add a shopping item to the database
 */
export const addShoppingItemToDatabase = async (item: ShoppingItem): Promise<void> => {
  try {
    const { error } = await supabase
      .from('shopping_list')
      .insert({
        id: item.id,
        name: item.name,
        amount: item.amount,
        category: item.category || null,
        checked: item.checked || false,
        unit_price: item.unitPrice || null,
        supplier_id: null // Would need to look up supplier ID from name
      });

    if (error) {
      console.error("Error adding shopping item:", error);
      toast.error("Failed to add item to shopping list");
      throw error;
    }
  } catch (error) {
    console.error("Unexpected error in addShoppingItem:", error);
    throw error;
  }
};

// Define an interface for the Supabase table row structure
interface ShoppingListRow {
  id?: string; // id might not be needed for update data, but good for consistency
  name?: string;
  amount?: string; // Assuming amount is stored as string based on usage
  category?: string | null;
  checked?: boolean;
  unit_price?: number | null;
  supplier_id?: string | null;
}

/**
 * Update a shopping item in the database
 */
export const updateShoppingItemInDatabase = async (id: string, changes: Partial<ShoppingItem>): Promise<void> => {
  try {
    // Prepare the update data using the defined interface
    const updateData: Partial<ShoppingListRow> = {};
    if (changes.name !== undefined) updateData.name = changes.name;
    // Assuming amount is stored as string, ensure it's passed as string
    if (changes.amount !== undefined) updateData.amount = String(changes.amount); 
    if (changes.category !== undefined) updateData.category = changes.category || null;
    if (changes.checked !== undefined) updateData.checked = changes.checked;
    if (changes.unitPrice !== undefined) updateData.unit_price = changes.unitPrice;
    // Note: supplier update still needs a lookup mechanism
    if (changes.supplier !== undefined) updateData.supplier_id = null; 

    const { error } = await supabase
      .from('shopping_list')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error("Error updating shopping item:", error);
      toast.error("Failed to update shopping item");
      throw error;
    }
  } catch (error) {
    console.error("Unexpected error in updateShoppingItem:", error);
    throw error;
  }
};

/**
 * Remove a shopping item from the database
 */
export const removeShoppingItemFromDatabase = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('shopping_list')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error removing shopping item:", error);
      toast.error("Failed to remove item from shopping list");
      throw error;
    }
  } catch (error) {
    console.error("Unexpected error in removeShoppingItem:", error);
    throw error;
  }
};

/**
 * Insert sample shopping items into the database
 */
export const insertSampleShoppingItems = async (items: ShoppingItem[]): Promise<void> => {
  try {
    const { error } = await supabase
      .from('shopping_list')
      .insert(
        items.map(item => ({
          // Use item.id if it's a valid UUID, otherwise generate one or handle appropriately
          // For now, let Supabase generate the ID by omitting it if it's not a UUID
          // id: item.id, // Assuming item.id might not be a valid UUID for sample data
          name: item.name,
          amount: item.amount,
          category: item.category || null,
          checked: item.checked || false,
          unit_price: item.unitPrice || null,
          // Set supplier_id to null as we don't have real supplier UUIDs for sample data
          supplier_id: null 
        }))
      );

    if (error) {
      // Check if the error is the specific UUID syntax error
      if (error.code === '22P02' && error.message.includes('invalid input syntax for type uuid')) {
         console.warn("Attempted to insert sample data with potentially invalid IDs. Setting supplier_id to null.");
         // Optionally, retry insertion without IDs if needed, or just log the warning.
         // For now, we just log and throw the original error if it's different.
      } else {
        console.error("Error inserting sample shopping items:", error);
        // Avoid throwing here to prevent crashing if sample data fails, maybe just toast a warning
        toast.warning("Could not save sample shopping list to database.");
        // throw error; // Re-throwing might stop the app load, consider removing
      }
    } else {
        console.log("Successfully inserted/updated sample shopping items in the database.");
    }
  } catch (error) {
    console.error("Unexpected error in insertSampleShoppingItems:", error);
    toast.error("An unexpected error occurred while saving sample data.");
    // throw error; // Re-throwing might stop the app load, consider removing
  }
};
