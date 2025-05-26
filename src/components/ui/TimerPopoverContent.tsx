
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TimerPopoverContent: React.FC = () => {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Timer functionality will be implemented here.</p>
      </CardContent>
    </Card>
  );
};

export default TimerPopoverContent;
