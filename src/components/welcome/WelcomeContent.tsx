
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChefHat, Calendar, ShoppingCart, Utensils, AnchorIcon } from 'lucide-react';
import FeatureCard from './FeatureCard';
import AboutModal from './AboutModal';

interface WelcomeContentProps {
  onShowLogin: () => void;
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({ onShowLogin }) => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-maritime-teal mb-4 font-playfair">
          Professional Maritime Meal Planning
        </h2>
        
        <p className="text-gray-700 mb-6 text-lg">
          Designed specifically for maritime crews, our interactive planning tools help you create 
          beautiful meal plans, track inventory, and manage provisioning – even while offline.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
          <FeatureCard 
            title="Visual Meal Editor" 
            icon={<Calendar className="h-8 w-8" />}
            description="Create your weekly meal plan visually using our interactive SVG editor with drag-and-drop simplicity"
            svgAccent="grid"
          />
          <FeatureCard 
            title="Recipe Collection" 
            icon={<ChefHat className="h-8 w-8" />}
            description="Store, categorize and organize your favorite recipes with custom SVG visualizations"
            svgAccent="dots"
          />
          <FeatureCard 
            title="Inventory Management" 
            icon={<ShoppingCart className="h-8 w-8" />}
            description="Track onboard supplies with interactive inventory tools that work offline for at-sea operations"
            svgAccent="wave"
          />
          <FeatureCard 
            title="Nutrition Insights" 
            icon={<Utensils className="h-8 w-8" />}
            description="Track nutrition with SVG charts that visualize calories and macronutrients in your meals"
            svgAccent="dots"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
          <Button 
            size="lg" 
            onClick={onShowLogin}
            className="w-full sm:w-auto bg-maritime-teal hover:bg-maritime-teal/90 text-white text-base px-8 py-6 h-auto"
          >
            Start Planning Your Meals
          </Button>
          
          <AboutModal>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto border-maritime-teal text-maritime-teal text-base px-8 py-6 h-auto"
            >
              About Blue Horizon Pro
            </Button>
          </AboutModal>
        </div>
      </div>
      
      {/* Footer branding */}
      <div className="text-center pt-10 border-t border-gray-200">
        <p className="text-gray-500 text-sm flex items-center justify-center">
          <span className="inline-block mr-2">
            <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16,8 L16,24 M10,12 L22,12 M8,24 C12,20 14,20 16,24 C18,20 20,20 24,24" 
                stroke="#00796B" strokeWidth="2" fill="none" 
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Blue Horizon Pro – Smart Meal & Inventory Planning for Maritime Operations
        </p>
      </div>
    </div>
  );
};

export default WelcomeContent;
