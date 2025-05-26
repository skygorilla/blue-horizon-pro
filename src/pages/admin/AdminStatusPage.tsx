import React from 'react';
import { useNavigate } from 'react-router-dom';
import RequireRoles from '@/components/RequireRoles';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Feature definitions
const features = [
  { feature: 'Recepti i planiranje obroka', status: '✅', description: 'Dodavanje, Excel import, porcije, filtriranje po gostima i regiji.', icon: '🍲' },
  { feature: 'Inventar i automatsko oduzimanje', status: '✅', description: 'Povezan s receptima, automatski prati količine i trošak.', icon: '📦' },
  { feature: 'Google Kalendar sinkronizacija', status: '⚠️', description: 'Endpoint pripremljen, treba dovršiti OAuth i događaje.', icon: '🗓️' },
  { feature: 'QR/R1 skeniranje računa', status: '⚠️', description: 'OCR + parser stubiran, čeka biblioteku i validaciju.', icon: '📸' },
  { feature: 'Apple Pencil Support', status: '❌', description: 'Canvas implemented; requires testing and saving drawings.', icon: '✏️' },
  { feature: 'Nutritivna analiza', status: '❌', description: 'Treba parsirati makronutrijente iz sastojaka.', icon: '💪' },
  { feature: 'Self-healing skripta', status: '⚠️', description: 'Detektira greške, popravlja `.env`, `node_modules`, restartira server.', icon: '🛠️' },
];

const AdminStatusPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleEdit = () => {
    window.open('/.ai/status.md', '_blank');
  };

  // Map status to badge color
  const badgeVariant = (status: string) => {
    if (status === '✅') return 'default'; // Changed from 'success' to 'default'
    if (status === '⚠️') return 'secondary'; // Changed from 'warning' to 'secondary'
    return 'destructive';
  };

  return (
    <RequireRoles roles={['manager', 'captain']}>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <span className="mr-2">🛠</span>
          Sustavski izvještaj - Blue Horizon Pro
        </h1>
        <div className="flex gap-2 mb-8">
          <Button onClick={handleRefresh} variant="outline">🔁 Refresh Report</Button>
          <Button onClick={handleEdit} variant="outline">✏️ Uredi status .ai/status.md</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <Card key={idx} className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="ml-3 text-xl font-semibold">{item.feature}</h3>
              </div>
              <Badge variant={badgeVariant(item.status)} className="mb-2">
                {item.status} {item.status === '✅' ? 'Aktivno' : item.status === '⚠️' ? 'U pripremi' : 'Nedostaje'}
              </Badge>
              <p className="text-sm text-gray-300 mt-2">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </RequireRoles>
  );
};

export default AdminStatusPage;