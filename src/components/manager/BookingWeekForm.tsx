
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { useBookingForm } from '@/hooks/useBookingForm';

interface BookingWeekFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  bookingWeek: BookingWeek;
}

const BookingWeekForm: React.FC<BookingWeekFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bookingWeek
}) => {
  const {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  } = useBookingForm(bookingWeek, onSubmit);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {bookingWeek.status === 'available' ? 'Create Booking' : 'Edit Booking'}
          </DialogTitle>
          <DialogDescription>
            {bookingWeek.status === 'available' 
              ? 'Set up a new booking for this week' 
              : 'Update booking details'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <Label>Period</Label>
            <Input value={bookingWeek.week_number} disabled className="bg-muted/50" />
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.status === 'booked' && <BookingDetailsFields 
            formData={formData}
            handleSelectChange={handleSelectChange}
          />}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface BookingDetailsFieldsProps {
  formData: {
    direction: string;
    meal_plan: string;
    agent: string;
  };
  handleSelectChange: (name: string, value: string) => void;
}

const BookingDetailsFields: React.FC<BookingDetailsFieldsProps> = ({ 
  formData, 
  handleSelectChange 
}) => {
  return (
    <>
      <div>
        <Label htmlFor="direction">Direction</Label>
        <Select 
          value={formData.direction} 
          onValueChange={(value) => handleSelectChange('direction', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MA-MA">MA-MA</SelectItem>
            <SelectItem value="MA/ST-MA">MA/ST-MA</SelectItem>
            <SelectItem value="ST-ST">ST-ST</SelectItem>
            <SelectItem value="ST-MA">ST-MA</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="meal_plan">Meal Plan</Label>
        <Select 
          value={formData.meal_plan} 
          onValueChange={(value) => handleSelectChange('meal_plan', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select meal plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-">-</SelectItem>
            <SelectItem value="HB">HB</SelectItem>
            <SelectItem value="FB">FB</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="agent">Agent</Label>
        <Select 
          value={formData.agent} 
          onValueChange={(value) => handleSelectChange('agent', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Geotour">Geotour</SelectItem>
            <SelectItem value="Direktni gosti">Direct Guests</SelectItem>
            <SelectItem value="Agent">Other Agents</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default BookingWeekForm;
