
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GuestTypeCode, GuestTypeCategory, GuestTypeInfo } from '@/types/guest/guestTypes';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface GuestTypeFormProps {
  guestType: GuestTypeInfo;
  onSave: (type: GuestTypeInfo) => void;
  onCancel: () => void;
  existingCodes: string[];
}

const GuestTypeForm: React.FC<GuestTypeFormProps> = ({ 
  guestType, 
  onSave, 
  onCancel,
  existingCodes 
}) => {
  const [formData, setFormData] = useState<GuestTypeInfo>(guestType);
  const [mealPattern, setMealPattern] = useState<string>(
    guestType.mealPattern?.join('\n') || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.code || !formData.name) {
      toast.error("Code and name are required");
      return;
    }
    
    // Check if code already exists
    if (!guestType.id && existingCodes.includes(formData.code)) {
      toast.error(`Guest type code ${formData.code} already exists`);
      return;
    }
    
    // Process meal pattern
    const processedPattern = mealPattern
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .filter(line => ['breakfast', 'lunch', 'dinner', 'snack'].includes(line)) as ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
    
    onSave({
      ...formData,
      mealPattern: processedPattern
    });
  };

  const handleCodeChange = (value: string) => {
    // Ensure the code value is capitalized and is a valid GuestTypeCode
    const capitalizedValue = value.toUpperCase();
    if (capitalizedValue && !['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'both'].includes(capitalizedValue)) {
      return;
    }
    
    setFormData(prev => ({ 
      ...prev, 
      code: capitalizedValue as GuestTypeCode 
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Type Code*</label>
          <Input 
            value={formData.code} 
            onChange={e => handleCodeChange(e.target.value)}
            className="mt-1"
            maxLength={1}
            placeholder="A-K"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Type Name*</label>
          <Input 
            value={formData.name} 
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1"
            placeholder="e.g., Guest A, Guest B"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Short Description*</label>
        <Input 
          value={formData.shortDescription || ''} 
          onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
          className="mt-1"
          placeholder="e.g., Breakfast and Lunch only"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Description*</label>
        <Input 
          value={formData.description || ''} 
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1"
          placeholder="e.g., Recreation guest"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Category*</label>
        <Select 
          value={formData.category || 'Crew'} 
          onValueChange={(value) => setFormData(prev => ({ 
            ...prev, 
            category: value as GuestTypeCategory
          }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Recreation">Recreation</SelectItem>
            <SelectItem value="Sport">Sport</SelectItem>
            <SelectItem value="Crew">Crew</SelectItem>
            <SelectItem value="Kids">Kids</SelectItem>
            <SelectItem value="Dietary">Dietary</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium">Meal Requirements (one per line)</label>
        <Textarea
          value={mealPattern}
          onChange={e => setMealPattern(e.target.value)}
          className="mt-1"
          placeholder="Only use: breakfast, lunch, dinner, snack (one per line)"
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Valid values: breakfast, lunch, dinner, snack
        </p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Guest Type
        </Button>
      </div>
    </form>
  );
};

export default GuestTypeForm;
