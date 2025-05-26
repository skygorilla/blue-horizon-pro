
import { supabase } from '@/integrations/supabase/client';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { toast } from 'sonner';

/**
 * Updates a booking week in the database
 */
export const updateBookingWeek = async (
  bookingWeek: BookingWeek, 
  formData: {
    status: 'available' | 'booked';
    direction: string;
    meal_plan: string;
    agent: string;
  }
): Promise<boolean> => {
  try {
    // Get the current highest booking ID to assign a new one (if this is a new booking)
    let newBookingId = bookingWeek.booking_id;
    
    if (formData.status === 'booked' && bookingWeek.status === 'available') {
      const { data: maxData } = await supabase
        .from('booking_weeks')
        .select('booking_id')
        .not('booking_id', 'is', null)
        .order('booking_id', { ascending: false })
        .limit(1);
        
      // Calculate the next booking ID
      newBookingId = maxData && maxData.length > 0 ? (maxData[0]?.booking_id || 0) + 1 : 1;
      console.log('Generated new booking ID:', newBookingId);
    }
    
    // If we're changing from booked to available, clear related fields
    if (formData.status === 'available' && bookingWeek.status === 'booked') {
      newBookingId = null;
      formData.direction = '';
      formData.meal_plan = '';
      formData.agent = '';
    }

    console.log('Updating booking with data:', {
      status: formData.status,
      direction: formData.direction || null,
      meal_plan: formData.meal_plan || null,
      agent: formData.agent || null,
      booking_id: formData.status === 'booked' ? newBookingId : null,
      updated_at: new Date().toISOString()
    });

    // Update the booking week
    const { error } = await supabase
      .from('booking_weeks')
      .update({
        status: formData.status,
        direction: formData.direction || null,
        meal_plan: formData.meal_plan || null,
        agent: formData.agent || null,
        booking_id: formData.status === 'booked' ? newBookingId : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingWeek.id);

    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }
    
    console.log('Booking updated successfully');
    
    toast.success(
      formData.status === 'booked' 
        ? 'Booking created successfully' 
        : 'Week updated successfully'
    );
    
    return true;
  } catch (error) {
    console.error('Error saving booking:', error);
    toast.error('Failed to save booking');
    return false;
  }
};
