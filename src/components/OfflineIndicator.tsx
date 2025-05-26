import React from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RotateCw, RefreshCw } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useUISettings } from '@/contexts/UISettingsContext';
import { cn } from '@/lib/utils';

const OfflineIndicator = () => {
  const { isOnline, isSyncing, pendingItems, syncNow } = useOfflineSync();
  const { touchMode } = useUISettings();

  const handleSyncNow = async () => {
    if (!isOnline) {
      toast.error("You're currently offline. Connection required to sync data.");
      return;
    }
    
    if (pendingItems.length === 0) {
      toast.info("No pending changes to sync");
      return;
    }
    
    const syncedCount = await syncNow();
    
    if (syncedCount > 0) {
      toast.success(`Successfully synced ${syncedCount} item${syncedCount !== 1 ? 's' : ''}`);
    } else {
      toast.warning("Sync completed but no items were updated");
    }
  };

  // For touch mode, show a more visible indicator with label
  if (touchMode) {
    return (
      <Button 
        variant={isOnline ? "ghost" : "destructive"} 
        size="sm"
        className={cn(
          `relative flex items-center gap-1.5`,
          !isOnline ? 'border border-destructive/30' : ''
        )}
        onClick={handleSyncNow}
        disabled={isSyncing}
      >
        {isOnline ? (
          isSyncing ? (
            <RotateCw className="h-5 w-5 animate-spin" />
          ) : pendingItems.length > 0 ? (
            <RefreshCw className="h-5 w-5" />
          ) : (
            <Wifi className="h-5 w-5" />
          )
        ) : (
          <WifiOff className="h-5 w-5" />
        )}
        
        <span className={cn(
          pendingItems.length > 0 && isOnline ? "font-medium text-yellow-600 dark:text-yellow-400" : ""
        )}>
          {isOnline 
            ? isSyncing 
              ? "Syncing..." 
              : pendingItems.length > 0 
                ? `Sync (${pendingItems.length})` 
                : "Online"
            : "Offline Mode"
          }
        </span>
        
        {/* Badge showing number of pending items */}
        {pendingItems.length > 0 && !isSyncing && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", "bg-yellow-400 dark:bg-yellow-300")} />
            <span className={cn("relative inline-flex rounded-full h-3 w-3", "bg-yellow-500 dark:bg-yellow-400")} />
          </span>
        )}
      </Button>
    );
  }

  // Default view for non-touch mode
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isOnline ? "ghost" : "destructive"} 
            size="icon"
            className={cn(
              `relative`,
              !isOnline ? 'border border-destructive/30' : ''
            )}
            onClick={handleSyncNow}
            disabled={isSyncing}
          >
            {isOnline ? (
              pendingItems.length > 0 ? (
                <RefreshCw className={`h-5 w-5 ${isSyncing ? 'opacity-50' : ''}`} />
              ) : (
                <Wifi className={`h-5 w-5 ${isSyncing ? 'opacity-50' : ''}`} />
              )
            ) : (
              <WifiOff className="h-5 w-5" />
            )}
            
            {/* Rotating sync icon when actively syncing */}
            {isSyncing && (
              <RotateCw className="h-5 w-5 animate-spin absolute" />
            )}
            
            {/* Badge showing number of pending items */}
            {pendingItems.length > 0 && !isSyncing && (
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", "bg-yellow-400 dark:bg-yellow-300")} />
                <span className={cn("relative inline-flex rounded-full h-3 w-3", "bg-yellow-500 dark:bg-yellow-400")} />
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className={cn(
            "border shadow-lg",
            "bg-background text-foreground border-border"
          )}
        >
          <div className="text-sm">
            <div className="font-medium">
              {isOnline ? 'Online' : 'Offline Mode'} 
              {pendingItems.length > 0 && ` • ${pendingItems.length} pending sync item${pendingItems.length !== 1 ? 's' : ''}`}
              {isSyncing && ' • Syncing...'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isOnline ? (
                pendingItems.length > 0 ? 'Click to sync now' : 'All data synchronized'
              ) : (
                'Changes saved locally. Connect to network to sync.'
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default OfflineIndicator;
