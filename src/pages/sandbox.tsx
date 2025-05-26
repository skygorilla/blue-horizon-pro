import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Sandbox() {
  useEffect(() => {
    console.log('Sandbox page loaded');
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Typography Sandbox</h1>
      <p className="mb-4">This is a simplified test page to ensure routing is working correctly.</p>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">Basic Card</h2>
          <p>If you can see this card, the basic components are loading correctly.</p>
        </CardContent>
      </Card>
    </div>
  );
}