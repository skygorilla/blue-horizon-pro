import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Globe, Search, X, Map, ChevronLeft } from 'lucide-react';
import { Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { menuData, type MenuItemData } from '../data/menuData';
import { useDebounce } from '../hooks/use-debounce';
import { useSidebar } from '@/hooks/use-sidebar'; // Import useSidebar

// Add type for recent selection breadcrumbs
interface RecentSelection {
  name: string;
  timestamp: number;
}

// Removed addSidebarStyles function

const SideMenu: React.FC = () => {
  // Use the hook for sidebar state
  const {
    state: sidebarState, // 'expanded' | 'collapsed'
    toggleSidebar,
    openMobile,
    setOpenMobile,
    isMobile // Use isMobile from hook if needed, or keep local window check
  } = useSidebar();

  // Determine collapsed state from hook's state
  const isCollapsed = sidebarState === 'collapsed';

  // Local state for search and breadcrumbs remains
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<RecentSelection[]>([]);

  // State for price filtering and sorting
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'midrange' | 'premium'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handlePriceFilterChange = (filter: 'all' | 'budget' | 'midrange' | 'premium') => {
    setPriceFilter(filter);
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  // Close mobile menu on desktop resize (using hook's isMobile might be cleaner)
  useEffect(() => {
    const handleResize = () => {
      // Use window width check for now, but could potentially use hook's isMobile
      if (window.innerWidth >= 768) setOpenMobile(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpenMobile]); // Add setOpenMobile to dependency array

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setIsSearching(false);
  }, []);

  const handleItemSelect = useCallback((item: MenuItemData) => {
    setSelectedItem(item);
    if (!item.dropdown || item.dropdown.length === 0) {
      const newBreadcrumb = { name: item.name, timestamp: Date.now() };
      setBreadcrumbs(prev => {
        const updated = [newBreadcrumb, ...prev.filter(b => b.name !== item.name)];
        return updated.slice(0, 3);
      });
      // Use hook's setter for mobile state
      if (window.innerWidth < 768) { // Keep window check or use !isMobile from hook
         setOpenMobile(false);
      }
    }
  }, [setOpenMobile]); // Add setOpenMobile

  // Function to explicitly expand sidebar if needed (e.g., clicking search icon when collapsed)
  const expandSidebarIfNeeded = () => {
    if (isCollapsed) {
      toggleSidebar(); // toggleSidebar will expand if collapsed
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[1100] p-2 bg-white dark:bg-gray-700 rounded shadow text-gray-800 dark:text-gray-200"
        onClick={() => setOpenMobile(true)} // Use hook's setter
        aria-label="Open menu"
        aria-expanded={openMobile} // Use hook's state
      >
        <MenuIcon size={24} />
      </button>

      {/* Mobile Overlay */}
      {openMobile && ( // Use hook's state
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1000] md:hidden"
          onClick={() => setOpenMobile(false)} // Use hook's setter
          role="presentation"
        />
      )}

      {/* Sidebar Navigation */}
      <nav
        className={`fixed inset-y-0 left-0 z-[1100] transform transition-all duration-300 ease-in-out
          ${openMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'w-[60px]' : 'w-[300px]'}
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          shadow-md flex flex-col overflow-hidden
          ${isCollapsed ? 'cursor-pointer' : 'cursor-default'}`}
        role="navigation"
        aria-label="Main navigation"
        onClick={isCollapsed ? expandSidebarIfNeeded : undefined} // Expand on click when collapsed
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`menu-header flex-shrink-0 flex flex-col
            ${isCollapsed ? 'p-5 items-center' : 'p-5 items-start'}
            border-b border-gray-100 dark:border-gray-700
            bg-gray-50 dark:bg-gray-850`} // Slightly different dark bg for header
        >
          {/* Logo/Title */}
          <div
            className={`flex items-center gap-2.5 mb-4 w-full
              ${isCollapsed ? 'justify-center cursor-pointer' : 'justify-start cursor-default'}`}
            onClick={isCollapsed ? expandSidebarIfNeeded : undefined}
          >
            <Map size={20} className="text-blue-500 dark:text-blue-400" />
            {!isCollapsed && (
              <h3 className="m-0 text-lg font-semibold text-gray-800 dark:text-gray-100">
                Geographic Navigator
              </h3>
            )}
          </div>

          {/* Search Input (Expanded) */}
          {!isCollapsed && (
            <div
              className={`relative flex items-center w-full rounded-lg px-3 py-2
                bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                transition-all duration-200 ${isSearching ? 'shadow-md ring-2 ring-blue-300 dark:ring-blue-500' : ''}`}
              role="search"
            >
              <Search size={16} className="mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
              <input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsSearching(true)}
                onBlur={() => !searchTerm && setIsSearching(false)}
                className="border-none outline-none w-full text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                aria-label="Search locations"
              />
              {searchTerm && (
                <AnimatePresence>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearSearch}
                    className="bg-transparent border-none cursor-pointer flex p-0 ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </motion.button>
                </AnimatePresence>
              )}
            </div>
          )}

          {/* Search Icon (Collapsed) */}
          {isCollapsed && (
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering nav's onClick
                expandSidebarIfNeeded(); // Expand sidebar
              }}
              aria-label="Expand sidebar and search"
            >
              <Search size={20} className="text-blue-500 dark:text-blue-400" />
            </div>
          )}
        </motion.div>

        {/* Recent Selections */}
        {!isCollapsed && (
          <AnimatePresence>
            {breadcrumbs.length > 0 && !searchTerm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-750 overflow-hidden"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-left">Recent Selections</div>
                <div className="flex flex-wrap gap-1.5 justify-start">
                  {breadcrumbs.map((item, idx) => (
                    <motion.div
                      key={item.timestamp}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center gap-1"
                    >
                      <MapPin size={12} />
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Price Filter Section */}
        {!isCollapsed && (
          <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-750">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Filter by Price</div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'budget' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => handlePriceFilterChange('budget')}
              >
                Budget
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'midrange' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => handlePriceFilterChange('midrange')}
              >
                Midrange
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'premium' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => handlePriceFilterChange('premium')}
              >
                Premium
              </button>
            </div>
          </div>
        )}

        {/* Sort Order Section */}
        {!isCollapsed && (
          <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-750">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sort by Price</div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => handleSortOrderChange('asc')}
              >
                Low to High
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => handleSortOrderChange('desc')}
              >
                High to Low
              </button>
            </div>
          </div>
        )}

        {/* Menu Content */}
        <div
          className={`menu-content flex-grow overflow-y-auto overflow-x-hidden ${isCollapsed ? 'py-2.5' : 'py-2.5'}`}
          role="tree"
        >
          {menuData
            .filter(item => {
              if (priceFilter === 'budget') return item.price && item.price < 10;
              if (priceFilter === 'midrange') return item.price && item.price >= 10 && item.price <= 20;
              if (priceFilter === 'premium') return item.price && item.price > 20;
              return true;
            })
            .sort((a, b) => {
              if (sortOrder === 'asc') return (a.price || 0) - (b.price || 0);
              return (b.price || 0) - (a.price || 0);
            })
            .map((item, idx) => (
              <MenuItem
                key={`${idx}-${item.name}`}
                item={item}
                depth={0}
                onItemClick={handleItemSelect}
                isFirstItem={idx === 0}
                isLastItem={idx === menuData.length - 1}
                searchTerm={debouncedSearchTerm}
                isCollapsed={isCollapsed} // Pass the derived boolean
                price={item.price}
              />
            ))}
        </div>

        {/* Selected Item Display */}
        {!isCollapsed && (
          <AnimatePresence>
            {selectedItem && !selectedItem.dropdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="selection-info px-5 py-4 border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-750"
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1.5">Selected Location</div>
                <div
                  className="text-blue-600 dark:text-blue-300 font-semibold flex items-center gap-2 text-[15px]"
                >
                  <MapPin size={16} />
                  {selectedItem.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Footer Collapse Button */}
        <div
          className="flex-shrink-0 p-2.5 border-t border-gray-200 dark:border-gray-700 flex justify-center"
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering nav's onClick
              toggleSidebar(); // Use hook's toggle function
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            className="bg-transparent border-none cursor-pointer text-gray-500 dark:text-gray-400 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          >
            <ChevronLeft size={20} />
          </motion.button>
        </div>
      </nav>
    </>
  );
};

export default SideMenu;