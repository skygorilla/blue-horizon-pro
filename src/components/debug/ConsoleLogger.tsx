import React, { useEffect, useRef, useState } from 'react';

interface LogEntry {
  level: 'log' | 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  args: any[];
}

const ConsoleLogger: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Hook into console methods
  useEffect(() => {
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      debug: console.debug
    };

    // Create interceptors for each console method
    type ConsoleMethod = 'log' | 'info' | 'warn' | 'error' | 'debug';
    const interceptConsole = (method: ConsoleMethod) => {
      console[method] = (...args: any[]) => {
        // Call the original method first
        originalConsole[method](...args);
        
        // Create a log entry
        const message = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');

        // Add to our logs state
        setLogs(prevLogs => [
          ...prevLogs, 
          {
            level: method,
            message,
            timestamp: new Date().toISOString(),
            args
          }
        ]);
      };
    };

    // Apply interceptors to all console methods
    (Object.keys(originalConsole) as ConsoleMethod[]).forEach(interceptConsole);

    // Clean up when component unmounts
    return () => {
      Object.entries(originalConsole).forEach(([method, originalFn]) => {
        console[method as ConsoleMethod] = originalFn;
      });
    };
  }, []);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current && isVisible) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isVisible]);

  // Filter logs based on search term
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(filter.toLowerCase())
  );

  // Clear logs
  const clearLogs = () => {
    setLogs([]);
  };

  // Style based on log level
  const getLogStyle = (level: string) => {
    switch(level) {
      case 'error': return 'bg-red-100 border-red-500 text-red-800';
      case 'warn': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-800';
      case 'debug': return 'bg-purple-100 border-purple-500 text-purple-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isVisible ? 'Hide Console' : 'Show Console'}
      </button>

      {/* Logger panel */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-40 h-1/3 flex flex-col">
          {/* Header with controls */}
          <div className="flex justify-between items-center p-2 border-b border-gray-300 bg-gray-100">
            <div className="font-semibold">Console Logger</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter logs..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              />
              <button 
                onClick={clearLogs}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
          
          {/* Logs container */}
          <div 
            ref={logContainerRef}
            className="flex-1 overflow-y-auto p-2 font-mono text-sm bg-gray-50"
          >
            {filteredLogs.length === 0 ? (
              <div className="text-gray-500 text-center p-4">No logs to display.</div>
            ) : (
              filteredLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`p-1 my-1 border-l-4 pl-2 ${getLogStyle(log.level)}`}
                >
                  <span className="text-xs text-gray-500 mr-2">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="mr-2 font-bold">[{log.level.toUpperCase()}]</span>
                  <span>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConsoleLogger;