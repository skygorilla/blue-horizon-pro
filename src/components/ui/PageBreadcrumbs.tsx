import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useUISettings } from '@/contexts/useUISettings';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth'; // Import useAuth
import { cn } from '@/lib/utils'; // Import cn

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const PageBreadcrumbs: React.FC<PageBreadcrumbsProps> = ({ items, className = '' }) => {
  const { touchMode } = useUISettings();
  const navigate = useNavigate();
  const { setActiveRole } = useAuth(); // Get setActiveRole from auth context

  // Handler to clear role and navigate to role selection
  const backToRoleSelect = () => {
    setActiveRole(null); // Clear the active role
    navigate('/role-select', { replace: true }); // Navigate to role select
  };
  
  if (items.length === 0) return null;
  
  return (
    <Breadcrumb className={cn(touchMode ? "py-2" : "py-1", className)}>
      <BreadcrumbList className={cn(
        touchMode ? "text-base" : "text-sm",
        // Apply theme-aware background for touch mode
        touchMode ? "bg-gray-200/50 dark:bg-gray-700/50 rounded-lg px-3 py-1" : ""
      )}>
        <BreadcrumbItem>
          {/* Primary text color should adapt via Tailwind config */}
          <button 
            onClick={backToRoleSelect} 
            className="cursor-pointer text-primary hover:text-primary/80"
          >
            <span className="whitespace-nowrap">Bridge</span>
          </button>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          {/* Apply theme-aware separator color */}
          <ChevronRight className={cn("h-3.5 w-3.5", "text-gray-400 dark:text-gray-500")} />
        </BreadcrumbSeparator>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast ? (
                  // Apply theme-aware text color for the current page
                  <BreadcrumbPage className={cn(
                    touchMode ? "font-medium" : "",
                    "text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  )}>
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    {/* Primary text color should adapt via Tailwind config */}
                    <Link to={item.path || '#'} className="text-primary/80 hover:text-primary whitespace-nowrap">{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  {/* Apply theme-aware separator color */}
                  <ChevronRight className={cn("h-3.5 w-3.5", "text-gray-400 dark:text-gray-500")} />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumbs;
