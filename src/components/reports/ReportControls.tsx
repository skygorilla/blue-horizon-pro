
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/reports/DateRangePicker';
import { DateRange } from 'react-day-picker';

interface ReportControlsProps {
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
}

const ReportControls: React.FC<ReportControlsProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      <Select defaultValue="all">
        <SelectTrigger className="w-[140px]">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Filter by" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="produce">Produce</SelectItem>
          <SelectItem value="meat">Meat</SelectItem>
          <SelectItem value="dairy">Dairy</SelectItem>
          <SelectItem value="dry">Dry Goods</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportControls;
