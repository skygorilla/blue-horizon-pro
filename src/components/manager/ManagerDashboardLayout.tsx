
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/header/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

interface ManagerDashboardLayoutProps {
  children: ReactNode;
}

const ManagerDashboardLayout: React.FC<ManagerDashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Manager Dashboard - Blue Horizon Pro</title>
        <meta name="description" content="Manage bookings and yacht scheduling with Blue Horizon Pro" />
      </Helmet>

      <PageHeader
        title="Booking Management"
        description="Elena Booking Manager"
        breadcrumbItems={[{ label: 'Manager Dashboard' }]}
        showBreadcrumbs={true}
      />

      <div className="container mx-auto p-4">
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            {children}
            
            {/* Watermark */}
            <div className="absolute right-10 bottom-10 w-24 h-24 opacity-10 pointer-events-none">
              <img src="/images/anchor-watermark.svg" alt="" className="w-full h-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ManagerDashboardLayout;
