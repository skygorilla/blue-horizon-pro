import React from 'react';
import { GUEST_TYPES } from '@/types/mealPlanTypes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  UserCircle, 
  Users, 
  CoffeeIcon, 
  UtensilsCrossed, 
  ChefHat, 
  Baby, 
  Salad,
  Vegan,
  Wheat,
  AlertCircle,
  Footprints,
  MapPin,
  Bike,
  Ship 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MealPattern } from '@/types/guest/guestTypes';

const getIconForGuestType = (code: string, category?: string) => {
  if (category === 'Recreation') return <MapPin className="h-5 w-5 text-green-500" />;
  if (category === 'Sport') return <Bike className="h-5 w-5 text-blue-500" />;
  if (category === 'Crew') return <Ship className="h-5 w-5 text-purple-500" />;
  if (category === 'Kids') return <Baby className="h-5 w-5 text-pink-500" />;
  if (category === 'Travel') return <Footprints className="h-5 w-5 text-sky-500" />;
  
  // Dietary icons based on code
  switch(code) {
    case 'E': return <Salad className="h-5 w-5 text-green-600" />;
    case 'F': return <Vegan className="h-5 w-5 text-green-700" />;
    case 'G': return <Wheat className="h-5 w-5 text-amber-500" />;
    case 'H': return <AlertCircle className="h-5 w-5 text-red-500" />;
    default: return <Users className="h-5 w-5 text-gray-400" />;
  }
};

const getMealIcons = (mealPattern?: MealPattern[]) => {
  if (!mealPattern || mealPattern.length === 0) {
    return <div className="flex space-x-2"></div>;
  }
  
  const hasBreakfast = mealPattern.includes('breakfast');
  const hasLunch = mealPattern.includes('lunch');
  const hasDinner = mealPattern.includes('dinner');
  const hasSnack = mealPattern.includes('snack');
  
  return (
    <div className="flex space-x-2">
      {hasBreakfast && <CoffeeIcon className={`h-4 w-4 ${hasBreakfast ? 'text-amber-500' : 'text-gray-300'}`} />}
      {hasLunch && <UtensilsCrossed className={`h-4 w-4 ${hasLunch ? 'text-blue-500' : 'text-gray-300'}`} />}
      {hasDinner && <ChefHat className={`h-4 w-4 ${hasDinner ? 'text-purple-500' : 'text-gray-300'}`} />}
      {hasSnack && <UserCircle className={`h-4 w-4 ${hasSnack ? 'text-green-500' : 'text-gray-300'}`} />}
    </div>
  );
};

const getCategoryBadge = (category?: string) => {
  if (!category) return null;
  
  const colors: Record<string, string> = {
    'Recreation': 'bg-green-100 text-green-800',
    'Sport': 'bg-blue-100 text-blue-800',
    'Crew': 'bg-purple-100 text-purple-800',
    'Kids': 'bg-pink-100 text-pink-800',
    'Dietary': 'bg-amber-100 text-amber-800',
    'Travel': 'bg-sky-100 text-sky-800'
  };
  
  return (
    <Badge variant="outline" className={colors[category] || 'bg-gray-100 text-gray-800'}>
      {category}
    </Badge>
  );
};

const GuestTypesList = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Guest Types List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Code</TableHead>
              <TableHead>Guest Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Meals</TableHead>
              <TableHead className="w-[100px]">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GUEST_TYPES.filter(type => type.code !== 'both').map((type) => (
              <TableRow key={type.code}>
                <TableCell className="font-medium flex items-center">
                  <div className="mr-2">{getIconForGuestType(type.code, type.category)}</div>
                  {type.code}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-xs text-muted-foreground">{type.shortDescription || type.description}</div>
                </TableCell>
                <TableCell>{type.description}</TableCell>
                <TableCell>{getMealIcons(type.mealPattern)}</TableCell>
                <TableCell>{getCategoryBadge(type.category)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GuestTypesList;
