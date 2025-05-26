
import React from 'react';

type PieChartData = {
  label: string;
  value: number;
  color: string;
};

interface PieChartProps {
  title: string;
  titleColor: string;
  data: PieChartData[];
}

const PieChart: React.FC<PieChartProps> = ({ title, titleColor, data }) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // SVG calculations
  const centerX = 80;
  const centerY = 80;
  const radius = 60;
  
  // Calculate slices
  let startAngle = 0;
  const slices = data.map(item => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const endAngle = startAngle + angle;
    
    // Calculate SVG arc path
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    const slice = {
      path: pathData,
      color: item.color,
      label: item.label,
      percentage: Math.round(percentage * 100)
    };
    
    startAngle = endAngle;
    return slice;
  });

  return (
    <div className="excel-card h-full">
      <div style={{ backgroundColor: titleColor }} className="rounded-t-md p-2">
        <h3 className="text-white text-base font-light text-center">{title}</h3>
      </div>
      
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="w-40 h-40 relative">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Shadow effect for 3D look */}
            <ellipse cx={centerX} cy={centerY + 5} rx={radius} ry={radius/3} fill="#f0f0f0" opacity="0.5" />
            
            {/* Pie slices */}
            {slices.map((slice, index) => (
              <path 
                key={index} 
                d={slice.path} 
                fill={slice.color}
                filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.2))"
              />
            ))}
          </svg>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 md:mt-0">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-gray-700">
                {item.label} ({slices[index].percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
