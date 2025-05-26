import React from 'react';

const RandomValuesCard: React.FC = () => {
  return (
    <div className="bg-blue-900/50 rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">RANDOM VALUES</h3>
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
          <div className="text-gray-400 text-sm">Overcome T</div>
          <div className="font-bold text-xl">104.05%</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Takeoff Angle</div>
          <div className="font-bold text-xl">14.29°</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">World Pop</div>
          <div className="font-bold text-xl">7.21M</div>
        </div>
      </div>
      
      <div className="h-32 relative mb-4">
        {/* Simplified radar chart visualization */}
        <svg width="100%" height="100%" viewBox="0 0 200 100">
          <polygon 
            points="100,10 40,50 60,90 140,90 160,50" 
            fill="rgba(124, 58, 237, 0.2)" 
            stroke="#7c3aed" 
            strokeWidth="2"
          />
          <circle cx="100" cy="10" r="4" fill="#fff" />
          <circle cx="40" cy="50" r="4" fill="#fff" />
          <circle cx="60" cy="90" r="4" fill="#fff" />
          <circle cx="140" cy="90" r="4" fill="#fff" />
          <circle cx="160" cy="50" r="4" fill="#fff" />
          
          <line x1="100" y1="10" x2="100" y2="95" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
          <line x1="40" y1="50" x2="160" y2="50" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
          <line x1="60" y1="90" x2="140" y2="90" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
        </svg>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <div className="bg-indigo-500/20 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div className="text-indigo-400 font-medium">8.75% higher</div>
        <div className="text-gray-400">than last month</div>
      </div>
    </div>
  );
};

export default RandomValuesCard;