/**
 * Logger Module - Main Export
 * 
 * This file re-exports all logging functionality with the new dev/client mode
 * and fatal error tracking capabilities added.
 */

// Re-export the original logger
export * from './index';

// Export the fatal error logger
export {
  logFatalError,
  getFatalLogs,
  exportFatalLogs
} from './fatalLogger';

// Export the mode management utilities
export {
  LoggerMode,
  getLoggerMode,
  setLoggerMode,
  clearNonFatalLogs,
  toggleLoggerMode,
  fatal
} from './loggerModes';