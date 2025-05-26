
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShoppingTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shopping List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Shopping list content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingTabContent;
