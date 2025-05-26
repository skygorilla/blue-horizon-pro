
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const AccessRestricted: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-neutral-light p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold text-red-600">Access Restricted</h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base">This page is only accessible to users with the Hostess role.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-4 sm:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-maritime-teal text-white text-sm rounded hover:bg-maritime-teal/80"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AccessRestricted;
