import { useState, useEffect } from 'react';
import syncService, { SyncItem } from '@/services/syncService';
import { InventoryItem } from '@/types/mealPlanTypes';

interface UseOfflineSyncResult {
  isOnline: boolean;
  isSyncing: boolean;
  pendingItems: SyncItem[];
  syncNow: () => Promise<number>;
  loadCachedInventory: () => Promise<InventoryItem[]>;
  loadCachedPricing: () => Promise<Record<string, number>>;
}

export const useOfflineSync = (): UseOfflineSyncResult => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [pendingItems, setPendingItems] = useState<SyncItem[]>([]);

  const loadPendingItems = async () => {
    const queue = await syncService.loadSyncQueue();
    const pending = queue.filter((item: SyncItem) => !item.synced);
    setPendingItems(pending);
  };

  const syncNow = async (): Promise<number> => {
    if (!isOnline) return 0;

    setIsSyncing(true);
    try {
      const count = await syncService.syncAll();
      await loadPendingItems();
      return count;
    } finally {
      setIsSyncing(false);
    }
  };

  const loadCachedInventory = async (): Promise<InventoryItem[]> => {
    return await syncService.loadCachedInventory();
  };

  const loadCachedPricing = async (): Promise<Record<string, number>> => {
    return await syncService.loadCachedPricing();
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncNow();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    loadPendingItems();

    const intervalId = setInterval(loadPendingItems, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [syncNow]);

  return {
    isOnline,
    isSyncing,
    pendingItems,
    syncNow,
    loadCachedInventory,
    loadCachedPricing,
  };
};

export default useOfflineSync;
