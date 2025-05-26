import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompleteRecipe } from '@/types/recipe/recipeTypes';
import { Clock, Users, ChefHat, Heart, Eye, Plus } from 'lucide-react';

const AnimatedRecipeCard = ({ recipe, onClick }) => {
  const [isLiked, setIsLiked] = useState(recipe.isFavorite || false);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col h-full"
      whileHover={{ scale: 1.02 }}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video">
        <img
          src={recipe.imageUrl || '/placeholder.svg'}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <button
          className={`absolute top-3 left-3 bg-white p-2 rounded-full shadow-md ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          onClick={handleToggleFavorite}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <Badge className="absolute top-3 right-3 bg-blue-100 text-blue-800">
          {recipe.mealType}
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          {recipe.prepTimeMinutes && (
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4 text-gray-400" />
              {recipe.prepTimeMinutes} min
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-gray-400" />
              {recipe.servings} servings
            </div>
          )}
          {recipe.difficulty && (
            <div className="flex items-center capitalize">
              <ChefHat className="mr-1 h-4 w-4 text-gray-400" />
              {recipe.difficulty}
            </div>
          )}
        </div>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick(recipe);
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Add to meal plan logic here
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add to Plan
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedRecipeCard;