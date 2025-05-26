import React from 'react';
import MapStatistics from '../../admin/dashboard/MapStatistics';
import UserbaseGrowthCard from '../../admin/dashboard/UserbaseGrowthCard';
import TrafficValuesCard from '../../admin/dashboard/TrafficValuesCard';
import RandomValuesCard from '../../admin/dashboard/RandomValuesCard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-950 text-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard <span className="text-gray-400 font-normal">The Lucky One</span></h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-blue-900 rounded hover:bg-blue-800">
              <span className="sr-only">Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Map Statistics Section */}
        <MapStatistics />

        {/* Analytics Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <UserbaseGrowthCard />
          <TrafficValuesCard />
          <RandomValuesCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;