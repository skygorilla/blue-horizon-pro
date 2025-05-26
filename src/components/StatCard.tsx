
import React from 'react';

interface StatCardProps {
  title: string;
  titleColor: string;
  stats: { label: string; value: string }[];
}

const StatCard: React.FC<StatCardProps> = ({ title, titleColor, stats }) => {
  return (
    <div className="dashboard-card h-full">
      <div style={{ backgroundColor: titleColor }} className="rounded-t-md p-2 -mx-4 -mt-4 mb-4">
        <h3 className="text-white text-sm font-semibold text-center">{title}</h3>
      </div>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-neutral-medium">{stat.label}:</span>
            <span className="text-base font-semibold" style={{ color: titleColor }}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;
