
/**
 * Database operations for inventory management
 * This file re-exports database operations from the database/ directory
 */

export {
  fetchInventoryFromDatabase,
  getOrCreateCategory,
  getOrCreateSupplier,
  addInventoryItemToDatabase,
  updateInventoryItemInDatabase,
  deleteInventoryItemFromDatabase,
  adjustInventoryStockInDatabase
} from './database';
