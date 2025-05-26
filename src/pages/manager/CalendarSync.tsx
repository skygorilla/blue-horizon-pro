import React, { useState } from 'react';
import { useAuth } from '@/contexts/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RequireRoles from '@/components/RequireRoles';

const CalendarSync: React.FC = () => {
  const { activeRole } = useAuth();
  const [eventsJson, setEventsJson] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const events = JSON.parse(eventsJson);
      const res = await fetch('/api/calendar/sync', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events })
      });
      const data = await res.json();
      if (res.ok) setStatus(`Synced ${data.syncedCount} events`);
      else setStatus(`Error: ${data.error}`);
    } catch (e: unknown) { // Changed 'any' to 'unknown'
      // Check if 'e' is an instance of Error to safely access 'message'
      if (e instanceof Error) {
        setStatus(`Invalid JSON: ${e.message}`);
      } else {
        // Handle cases where 'e' is not an Error object
        setStatus(`An unknown error occurred during JSON parsing.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireRoles roles={['manager']}>
      <div className="min-h-screen bg-neutral-light p-6">
        <div className="container mx-auto">
          <Card className="w-[384px] h-[386px]">
            <CardHeader><CardTitle>Google Calendar Sync</CardTitle></CardHeader>
            <CardContent>
              <textarea
                className="w-full h-40 border p-2 rounded mb-4 font-mono"
                placeholder='[{{ "summary": "Lunch", "start": { "dateTime": "2025-04-25T12:00:00" }, "end": { "dateTime": "2025-04-25T13:00:00" }}]'
                value={eventsJson}
                onChange={e => setEventsJson(e.target.value)}
              />
              <Button onClick={handleSync} disabled={loading}>
                {loading ? 'Syncing...' : 'Sync to Calendar'}
              </Button>
              {status && <p className="mt-4 text-sm">{status}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </RequireRoles>
  );
};

export default CalendarSync;