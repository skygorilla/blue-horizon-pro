export interface Report {
  id: string;
  name: string;
  type: 'menu' | 'inventory' | 'cost' | 'nutrition';
  startDate: string;
  endDate: string;
  data: unknown;
  createdAt: string;
}
