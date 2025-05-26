import React from 'react';
import { useUISettings } from '@/contexts/UISettingsContext';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { cn } from '@/lib/utils'; // Import cn

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems: Array<{ label: string; path?: string }>;
  showBreadcrumbs: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  breadcrumbItems,
  showBreadcrumbs
}) => {
  const { touchMode } = useUISettings();
  
  return (
    // Apply theme-aware background and potentially adjust wave-border if needed
    <div className={cn(
      `px-4 flex flex-col sm:flex-row sm:items-center relative wave-border`,
      touchMode ? 'py-3' : 'py-2',
      'bg-gray-100 dark:bg-gray-700/50' // Theme-aware background
    )}>
      <div>
        {/* Apply theme-aware text color */}
        <h1 className={cn(
          `font-medium font-playfair`,
          touchMode ? 'text-lg' : 'text-base',
          'text-gray-800 dark:text-white' // Theme-aware text
        )}>
          {title}
        </h1>
        {description && (
          // Apply theme-aware description text color
          <p className={cn(
            touchMode ? 'text-sm mt-1' : 'text-xs mt-0.5',
            'text-gray-600 dark:text-gray-300' // Theme-aware description text
          )}>
            {description}
          </p>
        )}
      </div>
      {showBreadcrumbs && breadcrumbItems.length > 0 && (
        <div className="mt-2 sm:mt-0 sm:ml-auto">
          {/* PageBreadcrumbs will handle its own theme */}
          <PageBreadcrumbs items={breadcrumbItems} />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
