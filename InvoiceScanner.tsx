import React, { useState } from 'react';

interface InvoiceScannerProps {
  onClose: () => void;
}

const InvoiceScanner: React.FC<InvoiceScannerProps> = ({ onClose }) => {
  const [updates, setUpdates] = useState<{ ingredient_id: string; qty_added: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/scan-invoice', { method: 'POST' });
      const data = await res.json();
      setUpdates(data.updates);
    } catch (e: unknown) { // Changed from any to unknown
      const message = (typeof e === 'object' && e !== null && 'message' in e) ? (e as { message: string }).message : 'Scan failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Invoice Scanner (Stub)</h2>
        <div className="mb-4">
          <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
            Video/camera preview placeholder
          </div>
        </div>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={handleScan}
            className="px-4 py-2 bg-maritime-teal text-white rounded hover:bg-maritime-teal/80 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Scanning...' : 'Start Scan'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-300/80"
          >
            Close
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">Error: {error}</p>}
        {updates && (
          <div className="space-y-2 max-h-40 overflow-auto">
            {updates.map((u, i) => (
              <div key={i} className="border p-2 rounded">
                {u.ingredient_id}: +{u.qty_added}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceScanner;