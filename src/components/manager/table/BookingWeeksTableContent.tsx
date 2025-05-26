
import React from 'react';
import { BookingWeek } from '@/components/manager/types/BookingTypes';
import { isPastWeek } from '@/utils/manager/dateUtils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BookingWeekRow from './BookingWeekRow';

interface BookingWeeksTableContentProps {
  weeks: BookingWeek[] | undefined;
  onRowClick: (week: BookingWeek) => void;
  onDeleteClick: (e: React.MouseEvent, week: BookingWeek) => void;
}

const BookingWeeksTableContent: React.FC<BookingWeeksTableContentProps> = ({
  weeks,
  onRowClick,
  onDeleteClick
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>
          {weeks?.length 
            ? `${weeks.filter(w => w.status === 'booked').length} of ${weeks.length} weeks booked`
            : 'No booking data available'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">#</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Direction</TableHead>
            <TableHead>Meal Plan</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weeks && weeks.map((week) => (
            <BookingWeekRow
              key={week.id}
              week={week}
              isPast={isPastWeek(week.week_number)}
              onRowClick={onRowClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingWeeksTableContent;
