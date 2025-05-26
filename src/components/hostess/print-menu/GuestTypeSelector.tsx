
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { GuestTypeCode, GUEST_TYPES } from '@/types/mealPlanTypes';
import { Badge } from '@/components/ui/badge';

interface GuestTypeSelectorProps {
  selectedGuestTypes: GuestTypeCode[];
  onToggleGuestType: (type: GuestTypeCode) => void;
}

const GuestTypeSelector: React.FC<GuestTypeSelectorProps> = ({ 
  selectedGuestTypes, 
  onToggleGuestType 
}) => {
  return (
    <div className="mb-6 p-4 border rounded-md">
      <h2 className="text-lg font-medium mb-3">Select Guest Types:</h2>
      <div className="flex flex-wrap gap-2">
        {GUEST_TYPES.filter(t => t.code !== 'both').map((guestType) => (
          <Button
            key={guestType.code}
            variant={selectedGuestTypes.includes(guestType.code) ? "default" : "outline"}
            size="sm"
            className={selectedGuestTypes.includes(guestType.code) ? "bg-maritime-navy" : ""}
            onClick={() => onToggleGuestType(guestType.code)}
          >
            {selectedGuestTypes.includes(guestType.code) && (
              <Check className="h-3 w-3 mr-1" />
            )}
            {guestType.name} ({guestType.code})
            {guestType.category && (
              <Badge variant="outline" className="ml-1 text-[10px]">
                {guestType.category}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GuestTypeSelector;
