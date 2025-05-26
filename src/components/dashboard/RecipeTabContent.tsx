
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecipeTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Recipe content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeTabContent;
