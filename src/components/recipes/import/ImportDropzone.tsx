
import React, { useRef } from 'react';
import { Upload, FileJson } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ImportDropzoneProps {
  importing: boolean;
  importProgress: number;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const ImportDropzone: React.FC<ImportDropzoneProps> = ({
  importing,
  importProgress,
  onFileSelect,
  onDragOver,
  onDrop,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div 
      className={`flex flex-col items-center justify-center border-2 border-dashed ${importing ? 'border-primary/30 bg-primary/5' : 'border-gray-300'} rounded-lg p-6`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept=".json,.jsonl,application/json"
        ref={fileInputRef}
        className="hidden"
        onChange={onFileSelect}
        disabled={importing}
      />
      <FileJson className={`h-12 w-12 ${importing ? 'text-primary' : 'text-gray-400'} mb-4`} />
      
      {importing ? (
        <>
          <div className="w-full max-w-xs mb-2">
            <Progress value={importProgress} className="w-full h-2" />
          </div>
          <p className="text-sm text-gray-500">Importing recipes... {importProgress}%</p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mb-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose File
          </button>
          <p className="text-sm text-gray-500 text-center">
            Drop your JSON or JSONL file here, or click to select
          </p>
        </>
      )}
    </div>
  );
};
