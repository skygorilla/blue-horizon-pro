import React from 'react';
import { useAuth } from '@/contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const RestockRequests: React.FC = () => {
  const { activeRole } = useAuth();
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: 'Crew Dashboard', path: '/dashboard' },
    { label: 'Restock Requests', path: '/restock' }
  ];

  // Form state
  const [itemName, setItemName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Restock request submitted:', { itemName, quantity, notes });
    toast.success('Restock request submitted');
    setItemName('');
    setQuantity('');
    setNotes('');
  };

  // Only allow access to crew
  if (activeRole !== 'crew') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <div className="text-center p-6 bg-background rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-red-600">Access Restricted</h1>
          <p className="mt-4">This page is only accessible to users with the Crew role.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-6">Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <BackButton to="/dashboard" label="Return to Dashboard" />
        <div className="sm:block">
          <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
        </div>
      </div>
      <h1 className="text-2xl font-playfair font-bold mb-4 text-gray-700">Restock Requests</h1>
      {/* Placeholder form for restock requests */}
      <form onSubmit={handleSubmit} className="bg-background p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
        <label className="block">
          <span className="text-gray-700">Item Name</span>
          <input
            type="text"
            className="mt-1 block w-full"
            placeholder="Enter item to restock"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Quantity Required</span>
          <input
            type="number"
            className="mt-1 block w-full"
            placeholder="Enter quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Notes</span>
          <Textarea
            placeholder="Additional details..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </label>
        <div className="text-center">
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </div>
  );
};

export default RestockRequests;
