import React from 'react';
import { 
  logger, 
  LoggerMode, 
  getLoggerMode, 
  setLoggerMode, 
  toggleLoggerMode, 
  fatal 
} from '@/utils/logger/main';

/**
 * LoggerControls component
 * 
 * A utility component that provides developer controls for switching
 * between logging modes (development vs client) and testing fatal errors.
 */
const LoggerControls: React.FC = () => {
  const currentMode = getLoggerMode();
  
  const handleToggleMode = () => {
    const newMode = toggleLoggerMode();
    console.log(`Switched to ${newMode} logging mode`);
  };
  
  const handleTestRegularLogs = () => {
    logger.debug('This is a debug message');
    logger.info('This is an info message');
    logger.warn('This is a warning message', { component: 'LoggerControls' });
    logger.error('This is a regular error', { component: 'LoggerControls' });
  };
  
  const handleTestFatalError = () => {
    try {
      // Simulate a critical error
      throw new Error('Simulated fatal error for testing');
    } catch (error) {
      // Log as a fatal error that will be preserved even when logs are cleared
      fatal(
        'A critical application error occurred', 
        error, 
        { component: 'LoggerControls', timestamp: new Date().toISOString() }
      );
    }
  };
  
  const styles = {
    container: 'fixed bottom-4 left-4 z-40 p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-xs',
    heading: 'text-lg font-semibold mb-2',
    label: 'text-sm text-gray-600 mb-1 block',
    modeDisplay: 'px-3 py-1 rounded-full text-white text-xs font-medium mb-3',
    devMode: 'bg-amber-500',
    clientMode: 'bg-blue-500',
    button: 'px-3 py-1 rounded text-white text-sm font-medium mr-2 mb-2',
    toggleButton: 'bg-purple-600 hover:bg-purple-700',
    logButton: 'bg-green-600 hover:bg-green-700',
    fatalButton: 'bg-red-600 hover:bg-red-700',
  };
  
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Logger Controls</h3>
      
      <span className={`${styles.label} mb-1`}>Current Mode:</span>
      <div 
        className={`${styles.modeDisplay} ${
          currentMode === LoggerMode.DEVELOPMENT ? styles.devMode : styles.clientMode
        }`}
      >
        {currentMode === LoggerMode.DEVELOPMENT ? 'Development Mode' : 'Client Mode'}
      </div>
      
      <button 
        className={`${styles.button} ${styles.toggleButton}`}
        onClick={handleToggleMode}
      >
        Toggle Mode
      </button>
      
      <button 
        className={`${styles.button} ${styles.logButton}`}
        onClick={handleTestRegularLogs}
      >
        Test Regular Logs
      </button>
      
      <button 
        className={`${styles.button} ${styles.fatalButton}`}
        onClick={handleTestFatalError}
      >
        Test Fatal Error
      </button>
      
      <p className="text-xs text-gray-500 mt-2">
        Open the LogViewer (📋 icon in bottom right) to see logs and switch between regular and fatal logs.
      </p>
    </div>
  );
};

export default LoggerControls;