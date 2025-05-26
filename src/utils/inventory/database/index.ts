
/**
 * Re-export database utilities for inventory management
 */

export { fetchInventoryFromDatabase } from './core';
export { 
  getOrCreateCategory, 
  getOrCreateSupplier 
} from './categorySupplier';
export { 
  addInventoryItemToDatabase,
  updateInventoryItemInDatabase,
  deleteInventoryItemFromDatabase,
  adjustInventoryStockInDatabase
} from './inventoryItems';
