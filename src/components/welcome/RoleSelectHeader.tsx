import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RoleSelectHeader = () => {
  return (
    <Card className="mb-4 sm:mb-6 shadow-lg border-maritime-teal/20 dark:bg-gray-800 dark:border-gray-700"> {/* Added dark bg/border */}
      <CardHeader className="text-center py-3 sm:py-4">
        <CardTitle className="text-2xl sm:text-3xl font-playfair text-maritime-navy dark:text-white"> {/* Added dark text */}
          Select Your Role
        </CardTitle>
        <CardDescription className="text-sm sm:text-lg mt-1 sm:mt-2 dark:text-gray-300"> {/* Added dark text */}
          Choose your role to access the appropriate features and permissions
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default RoleSelectHeader;
