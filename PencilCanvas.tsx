import React from 'react';

interface PencilCanvasProps {
  onClose: () => void;
}

const PencilCanvas: React.FC<PencilCanvasProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Annotation Canvas (Stub)</h2>
        <div className="h-64 bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
          Apple Pencil / drawing canvas placeholder
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-maritime-teal text-white rounded hover:bg-maritime-teal/80"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PencilCanvas;