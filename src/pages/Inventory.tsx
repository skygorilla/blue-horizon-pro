import React from 'react';
import { InventoryProvider } from '@/contexts/InventoryContext';
import { Card, CardContent } from '@/components/ui/card';
import InventoryTabContent from '@/components/dashboard/inventory/InventoryTabContent';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { useLocation } from 'react-router-dom';
import { getBreadcrumbItems } from '@/components/header/utils/headerUtils';
import { PageHeader } from '@/components/ui/section-header';
import { Package } from 'lucide-react';

const Inventory: React.FC = () => {
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto pt-6 px-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <BackButton to="/dashboard" label="Return to Dashboard" />
          <div className="sm:block">
            <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
          </div>
        </div>
        
        <PageHeader
          title="Inventory Management"
          description="Track stock levels, manage supplies, and monitor consumption patterns"
          icon={<Package />}
          className="text-primary mb-6"
        />

        <Card>
          <CardContent className="p-6">
            <InventoryProvider>
              <InventoryTabContent />
            </InventoryProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
