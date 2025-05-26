
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AdminSystemReport = () => {
  const [report, setReport] = useState('');
  const [statusColor, setStatusColor] = useState('text-green-600');
  const reportRef = useRef<HTMLDivElement>(null);

  const loadReport = async () => {
    try {
      // Since system_status table doesn't exist, generate a mock report
      const mockReport = `System Status Report - ${new Date().toLocaleString()}

=== SYSTEM OVERVIEW ===
✅ Database: Online
✅ Authentication: Active
✅ Core Services: Running
⚠️  Warning: Mock data being used

=== COMPONENTS STATUS ===
✅ Recipe Management: Operational
✅ Meal Planning: Operational  
✅ Inventory Tracking: Operational
✅ Booking System: Operational
✅ User Management: Operational

=== RECENT ACTIVITY ===
- User sessions: Active
- Recipe operations: Normal
- Database connections: Stable

=== NOTES ===
This is a generated system status report.
For real-time monitoring, connect to actual system status endpoints.`;

      setReport(mockReport);
    } catch (err) {
      console.error('Error loading system status:', err);
      setReport('Unable to load system report.');
    }
  };

  useEffect(() => {
    loadReport();
    // Autosync interval: re-fetch every 5 minutes
    const interval = setInterval(loadReport, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Update header color based on missing warnings count
  useEffect(() => {
    const count = (report.match(/⚠️/g) || []).length;
    if (count === 0) setStatusColor('text-green-600');
    else if (count <= 3) setStatusColor('text-yellow-600');
    else setStatusColor('text-red-600');
  }, [report]);

  const exportPdf = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('system-status-report.pdf');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <FileText className={`mr-2 ${statusColor}`} />
          <h2 className={`text-xl font-bold ${statusColor}`}>System Status Report</h2>
          <Badge className="ml-auto" variant="outline">AUTO-GENERATED</Badge>
          <Button onClick={loadReport} variant="outline" size="sm" className="ml-2 flex items-center">
            <RefreshCw className="mr-1 h-4 w-4" />Reload
          </Button>
          <Button onClick={exportPdf} variant="outline" size="sm" className="ml-2 flex items-center">
            <Download className="mr-1 h-4 w-4" />Export PDF
          </Button>
        </div>
        <div ref={reportRef}>
          <ScrollArea className="h-[500px] p-2 border rounded">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {report}
            </pre>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSystemReport;
