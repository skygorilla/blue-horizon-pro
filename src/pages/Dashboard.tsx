
import React from 'react';
import UserDebugInfo from '@/components/UserDebugInfo';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Debug component to help diagnose role issues */}
      <UserDebugInfo />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <p className="text-gray-600">Welcome to Blue Horizon Pro</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <p className="text-green-600">All systems operational</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
