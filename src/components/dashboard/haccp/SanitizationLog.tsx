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
import { format, parseISO, addDays } from 'date-fns';
import {
  CalendarIcon,
  CheckCircle2,
  Printer,
  Download,
  Plus,
  Trash2,
  Repeat,
  ClipboardCheck,
  Clock,
  SprayCan
} from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Areas to be cleaned
const CLEANING_AREAS = [
  'Kuhinja - radne površine',
  'Kuhinja - podovi',
  'Kuhinja - oprema',
  'Hladnjaci',
  'Zamrzivači',
  'Skladište hrane',
  'Restoran - stolovi',
  'Restoran - podovi',
  'Restoran - bar',
  'Toaleti',
  'Garderoba osoblja',
  'Kontejneri za otpad',
];

// Cleaning frequency options
const CLEANING_FREQUENCY = {
  'Svaka smjena': { days: 0, color: 'bg-red-50 text-red-800 border-red-200' },
  'Dnevno': { days: 1, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  'Tjedno': { days: 7, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  'Dvotjedno': { days: 14, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  'Mjesečno': { days: 30, color: 'bg-violet-50 text-violet-800 border-violet-200' },
  'Kvartalno': { days: 90, color: 'bg-purple-50 text-purple-800 border-purple-200' },
};

// Cleaning products
const CLEANING_PRODUCTS = [
  'Dezinfekcijsko sredstvo',
  'Deterdžent za posuđe',
  'Sredstvo za čišćenje podova',
  'Sredstvo za odmašćivanje',
  'Sredstvo za čišćenje stakla',
  'Sredstvo za čišćenje inoxa',
  'Sredstvo za sanitarije',
  'Sredstvo za predmete u dodiru s hranom',
  'Alkohol za dezinfekciju',
  'Klorno sredstvo',
];

interface SanitizationRecord {
  id: number;
  area: string;
  frequency: string;
  date: string;
  nextDate: string;
  cleanedBy: string;
  verifiedBy: string;
  productsUsed: string[];
  notes: string;
}

interface CleaningTask {
  id: number;
  area: string;
  frequency: string;
  lastCleaned: string;
  nextDue: string;
}

const SanitizationLog = () => {
  // State for cleaning records
  const [sanitizationRecords, setSanitizationRecords] = useState<SanitizationRecord[]>([]);
  const [cleaningTasks, setCleaningTasks] = useState<CleaningTask[]>([]);
  
  // State for new record form
  const [newRecord, setNewRecord] = useState<Omit<SanitizationRecord, 'id' | 'nextDate'>>({
    area: '',
    frequency: '',
    date: new Date().toISOString(),
    cleanedBy: '',
    verifiedBy: '',
    productsUsed: [],
    notes: '',
  });
  
  // States for calendar popover and product selection
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('sanitizationRecords');
    if (savedRecords) {
      setSanitizationRecords(JSON.parse(savedRecords));
    }
    
    const savedTasks = localStorage.getItem('cleaningTasks');
    if (savedTasks) {
      setCleaningTasks(JSON.parse(savedTasks));
    } else {
      // Initialize default cleaning tasks if none exist
      const defaultTasks = CLEANING_AREAS.map((area, index) => {
        const frequency = Object.keys(CLEANING_FREQUENCY)[index % Object.keys(CLEANING_FREQUENCY).length];
        const lastCleaned = new Date();
        const nextDue = addDays(lastCleaned, CLEANING_FREQUENCY[frequency].days);
        
        return {
          id: index + 1,
          area,
          frequency,
          lastCleaned: lastCleaned.toISOString(),
          nextDue: nextDue.toISOString(),
        };
      });
      
      setCleaningTasks(defaultTasks);
      localStorage.setItem('cleaningTasks', JSON.stringify(defaultTasks));
    }
  }, []);
  
  // Save records to localStorage when they change
  useEffect(() => {
    localStorage.setItem('sanitizationRecords', JSON.stringify(sanitizationRecords));
  }, [sanitizationRecords]);
  
  useEffect(() => {
    localStorage.setItem('cleaningTasks', JSON.stringify(cleaningTasks));
  }, [cleaningTasks]);
  
  // Calculate next cleaning date based on frequency
  const calculateNextDate = (date: string, frequency: string): string => {
    if (!frequency || !CLEANING_FREQUENCY[frequency]) return date;
    
    const currentDate = new Date(date);
    const daysToAdd = CLEANING_FREQUENCY[frequency].days;
    const nextDate = addDays(currentDate, daysToAdd);
    
    return nextDate.toISOString();
  };
  
  // Handle date selection
  const handleDateChange = (date: Date) => {
    setNewRecord({
      ...newRecord,
      date: date.toISOString(),
    });
    setShowCalendar(false);
  };
  
  // Handle product selection
  const handleProductSelection = (product: string) => {
    const isSelected = selectedProducts.includes(product);
    let updatedProducts;
    
    if (isSelected) {
      updatedProducts = selectedProducts.filter(p => p !== product);
    } else {
      updatedProducts = [...selectedProducts, product];
    }
    
    setSelectedProducts(updatedProducts);
    setNewRecord({
      ...newRecord,
      productsUsed: updatedProducts,
    });
  };
  
  // Add new cleaning record
  const addSanitizationRecord = () => {
    // Form validation
    if (!newRecord.area || !newRecord.frequency || !newRecord.cleanedBy) {
      toast.error('Molimo popunite sva obavezna polja');
      return;
    }
    
    // Calculate next cleaning date
    const nextDate = calculateNextDate(newRecord.date, newRecord.frequency);
    
    // Create new record with ID
    const record: SanitizationRecord = {
      ...newRecord,
      id: Date.now(),
      nextDate,
    };
    
    // Add to records
    setSanitizationRecords([...sanitizationRecords, record]);
    
    // Update cleaning tasks
    const updatedTasks = cleaningTasks.map(task => {
      if (task.area === newRecord.area) {
        return {
          ...task,
          lastCleaned: newRecord.date,
          nextDue: nextDate,
        };
      }
      return task;
    });
    
    setCleaningTasks(updatedTasks);
    
    // Reset form
    setNewRecord({
      area: '',
      frequency: '',
      date: new Date().toISOString(),
      cleanedBy: '',
      verifiedBy: '',
      productsUsed: [],
      notes: '',
    });
    setSelectedProducts([]);
    
    toast.success('Zapis o čišćenju uspješno dodan');
  };
  
  // Remove cleaning record
  const removeSanitizationRecord = (id: number) => {
    setSanitizationRecords(sanitizationRecords.filter(record => record.id !== id));
    toast.info('Zapis uklonjen iz evidencije');
  };
  
  // Export to PDF
  const exportPdf = () => {
    toast.success('HACCP evidencija čišćenja izvezena kao PDF');
  };
  
  // Print report
  const printReport = () => {
    toast.success('Šaljem HACCP evidenciju na printer');
  };
  
  // Check if a task is due/overdue
  const getTaskStatus = (nextDue: string) => {
    const today = new Date();
    const dueDate = new Date(nextDue);
    
    if (dueDate < today) {
      return 'overdue';
    } else if (dueDate.getTime() - today.getTime() < 24 * 60 * 60 * 1000) {
      return 'due-today';
    } else if (dueDate.getTime() - today.getTime() < 3 * 24 * 60 * 60 * 1000) {
      return 'due-soon';
    } else {
      return 'upcoming';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Evidencija čišćenja i sanitacije</CardTitle>
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
            <TabsTrigger value="record">Unos čišćenja</TabsTrigger>
            <TabsTrigger value="schedule">Raspored čišćenja</TabsTrigger>
            <TabsTrigger value="guidelines">Upute za čišćenje</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <div className="bg-muted/20 p-4 rounded-lg border mb-6">
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <SprayCan className="h-4 w-4 mr-1 text-primary" />
                Evidencija čišćenja i sanitacije
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="area">Područje čišćenja*</Label>
                  <Select 
                    value={newRecord.area} 
                    onValueChange={(value) => setNewRecord({ ...newRecord, area: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberi područje" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLEANING_AREAS.map(area => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="frequency">Učestalost čišćenja*</Label>
                  <Select 
                    value={newRecord.frequency} 
                    onValueChange={(value) => setNewRecord({ ...newRecord, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberi učestalost" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CLEANING_FREQUENCY).map(frequency => (
                        <SelectItem key={frequency} value={frequency}>
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="cleaningDate">Datum čišćenja*</Label>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newRecord.date 
                          ? format(parseISO(newRecord.date), 'dd.MM.yyyy') 
                          : 'Odaberi datum'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={parseISO(newRecord.date)}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="cleanedBy">Očistio/la*</Label>
                  <Input 
                    id="cleanedBy"
                    placeholder="Ime i prezime"
                    value={newRecord.cleanedBy}
                    onChange={(e) => setNewRecord({ ...newRecord, cleanedBy: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="verifiedBy">Provjerio/la</Label>
                  <Input 
                    id="verifiedBy"
                    placeholder="Ime i prezime voditelja"
                    value={newRecord.verifiedBy}
                    onChange={(e) => setNewRecord({ ...newRecord, verifiedBy: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label className="mb-2 block">Korištena sredstva za čišćenje</Label>
                <div className="flex flex-wrap gap-2">
                  {CLEANING_PRODUCTS.map(product => (
                    <Badge 
                      key={product}
                      variant={selectedProducts.includes(product) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleProductSelection(product)}
                    >
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="notes">Napomene</Label>
                <Textarea 
                  id="notes"
                  placeholder="Dodatne informacije o čišćenju..."
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  className="h-20"
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={addSanitizationRecord} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Dodaj zapis
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Evidencija čišćenja i sanitacije</h3>
              
              {sanitizationRecords.length === 0 ? (
                <div className="text-center p-6 bg-muted/20 rounded-lg border">
                  <p className="text-muted-foreground">Još nema dodanih zapisa o čišćenju</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border p-2 text-left">Datum</th>
                        <th className="border p-2 text-left">Područje</th>
                        <th className="border p-2 text-left">Učestalost</th>
                        <th className="border p-2 text-left">Sljedeće čišćenje</th>
                        <th className="border p-2 text-left">Očistio/la</th>
                        <th className="border p-2 text-left">Provjerio/la</th>
                        <th className="border p-2 text-left">Korištena sredstva</th>
                        <th className="border p-2 text-left">Akcije</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanitizationRecords.map(record => (
                        <tr key={record.id} className="hover:bg-muted/20">
                          <td className="border p-2">
                            {format(parseISO(record.date), 'dd.MM.yyyy')}
                          </td>
                          <td className="border p-2">{record.area}</td>
                          <td className="border p-2">
                            <Badge variant="outline" className={CLEANING_FREQUENCY[record.frequency]?.color}>
                              {record.frequency}
                            </Badge>
                          </td>
                          <td className="border p-2">
                            {format(parseISO(record.nextDate), 'dd.MM.yyyy')}
                          </td>
                          <td className="border p-2">{record.cleanedBy}</td>
                          <td className="border p-2">{record.verifiedBy || '-'}</td>
                          <td className="border p-2">
                            <div className="flex flex-wrap gap-1">
                              {record.productsUsed.length > 0 ? (
                                record.productsUsed.map(product => (
                                  <Badge key={product} variant="secondary" className="text-xs">
                                    {product}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </div>
                          </td>
                          <td className="border p-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeSanitizationRecord(record.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                <Repeat className="h-4 w-4 mr-1" />
                Raspored čišćenja i sanitacije
              </h3>
              <p className="text-xs text-blue-600 mb-4">
                Praćenje rasporeda čišćenja osigurava redovitu provedbu sanitacijskih mjera.
                Crveni zapisi označavaju aktivnosti koje su prekoračile rok, žuti one koje dospijevaju danas ili uskoro.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Područje</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Učestalost</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Zadnje čišćenje</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Sljedeće čišćenje</th>
                      <th className="border border-blue-200 p-2 text-left text-blue-800">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cleaningTasks.map((task, index) => {
                      const status = getTaskStatus(task.nextDue);
                      let statusDisplay;
                      
                      switch (status) {
                        case 'overdue':
                          statusDisplay = <Badge variant="destructive">Prekoračeno</Badge>;
                          break;
                        case 'due-today':
                          statusDisplay = <Badge variant="default" className="bg-amber-500">Danas</Badge>;
                          break;
                        case 'due-soon':
                          statusDisplay = <Badge variant="outline" className="border-amber-500 text-amber-700">Uskoro</Badge>;
                          break;
                        default:
                          statusDisplay = <Badge variant="outline" className="border-green-500 text-green-700">U redu</Badge>;
                      }
                      
                      return (
                        <tr key={task.id} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} 
                                      ${status === 'overdue' ? 'bg-red-50' : ''}
                                      ${status === 'due-today' ? 'bg-amber-50' : ''}
                                      ${status === 'due-soon' ? 'bg-amber-50/50' : ''}`}
                        >
                          <td className="border border-blue-200 p-2">{task.area}</td>
                          <td className="border border-blue-200 p-2">
                            <Badge variant="outline" className={CLEANING_FREQUENCY[task.frequency]?.color}>
                              {task.frequency}
                            </Badge>
                          </td>
                          <td className="border border-blue-200 p-2">
                            {format(parseISO(task.lastCleaned), 'dd.MM.yyyy')}
                          </td>
                          <td className="border border-blue-200 p-2">
                            {format(parseISO(task.nextDue), 'dd.MM.yyyy')}
                          </td>
                          <td className="border border-blue-200 p-2">
                            {statusDisplay}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="guidelines">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
              <h3 className="text-sm font-medium text-green-800 mb-2">Standardni postupci čišćenja</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Površine u dodiru s hranom</h4>
                  <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
                    <li>Uklonite ostatke hrane i prljavštinu</li>
                    <li>Operite toplom vodom i deterdžentom</li>
                    <li>Isperite čistom vodom</li>
                    <li>Nanesite dezinfekcijsko sredstvo i ostavite propisano vrijeme</li>
                    <li>Isperite čistom vodom (ako je potrebno prema uputama proizvođača)</li>
                    <li>Ostavite da se osuši na zraku</li>
                  </ol>
                </div>
                
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Oprema i uređaji</h4>
                  <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
                    <li>Isključite uređaj iz struje</li>
                    <li>Rastavite dijelove koji se mogu rastaviti</li>
                    <li>Uklonite ostatke hrane i prljavštinu</li>
                    <li>Operite toplom vodom i odgovarajućim sredstvom</li>
                    <li>Dezinficirajte prema uputama</li>
                    <li>Osušite i ponovno sastavite</li>
                  </ol>
                </div>
                
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Podovi i zidovi</h4>
                  <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
                    <li>Uklonite prepreke i smeće</li>
                    <li>Pometite ili usisajte</li>
                    <li>Operite odgovarajućim sredstvom za čišćenje</li>
                    <li>Za uporabnu dezinfekciju koristite razrijeđeno dezinfekcijsko sredstvo</li>
                    <li>Ostavite da se osuši</li>
                  </ol>
                </div>
                
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Hladnjaci i zamrzivači</h4>
                  <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
                    <li>Ispraznite sadržaj u drugi hladnjak/zamrzivač</li>
                    <li>Isključite uređaj</li>
                    <li>Uklonite police i ladice</li>
                    <li>Operite unutrašnjost i dijelove blagim deterdžentom</li>
                    <li>Dezinficirajte sredstvom prikladnim za površine u dodiru s hranom</li>
                    <li>Osušite i ponovno sastavite</li>
                    <li>Uključite uređaj i pričekajte da postigne zadanu temperaturu prije vraćanja hrane</li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-green-700">
                <p className="flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  <strong>Važno:</strong> Uvijek koristite sredstva za čišćenje prema uputama proizvođača.
                </p>
                <p className="flex items-center mt-1">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  <strong>Napomena:</strong> Nosite zaštitnu opremu (rukavice, pregača) prilikom čišćenja.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>U skladu s HACCP načelima, redovito čišćenje i sanitacija su preduvjetni programi koji osiguravaju sigurnost hrane.</p>
          <p>Važno je održavati i dokumentirati redovito čišćenje svih površina i opreme koja dolazi u kontakt s hranom.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SanitizationLog;