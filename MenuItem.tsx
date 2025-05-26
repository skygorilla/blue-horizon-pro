import React, { useState, useEffect, isValidElement } from 'react'; // Import isValidElement
import { ChevronRight, type LucideProps } from 'lucide-react'; // Add import for LucideProps
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItemData } from '../data/menuData';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  item: MenuItemData;
  depth: number;
  onItemClick: (item: MenuItemData) => void;
  isLastItem: boolean;
  isFirstItem: boolean;
  searchTerm: string;
  isCollapsed?: boolean;
  price?: number; // Optional price field
}

export const MenuItem: React.FC<MenuItemProps> = React.memo(({
  item,
  depth,
  onItemClick,
  isFirstItem,
  isLastItem,
  searchTerm,
  isCollapsed = false,
  price
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasDropdown = item.dropdown && item.dropdown.length > 0;

  const matchesSearch = !searchTerm ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hasDropdown && item.dropdown.some(child =>
      child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child.dropdown && child.dropdown.some(subChild =>
        subChild.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    ));

  useEffect(() => {
    if (searchTerm && hasDropdown &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.dropdown.some(child =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (child.dropdown && child.dropdown.some(subChild =>
            subChild.name.toLowerCase().includes(searchTerm.toLowerCase())
          ))
        ))) {
      setIsOpen(true);
    } else if (searchTerm === '') {
      setIsOpen(false);
    }
  }, [searchTerm, item, hasDropdown]);

  if (!matchesSearch) return null;
  if (isCollapsed && depth > 0) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDropdown) {
      setIsOpen(!isOpen);
    }
    onItemClick(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  const hoverBgClasses = 'hover:bg-blue-50 dark:hover:bg-gray-700';
  const baseClasses = `menu-item flex items-center relative text-sm cursor-pointer overflow-hidden transition-colors duration-200 group ${hoverBgClasses}`;
  const collapsedClasses = isCollapsed ? 'p-2.5 justify-center my-1' : 'px-4 py-2.5 mx-2 justify-between rounded-md';
  const textClasses = isOpen
    ? 'font-semibold text-blue-600 dark:text-blue-400'
    : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400';

  return (
    <>
      <motion.div
        className={cn(
          baseClasses,
          collapsedClasses,
          textClasses,
          hasDropdown ? 'has-dropdown' : '',
          isOpen ? 'open' : ''
        )}
        style={{ paddingLeft: isCollapsed ? undefined : `${depth * 16 + 16}px` }}
        initial={{ opacity: 0.8, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 24 }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={hasDropdown ? 'button' : 'treeitem'}
        tabIndex={0}
        aria-expanded={hasDropdown ? isOpen : undefined}
        aria-selected={!hasDropdown && isOpen}
      >
        {!isCollapsed && (
          <motion.div
            className="absolute left-0 w-1 h-[70%] rounded-r-md bg-blue-500 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            initial={{ height: 0 }}
            animate={{ height: '70%' }}
          />
        )}

        <div className={cn(
          "flex items-center overflow-hidden",
          isCollapsed ? 'justify-center gap-0' : 'justify-start gap-2.5 flex-grow'
        )}>
          {item.icon && isValidElement(item.icon) ? (
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center flex-shrink-0"
            >
              {React.cloneElement(item.icon as React.ReactElement<LucideProps>, { size: isCollapsed ? 22 : 18 })}
            </motion.div>
          ) : (
            depth > 0 && !isCollapsed &&
            <motion.div
              className={cn(
                "w-1.5 h-1.5 rounded-full flex-shrink-0 mx-[7px]",
                isOpen ? 'bg-blue-500 dark:bg-blue-400'
                       : 'bg-gray-400 dark:bg-gray-500 group-hover:bg-blue-500 dark:group-hover:bg-blue-400'
              )}
            />
          )}

          {!isCollapsed && (
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {item.name}
            </span>
          )}

          {!isCollapsed && price && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {hasDropdown && !isCollapsed && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-2"
          >
            <ChevronRight size={16} />
          </motion.div>
        )}
      </motion.div>

      {hasDropdown && !isCollapsed && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="submenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden relative pl-4"
              role="group"
              aria-label={`${item.name} submenu`}
            >
              {item.dropdown.map((dropdownItem, idx) => (
                <MenuItem
                  key={`${depth}-${idx}-${dropdownItem.name}`}
                  item={dropdownItem}
                  depth={depth + 1}
                  onItemClick={onItemClick}
                  isFirstItem={idx === 0}
                  isLastItem={idx === item.dropdown.length - 1}
                  searchTerm={searchTerm}
                  isCollapsed={isCollapsed}
                  price={dropdownItem.price}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
});