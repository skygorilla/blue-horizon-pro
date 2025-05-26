
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart2 } from 'lucide-react';

const InventoryReportTab: React.FC = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Usage Report</CardTitle>
        <CardDescription>Tracking inventory consumption patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-8 text-center text-muted-foreground">
          <BarChart2 className="h-16 w-16 mx-auto mb-4 text-muted" />
          <p>Select a date range to view inventory reports</p>
          <Button variant="outline" className="mt-4">
            <Calendar className="h-4 w-4 mr-2" />
            Choose Dates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryReportTab;
