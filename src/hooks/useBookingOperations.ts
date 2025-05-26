import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { formatBookingData, exportCSV, exportJSON } from '@/utils/manager/exportUtils';

// Define result type for operations
export interface BookingResult<T = any> {
  success: boolean;
  data?: T;
  error?: unknown;
  message?: string;
}

export const useBookingOperations = () => {
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [emptyWeek, setEmptyWeek] = useState<BookingWeek | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Find an available week to create a new booking
  const handleNewBooking = async (): Promise<BookingResult<BookingWeek | null>> => {
    try {
      const { data, error } = await supabase
        .from('booking_weeks')
        .select('*')
        .eq('status', 'available')
        .order('week_number', { ascending: true })
        .limit(1);
      
      if (error) {
        console.error('Supabase error finding available week:', error);
        toast.error('Failed to load available weeks');
        return { 
          success: false, 
          error, 
          message: 'Error retrieving available weeks'
        };
      }
      
      if (data && data.length > 0) {
        const week = data[0] as BookingWeek;
        setEmptyWeek(week);
        setNewBookingModalOpen(true);
        return { 
          success: true, 
          data: week,
          message: 'Available week found'
        };
      } else {
        toast.error('No available weeks found');
        return { 
          success: false, 
          data: null,
          message: 'No available weeks found'
        };
      }
    } catch (error) {
      console.error('Error finding available week:', error);
      toast.error('Failed to load available weeks');
      return { 
        success: false, 
        error, 
        message: 'Unexpected error finding available week'
      };
    }
  };

  // Handle UI refresh after form submission
  const handleFormSubmit = () => {
    setNewBookingModalOpen(false);
    // Force a refresh of the table
    setRefreshKey(prev => prev + 1);
    toast.success('Booking updated successfully');
  };

  // Export booking data in various formats
  const handleExport = async (format: 'csv' | 'json' | 'pdf' | 'excel'): Promise<BookingResult<boolean>> => {
    try {
      // Fetch all booking weeks data
      const { data, error } = await supabase
        .from('booking_weeks')
        .select('*')
        .order('booking_id', { ascending: true });
      
      if (error) {
        console.error('Supabase error exporting data:', error);
        toast.error('Failed to export data');
        return { 
          success: false, 
          error, 
          message: 'Error retrieving booking data for export'
        };
      }
      
      if (!data || data.length === 0) {
        toast.error('No data to export');
        return { 
          success: false, 
          data: false,
          message: 'No data available for export'
        };
      }
      
      // Format data for export
      const formattedData = formatBookingData(data as BookingWeek[]);
      
      // Current date for filename
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `Elena_bookings_${dateStr}`;
      
      // Export based on requested format
      switch (format) {
        case 'csv':
          exportCSV(formattedData, filename);
          break;
        case 'json':
          exportJSON(formattedData, filename);
          break;
        case 'pdf':
          toast.info('PDF export coming soon');
          break;
        case 'excel':
          toast.info('Excel export coming soon');
          break;
      }
      
      toast.success(`Data exported as ${format.toUpperCase()}`);
      return { 
        success: true, 
        data: true,
        message: `Data exported as ${format.toUpperCase()}`
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
      return { 
        success: false, 
        error, 
        message: 'Unexpected error during data export'
      };
    }
  };

  return {
    newBookingModalOpen,
    setNewBookingModalOpen,
    exportDialogOpen,
    setExportDialogOpen,
    emptyWeek,
    refreshKey,
    handleNewBooking,
    handleFormSubmit,
    handleExport
  };
};
