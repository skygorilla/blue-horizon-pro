import React from 'react';
import { useAuth } from '@/contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs';
import { FileText, Printer, Download, ShoppingCart, RotateCcw, ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvoiceScanner from '@/components/InvoiceScanner';
import ShoppingList from '@/components/ShoppingList';
import { useShopping } from '@/contexts/shopping';
import { useUISettings } from '@/contexts/useUISettings';
import { PageHeader } from '@/components/ui/section-header';

const ShoppingPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeRole } = useAuth();
  const {
    shoppingItems,
    toggleItemChecked,
    addShoppingItem,
    removeShoppingItem,
    updateShoppingItem,
    calculateTotalCost
  } = useShopping();
  const { touchMode } = useUISettings();
  const [scannerOpen, setScannerOpen] = React.useState(false);

  const [groupSize, setGroupSize] = React.useState(10);
  const [buffer, setBuffer] = React.useState(10);

  // Define resetChecks function since it's not provided by the context
  const resetChecks = () => {
    // Reset all checked items to unchecked
    shoppingItems.forEach(item => {
      if (item.checked) {
        updateShoppingItem(item.id, { checked: false });
      }
    });
  };

  const breadcrumbItems = [
    { label: 'Hostess Dashboard', path: '/dashboard' },
    { label: 'Shopping List', path: '/shopping' }
  ];

  const handleGenerateList = () => {
    console.log("Generate List clicked - Implement logic (e.g., based on recipes/inventory)");
  };

  const handlePrintList = () => {
    console.log("Print List clicked - Implement printing logic");
    window.print();
  };

  const handleExportList = () => {
    console.log("Export List clicked - Implement export logic (e.g., CSV)");
  };

  if (activeRole !== 'hostess') {
    return (
      <div className="min-h-screen bg-neutral-light p-6">
        <div className="max-w-3xl mx-auto bg-background p-8 rounded-lg shadow-md">
          <h1 className="title-large text-red-600">Access Restricted</h1>
          <p className="mt-4">This page is only accessible to users with the Hostess role.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 px-4 py-2 bg-maritime-teal text-white rounded hover:bg-maritime-teal/80"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-grow">
          <PageBreadcrumbs items={breadcrumbItems} className="overflow-x-auto" />
        </div>
      </div>

      <PageHeader 
        title="Shopping List"
        description="Manage your inventory purchases and track shopping needs for the vessel."
        icon={<ShoppingCart />}
        className="text-maritime-gold"
      />

      <ShoppingList
        items={shoppingItems}
        groupSize={groupSize}
        buffer={buffer}
        onToggleItem={toggleItemChecked}
        onGenerateList={handleGenerateList}
        onResetChecks={resetChecks}
        onPrintList={handlePrintList}
        onChangeGroupSize={setGroupSize}
        onChangeBuffer={setBuffer}
        onRemoveItem={removeShoppingItem}
        onUpdateItem={updateShoppingItem}
        onAddItem={addShoppingItem}
        totalCost={calculateTotalCost()}
      />

      {scannerOpen && <InvoiceScanner onClose={() => setScannerOpen(false)} />}

      <div className="text-center text-gray-500 text-sm mt-8 mb-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </>
  );
};

export default ShoppingPage;
