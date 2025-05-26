import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Leaf, Utensils, Share2, Printer, PlusCircle } from 'lucide-react';
import { CompleteRecipe } from '@/types/recipe/recipeTypes'; // Import CompleteRecipe

interface RecipeDisplayProps {
  recipe: CompleteRecipe; // Use CompleteRecipe
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const [isPlannerModalOpen, setIsPlannerModalOpen] = useState(false);

  const currentRecipe = recipe;

  const handleAddToPlanClick = () => {
    setIsPlannerModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPlannerModalOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto my-4">
        <CardHeader>
          <CardTitle>{currentRecipe.title}</CardTitle>
          <CardDescription>{currentRecipe.description}</CardDescription>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleAddToPlanClick}
              className="text-sm p-2 hover:bg-muted rounded flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" /> Save to Meal Plan
            </button>
            <button className="text-sm p-2 hover:bg-muted rounded flex items-center gap-1">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="text-sm p-2 hover:bg-muted rounded flex items-center gap-1">
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div>
            {currentRecipe.tags?.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
            {currentRecipe.region && <Badge>{currentRecipe.region}</Badge>}
            {currentRecipe.localCuisine && <Badge>{currentRecipe.localCuisine}</Badge>}
          </div>
          <div>
            <Clock /> {currentRecipe.prepTime} min
            {currentRecipe.cookTime && ` + ${currentRecipe.cookTime} min cook`}
            <Users /> {currentRecipe.servings} servings
            {currentRecipe.isVegetarian && <Leaf />}
          </div>
        </CardContent>
      </Card>

      {isPlannerModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            border: '1px solid black',
            zIndex: 1000,
          }}
        >
          <h2>Add "{currentRecipe.title}" to Meal Plan</h2>
          <p>Placeholder: Select Week, Day, Meal Type here.</p>
          <button onClick={handleCloseModal} style={{ marginRight: '10px' }}>
            Cancel
          </button>
          <button
            onClick={() => {
              handleCloseModal();
            }}
          >
            Save to Plan
          </button>
        </div>
      )}
    </>
  );
};

export default RecipeDisplay;