import React from 'react';

const TrafficValuesCard: React.FC = () => {
  return (
    <div className="bg-blue-900/50 rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">TRAFFIC VALUES</h3>
        <div className="flex space-x-1">
          <button className="p-1 bg-blue-800/80 rounded hover:bg-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>
          <button className="p-1 bg-blue-800/80 rounded hover:bg-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-gray-400 text-sm">Overall Values</div>
          <div className="font-bold text-xl">17,567,318</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Monthly</div>
          <div className="font-bold text-xl">55,120</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">24h</div>
          <div className="font-bold text-xl">9,695</div>
        </div>
      </div>
      
      <div className="h-32 relative mb-4">
        {/* Simplified traffic chart visualization */}
        <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area chart */}
          <path
            d="M0,70 C20,65 40,60 60,50 C80,40 100,20 120,30 C140,40 160,80 180,75 C200,70 220,40 240,35 C260,30 280,40 300,35 C320,30 340,10 360,15 C380,20 400,30 400,30 V100 H0 Z"
            fill="url(#trafficGradient)"
          />
          {/* Line chart */}
          <path
            d="M0,70 C20,65 40,60 60,50 C80,40 100,20 120,30 C140,40 160,80 180,75 C200,70 220,40 240,35 C260,30 280,40 300,35 C320,30 340,10 360,15 C380,20 400,30 400,30"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
        </svg>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <div className="bg-red-500/20 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div className="text-red-400 font-medium">8% lower</div>
        <div className="text-gray-400">than last month</div>
      </div>
    </div>
  );
};

export default TrafficValuesCard;