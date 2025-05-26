import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, AlertCircle, Thermometer, Clock, ClipboardList } from 'lucide-react';
import { useHaccpOperations } from '@/utils/recipes/hooks/useHaccpOperations';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

const HaccpAlerts: React.FC = () => {
  const { preparedItems } = useHaccpOperations();
  
  // Mock temperature alerts - in a real implementation, would come from the backend
  const temperatureAlerts = [
    {
      id: 'temp-1',
      equipment: 'Walk-in Refrigerator',
      temperature: 7.2,
      critical_limit: 5,
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      severity: 'high'
    },
    {
      id: 'temp-2',
      equipment: 'Hot Holding Unit',
      temperature: 58.5,
      critical_limit: 63,
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      severity: 'medium'
    }
  ];
  
  // Get expired items
  const expiredItems = preparedItems.filter(item => {
    const now = new Date();
    const expires = parseISO(item.expires_at);
    return expires < now;
  });
  
  // Get items nearing expiration (within 12 hours)
  const nearingExpirationItems = preparedItems.filter(item => {
    const now = new Date();
    const expires = parseISO(item.expires_at);
    const hoursRemaining = (expires.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursRemaining > 0 && hoursRemaining <= 12;
  });
  
  // Combine all alerts
  const allAlerts = [
    ...temperatureAlerts.map(alert => ({
      id: alert.id,
      type: 'temperature' as const,
      severity: alert.severity as 'high' | 'medium' | 'low',
      timestamp: alert.timestamp,
      data: alert
    })),
    ...expiredItems.map(item => ({
      id: `expired-${item.id}`,
      type: 'expired' as const,
      severity: 'high' as const,
      timestamp: item.expires_at,
      data: item
    })),
    ...nearingExpirationItems.map(item => ({
      id: `nearing-${item.id}`,
      type: 'nearing' as const,
      severity: 'medium' as const,
      timestamp: item.expires_at,
      data: item
    }))
  ].sort((a, b) => {
    // Sort by severity first, then by timestamp
    if (a.severity !== b.severity) {
      return a.severity === 'high' ? -1 : b.severity === 'high' ? 1 : 0;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  const getSeverityStyles = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'medium':
        return 'bg-amber-100 border-amber-500 text-amber-800';
      case 'low':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">HACCP Alerts & Notifications</h2>
        <div className="flex gap-2">
          <Badge variant="destructive" className="text-xs px-2 py-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            High: {allAlerts.filter(alert => alert.severity === 'high').length}
          </Badge>
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 text-xs px-2 py-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Medium: {allAlerts.filter(alert => alert.severity === 'medium').length}
          </Badge>
        </div>
      </div>
      
      <Separator />
      
      {allAlerts.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No HACCP Alerts</h3>
          <p className="mt-2 text-sm text-gray-500">
            All monitored items are within acceptable parameters.
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="p-4 space-y-4">
            {allAlerts.map(alert => {
              if (alert.type === 'temperature') {
                const data = alert.data;
                return (
                  <Alert key={alert.id} className={`${getSeverityStyles(alert.severity)} border-l-4`}>
                    <AlertTriangle className="h-4 w-4" />
                    <div className="flex-1">
                      <AlertTitle className="flex items-center justify-between">
                        <span>Temperature Alert: {data.equipment}</span>
                        <span className="text-xs font-normal">
                          {formatDistanceToNow(new Date(data.timestamp))} ago
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        <div className="flex items-center mt-1">
                          <Thermometer className="h-4 w-4 mr-1" />
                          <span>Measured: <strong>{data.temperature}°C</strong></span>
                          <span className="mx-2">|</span>
                          <span>Critical Limit: <strong>{data.critical_limit}°C</strong></span>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs">
                            Immediate corrective action required. Check equipment and move items if necessary.
                          </span>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Log Action
                          </Button>
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>
                );
              }
              
              if (alert.type === 'expired') {
                const item = alert.data;
                return (
                  <Alert key={alert.id} className="bg-red-100 border-red-500 text-red-800 border-l-4">
                    <AlertCircle className="h-4 w-4" />
                    <div className="flex-1">
                      <AlertTitle className="flex items-center justify-between">
                        <span>Expired Item: {item.name}</span>
                        <span className="text-xs font-normal">
                          Expired {formatDistanceToNow(parseISO(item.expires_at))} ago
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Prepared: {format(parseISO(item.prepared_at), 'MMM d, yyyy HH:mm')}</span>
                          <span className="mx-2">|</span>
                          <span>Location: {item.location || 'Not specified'}</span>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs">
                            Item has exceeded its shelf life and should be discarded immediately.
                          </span>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Mark as Discarded
                          </Button>
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>
                );
              }
              
              if (alert.type === 'nearing') {
                const item = alert.data;
                return (
                  <Alert key={alert.id} className="bg-amber-100 border-amber-500 text-amber-800 border-l-4">
                    <AlertTriangle className="h-4 w-4" />
                    <div className="flex-1">
                      <AlertTitle className="flex items-center justify-between">
                        <span>Item Nearing Expiration: {item.name}</span>
                        <span className="text-xs font-normal">
                          Expires in {formatDistanceToNow(parseISO(item.expires_at))}
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        <div className="flex items-center mt-1">
                          <ClipboardList className="h-4 w-4 mr-1" />
                          <span>Location: {item.location || 'Not specified'}</span>
                          {item.temperature_c && (
                            <>
                              <span className="mx-2">|</span>
                              <span>Temp: {item.temperature_c}°C</span>
                            </>
                          )}
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs">
                            Use this item soon or consider moving it to the priority use list.
                          </span>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Priority Use
                          </Button>
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>
                );
              }
              
              return null;
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default HaccpAlerts;