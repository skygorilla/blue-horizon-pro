/**
 * Server communication utilities for the logger
 * 
 * This module handles sending logs to the backend server for
 * centralized storage and analysis.
 */

import { LogEntry } from './index';

/**
 * Queue for logs that failed to send
 */
let pendingLogs: (LogEntry & { retryCount?: number })[] = [];

/**
 * Flag to track if a retry is scheduled
 */
let retryScheduled = false;

/**
 * Default retry interval in milliseconds
 */
const RETRY_INTERVAL = 30000; // 30 seconds

/**
 * Maximum number of retry attempts
 */
const MAX_RETRY_ATTEMPTS = 3;

/**
 * Sends log entries to the server
 */
export async function sendLogsToServer(
  logEntries: LogEntry | LogEntry[] | Record<string, any> | Record<string, any>[],
  endpoint: string,
  isRetry = false
): Promise<boolean> {
  // Convert single entry to array
  const entries = Array.isArray(logEntries) ? logEntries : [logEntries];
  if (entries.length === 0) return true;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logs: entries,
        timestamp: new Date().toISOString(),
        source: 'frontend',
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    // Clear any matching entries from pending logs if successful
    if (pendingLogs.length > 0) {
      // This is a simple approach that may not be perfect for complex objects
      // A more robust implementation might use unique IDs for each log entry
      const sentTimestamps = entries
        .map(entry => entry.timestamp)
        .filter(Boolean);
        
      pendingLogs = pendingLogs.filter(
        pendingLog => !sentTimestamps.includes(pendingLog.timestamp)
      );
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send logs to server:', error);
    
    // Don't double-queue logs if this is already a retry attempt
    if (!isRetry) {
      // Add entries to pending logs with retry count
      const entriesToQueue = entries.map(entry => ({
        ...entry,
        retryCount: 0
      }));
      
      pendingLogs.push(...entriesToQueue);
      
      // Schedule retry if not already scheduled
      if (!retryScheduled) {
        scheduleRetry();
      }
    }
    
    return false;
  }
}

/**
 * Schedules a retry for sending pending logs
 */
function scheduleRetry(): void {
  retryScheduled = true;
  
  setTimeout(() => {
    retryPendingLogs();
  }, RETRY_INTERVAL);
}

/**
 * Retries sending pending logs
 */
async function retryPendingLogs(): Promise<void> {
  // Reset the retry scheduled flag
  retryScheduled = false;
  
  if (pendingLogs.length === 0) {
    return;
  }
  
  // Take first 50 logs (batch size) that haven't exceeded max retries
  const batch = pendingLogs
    .filter(log => (log.retryCount || 0) < MAX_RETRY_ATTEMPTS)
    .slice(0, 50);
  
  // If all logs have exceeded max retries, clear and return
  if (batch.length === 0) {
    console.warn(`All ${pendingLogs.length} pending logs exceeded maximum retry attempts. Clearing queue.`);
    pendingLogs = [];
    return;
  }
  
  try {
    // Increment retry count for each log in the batch
    batch.forEach(log => {
      log.retryCount = (log.retryCount || 0) + 1;
    });
    
    const endpoint = '/api/logs'; // Fallback endpoint
    const success = await sendLogsToServer(batch, endpoint, true);
    
    if (success) {
      // Logs were sent successfully, pendingLogs already updated in sendLogsToServer
      console.info(`Retry successful for ${batch.length} logs`);
    } else {
      console.warn(`Failed to retry sending ${batch.length} logs (attempt ${batch[0]?.retryCount || 1}/${MAX_RETRY_ATTEMPTS})`);
      
      // Update the retry count in the pending logs array
      pendingLogs = pendingLogs.map(log => {
        const matchingBatchLog = batch.find(b => b.timestamp === log.timestamp);
        if (matchingBatchLog) {
          return { ...log, retryCount: matchingBatchLog.retryCount };
        }
        return log;
      });
    }
  } catch (error) {
    console.error('Error during log retry:', error);
  }
  
  // Check for remaining valid logs
  const remainingValidLogs = pendingLogs.filter(log => (log.retryCount || 0) < MAX_RETRY_ATTEMPTS);
  
  // Remove logs that have exceeded max retries
  const exceededLogs = pendingLogs.length - remainingValidLogs.length;
  if (exceededLogs > 0) {
    console.warn(`${exceededLogs} logs exceeded maximum retry attempts and were dropped`);
    pendingLogs = remainingValidLogs;
  }
  
  // Schedule another retry if there are still pending logs with valid retry counts
  if (remainingValidLogs.length > 0 && !retryScheduled) {
    scheduleRetry();
  }
}

/**
 * Returns the count of pending logs
 */
export function getPendingLogCount(): number {
  return pendingLogs.length;
}

/**
 * Clears all pending logs
 */
export function clearPendingLogs(): void {
  pendingLogs = [];
}

/**
 * Forces an immediate retry of pending logs
 */
export function forceRetryLogs(): void {
  if (pendingLogs.length > 0 && !retryScheduled) {
    retryPendingLogs();
  }
}