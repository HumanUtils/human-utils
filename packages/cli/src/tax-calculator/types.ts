export interface TaxBand {
  name: string;
  threshold: number;
  limit: number | null;
  rate: number;
}

export interface TaxSchema {
  country: string;
  taxYear: string;
  currency: string;
  currencySymbol: string;
  lastUpdated: string;
  source: string;
  incomeTax: {
    personalAllowance: number;
    personalAllowanceTaperStart?: number;
    personalAllowanceTaperRate?: number;
    bands: TaxBand[];
  };
  nationalInsurance?: {
    class2?: {
      weeklyRate: number;
      annualThreshold: number;
    };
    class4?: {
      bands: TaxBand[];
    };
  };
  studentLoan?: {
    plan1?: { threshold: number; rate: number };
    plan2?: { threshold: number; rate: number };
    plan4?: { threshold: number; rate: number };
    postgrad?: { threshold: number; rate: number };
  };
}

export interface TaxInputs {
  grossIncome: number;
  expenses: number;
  otherIncome?: number;
  pensionContributions?: number;
  studentLoanPlan?: 'plan1' | 'plan2' | 'plan4' | 'postgrad' | null;
}

export interface TaxCalculation {
  profit: number;
  adjustedProfit: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  incomeTaxBreakdown: Array<{ band: string; amount: number; tax: number }>;
  class2NI: number;
  class4NI: number;
  class4NIBreakdown: Array<{ band: string; amount: number; ni: number }>;
  totalNI: number;
  studentLoan: number;
  totalTax: number;
  takeHome: number;
  effectiveTaxRate: number;
}
