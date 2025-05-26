import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  Search, 
  PlusCircle, 
  FileDown 
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BookingControlsProps {
  filter: 'all' | 'booked' | 'available';
  setFilter: (filter: 'all' | 'booked' | 'available') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onExport: () => void;
  onNewBooking: () => void;
}

const BookingControls: React.FC<BookingControlsProps> = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  onExport,
  onNewBooking
}) => {
  return (
    <Card className="p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={(value: 'all' | 'booked' | 'available') => setFilter(value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Weeks</SelectItem>
              <SelectItem value="booked">Booked Only</SelectItem>
              <SelectItem value="available">Available Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="flex items-center gap-1 text-xs"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
          
          <Button 
            onClick={onNewBooking}
            className="flex items-center gap-1 bg-maritime-navy hover:bg-maritime-navy/90 text-white"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Booking</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookingControls;
