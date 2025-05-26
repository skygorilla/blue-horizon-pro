import React from 'react';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { MEAL_TYPE_ICONS } from '@/types/recipe/mealTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, Users, CalendarPlus, X, Printer, Heart } from 'lucide-react';
import CookModeView from '@/components/recipes/CookModeView';
import { useInventory } from '@/contexts/useInventory';

// Wrap MEAL_TYPE_ICONS in a React component for compatibility
const MealTypeIcon: React.FC<{ type: keyof typeof MEAL_TYPE_ICONS }> = ({ type }) => {
  const Icon = MEAL_TYPE_ICONS[type];
  return <Icon className="h-6 w-6" />;
};

interface RecipeDetailsProps {
  recipe: CompleteRecipe;
  onClose: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, onClose }) => {
  const { calculateRecipeCost } = useInventory();
  const recipeCost = calculateRecipeCost(recipe);

  const [activeTab, setActiveTab] = React.useState('ingredients');
  const [isCookMode, setIsCookMode] = React.useState(false);

  const handleEnterCookMode = () => {
    setIsCookMode(true);
  };

  const handleExitCookMode = () => {
    setIsCookMode(false);
  };

  const getMealTypeLabel = (type: string): string => {
    switch(type) {
      case 'starter': return 'Predjelo';
      case 'main': return 'Glavno jelo';
      case 'soup': return 'Juha';
      case 'side': return 'Prilog';
      case 'dessert': return 'Desert';
      case 'breakfast': return 'Doručak';
      case 'brunch': return 'Kasni doručak';
      case 'light-dinner': return 'Lagana večera';
      case 'beverage': return 'Piće';
      case 'snack': return 'Međuobrok';
      case 'sauce': return 'Umak';
      case 'baked': return 'Pekarski proizvod';
      case 'cocktail': return 'Koktel';
      case 'salad': return 'Salata';
      default: return type;
    }
  };

  const getTagLabel = (tag: string): string => {
    switch(tag) {
      case 'vegan': return 'Vegansko';
      case 'vegetarian': return 'Vegetarijansko';
      case 'gluten-free': return 'Bez glutena';
      case 'high-protein': return 'Visokoproteinski';
      case 'low-carb': return 'Nisko ugljikohidratno';
      case 'lactose-free': return 'Bez laktoze';
      case 'keto': return 'Keto';
      case 'paleo': return 'Paleo';
      case 'diabetic': return 'Dijabetičko';
      case 'halal': return 'Halal';
      case 'kosher': return 'Košer';
      case 'kid-friendly': return 'Prikladno za djecu';
      case 'gourmet': return 'Gurmanski';
      case 'street-food': return 'Ulična hrana';
      case 'quick': return 'Brza priprema';
      case 'zero-waste': return 'Bez otpada';
      case 'fermented': return 'Fermentirano';
      case 'traditional': return 'Tradicionalno';
      case 'fusion': return 'Fuzija';
      case 'spicy': return 'Ljuto';
      default: return tag;
    }
  };

  // Function to process ingredients text into separate lines
  const renderIngredients = () => {
    if (!recipe.ingredients || typeof recipe.ingredients !== 'string') {
      return <p>Nema dostupnih sastojaka.</p>;
    }

    return recipe.ingredients.split('\n').map((line, index) => (
      <div key={index} className="py-1.5">
        {line.trim() ? (
          <div className="flex items-start group">
            <span className="mr-2 text-primary">•</span>
            <span className="group-hover:text-primary transition-colors">{line}</span>
          </div>
        ) : (
          <div className="h-2"></div>
        )}
      </div>
    ));
  };

  // Function to process instructions text into separate steps
  const renderInstructions = () => {
    if (!recipe.instructions) return <p>Nema dostupnih uputa.</p>;
    
    return recipe.instructions.split('\n').map((line, index) => {
      if (!line.trim()) return <div key={index} className="h-3"></div>;
      
      // Check if it's a step (starts with a number or has "Step" in it)
      const isStep = /^(\d+\.|\d+\)|\d+|Step|Korak)/i.test(line.trim());
      
      return (
        <div key={index} className={`py-2 ${isStep ? 'font-medium text-primary' : ''}`}>
          {line}
        </div>
      );
    });
  };

  if (isCookMode) {
    return <CookModeView steps={recipe.instructions.split('\n')} onExit={handleExitCookMode} />;
  }

  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl mr-3">
            {recipe.mealType && <MealTypeIcon type={recipe.mealType} />}
          </div>
          <div>
            <DialogTitle className="text-xl">{recipe.title}</DialogTitle>
            <DialogDescription>
              {recipe.mealType && getMealTypeLabel(recipe.mealType)}
              {recipe.region && ` • ${recipe.region}`}
              {recipe.localCuisine && ` • ${recipe.localCuisine}`}
            </DialogDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </DialogHeader>
      
      <div className="my-4 flex flex-wrap gap-2">
        {recipe.tags?.map((tag, index) => (
          <Badge key={index} variant="secondary" className="capitalize">
            {getTagLabel(tag)}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center gap-5 mb-4 text-sm text-neutral-medium">
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          {recipe.prepTime} min priprema
          {recipe.cookTime && ` + ${recipe.cookTime} min kuhanje`}
        </div>
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4" />
          {recipe.servings} porcija
        </div>
        <div className="flex items-center">
          <span className="mr-1 font-semibold">Cost:</span>
          ${recipeCost.toFixed(2)}
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="ingredients">Sastojci</TabsTrigger>
          <TabsTrigger value="instructions">Upute za pripremu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ingredients" className="p-1">
          <div className="bg-neutral-light/50 p-4 rounded-md">
            {renderIngredients()}
          </div>
        </TabsContent>
        
        <TabsContent value="instructions" className="p-1">
          <div className="bg-neutral-light/50 p-4 rounded-md">
            {renderInstructions()}
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-6" />
      
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Ispis
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="mr-2 h-4 w-4" /> Favorit
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleEnterCookMode}>
            <Clock className="mr-2 h-4 w-4" /> Cook Mode
          </Button>
          <Button>
            <CalendarPlus className="mr-2 h-4 w-4" /> Dodaj u jelovnik
          </Button>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
