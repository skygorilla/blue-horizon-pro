
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { GuestType, GuestTypeInfo } from '@/types/guest/guestTypes';
import { Badge } from '@/components/ui/badge';

interface GuestTypeCardProps {
  guestType: GuestTypeInfo;
  onEdit: (type: GuestTypeInfo) => void;
  onDelete: (id: string) => void;
}

const GuestTypeCard: React.FC<GuestTypeCardProps> = ({ 
  guestType, 
  onEdit, 
  onDelete 
}) => {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Recreation': return 'bg-green-100 text-green-800';
      case 'Sport': return 'bg-blue-100 text-blue-800';
      case 'Crew': return 'bg-purple-100 text-purple-800';
      case 'Kids': return 'bg-pink-100 text-pink-800';
      case 'Dietary': return 'bg-amber-100 text-amber-800';
      case 'Travel': return 'bg-sky-100 text-sky-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">
              Type {guestType.code}: {guestType.name}
            </CardTitle>
            <div className="mt-1">
              <Badge variant="outline" className={getCategoryColor(guestType.category)}>
                {guestType.category}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(guestType)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(guestType.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">{guestType.shortDescription}</p>
        <p className="text-sm text-muted-foreground mt-1">{guestType.description}</p>
        
        {guestType.mealPattern && guestType.mealPattern.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs font-medium">Meal Requirements:</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {guestType.mealPattern.map((meal, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {meal}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestTypeCard;
