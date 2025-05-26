
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GuestTypeCode, GuestTypeInfo } from '@/types/guest/guestTypes';
import { toast } from 'sonner';
import GuestTypeForm from './GuestTypeForm';
import GuestTypeCard from './GuestTypeCard';
import { v4 as uuidv4 } from 'uuid';

export interface GuestTypeManagerProps {
  guestTypes: GuestTypeInfo[];
  onUpdate: (updatedGuestTypes: GuestTypeInfo[]) => void;
}

const GuestTypeManager: React.FC<GuestTypeManagerProps> = ({ 
  guestTypes: initialGuestTypes, 
  onUpdate 
}) => {
  const [guestTypes, setGuestTypes] = useState<GuestTypeInfo[]>(initialGuestTypes);
  const [editingType, setEditingType] = useState<GuestTypeInfo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Create or update a guest type
  const handleSaveGuestType = (type: GuestTypeInfo) => {
    let updatedTypes: GuestTypeInfo[];
    
    if (type.id) {
      // Update existing
      updatedTypes = guestTypes.map(gt => gt.id === type.id ? type : gt);
      setGuestTypes(updatedTypes);
      toast.success(`Guest type ${type.code} updated successfully`);
    } else {
      // Create new
      const newType = {
        ...type,
        id: `new-${Date.now()}`
      };
      updatedTypes = [...guestTypes, newType];
      setGuestTypes(updatedTypes);
      toast.success(`Guest type ${type.code} created successfully`);
    }
    
    // Call the onUpdate prop with the updated guest types
    onUpdate(updatedTypes);
    setDialogOpen(false);
    setEditingType(null);
  };

  // Delete a guest type
  const handleDeleteGuestType = (id: string) => {
    const updatedTypes = guestTypes.filter(gt => gt.id !== id);
    setGuestTypes(updatedTypes);
    // Call the onUpdate prop with the updated guest types
    onUpdate(updatedTypes);
    toast.success("Guest type deleted successfully");
  };

  // Start editing a guest type
  const startEdit = (type: GuestTypeInfo) => {
    setEditingType(type);
    setDialogOpen(true);
  };

  // Create a new guest type
  const startCreate = () => {
    setEditingType({
      id: '',
      code: 'A' as GuestTypeCode,
      name: '',
      shortDescription: '',
      description: '',
      mealPattern: [],
      category: 'Crew',
      icon: 'User'
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Guest Types</h2>
        <Button onClick={startCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Guest Type
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guestTypes.map(type => (
          <GuestTypeCard
            key={type.id}
            guestType={type}
            onEdit={startEdit}
            onDelete={handleDeleteGuestType}
          />
        ))}
      </div>

      {/* Guest Type Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingType?.id ? 'Edit Guest Type' : 'Create Guest Type'}
            </DialogTitle>
          </DialogHeader>

          {editingType && (
            <GuestTypeForm 
              guestType={editingType} 
              onSave={handleSaveGuestType} 
              onCancel={() => setDialogOpen(false)}
              existingCodes={guestTypes.filter(gt => gt.id !== editingType.id).map(gt => gt.code)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestTypeManager;
