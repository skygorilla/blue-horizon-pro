import localforage from 'localforage';

export interface SyncItem<T = unknown> {
  id: string;
  data: T;
  synced: boolean;
}

// Add result type for operations
export interface SyncResult<T = any> {
  success: boolean;
  data?: T;
  error?: unknown;
  message?: string;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price?: number;
}

const SYNC_QUEUE_KEY = 'syncQueue';
const INVENTORY_CACHE_KEY = 'inventoryCache';
const PRICING_CACHE_KEY = 'pricingCache';

const syncService = {
  // Load sync queue from local storage
  loadSyncQueue: async (): Promise<SyncItem[]> => {
    return (await localforage.getItem<SyncItem[]>(SYNC_QUEUE_KEY)) || [];
  },

  // Save sync queue to local storage
  saveSyncQueue: async (queue: SyncItem[]): Promise<void> => {
    await localforage.setItem(SYNC_QUEUE_KEY, queue);
  },

  // Sync all pending items
  syncAll: async (): Promise<SyncResult<number>> => {
    try {
      const queue = await syncService.loadSyncQueue();
      const unsyncedItems = queue.filter(item => !item.synced);

      // Simulate syncing process
      for (const item of unsyncedItems) {
        try {
          // Replace with actual API call
          console.log('Syncing item:', item);
          item.synced = true;
        } catch (error) {
          console.error('Error syncing item:', item.id, error);
        }
      }

      await syncService.saveSyncQueue(queue);
      return { 
        success: true, 
        data: unsyncedItems.length,
        message: `Successfully synced ${unsyncedItems.length} items` 
      };
    } catch (error) {
      console.error('Error during syncAll operation:', error);
      return { 
        success: false, 
        error, 
        message: 'Sync operation failed.'
      };
    }
  },

  // Cache inventory data
  cacheInventory: async (inventory: InventoryItem[]): Promise<void> => {
    await localforage.setItem(INVENTORY_CACHE_KEY, inventory);
  },

  // Load cached inventory data
  loadCachedInventory: async (): Promise<InventoryItem[]> => {
    return (await localforage.getItem<InventoryItem[]>(INVENTORY_CACHE_KEY)) || [];
  },

  // Cache pricing data
  cachePricing: async (pricing: Record<string, number>): Promise<void> => {
    await localforage.setItem(PRICING_CACHE_KEY, pricing);
  },

  // Load cached pricing data
  loadCachedPricing: async (): Promise<Record<string, number>> => {
    return (await localforage.getItem<Record<string, number>>(PRICING_CACHE_KEY)) || {};
  },
};

export default syncService;
