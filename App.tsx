
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { toast, Toaster } from 'sonner'; // Add Toaster back
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UISettingsProvider } from './contexts/UISettingsContext';
import { MealPlanProvider } from './contexts/MealPlanContext';
import { TimerProvider } from './contexts/TimerContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import './App.css';
import './styles/touchMode.css';
import './styles/highContrast.css';
import './styles/manager-dashboard.css';
import './styles/recipes.css';

// Import pages
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Index from './pages/Index';
import RoleSelect from './pages/RoleSelect';
import AuthRequired from './components/AuthRequired';
import RecipesPage from './pages/Recipes';
import MealPlannerPage from './components/mealplanner/MealPlannerPage';
import About from './pages/About';
import Inventory from './pages/Inventory';
import RestockRequests from './pages/RestockRequests';
import NotFound from './pages/NotFound';
import Reports from './pages/Reports';
import Haccp from './pages/Haccp';
import Sandbox from './pages/sandbox';
import RimLightDemo from './components/ui/RimLightDemo';
import NotFoundPage from './pages/NotFoundPage';

// Hostess pages
import CurrentMenu from './pages/hostess/CurrentMenu';
import ShoppingPage from './pages/hostess/ShoppingPage';
import PrintMenu from './pages/hostess/PrintMenu';

// Manager pages
import ManagerDashboard from './pages/manager/ManagerDashboard';

// Admin pages
import AdminStatusPage from './pages/admin/AdminStatusPage';
import AdminLayout from './components/admin/dashboard/AdminLayout';
import AdminRimLightLogin from './components/admin/AdminRimLightLogin';

// Chef pages
import ChefDashboard from './pages/ChefDashboard';

// MainLayout
import MainLayout from './components/MainLayout';

// Create a client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      // Remove deprecated onError/onSettled - errors are handled in components
    }
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UISettingsProvider>
        <TimerProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Welcome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/sandbox" element={<Sandbox />} />
              <Route path="/ui/rimlight-demo" element={<RimLightDemo />} />

              {/* Auth required routes for role selection (no sidebar) */}
              <Route element={<AuthRequired><Outlet /></AuthRequired>}>
                <Route path="/select-role" element={<RoleSelect />} />
                <Route path="/role-select" element={<RoleSelect />} />
                {/* Chef Dashboard without sidebar */}
                <Route path="/chef-dashboard" element={
                  <AuthRequired allowedRoles={["chef"]}>
                    <ChefDashboard />
                  </AuthRequired>
                } />
              </Route>

              {/* Auth required routes - Use AuthRequired as a layout route */}
              <Route element={<AuthRequired><SidebarProvider><Outlet /></SidebarProvider></AuthRequired>}>
                {/* Routes with MealPlanProvider - Nest under AuthRequired */}
                <Route element={<MealPlanProvider><Outlet /></MealPlanProvider>}>
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="/recipes" element={<RecipesPage />} />
                  <Route path="/meal-planner" element={<MealPlannerPage />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/restock" element={<RestockRequests />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/haccp" element={<Haccp />} />

                  {/* Hostess specific */}
                  <Route path="/hostess/menu" element={<CurrentMenu />} />
                  <Route path="/hostess/shopping" element={<ShoppingPage />} />
                  <Route path="/hostess/print-menu" element={<PrintMenu />} />

                  {/* Manager specific */}
                  <Route path="/manager/dashboard" element={
                    <AuthRequired allowedRoles={["manager"]}>
                      <ManagerDashboard />
                    </AuthRequired>
                  } />
                </Route>

                {/* Admin routes - Require specific roles, nested under AuthRequired */}
                <Route element={<AuthRequired allowedRoles={['manager', 'captain']}><Outlet /></AuthRequired>}>
                  <Route path="/admin/dashboard" element={<AdminLayout />} />
                  <Route path="/admin/status" element={<AdminLayout><AdminStatusPage /></AdminLayout>} />
                </Route>
              </Route>

              {/* Admin Login - Outside standard AuthRequired */}
              <Route path="/admin" element={<AdminRimLightLogin />} />

              {/* Catch-all Not Found - Use NotFoundPage */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* Add Toaster component for toast notifications */}
            <Toaster position="top-right" />
          </Router>
        </TimerProvider>
      </UISettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
