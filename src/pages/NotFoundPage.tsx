import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-center p-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" />
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-2">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Oops! Page not found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Button asChild size="lg">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
