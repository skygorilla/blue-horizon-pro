
import React from 'react';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DeleteBookingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedWeek: BookingWeek | null;
  onConfirm: () => void;
}

const DeleteBookingDialog: React.FC<DeleteBookingDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  selectedWeek,
  onConfirm
}) => {
  const handleDeleteConfirm = async () => {
    if (!selectedWeek) return;
    
    try {
      console.log('Clearing booking for:', selectedWeek.id);
      const { error } = await supabase
        .from('booking_weeks')
        .update({ 
          status: 'available',
          agent: null,
          meal_plan: null,
          direction: null,
          booking_id: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedWeek.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Booking cleared successfully');
      onConfirm();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to clear booking');
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the booking for period {selectedWeek?.week_number}.
            The week will be marked as available again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteConfirm} 
            className="bg-red-500 hover:bg-red-600"
          >
            Clear Booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookingDialog;
