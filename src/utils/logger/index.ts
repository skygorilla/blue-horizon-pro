/**
 * Blue Horizon Pro - Application Logger
 * 
 * This module provides a comprehensive logging system for capturing application
 * events, errors, and state changes - similar to an airplane's "black box" recorder.
 * 
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Context information with each log (component, user, timestamps)
 * - Local storage persistence for post-crash analysis
 * - Optional server-side logging for critical errors
 * - Console output formatting
 * 
 * Usage example:
 * ```
 * import { logger } from '@/utils/logger';
 * 
 * // Basic logging
 * logger.info('User logged in successfully');
 * 
 * // With context
 * logger.warn('Failed login attempt', { 
 *   component: 'LoginForm', 
 *   details: { username: 'user@example.com', attempts: 3 } 
 * });
 * 
 * // Error logging
 * try {
 *   // Some code that might throw
 * } catch (error) {
 *   logger.error('Operation failed', { error, component: 'DataProcessor' });
 * }
 * ```
 */

import { getLogStorage, appendToLogStorage } from './storage';
import { sendLogsToServer } from './server';
import { formatConsoleMessage, formatStorageMessage } from './formatters';

// Log levels with numeric values for filtering
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 999, // For disabling logs
}

// Configuration options
export interface LoggerConfig {
  minLevel: LogLevel;              // Minimum level to log
  consoleOutput: boolean;          // Whether to output to console
  persistToStorage: boolean;       // Whether to save logs to localStorage
  maxStorageLogs: number;          // Max number of logs to keep in localStorage
  serverLogging: boolean;          // Whether to send critical logs to server
  serverLogLevel: LogLevel;        // Minimum level to send to server
  serverEndpoint: string;          // Server endpoint for logging
  applicationVersion: string;      // App version for context
  environment: 'development' | 'production' | 'test';
}

// Log entry structure
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  component?: string;
  user?: string;
  details?: any;
  error?: Error | unknown;
  sessionId?: string;
  tags?: string[];
}

// Default configuration
const defaultConfig: LoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  consoleOutput: true,
  persistToStorage: true,
  maxStorageLogs: 1000,
  serverLogging: process.env.NODE_ENV === 'production',
  serverLogLevel: LogLevel.ERROR,
  serverEndpoint: '/api/logs',
  applicationVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
};

// Context data that will be included with every log
let globalContext: Record<string, any> = {
  sessionId: crypto.randomUUID?.() || Date.now().toString(),
};

/**
 * Logger class that handles logging across the application
 */
class Logger {
  private config: LoggerConfig;
  
  constructor(customConfig: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...customConfig };
    
    // Initialize with an application start entry
    this.info('Application initialized', { 
      tags: ['app-lifecycle'],
      details: { 
        userAgent: navigator.userAgent,
        version: this.config.applicationVersion,
        environment: this.config.environment,
      }
    });
    
    // Set up window error listener for uncaught errors
    window.addEventListener('error', (event) => {
      this.error('Uncaught error', { 
        error: event.error, 
        component: 'window', 
        details: { 
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        },
        tags: ['uncaught-error'] 
      });
    });
    
    // Set up unhandled promise rejection listener
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled promise rejection', { 
        error: event.reason, 
        component: 'window', 
        tags: ['unhandled-rejection'] 
      });
    });
  }

  /**
   * Sets global context data that will be included with all logs
   */
  setGlobalContext(context: Record<string, any>): void {
    globalContext = { ...globalContext, ...context };
  }
  
  /**
   * Updates the logger configuration
   */
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Log a debug message
   */
  debug(message: string, context: Partial<LogEntry> = {}): void {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  /**
   * Log an info message
   */
  info(message: string, context: Partial<LogEntry> = {}): void {
    this.log(LogLevel.INFO, message, context);
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, context: Partial<LogEntry> = {}): void {
    this.log(LogLevel.WARN, message, context);
  }
  
  /**
   * Log an error message
   */
  error(message: string, context: Partial<LogEntry> = {}): void {
    this.log(LogLevel.ERROR, message, context);
  }
  
  /**
   * Core logging function that processes the log entry
   */
  private log(level: LogLevel, message: string, context: Partial<LogEntry> = {}): void {
    // Skip if below minimum log level
    if (level < this.config.minLevel) {
      return;
    }
    
    const timestamp = new Date().toISOString();
    
    // Combine global context with log-specific context
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      ...globalContext,
      ...context,
    };
    
    // Output to console if enabled
    if (this.config.consoleOutput) {
      const formattedMessage = formatConsoleMessage(logEntry);
      
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage.text, ...formattedMessage.args);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage.text, ...formattedMessage.args);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage.text, ...formattedMessage.args);
          break;
        case LogLevel.ERROR:
          console.error(formattedMessage.text, ...formattedMessage.args);
          break;
      }
    }
    
    // Save to localStorage if enabled
    if (this.config.persistToStorage) {
      const formattedForStorage = formatStorageMessage(logEntry);
      appendToLogStorage(formattedForStorage, this.config.maxStorageLogs);
    }
    
    // Send to server if enabled and meets server log level
    if (this.config.serverLogging && level >= this.config.serverLogLevel) {
      sendLogsToServer(logEntry, this.config.serverEndpoint);
    }
  }
  
  /**
   * Retrieve all stored logs for analysis
   */
  getAllLogs(): Record<string, any>[] {
    return getLogStorage();
  }
  
  /**
   * Force send all stored logs to the server
   */
  async sendAllLogsToServer(): Promise<boolean> {
    const logs = this.getAllLogs();
    if (logs.length === 0) return true;
    
    try {
      await sendLogsToServer(logs, this.config.serverEndpoint);
      return true;
    } catch (error) {
      this.error('Failed to send logs to server', { error });
      return false;
    }
  }
}

// Create and export singleton instance
export const logger = new Logger();

// Re-export useful types and utilities
export { getLogStorage, formatConsoleMessage, formatStorageMessage, appendToLogStorage, sendLogsToServer };