import React from 'react';

const MapStatistics: React.FC = () => {
  return (
    <div className="bg-blue-900/50 rounded-lg p-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold uppercase text-gray-300">GEO-LOCATIONS</h2>
          <div className="text-2xl font-bold">1 656 843</div>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="flex flex-col">
            <div className="bg-blue-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Map Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400">Live</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">146 Countries, 2759 Cities</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Foreign Visits</span>
                  <div className="text-right">
                    <div>Same Cont Test</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-gray-400 text-xs text-right">75%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Local Visit</span>
                  <div className="text-right">
                    <div>To C. Conversion</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                    <div className="text-gray-400 text-xs text-right">84%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sound Frequencies</span>
                  <div className="text-right">
                    <div>Average Range</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="text-gray-400 text-xs text-right">92%</div>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Map Distributions</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    321 elements installed, 84 sets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* US Map */}
      <div className="relative bg-blue-800/30 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        <svg 
          className="w-full h-full opacity-70" 
          viewBox="0 0 960 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified US Map - just the outline */}
          <path
            d="M160,350 L180,345 L200,330 L220,310 L240,300 L260,310 L280,320 L300,330 L320,335 L340,340 L360,350 L380,355 L400,350 L420,340 L440,330 L460,320 L480,310 L500,300 L520,290 L540,280 L560,270 L580,260 L600,250 L620,240 L640,230 L660,220 L680,210 L700,200 L720,190 L740,180 L760,170 L780,170 L800,180 L810,200 L820,220 L830,240 L840,260 L850,280 L860,300 L870,320 L880,340 L890,360 L900,380 L880,400 L860,410 L840,420 L820,430 L800,440 L780,450 L760,460 L740,470 L720,480 L700,490 L680,500 L660,490 L640,480 L620,470 L600,460 L580,450 L560,440 L540,430 L520,420 L500,410 L480,400 L460,390 L440,380 L420,370 L400,360 L380,365 L360,370 L340,375 L320,380 L300,375 L280,370 L260,365 L240,360 L220,355 L200,350 L180,350 L160,350"
            fill="none"
            stroke="#4a83bb"
            strokeWidth="2"
          />
          
          {/* Dots for locations */}
          <circle cx="220" cy="310" r="4" fill="#fff" />
          <circle cx="320" cy="335" r="4" fill="#fff" />
          <circle cx="420" cy="340" r="4" fill="#fff" />
          <circle cx="520" cy="290" r="4" fill="#fff" />
          <circle cx="620" cy="240" r="4" fill="#fff" />
          <circle cx="720" cy="190" r="4" fill="#fff" />
          <circle cx="520" cy="380" r="6" fill="#fff" />
          <circle cx="620" cy="420" r="4" fill="#fff" />
          <circle cx="720" cy="370" r="4" fill="#fff" />
          <circle cx="380" cy="320" r="4" fill="#fff" />
          <circle cx="480" cy="270" r="4" fill="#fff" />
          <circle cx="580" cy="320" r="4" fill="#fff" />
          <circle cx="300" cy="350" r="4" fill="#fff" />
        </svg>

        {/* Search Bar */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center bg-blue-900/80 rounded-md">
            <input
              type="text"
              placeholder="Search Map"
              className="bg-transparent border-none outline-none text-white px-3 py-2 w-40"
            />
            <button className="p-2 text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapStatistics;