
import React from 'react';

type BarData = {
  label: string;
  value: number;
};

interface BarChartProps {
  title: string;
  titleColor: string;
  data: BarData[];
  maxValue?: number;
  targetValue?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  title, 
  titleColor, 
  data, 
  maxValue = 3000,
  targetValue = 2200
}) => {
  // Chart dimensions
  const chartHeight = 120;
  const barMaxHeight = 100;
  const barWidth = 24;
  const barSpacing = 15;
  
  // Calculate effective max value for scaling
  const effectiveMax = Math.max(maxValue, ...data.map(item => item.value));
  
  return (
    <div className="excel-card h-full">
      <div style={{ backgroundColor: titleColor }} className="rounded-t-md p-2">
        <h3 className="text-white text-base font-light text-center">{title}</h3>
      </div>
      
      <div className="p-4">
        <div className="relative h-[150px]">
          {/* Y-axis labels and grid lines */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-right">
            <div className="text-[10px] text-gray-500 h-0">
              <span className="relative -top-2 right-1">{maxValue}</span>
              <div className="absolute left-4 w-full border-t border-dashed border-gray-200"></div>
            </div>
            <div className="text-[10px] text-gray-500 h-0">
              <span className="relative -top-2 right-1">{targetValue}</span>
              <div className="absolute left-4 w-full border-t border-dashed border-gray-200"></div>
            </div>
            <div className="text-[10px] text-gray-500 h-0">
              <span className="relative -top-2 right-1">0</span>
              <div className="absolute left-4 w-full border-t border-gray-200"></div>
            </div>
          </div>
          
          {/* Target line */}
          <div 
            className="absolute left-8 right-0 border-t border-dashed border-yellow-500"
            style={{ top: `${chartHeight - (targetValue / effectiveMax) * barMaxHeight}px` }}
          ></div>
          
          {/* Bars */}
          <div className="absolute left-10 bottom-0 flex items-end space-x-1">
            {data.map((item, index) => {
              const barHeight = (item.value / effectiveMax) * barMaxHeight;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex flex-col items-center w-[30px]">
                    {/* 3D Bar effect */}
                    <div className="relative">
                      {/* Top face - brighter blue */}
                      <div 
                        className="absolute -top-[3px] left-[3px] w-[24px] h-[3px] bg-excel-lightblue brightness-110"
                      ></div>
                      
                      {/* Side face - darker blue */}
                      <div 
                        className="absolute top-0 -right-[3px] w-[3px]"
                        style={{ height: `${barHeight}px`, backgroundColor: '#4a89c0' }}
                      ></div>
                      
                      {/* Front face */}
                      <div 
                        className="bg-excel-lightblue w-[30px]"
                        style={{ height: `${barHeight}px` }}
                      ></div>
                    </div>
                    
                    {/* Label */}
                    <div className="mt-2 text-[10px] text-gray-500">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
