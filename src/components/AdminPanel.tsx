
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Database, Trash2, Edit, Plus, Eye } from 'lucide-react';

const AdminPanel = () => {
  const [operation, setOperation] = useState('select');
  const [table, setTable] = useState('');
  const [data, setData] = useState('');
  const [filters, setFilters] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tables = [
    'profiles', 'recipes', 'inventory', 'menus', 'booking_weeks',
    'suppliers', 'categories', 'prepared_items', 'guest_types',
    'menu_recipes', 'menu_guests', 'shopping_list', 'recipe_items'
  ];

  const executeAdminOperation = async () => {
    if (!table) {
      setError('Please select a table');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      let requestData: any = {
        operation,
        table
      };

      // Parse data if provided
      if (data.trim()) {
        try {
          requestData.data = JSON.parse(data);
        } catch (e) {
          throw new Error('Invalid JSON in data field');
        }
      }

      // Parse filters if provided
      if (filters.trim()) {
        try {
          requestData.filters = JSON.parse(filters);
        } catch (e) {
          throw new Error('Invalid JSON in filters field');
        }
      }

      const { data: response, error: invokeError } = await supabase.functions.invoke('admin-operations', {
        body: requestData
      });

      if (invokeError) {
        throw invokeError;
      }

      if (!response.success) {
        throw new Error(response.error);
      }

      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getOperationIcon = (op: string) => {
    switch (op) {
      case 'select': return <Eye className="w-4 h-4" />;
      case 'insert': return <Plus className="w-4 h-4" />;
      case 'update': return <Edit className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'truncate': return <AlertTriangle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Administrative Database Operations
          </CardTitle>
          <CardDescription>
            Direct database access bypassing Row Level Security. Use with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Operation</label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Select (Read)
                    </div>
                  </SelectItem>
                  <SelectItem value="insert">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Insert (Create)
                    </div>
                  </SelectItem>
                  <SelectItem value="update">
                    <div className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Update (Modify)
                    </div>
                  </SelectItem>
                  <SelectItem value="delete">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete (Remove)
                    </div>
                  </SelectItem>
                  <SelectItem value="truncate">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Truncate (Clear All)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Table</label>
              <Select value={table} onValueChange={setTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a table" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((tableName) => (
                    <SelectItem key={tableName} value={tableName}>
                      {tableName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(operation === 'insert' || operation === 'update') && (
            <div>
              <label className="text-sm font-medium mb-2 block">Data (JSON)</label>
              <Textarea
                placeholder='{"name": "Example", "value": 123}'
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="font-mono"
                rows={3}
              />
            </div>
          )}

          {(operation === 'update' || operation === 'delete' || operation === 'select') && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Filters (JSON) {operation === 'select' ? '(optional)' : '(required)'}
              </label>
              <Textarea
                placeholder='{"id": "uuid-here", "status": "active"}'
                value={filters}
                onChange={(e) => setFilters(e.target.value)}
                className="font-mono"
                rows={2}
              />
            </div>
          )}

          {operation === 'truncate' && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Warning:</strong> Truncate will delete ALL data in the selected table. This action cannot be undone.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={executeAdminOperation} 
            disabled={loading || !table}
            className="w-full"
            variant={operation === 'truncate' ? 'destructive' : 'default'}
          >
            {loading ? 'Executing...' : (
              <div className="flex items-center gap-2">
                {getOperationIcon(operation)}
                Execute {operation.charAt(0).toUpperCase() + operation.slice(1)}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Operation Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPanel;
