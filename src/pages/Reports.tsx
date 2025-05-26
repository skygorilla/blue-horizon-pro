import React from 'react';
import { Card } from '@/components/ui/card';
import ReportsModule from '@/components/reports/ReportsModule';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { useLocation } from 'react-router-dom';
import { getBreadcrumbItems } from '@/components/header/utils/headerUtils';

const Reports: React.FC = () => {
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto pt-6 px-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <BackButton to="/role-select" label="Return to Role Selection" />
          <div className="sm:block">
            <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
          </div>
        </div>
        
        <Card className="shadow-md overflow-hidden"> {/* Removed fixed width and height classes */}
          <ReportsModule />
        </Card>
      </div>
    </div>
  );
};

export default Reports;
