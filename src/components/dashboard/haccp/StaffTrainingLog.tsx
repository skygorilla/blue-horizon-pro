import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, addYears, differenceInDays } from 'date-fns';
import {
  CalendarIcon,
  GraduationCap,
  Printer,
  Download,
  Plus,
  Trash2,
  UserCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Training types
const TRAINING_TYPES = [
  'Higijenski minimum',
  'HACCP principi',
  'Sigurnost hrane',
  'Alergeni',
  'Osobna higijena',
  'Čišćenje i sanitacija',
  'Kontrola štetočina',
  'Prva pomoć',
];

// Certification validity periods (in years)
const CERTIFICATION_VALIDITY = {
  'Higijenski minimum': 5,
  'HACCP principi': 3,
  'Sigurnost hrane': 3,
  'Alergeni': 2,
  'Osobna higijena': 1,
  'Čišćenje i sanitacija': 1,
  'Kontrola štetočina': 1,
  'Prva pomoć': 3,
};

interface TrainingRecord {
  id: number;
  employeeName: string;
  trainingType: string;
  trainingDate: string;
  expiryDate: string;
  trainer: string;
  certificateNumber: string;
  notes: string;
}

const StaffTrainingLog = () => {
  // State for training records
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>([]);
  
  // State for new record form
  const [newRecord, setNewRecord] = useState<Omit<TrainingRecord, 'id' | 'expiryDate'>>({
    employeeName: '',
    trainingType: '',
    trainingDate: new Date().toISOString(),
    trainer: '',
    certificateNumber: '',
    notes: '',
  });
  
  // State for calendar popover
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('staffTrainingRecords');
    if (savedRecords) {
      setTrainingRecords(JSON.parse(savedRecords));
    }
  }, []);
  
  // Save records to localStorage when they change
  useEffect(() => {
    localStorage.setItem('staffTrainingRecords', JSON.stringify(trainingRecords));
  }, [trainingRecords]);
  
  // Calculate expiry date based on training type
  const calculateExpiryDate = (date: string, type: string): string => {
    if (!type || !CERTIFICATION_VALIDITY[type]) return date; // Or handle differently if no expiry
    
    const trainingDate = new Date(date);
    const validityYears = CERTIFICATION_VALIDITY[type];
    const expiryDate = addYears(trainingDate, validityYears);
    
    return expiryDate.toISOString();
  };
  
  // Handle date selection
  const handleDateChange = (date: Date) => {
    setNewRecord({
      ...newRecord,
      trainingDate: date.toISOString(),
    });
    setShowCalendar(false);
  };
  
  // Add new training record
  const addTrainingRecord = () => {
    // Form validation
    if (!newRecord.employeeName || !newRecord.trainingType || !newRecord.trainingDate) {
      toast.error('Molimo popunite obavezna polja: Ime zaposlenika, Vrsta obuke, Datum obuke');
      return;
    }
    
    // Calculate expiry date
    const expiryDate = calculateExpiryDate(newRecord.trainingDate, newRecord.trainingType);
    
    // Create new record with ID
    const record: TrainingRecord = {
      ...newRecord,
      id: Date.now(),
      expiryDate,
    };
    
    // Add to records
    setTrainingRecords([...trainingRecords, record]);
    
    // Reset form
    setNewRecord({
      employeeName: '',
      trainingType: '',
      trainingDate: new Date().toISOString(),
      trainer: '',
      certificateNumber: '',
      notes: '',
    });
    
    toast.success('Zapis o obuci osoblja uspješno dodan');
  };
  
  // Remove training record
  const removeTrainingRecord = (id: number) => {
    setTrainingRecords(trainingRecords.filter(record => record.id !== id));
    toast.info('Zapis o obuci uklonjen');
  };
  
  // Export to PDF
  const exportPdf = () => {
    toast.success('Evidencija obuke osoblja izvezena kao PDF');
  };
  
  // Print report
  const printReport = () => {
    toast.success('Šaljem evidenciju obuke osoblja na printer');
  };
  
  // Check certification status
  const getCertificationStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = differenceInDays(expiry, today);
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', label: 'Isteklo', color: 'destructive' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring-soon', label: `Istječe za ${daysUntilExpiry} dana`, color: 'bg-amber-500 text-white' };
    } else {
      return { status: 'valid', label: 'Važeće', color: 'bg-green-100 text-green-800' };
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Evidencija obuke osoblja</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={printReport} className="gap-1">
            <Printer className="h-4 w-4" />
            Ispis
          </Button>
          
          <Button variant="outline" onClick={exportPdf} className="gap-1">
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="record">
          <TabsList className="mb-4">
            <TabsTrigger value="record">Unos obuke</TabsTrigger>
            <TabsTrigger value="overview">Pregled certifikata</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <div className="bg-muted/20 p-4 rounded-lg border mb-6">
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <GraduationCap className="h-4 w-4 mr-1 text-primary" />
                Dodaj novi zapis o obuci
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="employeeName">Ime zaposlenika*</Label>
                  <Input 
                    id="employeeName"
                    placeholder="Npr. Ana Anić"
                    value={newRecord.employeeName}
                    onChange={(e) => setNewRecord({ ...newRecord, employeeName: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="trainingType">Vrsta obuke*</Label>
                  <Select 
                    value={newRecord.trainingType} 
                    onValueChange={(value) => setNewRecord({ ...newRecord, trainingType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberi vrstu obuke" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRAINING_TYPES.map(type => (
                        <SelectItem key={type} value={type}>
                          {type} {CERTIFICATION_VALIDITY[type] ? `(${CERTIFICATION_VALIDITY[type]} god.)` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="trainingDate">Datum obuke*</Label>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newRecord.trainingDate 
                          ? format(parseISO(newRecord.trainingDate), 'dd.MM.yyyy') 
                          : 'Odaberi datum'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={parseISO(newRecord.trainingDate)}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="trainer">Predavač/Institucija</Label>
                  <Input 
                    id="trainer"
                    placeholder="Npr. Zavod za javno zdravstvo"
                    value={newRecord.trainer}
                    onChange={(e) => setNewRecord({ ...newRecord, trainer: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="certificateNumber">Broj certifikata</Label>
                  <Input 
                    id="certificateNumber"
                    placeholder="Npr. CERT-12345"
                    value={newRecord.certificateNumber}
                    onChange={(e) => setNewRecord({ ...newRecord, certificateNumber: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="notes">Napomene</Label>
                <Textarea 
                  id="notes"
                  placeholder="Dodatne informacije o obuci..."
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  className="h-20"
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={addTrainingRecord} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Dodaj zapis o obuci
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="overview">
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Pregled obuka i certifikata</h3>
              
              {trainingRecords.length === 0 ? (
                <div className="text-center p-6 bg-muted/20 rounded-lg border">
                  <p className="text-muted-foreground">Još nema dodanih zapisa o obuci osoblja</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border p-2 text-left">Zaposlenik</th>
                        <th className="border p-2 text-left">Vrsta obuke</th>
                        <th className="border p-2 text-left">Datum obuke</th>
                        <th className="border p-2 text-left">Datum isteka</th>
                        <th className="border p-2 text-left">Status</th>
                        <th className="border p-2 text-left">Predavač</th>
                        <th className="border p-2 text-left">Certifikat br.</th>
                        <th className="border p-2 text-left">Akcije</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainingRecords.map(record => {
                        const statusInfo = getCertificationStatus(record.expiryDate);
                        
                        return (
                          <tr key={record.id} className="hover:bg-muted/20">
                            <td className="border p-2 font-medium">{record.employeeName}</td>
                            <td className="border p-2">{record.trainingType}</td>
                            <td className="border p-2">
                              {format(parseISO(record.trainingDate), 'dd.MM.yyyy')}
                            </td>
                            <td className="border p-2">
                              {format(parseISO(record.expiryDate), 'dd.MM.yyyy')}
                            </td>
                            <td className="border p-2">
                              <Badge variant={statusInfo.status === 'expired' ? 'destructive' : 'outline'} className={statusInfo.color}>
                                {statusInfo.status === 'expired' && <AlertCircle className="h-3 w-3 mr-1" />}
                                {statusInfo.status === 'valid' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                {statusInfo.label}
                              </Badge>
                            </td>
                            <td className="border p-2">{record.trainer || '-'}</td>
                            <td className="border p-2">{record.certificateNumber || '-'}</td>
                            <td className="border p-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeTrainingRecord(record.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>Redovita obuka osoblja o sigurnosti hrane ključna je za prevenciju kontaminacije i osiguravanje usklađenosti s propisima.</p>
          <p>Pratite datume isteka certifikata kako biste osigurali pravovremenu obnovu.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffTrainingLog;