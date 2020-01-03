export interface Transaction {
  amount: number;
  description: string;
  date: string;
  source: string;
  // UUID to identify duplicates
  id: string;
}
