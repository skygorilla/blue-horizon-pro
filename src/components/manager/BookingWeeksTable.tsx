
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import BookingWeekForm from './BookingWeekForm';
import BookingWeeksTableContent from './table/BookingWeeksTableContent';
import DeleteBookingDialog from './dialogs/DeleteBookingDialog';
import { BookingTableProps, BookingWeek } from './types/BookingTypes';

const BookingWeeksTable: React.FC<BookingTableProps> = ({ filter }) => {
  const [selectedWeek, setSelectedWeek] = useState<BookingWeek | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch booking weeks data from Supabase
  const { data: weeks, isLoading, error, refetch } = useQuery({
    queryKey: ['bookingWeeks', filter],
    queryFn: async () => {
      try {
        let query = supabase.from('booking_weeks').select('*');
        
        // Apply filter if needed
        if (filter === 'booked') {
          query = query.eq('status', 'booked');
        } else if (filter === 'available') {
          query = query.eq('status', 'available');
        }
        
        // Sort by booking ID if booked, or by week number otherwise
        if (filter === 'booked') {
          query = query.order('booking_id', { ascending: true });
        } else {
          query = query.order('week_number', { ascending: true });
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching data:', error);
          toast.error('Failed to load booking data');
          return [] as BookingWeek[];
        }
        
        console.log('Fetched booking data:', data);
        return data as BookingWeek[];
      } catch (error) {
        console.error('Unexpected error in booking weeks query:', error);
        toast.error('Failed to load booking data');
        return [] as BookingWeek[];
      }
    },
  });

  const handleRowClick = (week: BookingWeek) => {
    setSelectedWeek(week);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedWeek(null);
  };

  const handleFormSubmit = async () => {
    await refetch();
    setIsFormOpen(false);
    setSelectedWeek(null);
    toast.success('Booking updated');
  };

  const handleDeleteClick = (e: React.MouseEvent, week: BookingWeek) => {
    e.stopPropagation(); // Prevent row click from triggering
    setSelectedWeek(week);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await refetch();
    setDeleteDialogOpen(false);
    setSelectedWeek(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-maritime-teal" />
        <span className="ml-2 text-maritime-navy">Loading bookings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading booking data:</p>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <>
      <BookingWeeksTableContent 
        weeks={weeks}
        onRowClick={handleRowClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Booking Form Modal */}
      {selectedWeek && (
        <BookingWeekForm 
          isOpen={isFormOpen} 
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          bookingWeek={selectedWeek}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteBookingDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        selectedWeek={selectedWeek}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default BookingWeeksTable;
