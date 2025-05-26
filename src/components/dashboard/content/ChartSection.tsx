import React from 'react';
import PieChart from '@/components/PieChart';
import BarChart from '@/components/BarChart';
import { ChartDataItem } from '@/types/chart/chartTypes';

interface ChartSectionProps {
  supplierChartData: ChartDataItem[];
  caloriesData: ChartDataItem[];
  inventoryCategoryData: ChartDataItem[];
  costData: ChartDataItem[];
}

const ChartSection: React.FC<ChartSectionProps> = ({
  supplierChartData,
  caloriesData,
  inventoryCategoryData,
  costData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="dashboard-card">
          <h3 className="section-heading">Supplier Distribution</h3>
          <PieChart 
            title="" 
            titleColor="#00796B" 
            data={supplierChartData.length > 0 ? supplierChartData : costData} 
          />
        </div>
        
        <div className="dashboard-card">
          <h3 className="section-heading">Daily Calories</h3>
          <BarChart 
            title="" 
            titleColor="#4DB6AC" 
            data={caloriesData} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="dashboard-card">
          <h3 className="section-heading">Inventory by Category</h3>
          <PieChart 
            title="" 
            titleColor="#3949AB" 
            data={inventoryCategoryData.length > 0 ? inventoryCategoryData : []} 
          />
        </div>
        
        <div className="dashboard-card">
          <h3 className="section-heading">Cost Breakdown</h3>
          <PieChart 
            title="" 
            titleColor="#00796B" 
            data={costData} 
          />
        </div>
      </div>
    </>
  );
};

export default ChartSection;
