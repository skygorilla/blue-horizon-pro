import LogViewer from '@/components/debug/LogViewer';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import { useUISettings } from '@/contexts/UISettingsContext';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
  headerButtons?: React.ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
  bodyClassName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  subtitle,
  showHeader = true,
  showSidebar = true,
  headerButtons,
  showBreadcrumbs = true,
  className = '',
  bodyClassName = ''
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { touchMode } = useUISettings();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <div className="flex flex-1 bg-neutral-light dark:bg-gray-900">
        {showSidebar && <SideMenu />}
        <div className="flex flex-col flex-1 overflow-hidden relative">
          {showHeader && <Header />}
          {/* Reverted: Removed flex items-center justify-center. Kept basic layout role. */}
          <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${bodyClassName}`}>
            {children}
          </main>
        </div>
      </div>
      {/* Footer always at bottom */}
      <footer className="fixed bottom-0 left-0 w-full bg-neutral-light dark:bg-gray-900 py-3 text-center text-maritime-navy font-medium flex items-center justify-center gap-2 dark:text-gray-400">
        Built for Life at Sea
        <ThemeToggle />
      </footer>
      {/* Only show LogViewer in development */}
      {import.meta.env.DEV && <LogViewer />}
    </div>
  );
};

export default MainLayout;
