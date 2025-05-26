import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Settings, Users, Database, Layers, LayoutDashboard, ShieldAlert, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { operateGemini } from '@/lib/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/useAuth'; // Corrected import path
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { activeRole } = useAuth();
  
  // Sample metrics data
  const metrics = {
    users: 42,
    activeUsers: 18,
    recipes: 156,
    inventoryItems: 248,
    systemHealth: 98,
    lastDeployment: '2025-04-23T14:30:00Z'
  };
  
  // Sample activity log
  const activityLog = [
    { id: 1, user: 'captain@bluehorizon.com', action: 'Approved menu', timestamp: '2025-04-25T08:12:34Z' },
    { id: 2, user: 'chef@bluehorizon.com', action: 'Added 3 new recipes', timestamp: '2025-04-24T15:45:21Z' },
    { id: 3, user: 'hostess@bluehorizon.com', action: 'Generated shopping list', timestamp: '2025-04-24T11:30:05Z' },
    { id: 4, user: 'admin@bluehorizon.com', action: 'System backup', timestamp: '2025-04-23T23:00:00Z' },
    { id: 5, user: 'system', action: 'Automated inventory update', timestamp: '2025-04-23T02:15:44Z' },
  ];
  
  // Restrict access to admin and captain roles
  if (activeRole !== 'manager' && activeRole !== 'captain') {
    return <Navigate to="/dashboard" />;
  }
  
  const handleGeminiRun = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setResponse('Processing your request...');
    
    try {
      const result = await operateGemini(prompt);
      setResponse(result);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your Blue Horizon Pro system</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Database</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>AI Controls</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.users}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.activeUsers} currently active
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.recipes}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recipes and {metrics.inventoryItems} inventory items
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.systemHealth}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last deployment: {new Date(metrics.lastDeployment).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent user activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {activityLog.map(log => (
                      <div key={log.id} className="flex justify-between border-b pb-3">
                        <div>
                          <p className="font-medium text-sm">{log.action}</p>
                          <p className="text-xs text-muted-foreground">{log.user}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">Database Connection</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">API Endpoints</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                      <span className="text-sm">AI Services</span>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50">Degraded</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">Storage</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">Authentication</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Healthy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gemini AI Controls</CardTitle>
              <CardDescription>Use AI to modify the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ai-prompt" className="text-sm font-medium block mb-1">Enter your instruction</label>
                  <div className="flex space-x-2">
                    <Input
                      id="ai-prompt"
                      placeholder="Ask Gemini to modify the site..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleGeminiRun} disabled={loading || !prompt}>
                      {loading ? 'Processing...' : 'Run'}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-md p-4 min-h-[200px]">
                  <p className="text-sm whitespace-pre-wrap">{response || 'AI response will appear here'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI System Settings</CardTitle>
              <CardDescription>Configure AI behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="enable-ai" className="text-sm font-medium">Enable AI Features</label>
                  <div className="flex items-center">
                    <input type="checkbox" id="enable-ai" defaultChecked className="mr-2" />
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="model-selection" className="text-sm font-medium">AI Model</label>
                  <select id="model-selection" defaultValue="gemini-pro" className="text-sm p-1 border rounded">
                    <option value="gemini-pro">Gemini Pro</option>
                    <option value="gemini-vision-pro">Gemini Vision Pro</option>
                    <option value="gemini-flash">Gemini Flash</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="timeout" className="text-sm font-medium">Request Timeout (seconds)</label>
                  <input type="number" id="timeout" defaultValue={30} min={5} max={120} className="text-sm p-1 border rounded w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>This tab would contain user management controls</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User management interface would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Controls</CardTitle>
              <CardDescription>This tab would contain database management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Database management interface would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>This tab would contain system configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p>System settings interface would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}