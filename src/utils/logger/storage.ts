/**
 * Storage utilities for the logger
 * 
 * This module handles persisting logs to localStorage, which allows
 * for post-crash analysis similar to an airplane's black box.
 */

const STORAGE_KEY = 'blue-horizon-logs';

/**
 * Retrieves all logs from localStorage
 */
export function getLogStorage(): Record<string, any>[] {
  try {
    const storedLogs = localStorage.getItem(STORAGE_KEY);
    return storedLogs ? JSON.parse(storedLogs) : [];
  } catch (error) {
    console.error('Failed to retrieve logs from storage:', error);
    return [];
  }
}

/**
 * Appends a new log entry to localStorage, maintaining a maximum number of entries
 */
export function appendToLogStorage(logEntry: Record<string, any>, maxEntries: number = 1000): boolean {
  try {
    const logs = getLogStorage();
    
    // Add new log entry
    logs.push(logEntry);
    
    // Remove oldest entries if exceeding max size
    while (logs.length > maxEntries) {
      logs.shift();
    }
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    return true;
  } catch (error) {
    console.error('Failed to save log to storage:', error);
    return false;
  }
}

/**
 * Clears all logs from localStorage
 */
export function clearLogStorage(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear log storage:', error);
    return false;
  }
}

/**
 * Exports all logs to a JSON file for download
 */
export function exportLogsToFile(filename: string = 'blue-horizon-logs.json'): boolean {
  try {
    const logs = getLogStorage();
    if (logs.length === 0) {
      console.warn('No logs to export');
      return false;
    }
    
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', dataUri);
    exportLink.setAttribute('download', filename);
    exportLink.click();
    
    return true;
  } catch (error) {
    console.error('Failed to export logs:', error);
    return false;
  }
}

/**
 * Checks the size of the log storage in bytes
 */
export function getLogStorageSize(): number {
  try {
    const storedLogs = localStorage.getItem(STORAGE_KEY);
    return storedLogs ? new Blob([storedLogs]).size : 0;
  } catch (error) {
    console.error('Failed to check log storage size:', error);
    return 0;
  }
}