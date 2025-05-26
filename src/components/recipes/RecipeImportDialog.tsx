import React, { useState } from 'react';
import { useRecipes } from '@/contexts/RecipeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { toast } from 'sonner';
import { ImportDropzone } from './import/ImportDropzone';
import { ValidationResults } from './import/ValidationResults';
import { FormatExample } from './import/FormatExample';
import { validateRecipes, parseRecipeFile, ValidationResult } from '@/utils/recipes/import/recipeValidation';

interface RecipeImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecipesImported?: (recipes: CompleteRecipe[]) => void;
}

export const RecipeImportDialog: React.FC<RecipeImportDialogProps> = ({
  open,
  onOpenChange,
  onRecipesImported,
}) => {
  const { addRecipe, refetch } = useRecipes();
  const [importing, setImporting] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationResult>({ 
    valid: true, 
    errors: [],
    validRecipes: 0,
    totalRecipes: 0
  });
  const [importProgress, setImportProgress] = useState(0);

  const handleFileProcessing = async (file: File) => {
    setImporting(true);
    setValidationResults({ valid: true, errors: [], validRecipes: 0, totalRecipes: 0 });
    setImportProgress(0);
    
    try {
      const recipes = await parseRecipeFile(file);
      const results = validateRecipes(recipes);
      setValidationResults(results);
      
      if (results.validRecipes > 0) {
        if (results.errors.length > 0) {
          toast.warning(`${results.validRecipes} valid recipes found with ${results.errors.length} issues.`);
        } else {
          toast.success(`Successfully validated ${recipes.length} recipes`);
        }

        // Filter valid recipes and assert the type to CompleteRecipe[]
        const validRecipesToImport = recipes.filter((recipe, index) => {
          // Check if the recipe at this index had errors reported
          const recipeHeader = `Recipe ${index + 1}`;
          return !results.errors.some(err => err.startsWith(recipeHeader));
        }) as CompleteRecipe[];

        await importValidRecipes(validRecipesToImport);
      } else {
        toast.error('No valid recipes found. Please fix the errors and try again.');
      }
    } catch (err: unknown) { // Changed from any to unknown
      const message = (typeof err === 'object' && err !== null && 'message' in err) ? (err as { message: string }).message : 'Unknown import error';
      toast.error(`Import failed: ${message}`);
      setValidationResults({ 
        valid: false, 
        errors: [message],
        validRecipes: 0,
        totalRecipes: 0
      });
    }
    
    setImporting(false);
  };

  // Use CompleteRecipe[] for the type of validRecipes
  const importValidRecipes = async (validRecipes: CompleteRecipe[]) => {
    let importedCount = 0;
    let failedCount = 0;
    
    for (const recipe of validRecipes) {
      try {
        await addRecipe(recipe);
        importedCount++;
        setImportProgress(Math.round((importedCount / validRecipes.length) * 100));
      } catch (err) {
        console.error('Error importing recipe:', err);
        failedCount++;
      }
    }
    
    if (importedCount === validRecipes.length) {
      toast.success(`Successfully imported ${importedCount} recipes`);
    } else {
      toast.warning(`Imported ${importedCount} out of ${validRecipes.length} recipes (${failedCount} failed)`);
    }
    
    if (importedCount > 0) {
      onRecipesImported?.(validRecipes);
      refetch();
      
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileProcessing(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileProcessing(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Import Recipes (JSON/.jsonl)</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 p-2">
            <ImportDropzone 
              importing={importing}
              importProgress={importProgress}
              onFileSelect={handleFileSelect}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />

            <ValidationResults 
              validRecipes={validationResults.validRecipes}
              totalRecipes={validationResults.totalRecipes}
              errors={validationResults.errors}
            />

            <FormatExample />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeImportDialog;
