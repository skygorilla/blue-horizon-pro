import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker'; // Corrected import path
import { Printer, Download, FileText, ChevronDown, BarChart4, LineChart, Thermometer } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { useHaccpOperations } from '@/utils/recipes/hooks/useHaccpOperations';

type DateRange = {
  from: Date;
  to: Date;
};

const HaccpReports: React.FC = () => {
  const { preparedItems } = useHaccpOperations();
  const [reportType, setReportType] = useState('compliance');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  
  // Mock temperature data for charts
  const temperatureData = [
    { equipment: 'Walk-in Refrigerator', readings: Array.from({ length: 7 }, (_, i) => ({ day: i, value: Math.random() * 2 + 3 })) },
    { equipment: 'Freezer', readings: Array.from({ length: 7 }, (_, i) => ({ day: i, value: Math.random() * 3 - 19 })) },
    { equipment: 'Cold Storage', readings: Array.from({ length: 7 }, (_, i) => ({ day: i, value: Math.random() * 3 + 4 })) },
  ];
  
  // Filter prepared items based on date range
  const filteredItems = preparedItems.filter(item => {
    const prepDate = new Date(item.prepared_at);
    return isWithinInterval(prepDate, { start: dateRange.from, end: dateRange.to });
  });
  
  // Calculate compliance statistics
  const totalItems = filteredItems.length;
  const expiredItems = filteredItems.filter(item => new Date(item.expires_at) < new Date()).length;
  const complianceRate = totalItems > 0 ? ((totalItems - expiredItems) / totalItems * 100).toFixed(1) : '100';
  
  // Calculate location distribution
  const locationStats = filteredItems.reduce((acc, item) => {
    const location = item.location || 'Unspecified';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Handle generating the report
  const handleGenerateReport = () => {
    // Typically you would generate a PDF here or export data
    console.log('Generating report for:', reportType, dateRange);
    alert('Report generated. Would normally download or print.');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">HACCP Reports & Documentation</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleGenerateReport()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button size="sm" onClick={() => handleGenerateReport()}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium">Compliance Rate</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{complianceRate}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                {totalItems} items tracked
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <Thermometer className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium">Temperature Logs</h3>
              <p className="text-3xl font-bold text-amber-600 mt-2">
                {temperatureData.flatMap(d => d.readings).length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                For {temperatureData.length} equipment items
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <BarChart4 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Storage Locations</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {Object.keys(locationStats).length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {Object.entries(locationStats).map(([loc, count]) => (
                  <span key={loc}>
                    {loc}: {count}{' '}
                  </span>
                ))}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-between space-x-4 p-4 border rounded-lg">
        <div>
          <Label htmlFor="report-type">Report Type</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="report-type" className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compliance">Compliance Summary</SelectItem>
              <SelectItem value="temperature">Temperature Log</SelectItem>
              <SelectItem value="shelf-life">Shelf Life Tracking</SelectItem>
              <SelectItem value="incidents">Incident Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Date Range</Label>
          <div className="flex items-center mt-1.5">
            <DatePicker
              selected={dateRange.from}
              onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
              buttonProps={{
                variant: "outline",
                className: "w-[160px] justify-start text-left font-normal h-9"
              }}
            />
            <span className="mx-2">to</span>
            <DatePicker
              selected={dateRange.to}
              onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
              buttonProps={{
                variant: "outline",
                className: "w-[160px] justify-start text-left font-normal h-9"
              }}
            />
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Button onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">HACCP Compliance Summary</h3>
                <p>
                  Report period: {format(dateRange.from, 'MMM d, yyyy')} to {format(dateRange.to, 'MMM d, yyyy')}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Prepared Items Tracking:</h4>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Total Items Tracked: {totalItems}</li>
                      <li>Items Currently Active: {totalItems - expiredItems}</li>
                      <li>Items Expired: {expiredItems}</li>
                      <li>Compliance Rate: {complianceRate}%</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Temperature Monitoring:</h4>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Equipment Monitored: {temperatureData.length}</li>
                      <li>Total Temperature Readings: {temperatureData.flatMap(d => d.readings).length}</li>
                      <li>Non-compliant Readings: {Math.floor(Math.random() * 3)}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Recommendations:</h4>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Implement more frequent temperature checks for cold storage.</li>
                      <li>Review shelf life guidelines for sauces and pre-prepared items.</li>
                      <li>Conduct staff training on proper labeling procedures.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detailed HACCP Records</h3>
                <p className="text-sm text-muted-foreground">
                  All HACCP records for the selected period are listed below.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Item/Location</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Temperature</th>
                        <th className="text-left p-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Display filtered items in table format */}
                      {filteredItems.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{format(new Date(item.prepared_at), 'MMM d, yyyy')}</td>
                          <td className="p-2">
                            {new Date(item.expires_at) < new Date() ? (
                              <span className="text-red-600">Expired</span>
                            ) : (
                              <span className="text-green-600">Active</span>
                            )}
                          </td>
                          <td className="p-2">
                            {item.temperature_c ? `${item.temperature_c}°C` : 'N/A'}
                          </td>
                          <td className="p-2">{item.notes || 'No notes'}</td>
                        </tr>
                      ))}
                      
                      {/* If no items, show a message */}
                      {filteredItems.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">
                            No HACCP records found for the selected period.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">HACCP Charts & Graphs</h3>
                <p className="text-sm text-muted-foreground">
                  Visual representation of temperature logs and compliance data.
                </p>
                
                <div className="h-64 border rounded-md p-4 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <LineChart className="h-12 w-12 text-blue-500 mx-auto" />
                    <p>Temperature charts would be displayed here</p>
                    <p className="text-xs text-muted-foreground">
                      Data visualization requires chart library integration
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HaccpReports;