export type VATOperation = 'add' | 'remove';

export interface VATRate {
  name: string;
  rate: number;
  countries: string[];
}

export interface VATCalculation {
  operation: VATOperation;
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  rate: number;
}

export interface VATHistoryEntry {
  operation: VATOperation;
  input: number;
  result: VATCalculation;
  rate: number;
  timestamp: Date;
}
