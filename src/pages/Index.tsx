import React from 'react';
import { useAuth } from '@/contexts/useAuth';
import Dashboard from '@/components/Dashboard';
import CaptainDashboard from '@/components/dashboard/role-dashboards/CaptainDashboard';
import ChefDashboard from '@/components/dashboard/role-dashboards/ChefDashboard';
import HostessDashboard from '@/components/dashboard/role-dashboards/HostessDashboard';
import CrewDashboard from '@/components/dashboard/role-dashboards/CrewDashboard';

const Index: React.FC = () => {
  const { activeRole } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-light">
      {activeRole === 'captain' && <CaptainDashboard />}
      {activeRole === 'chef' && <ChefDashboard />}
      {activeRole === 'hostess' && <HostessDashboard />}
      {activeRole === 'crew' && <CrewDashboard />}
      {!activeRole && <Dashboard />}
    </div>
  );
};

export default Index;
