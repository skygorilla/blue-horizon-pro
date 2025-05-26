
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table } from 'lucide-react';

// Sample data
const costData = [
  { name: 'Week 1', guestA: 120, guestB: 80, guestC: 140, guestD: 130 },
  { name: 'Week 2', guestA: 130, guestB: 90, guestC: 150, guestD: 120 },
  { name: 'Week 3', guestA: 110, guestB: 85, guestC: 130, guestD: 125 },
  { name: 'Week 4', guestA: 125, guestB: 95, guestC: 145, guestD: 135 },
];

const categoryData = [
  { name: 'Produce', value: 30 },
  { name: 'Meat', value: 40 },
  { name: 'Dairy', value: 15 },
  { name: 'Dry Goods', value: 10 },
  { name: 'Beverages', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const FinancialReportTab: React.FC = () => {
  return (
    <>
      <Card className="mb-6 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Weekly Cost per Guest Type</CardTitle>
          <CardDescription>
            Cost breakdown by guest type over the past 4 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="guestA" fill="#0088FE" name="Adult Standard" />
                <Bar dataKey="guestB" fill="#00C49F" name="Child Standard" />
                <Bar dataKey="guestC" fill="#FFBB28" name="Vegetarian" />
                <Bar dataKey="guestD" fill="#FF8042" name="Vegan" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Spending by Category</CardTitle>
            <CardDescription>Breakdown of expenses by food category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Cost Summary</CardTitle>
            <CardDescription>Monthly and annual cost projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border border-muted">
                  <div className="text-sm text-muted-foreground">Monthly Average</div>
                  <div className="text-2xl font-bold">$8,450</div>
                  <div className="text-xs text-green-600">↓ 3.2% from last month</div>
                </Card>
                <Card className="p-4 border border-muted">
                  <div className="text-sm text-muted-foreground">Per Guest/Day</div>
                  <div className="text-2xl font-bold">$42.25</div>
                  <div className="text-xs text-red-600">↑ 1.5% from last month</div>
                </Card>
                <Card className="p-4 border border-muted">
                  <div className="text-sm text-muted-foreground">Annual Projection</div>
                  <div className="text-2xl font-bold">$101,400</div>
                  <div className="text-xs text-green-600">↓ 2.8% from last year</div>
                </Card>
                <Card className="p-4 border border-muted">
                  <div className="text-sm text-muted-foreground">Food Waste Cost</div>
                  <div className="text-2xl font-bold">$1,245</div>
                  <div className="text-xs text-green-600">↓ 5.3% from last month</div>
                </Card>
              </div>
              
              <Button variant="outline" className="w-full">
                <Table className="mr-2 h-4 w-4" />
                View Detailed Cost Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FinancialReportTab;
