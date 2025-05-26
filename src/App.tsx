
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import Inventory from './pages/Inventory';
import Menus from './pages/Menus';
import Bookings from './pages/Bookings';
import ShoppingList from './pages/ShoppingList';
import PrepItems from './pages/PrepItems';
import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import AdminPage from '@/pages/AdminPage';

const AppContent = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              <>
                <Navigation />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/recipes"
          element={
            session ? (
              <>
                <Navigation />
                <Recipes />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/inventory"
          element={
            session ? (
              <>
                <Navigation />
                <Inventory />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/menus"
          element={
            session ? (
              <>
                <Navigation />
                <Menus />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/bookings"
          element={
            session ? (
              <>
                <Navigation />
                <Bookings />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/shopping"
          element={
            session ? (
              <>
                <Navigation />
                <ShoppingList />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/prep"
          element={
            session ? (
              <>
                <Navigation />
                <PrepItems />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={!session ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
