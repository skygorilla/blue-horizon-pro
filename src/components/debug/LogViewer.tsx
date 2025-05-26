import React, { useState, useEffect } from 'react';
import { logger, LogLevel } from '@/utils/logger';
import { exportLogsToFile, clearLogStorage } from '@/utils/logger/storage';
import { getFatalLogs, exportFatalLogs, StoredLogEntry } from '@/utils/logger/fatalLogger';
import { 
  LoggerMode, 
  getLoggerMode, 
  setLoggerMode, 
  clearNonFatalLogs, 
  toggleLoggerMode 
} from '@/utils/logger/loggerModes';

/**
 * A developer utility component for viewing and managing application logs
 * Only use this component in development environments
 */
const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<StoredLogEntry[]>([]);
  const [fatalLogs, setFatalLogs] = useState<StoredLogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>('');
  const [level, setLevel] = useState<LogLevel>(LogLevel.INFO);
  const [currentMode, setCurrentMode] = useState<LoggerMode>(getLoggerMode());
  const [activeTab, setActiveTab] = useState<'regular' | 'fatal'>('regular');

  // Refresh logs every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOpen) {
        setLogs(logger.getAllLogs() as StoredLogEntry[]);
        setFatalLogs(getFatalLogs());
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  // Initial load
  useEffect(() => {
    if (isOpen) {
      setLogs(logger.getAllLogs() as StoredLogEntry[]);
      setFatalLogs(getFatalLogs());
      setCurrentMode(getLoggerMode());
    }
  }, [isOpen]);

  // Filter logs by level and text
  const filteredLogs = logs.filter(log => {
    // Filter by minimum level
    if ((log.level || 0) < level) {
      return false;
    }
    
    // Filter by text
    if (filter && filter.trim() !== '') {
      const searchTerms = filter.toLowerCase().split(' ');
      
      // Check if log contains all search terms
      return searchTerms.every(term => {
        const message = (log.message || '').toLowerCase();
        const component = ((log.component as string) || '').toLowerCase();
        const user = ((log.user as string) || '').toLowerCase();
        const details = JSON.stringify(log.details || {}).toLowerCase();
        
        return message.includes(term) || 
               component.includes(term) || 
               user.includes(term) || 
               details.includes(term);
      });
    }
    
    return true;
  });

  // Filter fatal logs by text
  const filteredFatalLogs = fatalLogs.filter(log => {
    if (filter && filter.trim() !== '') {
      const searchTerms = filter.toLowerCase().split(' ');
      return searchTerms.every(term => {
        const message = (log.message || '').toLowerCase();
        const details = JSON.stringify(log.details || {}).toLowerCase();
        return message.includes(term) || details.includes(term);
      });
    }
    return true;
  });

  // Level name mapping
  const levelNames = {
    [LogLevel.DEBUG]: 'Debug',
    [LogLevel.INFO]: 'Info',
    [LogLevel.WARN]: 'Warning',
    [LogLevel.ERROR]: 'Error',
  };

  // Toggle visibility
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setLogs(logger.getAllLogs() as StoredLogEntry[]);
      setFatalLogs(getFatalLogs());
    }
  };

  // Export logs to file
  const handleExport = () => {
    if (activeTab === 'regular') {
      exportLogsToFile('blue-horizon-logs.json');
    } else {
      exportFatalLogs('blue-horizon-fatal-logs.json');
    }
  };

  // Clear logs
  const handleClear = () => {
    if (activeTab === 'regular') {
      if (window.confirm('Are you sure you want to clear all regular logs? Fatal logs will be preserved.')) {
        clearNonFatalLogs();
        setLogs([]);
      }
    } else {
      alert('Fatal logs cannot be cleared as they serve as a black box record for critical errors.');
    }
  };

  // Toggle logger mode
  const handleToggleMode = () => {
    const newMode = toggleLoggerMode(false);
    setCurrentMode(newMode);
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch (e) {
      return timestamp;
    }
  };

  // Button styles
  const buttonStyles = {
    base: 'px-3 py-1 rounded text-sm font-medium',
    primary: 'bg-maritime-teal text-white',
    secondary: 'bg-gray-200 text-gray-800',
    danger: 'bg-red-500 text-white',
    mode: currentMode === LoggerMode.DEVELOPMENT 
      ? 'bg-amber-500 text-white' 
      : 'bg-blue-500 text-white',
  };

  // Tab styles
  const tabStyles = {
    base: 'px-4 py-2 font-medium',
    active: 'border-b-2 border-maritime-teal text-maritime-teal',
    inactive: 'text-gray-500 hover:text-gray-700',
  };

  // Log level to background color
  const levelToColor = (level: number) => {
    switch(level) {
      case LogLevel.DEBUG: return 'bg-gray-100';
      case LogLevel.INFO: return 'bg-blue-50';
      case LogLevel.WARN: return 'bg-yellow-50';
      case LogLevel.ERROR: return 'bg-red-50';
      default: return 'bg-white';
    }
  };

  return (
    <>
      {/* Fixed toggle button */}
      <button 
        onClick={toggleOpen}
        className="fixed bottom-4 right-4 z-50 p-2 bg-maritime-teal text-white rounded-full shadow-lg"
        title="Log Viewer"
      >
        {isOpen ? '✕' : '📋'}
      </button>
      
      {/* Log viewer panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {activeTab === 'regular' ? 'Application Logs' : 'Fatal Error Logs'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleMode}
                  className={`${buttonStyles.base} ${buttonStyles.mode}`}
                  title={currentMode === LoggerMode.DEVELOPMENT 
                    ? 'Switch to Client Mode (less verbose)' 
                    : 'Switch to Development Mode (more verbose)'}
                >
                  {currentMode === LoggerMode.DEVELOPMENT ? 'Dev Mode' : 'Client Mode'}
                </button>
                <button
                  onClick={handleExport}
                  className={`${buttonStyles.base} ${buttonStyles.secondary}`}
                >
                  Export
                </button>
                <button
                  onClick={handleClear}
                  className={`${buttonStyles.base} ${buttonStyles.danger}`}
                  disabled={activeTab === 'fatal'}
                  title={activeTab === 'fatal' ? 'Fatal logs cannot be cleared' : 'Clear all logs'}
                >
                  Clear
                </button>
                <button
                  onClick={toggleOpen}
                  className={`${buttonStyles.base} ${buttonStyles.primary}`}
                >
                  Close
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b flex">
              <button
                className={`${tabStyles.base} ${activeTab === 'regular' ? tabStyles.active : tabStyles.inactive}`}
                onClick={() => setActiveTab('regular')}
              >
                Regular Logs
              </button>
              <button
                className={`${tabStyles.base} ${activeTab === 'fatal' ? tabStyles.active : tabStyles.inactive}`}
                onClick={() => setActiveTab('fatal')}
              >
                Fatal Logs ({fatalLogs.length})
              </button>
            </div>
            
            {/* Filters */}
            <div className="p-4 border-b flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter logs..."
                  className="w-full p-2 border rounded"
                />
              </div>
              
              {activeTab === 'regular' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="p-2 border rounded"
                  >
                    <option value={LogLevel.DEBUG}>Debug</option>
                    <option value={LogLevel.INFO}>Info</option>
                    <option value={LogLevel.WARN}>Warning</option>
                    <option value={LogLevel.ERROR}>Error</option>
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Log Count
                </label>
                <div className="p-2 border rounded bg-gray-50">
                  {activeTab === 'regular' 
                    ? `${logs.length} total / ${filteredLogs.length} filtered`
                    : `${fatalLogs.length} total / ${filteredFatalLogs.length} filtered`
                  }
                </div>
              </div>
            </div>
            
            {/* Log list */}
            <div className="flex-1 overflow-auto p-2">
              {activeTab === 'regular' ? (
                // Regular logs
                filteredLogs.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No logs match your filters
                  </div>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="p-2 text-left w-24">Time</th>
                        <th className="p-2 text-left w-24">Level</th>
                        <th className="p-2 text-left w-32">Component</th>
                        <th className="p-2 text-left">Message</th>
                        <th className="p-2 text-left w-24">User</th>
                        <th className="p-2 text-left w-32">Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log, index) => (
                        <tr 
                          key={index} 
                          className={`${levelToColor(log.level)} hover:bg-gray-100 cursor-pointer`}
                          onClick={() => console.log('Log details:', log)}
                        >
                          <td className="p-2 font-mono text-xs">{formatTime(log.timestamp)}</td>
                          <td className="p-2">{levelNames[log.level] || 'Unknown'}</td>
                          <td className="p-2">{(log.component as string) || '-'}</td>
                          <td className="p-2">{log.message}</td>
                          <td className="p-2">{(log.user as string) || '-'}</td>
                          <td className="p-2">
                            {log.tags?.map((tag: string) => (
                              <span 
                                key={tag} 
                                className="inline-block bg-gray-200 rounded px-1 mr-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              ) : (
                // Fatal logs
                filteredFatalLogs.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No fatal logs match your filters
                  </div>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="p-2 text-left w-24">Time</th>
                        <th className="p-2 text-left">Message</th>
                        <th className="p-2 text-left w-32">Tags</th>
                        <th className="p-2 text-left w-32">Preserved At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFatalLogs.map((log, index) => (
                        <tr 
                          key={index} 
                          className="bg-red-50 hover:bg-red-100 cursor-pointer"
                          onClick={() => console.log('Fatal log details:', log)}
                        >
                          <td className="p-2 font-mono text-xs">{formatTime(log.timestamp)}</td>
                          <td className="p-2">{log.message}</td>
                          <td className="p-2">
                            {log.tags?.map((tag: string) => (
                              <span 
                                key={tag} 
                                className="inline-block bg-gray-200 rounded px-1 mr-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </td>
                          <td className="p-2 font-mono text-xs">{formatTime(log.preservedAt || log.timestamp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogViewer;