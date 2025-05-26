import RecipeForm from '@/components/dashboard/recipe/RecipeForm';
import ConsoleLogger from '@/components/debug/ConsoleLogger'; // Import the ConsoleLogger component
import LogViewer from '@/components/debug/LogViewer';
import { getBreadcrumbItems } from '@/components/header/utils/headerUtils';
import MainLayout from '@/components/MainLayout';
import GuestTypesList from '@/components/recipes/GuestTypesList';
import PreProvisioningPlanner from '@/components/recipes/PreProvisioningPlanner';
import RecipeDetails from '@/components/recipes/RecipeDetails';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import RecipeImportDialog from '@/components/recipes/RecipeImportDialog';
import RecipeList from '@/components/recipes/RecipeList';
import VoyageBudgetPlanner from '@/components/recipes/VoyageBudgetPlanner';
import SideMenu from '@/components/SideMenu';
import BackButton from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import Center from '@/components/ui/Center'; // Import the Center component
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { PageHeader } from '@/components/ui/section-header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortPricingProvider } from '@/contexts/PortPricingContext'; // Add import for PortPricingProvider
import { useDebounce } from '@/hooks/use-debounce';
import { useSidebar } from '@/hooks/use-sidebar';
import { MealType } from '@/types/recipe/mealTypes';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { useFetchRecipes, useRecipeFilters } from '@/utils/recipes/recipeHooks';
import { CookingPot, Plus, RefreshCw, Search, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RecipesPage: React.FC = () => {
  // Add console log for debugging
  console.debug("RecipesPage: Component rendering");
  
  const { recipes: fetchedRecipes, isLoading, refetch } = useFetchRecipes();
  const [recipes, setRecipes] = useState<CompleteRecipe[]>([]);

  useEffect(() => {
    console.debug("RecipesPage: fetchedRecipes changed", { 
      count: fetchedRecipes?.length || 0, 
      isLoading 
    });
    
    if (fetchedRecipes) {
      setRecipes(fetchedRecipes as CompleteRecipe[]);
    } else {
      setRecipes([]);
    }
  }, [fetchedRecipes, isLoading]);

  const {
    filters,
    filteredRecipes,
    setSearchQuery,
    resetFilters,
    toggleMealType,
  } = useRecipeFilters(recipes);

  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('grid');
  const [showNewRecipeDialog, setShowNewRecipeDialog] = useState(false);
  const [showGuestTypesDialog, setShowGuestTypesDialog] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<CompleteRecipe | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const { state } = useSidebar(); // Updated to use `state` instead of `sidebarState`
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedSearchQuery = useDebounce(filters.search, 300);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const allIngredients = ['chicken', 'beef', 'carrot', 'onion', 'garlic', 'tomato', 'potato'];
      const filteredSuggestions = allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleNewRecipeComplete = () => {
    setShowNewRecipeDialog(false);
    refetch();
  };

  const handleRecipeClick = (recipe: CompleteRecipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  const handleRecipesImported = (importedRecipes: CompleteRecipe[]) => {
    console.log('Recipes available for import:', importedRecipes);
    refetch();
    toast.success(`${importedRecipes.length} recipes successfully imported`);
  };

  const handleToggleMealType = (type: MealType) => {
    toggleMealType(type);
  };

  if (fetchedRecipes.length === 0 && !isLoading) {
    return (
      <MainLayout>
        <Center className="p-6">
          <div className="text-center">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">
                No recipes found. Please try refreshing.
              </span>
            </div>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </Center>
      </MainLayout>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <SideMenu />
      <main
        className={`flex-1 h-full overflow-y-auto transition-all duration-300 ease-in-out ${
          state === 'expanded' ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        <div className="p-4 md:p-6 max-w-full">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <BackButton to="/dashboard" label="Return to Dashboard" />
            <div className="sm:block">
              <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
            </div>
          </div>

          <PageHeader
            title="Recipes"
            description="Search and filter recipes by ingredients, meal type, and dietary requirements"
            icon={<CookingPot />}
            className="text-primary"
          />

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark" size={18} />
              <Input
                placeholder="Search recipes..."
                className="pl-10 w-full"
                value={filters.search}
                onChange={handleSearch}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-md mt-1 w-full">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowGuestTypesDialog(true)}>
                <Users className="mr-2 h-4 w-4" />
                Guest Types
              </Button>
              <Button size="sm" onClick={() => setShowNewRecipeDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Recipe
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowImportDialog(true)}>
                Import
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: 'Vegetarian', value: 'vegetarian' as MealType },
              { label: 'Quick Meals', value: 'quick-meals' as MealType },
              { label: 'High Protein', value: 'high-protein' as MealType },
              { label: 'Low Carb', value: 'low-carb' as MealType },
              { label: 'Desserts', value: 'desserts' as MealType },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                onClick={() => handleToggleMealType(filter.value)}
                className="capitalize"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 w-full">
              <div className="mb-6">
                <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'grid')}>
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="bg-background rounded-lg shadow-sm p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-neutral-medium">Loading recipes...</p>
                  </div>
                ) : (
                  <>
                    {viewMode === 'list' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <RecipeList recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
                      </div>
                    ) : (
                      <RecipeGrid
                        recipes={filteredRecipes}
                        searchQuery={filters.search}
                        onRecipeClick={handleRecipeClick}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <PortPricingProvider>
              <PreProvisioningPlanner />
            </PortPricingProvider>
          </div>

          <div className="mt-8">
            <VoyageBudgetPlanner />
          </div>
        </div>

        {/* Add LogViewer at the end */}
        <LogViewer />

        {/* Add ConsoleLogger component */}
        <ConsoleLogger />
      </main>

      <Dialog open={showNewRecipeDialog} onOpenChange={setShowNewRecipeDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Recipe</DialogTitle>
          </DialogHeader>
          <RecipeForm onComplete={handleNewRecipeComplete} />
        </DialogContent>
      </Dialog>

      <Dialog open={showGuestTypesDialog} onOpenChange={setShowGuestTypesDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Guest Types</DialogTitle>
          </DialogHeader>
          <GuestTypesList />
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <RecipeDetails recipe={selectedRecipe} onClose={handleCloseRecipeDetails} />
          )}
        </DialogContent>
      </Dialog>
      <RecipeImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onRecipesImported={handleRecipesImported}
      />
    </div>
  );
};

export default RecipesPage;
