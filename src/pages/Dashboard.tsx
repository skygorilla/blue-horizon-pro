
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recipes</CardTitle>
            <CardDescription>Manage your recipe collection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Total recipes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Track your ingredients</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Items in stock</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>Upcoming reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
