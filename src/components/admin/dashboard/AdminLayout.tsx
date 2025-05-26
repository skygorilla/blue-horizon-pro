import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSideMenu from './AdminSideMenu';
import AdminDashboard from '../../../pages/admin/AdminDashboard'; // Corrected path to the page

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    // Use theme-aware background color
    <div className="flex h-screen bg-background text-foreground"> 
      <AdminSideMenu />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6"> {/* Add some padding */}
          {/* Render children if provided, otherwise default to AdminDashboard page */}
          {children || <AdminDashboard />} 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;