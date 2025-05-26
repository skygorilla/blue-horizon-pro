/**
 * Fatal Error Logger
 * 
 * A specialized logger for preserving critical errors that should never be deleted,
 * even when other logs are cleared or the application enters client mode.
 * 
 * These logs serve as a "black box" for post-mortem analysis of severe issues.
 */

import { LogEntry, LogLevel } from './index';
import { formatStorageMessage } from './formatters';
import { LogDetails } from './loggerModes';

// TypeScript interface for stored log entries
export interface StoredLogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  error?: unknown;
  details?: LogDetails;
  tags?: string[];
  persistent?: boolean;
  preservedAt?: string;
  [key: string]: unknown;
}

// Use a separate storage key for fatal errors to prevent them from being cleared
const FATAL_STORAGE_KEY = 'blue-horizon-fatal-logs';

// Maximum number of fatal logs to keep (circular buffer)
const MAX_FATAL_LOGS = 100;

/**
 * Log a fatal error that should be preserved
 */
export function logFatalError(message: string, error?: Error | unknown, details?: LogDetails): void {
  const timestamp = new Date().toISOString();
  
  const logEntry: LogEntry = {
    timestamp,
    level: LogLevel.ERROR,
    message,
    error,
    details,
    tags: ['fatal', 'persistent'],
  };
  
  // Format and store the fatal error
  const formattedEntry = formatStorageMessage(logEntry) as StoredLogEntry;
  appendFatalLog(formattedEntry);
  
  // Also send to console for immediate visibility
  console.error(`[FATAL] ${message}`, error || '', details || '');
}

/**
 * Retrieve all fatal logs
 */
export function getFatalLogs(): StoredLogEntry[] {
  try {
    const storedLogs = localStorage.getItem(FATAL_STORAGE_KEY);
    return storedLogs ? JSON.parse(storedLogs) : [];
  } catch (error) {
    console.error('Failed to retrieve fatal logs from storage:', error);
    return [];
  }
}

/**
 * Add a fatal log entry to persistent storage
 */
function appendFatalLog(logEntry: StoredLogEntry): boolean {
  try {
    const logs = getFatalLogs();
    
    // Add metadata for fatal logs
    logEntry.persistent = true;
    logEntry.preservedAt = new Date().toISOString();
    
    // Add to the start (more recent first)
    logs.unshift(logEntry);
    
    // Remove oldest entries if exceeding max size
    while (logs.length > MAX_FATAL_LOGS) {
      logs.pop();
    }
    
    // Save back to localStorage
    localStorage.setItem(FATAL_STORAGE_KEY, JSON.stringify(logs));
    return true;
  } catch (error) {
    console.error('Failed to save fatal log to storage:', error);
    return false;
  }
}

/**
 * Export fatal logs to a JSON file
 */
export function exportFatalLogs(filename: string = 'blue-horizon-fatal-logs.json'): boolean {
  try {
    const logs = getFatalLogs();
    if (logs.length === 0) {
      console.warn('No fatal logs to export');
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
    console.error('Failed to export fatal logs:', error);
    return false;
  }
}