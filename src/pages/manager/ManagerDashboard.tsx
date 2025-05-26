import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import BookingWeeksTable from '@/components/manager/BookingWeeksTable';
import BookingControls from '@/components/manager/BookingControls';
import BookingWeekForm from '@/components/manager/BookingWeekForm';
import ExportForm from '@/components/manager/ExportForm';
import ManagerDashboardLayout from '@/components/manager/ManagerDashboardLayout';
import { useBookingOperations } from '@/hooks/useBookingOperations';
import { toast } from 'sonner';

const ManagerDashboard: React.FC = () => {
  const { activeRole } = useAuth();
  const [filter, setFilter] = useState<'all' | 'booked' | 'available'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    exportDialogOpen,
    setExportDialogOpen,
    newBookingModalOpen,
    setNewBookingModalOpen,
    emptyWeek,
    refreshKey,
    handleNewBooking,
    handleFormSubmit,
    handleExport
  } = useBookingOperations();

  // Handle new booking with result pattern
  const onNewBooking = async () => {
    const result = await handleNewBooking();
    // Success or failure is already handled with toasts in the hook
    // No additional handling needed here since UI state is managed in the hook
  };

  // Handle export with result pattern
  const onExport = async (format: 'csv' | 'json' | 'pdf' | 'excel') => {
    const result = await handleExport(format);
    if (!result.success) {
      console.error('Export failed:', result.message);
      // Toast is already shown in the hook
    }
    // Close dialog after export attempt regardless of success
    setExportDialogOpen(false);
  };

  // Debug log for activeRole
  console.log('[ManagerDashboard] activeRole:', activeRole);

  // Check role-based access
  if (activeRole !== 'manager') {
    return <Navigate to="/role-select" />;
  }

  return (
    <ManagerDashboardLayout>
      {/* Controls section */}
      <BookingControls 
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onExport={() => setExportDialogOpen(true)}
        onNewBooking={onNewBooking}
      />
      
      {/* Bookings table */}
      <BookingWeeksTable filter={filter} key={refreshKey} />

      {/* Export Dialog */}
      <ExportForm 
        isOpen={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={onExport}
      />
      
      {/* New Booking Dialog */}
      {emptyWeek && (
        <BookingWeekForm
          isOpen={newBookingModalOpen}
          onClose={() => setNewBookingModalOpen(false)}
          onSubmit={handleFormSubmit}
          bookingWeek={emptyWeek}
        />
      )}
    </ManagerDashboardLayout>
  );
};

export default ManagerDashboard;
