
export type BookingWeek = {
  id: string;
  week_number: string;
  status: 'available' | 'booked';
  agent?: string;
  meal_plan?: string;
  direction?: string;
  booking_id?: number;
};

export interface BookingTableProps {
  filter: 'all' | 'booked' | 'available';
}
