import React, { useState } from 'react';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminDarkDashboard from '../../pages/admin/AdminDarkDashboard';

const CombinedAdminDashboard: React.FC = () => {
  const [activeDashboard, setActiveDashboard] = useState<'standard' | 'dark'>('standard');
  // Start with fullscreen mode enabled by default
  const [isFullscreen, setIsFullscreen] = useState<boolean>(true);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Determine the container class based on fullscreen state
  const containerClass = isFullscreen ? 'fullscreen-dark-gray' : 'min-h-screen';

  return (
    <div className={containerClass}>
      <div className="bg-blue-900 py-2 px-4 flex items-center justify-between">
        <h2 className="text-white font-semibold">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveDashboard('standard')}
            className={`px-3 py-1 rounded text-sm ${
              activeDashboard === 'standard'
                ? 'bg-white text-blue-900 font-medium'
                : 'bg-transparent text-white hover:bg-blue-800'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveDashboard('dark')}
            className={`px-3 py-1 rounded text-sm ${
              activeDashboard === 'dark'
                ? 'bg-white text-blue-900 font-medium'
                : 'bg-transparent text-white hover:bg-blue-800'
            }`}
          >
            Dark Theme
          </button>
          <button
            onClick={toggleFullscreen}
            className={`px-3 py-1 rounded text-sm ml-4 ${
              isFullscreen
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>

      {activeDashboard === 'standard' ? (
        <AdminDashboard />
      ) : (
        <AdminDarkDashboard />
      )}
    </div>
  );
};

export default CombinedAdminDashboard;