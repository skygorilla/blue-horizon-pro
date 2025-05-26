
import React from 'react';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';

interface BookingWeekRowProps {
  week: BookingWeek;
  isPast: boolean;
  onRowClick: (week: BookingWeek) => void;
  onDeleteClick: (e: React.MouseEvent, week: BookingWeek) => void;
}

const BookingWeekRow: React.FC<BookingWeekRowProps> = ({ 
  week, 
  isPast, 
  onRowClick, 
  onDeleteClick 
}) => {
  return (
    <TableRow 
      key={week.id} 
      onClick={() => onRowClick(week)}
      className={`
        ${week.status === 'booked' ? 'bg-green-50/50' : ''}
        ${isPast ? 'opacity-60' : ''}
        cursor-pointer hover:bg-muted/70 transition-colors
      `}
    >
      <TableCell className="font-medium">
        {week.booking_id || '-'}
      </TableCell>
      <TableCell>
        {week.status === 'booked' ? (
          <Badge className="bg-green-500 hover:bg-green-600">Booked</Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-100">Available</Badge>
        )}
      </TableCell>
      <TableCell>{week.week_number}</TableCell>
      <TableCell>{week.direction || '-'}</TableCell>
      <TableCell>{week.meal_plan || '-'}</TableCell>
      <TableCell>{week.agent || '-'}</TableCell>
      <TableCell className="text-right">
        {week.status === 'booked' && (
          <button 
            onClick={(e) => onDeleteClick(e, week)} 
            className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
          >
            Clear
          </button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BookingWeekRow;
