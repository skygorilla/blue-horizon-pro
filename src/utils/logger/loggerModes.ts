/**
 * Logger Mode Management
 * 
 * This file provides functionality to switch between different logging modes:
 * - Development Mode: Verbose logging with everything stored
 * - Client/Production Mode: Minimal logging with critical error preservation
 */

import { logger, LogLevel, LoggerConfig } from './index';
import { clearLogStorage } from './storage';
import { logFatalError, getFatalLogs } from './fatalLogger';

// Define a type for log details
export interface LogDetails {
  [key: string]: string | number | boolean | null | undefined | LogDetails | Array<string | number | boolean | null | undefined | LogDetails>;
}

// Mode definitions
export enum LoggerMode {
  DEVELOPMENT = 'development',
  CLIENT = 'client',
}

// Configuration presets for different modes
const modeConfigs: Record<LoggerMode, Partial<LoggerConfig>> = {
  [LoggerMode.DEVELOPMENT]: {
    minLevel: LogLevel.DEBUG,
    consoleOutput: true,
    persistToStorage: true,
    maxStorageLogs: 5000,
    serverLogging: true,
    serverLogLevel: LogLevel.WARN,
  },
  [LoggerMode.CLIENT]: {
    minLevel: LogLevel.INFO,
    consoleOutput: false,  // Disable console spam in production
    persistToStorage: true,
    maxStorageLogs: 200,   // Keep fewer logs in client mode
    serverLogging: true,
    serverLogLevel: LogLevel.ERROR,
  },
};

// Current mode
let currentMode: LoggerMode = 
  (process.env.NODE_ENV === 'production') 
    ? LoggerMode.CLIENT 
    : LoggerMode.DEVELOPMENT;

/**
 * Switch the logger to a different mode
 */
export function setLoggerMode(mode: LoggerMode, clearExistingLogs: boolean = false): void {
  // Save the current mode
  currentMode = mode;
  
  // Apply the corresponding configuration
  logger.updateConfig(modeConfigs[mode]);
  
  // Clear existing logs if requested
  if (clearExistingLogs) {
    clearNonFatalLogs();
  }
  
  // Log the mode change
  logger.info(`Logger mode changed to ${mode}`, {
    component: 'LoggerSystem',
    tags: ['config-change', 'logger-mode'],
    details: { mode, clearedLogs: clearExistingLogs }
  });
}

/**
 * Get the current logger mode
 */
export function getLoggerMode(): LoggerMode {
  return currentMode;
}

/**
 * Clear regular logs but preserve fatal logs
 */
export function clearNonFatalLogs(): void {
  // First, make sure we have the fatal logs preserved
  const fatalLogs = getFatalLogs();
  
  // Clear the regular log storage
  clearLogStorage();
  
  // Log the clearing action (will be the first log in the cleared storage)
  logger.info('Logs cleared, fatal logs preserved', {
    component: 'LoggerSystem',
    tags: ['logs-cleared'],
    details: { preservedFatalLogs: fatalLogs.length }
  });
}

/**
 * Toggle between development and client mode
 */
export function toggleLoggerMode(clearExistingLogs: boolean = false): LoggerMode {
  const newMode = currentMode === LoggerMode.DEVELOPMENT 
    ? LoggerMode.CLIENT 
    : LoggerMode.DEVELOPMENT;
  
  setLoggerMode(newMode, clearExistingLogs);
  return newMode;
}

/**
 * Log a fatal error that is preserved across mode changes and log clearing
 */
export function fatal(message: string, error?: Error | unknown, details?: LogDetails): void {
  // Use the specialized fatal logger
  logFatalError(message, error, details);
  
  // Also log through the main logger so it appears in the regular logs too
  logger.error(message, {
    error,
    details,
    tags: ['fatal', 'persistent'],
  });
}

// Initialize with the appropriate mode based on environment
setLoggerMode(currentMode, false);