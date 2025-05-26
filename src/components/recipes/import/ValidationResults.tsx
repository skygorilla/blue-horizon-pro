
import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ValidationResultsProps {
  validRecipes: number;
  totalRecipes: number;
  errors: string[];
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({
  validRecipes,
  totalRecipes,
  errors
}) => {
  if (!validRecipes && !errors.length) return null;

  return (
    <>
      {validRecipes > 0 && totalRecipes > 0 && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              {validRecipes} of {totalRecipes} recipes valid
            </span>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <h4 className="text-red-800 font-medium">Validation Issues:</h4>
          </div>
          <pre className="text-xs text-red-700 whitespace-pre-wrap max-h-[200px] overflow-y-auto">
            {errors.join('\n')}
          </pre>
        </div>
      )}
    </>
  );
};
