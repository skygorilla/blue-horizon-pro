import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MenuPlan, Recipe, GuestTypeInfo, GuestTypeCode } from '@/types/mealPlanTypes';

interface WeeklyMealPlannerProps {
  plan: MenuPlan;
  recipes: Recipe[];
  onAssignRecipe: (dayOfWeek: number, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => void;
  isLoading: boolean;
  findSuitableRecipes: (mealType: 'breakfast' | 'lunch' | 'dinner', guestTypes: GuestTypeCode[]) => Recipe[];
  guestTypes: GuestTypeInfo[];
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

const WeeklyMealPlanner: React.FC<WeeklyMealPlannerProps> = ({ 
  plan, 
  recipes, 
  onAssignRecipe, 
  isLoading, 
  findSuitableRecipes,
  guestTypes
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Find the recipe for a specific day and meal
  const getRecipeForMeal = (day: number, mealType: 'breakfast' | 'lunch' | 'dinner'): Recipe | undefined => {
    // Safely access plan.mealAssignments with a fallback to an empty array
    const mealAssignments = plan?.mealAssignments || [];
    
    const assignment = mealAssignments.find(ma => ma.dayOfWeek === day && ma.mealType === mealType);
    if (!assignment) return undefined;
    
    return recipes.find(r => r.id === assignment.recipeId);
  };

  // Open recipe selection dialog
  const openRecipeDialog = (day: number, meal: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setSearchQuery('');
    setDialogOpen(true);
  };

  // Handle recipe selection
  const handleSelectRecipe = (recipeId: string) => {
    if (selectedDay !== null && selectedMeal !== null) {
      onAssignRecipe(selectedDay, selectedMeal, recipeId);
      setDialogOpen(false);
    }
  };

  // Get active guest types
  const getActiveGuestTypes = () => {
    // Safely access plan.guestCounts with a fallback to an empty array
    const guestCounts = plan?.guestCounts || [];
    
    return guestCounts
      .filter(gc => gc.count > 0)
      .map(gc => {
        const foundGuestType = guestTypes.find(gt => gt.id === gc.guestTypeId);
        return foundGuestType?.code || gc.guestTypeCode;
      }) as GuestTypeCode[];
  };

  // Filter recipes based on search and meal compatibility
  const filteredRecipes = () => {
    if (!selectedMeal) return [];
    
    // Get recipes suitable for this meal type and active guest types
    const suitableRecipes = findSuitableRecipes(selectedMeal, getActiveGuestTypes());
    
    // Apply search filter if any
    if (!searchQuery) return suitableRecipes;
    
    const query = searchQuery.toLowerCase();
    return suitableRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query) || 
      recipe.ingredients.toLowerCase().includes(query)
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Day</TableHead>
              <TableHead>Breakfast</TableHead>
              <TableHead>Lunch</TableHead>
              <TableHead>Dinner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {daysOfWeek.map((day, index) => (
              <TableRow key={day}>
                <TableCell className="font-medium">{day}</TableCell>
                {mealTypes.map(mealType => {
                  const recipe = getRecipeForMeal(index, mealType);
                  return (
                    <TableCell key={`${day}-${mealType}`}>
                      {recipe ? (
                        <div className="flex justify-between items-center">
                          <span>{recipe.title}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openRecipeDialog(index, mealType)}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-muted-foreground"
                          onClick={() => openRecipeDialog(index, mealType)}
                        >
                          + Assign Recipe
                        </Button>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Recipe Selection Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                Select {selectedMeal?.charAt(0).toUpperCase() + selectedMeal?.slice(1)} Recipe for {selectedDay !== null ? daysOfWeek[selectedDay] : ''}
              </DialogTitle>
            </DialogHeader>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center p-4">
                <p>Loading recipes...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto p-1">
                {filteredRecipes().map(recipe => (
                  <Card 
                    key={recipe.id} 
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSelectRecipe(recipe.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">{recipe.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        For: {recipe.guestType === 'both' ? 'All guests' : `Type ${recipe.guestType}`}
                      </p>
                      {recipe.servings && (
                        <p className="text-sm text-muted-foreground">
                          Serves: {recipe.servings}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {filteredRecipes().length === 0 && (
                  <div className="col-span-3 text-center p-4 text-muted-foreground">
                    No recipes found. Try adjusting your search or create a new recipe.
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default WeeklyMealPlanner;
