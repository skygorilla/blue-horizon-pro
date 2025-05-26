
import { useState, useEffect } from 'react';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { updateBookingWeek } from '@/utils/manager/bookingDbUtils';

interface BookingFormData {
  status: 'available' | 'booked';
  direction: string;
  meal_plan: string;
  agent: string;
}

export const useBookingForm = (
  bookingWeek: BookingWeek, 
  onSubmit: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    status: bookingWeek.status,
    direction: bookingWeek.direction || '',
    meal_plan: bookingWeek.meal_plan || '',
    agent: bookingWeek.agent || '',
  });

  // Update form data when booking week changes
  useEffect(() => {
    setFormData({
      status: bookingWeek.status,
      direction: bookingWeek.direction || '',
      meal_plan: bookingWeek.meal_plan || '',
      agent: bookingWeek.agent || '',
    });
  }, [bookingWeek]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await updateBookingWeek(bookingWeek, formData);
    
    if (success) {
      onSubmit();
    }
    
    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
