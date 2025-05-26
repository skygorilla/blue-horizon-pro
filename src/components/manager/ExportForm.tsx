import React from 'react';
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileDown } from 'lucide-react';

interface ExportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'csv' | 'json' | 'pdf' | 'excel') => void;
}

const ExportForm: React.FC<ExportFormProps> = ({ isOpen, onClose, onExport }) => {
  const [format, setFormat] = React.useState<'csv' | 'json' | 'pdf' | 'excel'>('csv');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExport(format);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Export Bookings
          </DialogTitle>
          <DialogDescription>
            Select a format to export your booking data
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="format">File Format</Label>
            <Select 
              value={format} 
              onValueChange={(value: 'csv' | 'json' | 'pdf' | 'excel') => setFormat(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Export
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExportForm;
