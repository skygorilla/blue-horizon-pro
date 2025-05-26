/**
 * Formatting utilities for the logger
 * 
 * This module handles the formatting of log entries for different outputs
 * (console, storage, server) to make logs more readable and useful.
 */

import { LogEntry, LogLevel } from './index';

// Log level display names
const LOG_LEVEL_NAMES: Record<number, string> = {
  0: 'DEBUG',
  1: 'INFO',
  2: 'WARN',
  3: 'ERROR',
  999: 'NONE',
};

// Make sure LogLevel exists before accessing it
if (LogLevel) {
  LOG_LEVEL_NAMES[LogLevel.DEBUG] = 'DEBUG';
  LOG_LEVEL_NAMES[LogLevel.INFO] = 'INFO';
  LOG_LEVEL_NAMES[LogLevel.WARN] = 'WARN';
  LOG_LEVEL_NAMES[LogLevel.ERROR] = 'ERROR';
  LOG_LEVEL_NAMES[LogLevel.NONE] = 'NONE';
}

// Console styling for different log levels
const LOG_LEVEL_STYLES: Record<number, string> = {
  0: 'color: #6c757d',
  1: 'color: #0d6efd',
  2: 'color: #fd7e14; font-weight: bold',
  3: 'color: #dc3545; font-weight: bold',
  999: '',
};

// Make sure LogLevel exists before accessing it
if (LogLevel) {
  LOG_LEVEL_STYLES[LogLevel.DEBUG] = 'color: #6c757d';
  LOG_LEVEL_STYLES[LogLevel.INFO] = 'color: #0d6efd';
  LOG_LEVEL_STYLES[LogLevel.WARN] = 'color: #fd7e14; font-weight: bold';
  LOG_LEVEL_STYLES[LogLevel.ERROR] = 'color: #dc3545; font-weight: bold';
  LOG_LEVEL_STYLES[LogLevel.NONE] = '';
}

/**
 * Interface for formatted console messages
 */
export interface FormattedConsoleMessage {
  text: string;
  args: unknown[];
}

/**
 * Formats a log entry for console output with styling
 */
export function formatConsoleMessage(entry: LogEntry): FormattedConsoleMessage {
  const { timestamp, level, message, component, user, details, error, tags } = entry;
  
  // Extract human-readable time
  const time = new Date(timestamp).toLocaleTimeString();
  
  // Format the main log message with styling
  const levelName = LOG_LEVEL_NAMES[level] || 'UNKNOWN';
  const levelStyle = LOG_LEVEL_STYLES[level] || '';
  
  // Build the prefix parts
  const parts = [`%c[${levelName}]`, `${time}`];
  
  if (component) {
    parts.push(`[${component}]`);
  }
  
  if (user) {
    parts.push(`[User: ${user}]`);
  }
  
  if (tags && tags.length > 0) {
    parts.push(`[${tags.join(', ')}]`);
  }
  
  // Combine all parts into the prefix
  const prefix = parts.join(' ');
  
  // Prepare arguments array for console methods
  const args: unknown[] = [levelStyle];
  
  // Build the complete formatted text
  let formattedText = `${prefix}: ${message}`;
  
  // Add details and error as separate objects in console for better inspection
  if (details || error) {
    formattedText += ' %o';
    
    const context: Record<string, unknown> = {};
    
    if (details) {
      context.details = details;
    }
    
    if (error) {
      // Special handling for Error objects
      if (error instanceof Error) {
        context.error = {
          name: error.name,
          message: error.message,
          stack: error.stack,
        };
      } else {
        context.error = error;
      }
    }
    
    args.push(context);
  }
  
  return {
    text: formattedText,
    args,
  };
}

/**
 * Formats a log entry for storage (localStorage or server)
 */
export function formatStorageMessage(entry: LogEntry): Record<string, unknown> {
  const { error, ...rest } = entry;
  
  // Create a new object for the formatted entry
  const formatted: Record<string, unknown> = { ...rest };
  
  // Handle Error objects specially for better serialization
  if (error) {
    if (error instanceof Error) {
      formatted.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else {
      // For non-Error objects, keep as is
      formatted.error = error;
    }
  }
  
  return formatted;
}

/**
 * Converts a log level string to its numeric value
 */
export function logLevelFromString(levelName: string): LogLevel {
  const name = levelName.toUpperCase();
  
  switch (name) {
    case 'DEBUG': return LogLevel.DEBUG;
    case 'INFO': return LogLevel.INFO;
    case 'WARN': return LogLevel.WARN;
    case 'ERROR': return LogLevel.ERROR;
    case 'NONE': return LogLevel.NONE;
    default: return LogLevel.INFO; // Default to INFO if unknown
  }
}

/**
 * Trims a string to a maximum length with ellipsis
 */
export function truncateString(str: string, maxLength: number = 100): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  
  return str.substring(0, maxLength) + '...';
}