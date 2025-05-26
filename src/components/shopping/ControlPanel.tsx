
import React from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlPanelProps {
  groupSize: number;
  buffer: number;
  onGenerateList: () => void;
  onResetChecks: () => void;
  onPrintList: () => void;
  onChangeGroupSize: (size: number) => void;
  onChangeBuffer: (buffer: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  groupSize,
  buffer,
  onGenerateList,
  onResetChecks,
  onPrintList,
  onChangeGroupSize,
  onChangeBuffer
}) => {
  // Handle buffer change
  const handleBufferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBuffer = Number(e.target.value);
    onChangeBuffer(newBuffer);
  };

  return (
    <div className="excel-card p-2">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        {/* Group size reminder */}
        <div className="bg-gray-100 rounded p-2 flex items-center">
          <span className="text-xs text-excel-darkgray mr-2">Group Size:</span>
          <select
            value={groupSize}
            onChange={(e) => onChangeGroupSize(Number(e.target.value))}
            className="text-sm text-excel-blue font-bold bg-white border border-excel-blue rounded px-2"
          >
            {[5, 10, 16, 20, 25, 30].map(size => (
              <option key={size} value={size}>{size} people</option>
            ))}
          </select>
        </div>
        
        {/* Buffer % option */}
        <div className="bg-gray-100 rounded p-2 flex items-center">
          <span className="text-xs text-excel-darkgray mr-2">Extra Buffer:</span>
          <select 
            value={buffer}
            onChange={handleBufferChange}
            className="text-sm text-excel-blue font-bold bg-white border border-excel-blue rounded px-2"
          >
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={15}>15%</option>
            <option value={20}>20%</option>
          </select>
        </div>
        
        {/* Action buttons */}
        <Button 
          onClick={onGenerateList}
          className="bg-excel-lightblue text-white text-sm px-4 py-2 rounded shadow hover:bg-excel-blue transition-colors"
          size="sm"
        >
          Generate List
        </Button>
        
        <Button 
          onClick={onPrintList}
          className="bg-excel-green text-white text-sm px-4 py-2 rounded shadow hover:brightness-95 transition-colors"
          size="sm"
        >
          <Printer className="w-4 h-4 mr-1" />
          Print List
        </Button>
        
        <Button 
          onClick={onResetChecks}
          className="bg-excel-orange text-white text-sm px-4 py-2 rounded shadow hover:brightness-95 transition-colors"
          size="sm"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset Checks
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
