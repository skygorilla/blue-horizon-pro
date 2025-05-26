import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth'; // Corrected import path
import { Settings } from 'lucide-react';
import AboutModal from './welcome/AboutModal';
import HeaderLogo from './header/HeaderLogo';
import HeaderActions from './header/HeaderActions';
import PageHeader from './header/PageHeader';
import { getPageTitle, getScreenPurpose, getBreadcrumbItems } from './header/utils/headerUtils';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const location = useLocation();
  
  const pageTitle = getPageTitle(location.pathname);
  const screenPurpose = getScreenPurpose(location.pathname);
  const breadcrumbItems = getBreadcrumbItems(location.pathname);
  const showBackButton = location.pathname !== '/dashboard' && location.pathname !== '/';
  const showPageHeader = location.pathname !== '/dashboard';
  
  if (!user) return null;
  
  return (
    <header className="bg-maritime-navy text-white shadow-md dark:bg-gray-800 dark:text-gray-100"> {/* Added dark mode styles */}
      <div className="container mx-auto">
        {/* Main header with logo and controls */}
        <div className="py-2 px-4 flex items-center justify-between relative">
          {/* Wave pattern background */}
          <div className="absolute inset-0 bg-wave-pattern bg-repeat-x bg-bottom opacity-10 animate-wave"></div>
          
          <HeaderLogo showBackButton={showBackButton} />
          
          <div className="flex items-center gap-4">
            <HeaderActions onAboutClick={() => setShowAboutModal(true)} />
            {/* Gear icon with theme dropdown */}
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-700 transition text-maritime-gold" aria-haspopup="true"> {/* Adjusted hover bg */}
                <Settings className="w-6 h-6" />
              </button>
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50"> {/* Adjusted dark bg */}
                <div className="p-2">
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Theme</span> {/* Adjusted dark text */}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page title, purpose and breadcrumbs bar */}
        {showPageHeader && (
          <PageHeader 
            title={pageTitle}
            description={screenPurpose}
            breadcrumbItems={breadcrumbItems}
            showBreadcrumbs={breadcrumbItems.length > 0}
          />
        )}
      </div>
      
      <AboutModal open={showAboutModal} onClose={() => setShowAboutModal(false)} />
    </header>
  );
};

export default Header;
