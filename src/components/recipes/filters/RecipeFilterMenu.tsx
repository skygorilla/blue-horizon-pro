import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterItem {
  name: string;
  dropdown?: FilterItem[] | string[];
}

interface RecipeFilterMenuProps {
  filters: {
    [key: string]: FilterItem[] | string[]; // Use more specific type instead of any
  };
  onFilterSelect: (category: string, item: string) => void;
  onClearFilters: () => void;
  selectedFilters: {
    category: string;
    item: string;
  }[];
}

const menuAnimation = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1,
    height: 'auto',
    transition: { 
      duration: 0.3,
      ease: "easeInOut" 
    }
  },
  exit: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.02,
    x: 3,
    transition: { duration: 0.1 }
  }
};

const RecipeFilterMenu: React.FC<RecipeFilterMenuProps> = ({ 
  filters, 
  onFilterSelect, 
  onClearFilters,
  selectedFilters 
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const toggleSubmenu = (path: string) => {
    setOpenSubmenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path) 
        : [...prev, path]
    );
  };
  
  const handleSelection = (category: string, item: string) => {
    onFilterSelect(category, item);
  };
  
  const isSelected = (category: string, item: string) => {
    return selectedFilters.some(filter => 
      filter.category === category && filter.item === item
    );
  };

  // Recursive component to render nested menu items
  const renderSubmenu = (
    items: (FilterItem | string)[] | undefined, // Use more specific type instead of any[]
    category: string, 
    parentPath: string = ''
  ) => {
    if (!items) return null;
    
    return (
      <motion.div 
        className="pl-4 border-l border-gray-100"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuAnimation}
      >
        {items.map((item, index) => {
          const isObject = typeof item === 'object';
          const itemName = isObject ? item.name : item;
          const hasDropdown = isObject && item.dropdown;
          const currentPath = parentPath ? `${parentPath}.${itemName}` : itemName;
          const isItemOpen = openSubmenus.includes(currentPath);
          
          return (
            <div key={`${currentPath}-${index}`}>
              <motion.div 
                className={`flex items-center py-1.5 group cursor-pointer ${
                  isSelected(category, itemName) ? 'text-primary font-medium' : 'text-gray-700'
                }`}
                variants={itemAnimation}
                whileHover="hover"
                onClick={() => {
                  if (hasDropdown) {
                    toggleSubmenu(currentPath);
                  } else {
                    handleSelection(category, itemName);
                  }
                }}
              >
                {hasDropdown ? (
                  <ChevronRight 
                    className={`h-3.5 w-3.5 mr-1.5 text-gray-400 group-hover:text-primary transition-transform ${
                      isItemOpen ? 'rotate-90' : ''
                    }`}
                  />
                ) : (
                  <div className="h-3.5 w-3.5 mr-1.5 relative">
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: isSelected(category, itemName) ? 1 : 0,
                        opacity: isSelected(category, itemName) ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-2 w-2 bg-primary rounded-full" />
                    </motion.div>
                  </div>
                )}
                <span className="text-sm group-hover:text-primary transition-colors">
                  {itemName}
                </span>
              </motion.div>
              
              {hasDropdown && (
                <AnimatePresence>
                  {isItemOpen && renderSubmenu(item.dropdown, category, currentPath)}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Recipe Filters</h3>
        {selectedFilters.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-xs text-primary hover:text-primary-dark hover:bg-primary-lighter"
          >
            Clear all
          </Button>
        )}
      </div>
      
      {/* Selected filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedFilters.map((filter, index) => (
            <motion.div
              key={`${filter.category}-${filter.item}-${index}`}
              initial={{ opacity: 0, scale: 0.8, backgroundColor: "rgba(91, 150, 247, 0)" }} // Define initial transparent BG using RGBA
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-primary-lighter text-primary text-xs rounded-full px-3 py-1 flex items-center gap-1"
            >
              <span className="text-primary-dark font-medium">{filter.category}:</span> {filter.item}
              <button 
                onClick={() => handleSelection(filter.category, filter.item)}
                className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Categories */}
      <div className="space-y-1">
        {Object.entries(filters).map(([category, items]) => (
          <div key={category} className="border-b border-gray-100 last:border-0 py-1.5">
            <motion.div 
              className="flex items-center justify-between py-1.5 cursor-pointer group"
              whileHover={{ x: 2 }}
              onClick={() => toggleCategory(category)}
            >
              <span className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                {category}
              </span>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 transition-transform group-hover:text-primary ${
                  openCategories.includes(category) ? 'rotate-180' : ''
                }`}
              />
            </motion.div>
            
            <AnimatePresence>
              {openCategories.includes(category) && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuAnimation}
                >
                  {renderSubmenu(items, category)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilterMenu;