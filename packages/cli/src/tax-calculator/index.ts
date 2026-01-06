import { TaxBand, TaxSchema, TaxInputs, TaxCalculation } from './types';

// Re-export types
export type { TaxBand, TaxSchema, TaxInputs, TaxCalculation } from './types';

// Embedded UK 2024/25 tax schema
const UK_2024_25_SCHEMA: TaxSchema = {
  country: 'UK',
  taxYear: '2024/25',
  currency: 'GBP',
  currencySymbol: '£',
  lastUpdated: '2025-01-05',
  source: 'https://www.gov.uk/income-tax-rates',
  incomeTax: {
    personalAllowance: 12570,
    personalAllowanceTaperStart: 100000,
    personalAllowanceTaperRate: 0.5,
    bands: [
      {
        name: 'Basic Rate',
        threshold: 12570,
        limit: 50270,
        rate: 0.2,
      },
      {
        name: 'Higher Rate',
        threshold: 50270,
        limit: 125140,
        rate: 0.4,
      },
      {
        name: 'Additional Rate',
        threshold: 125140,
        limit: null,
        rate: 0.45,
      },
    ],
  },
  nationalInsurance: {
    class2: {
      weeklyRate: 3.45,
      annualThreshold: 12570,
    },
    class4: {
      bands: [
        {
          name: 'Lower Band',
          threshold: 12570,
          limit: 50270,
          rate: 0.09,
        },
        {
          name: 'Upper Band',
          threshold: 50270,
          limit: null,
          rate: 0.02,
        },
      ],
    },
  },
  studentLoan: {
    plan1: {
      threshold: 24990,
      rate: 0.09,
    },
    plan2: {
      threshold: 27295,
      rate: 0.09,
    },
    plan4: {
      threshold: 31395,
      rate: 0.09,
    },
    postgrad: {
      threshold: 21000,
      rate: 0.06,
    },
  },
};

/**
 * Calculate tax based on schema and inputs
 */
export function calculateTax(schema: TaxSchema, inputs: TaxInputs): TaxCalculation {
  const profit = Math.max(0, inputs.grossIncome - inputs.expenses);
  const pensionContributions = inputs.pensionContributions || 0;
  const adjustedProfit = profit - pensionContributions;
  const totalIncome = adjustedProfit + (inputs.otherIncome || 0);

  // Calculate personal allowance (with taper if applicable)
  let personalAllowance = schema.incomeTax.personalAllowance;
  if (
    schema.incomeTax.personalAllowanceTaperStart &&
    schema.incomeTax.personalAllowanceTaperRate &&
    totalIncome > schema.incomeTax.personalAllowanceTaperStart
  ) {
    const excess = totalIncome - schema.incomeTax.personalAllowanceTaperStart;
    const reduction = excess * schema.incomeTax.personalAllowanceTaperRate;
    personalAllowance = Math.max(0, personalAllowance - reduction);
  }

  const taxableIncome = Math.max(0, totalIncome - personalAllowance);

  // Calculate income tax
  let incomeTax = 0;
  const incomeTaxBreakdown: Array<{ band: string; amount: number; tax: number }> = [];

  for (const band of schema.incomeTax.bands) {
    if (taxableIncome <= band.threshold) break;

    const bandStart = band.threshold;
    const bandEnd = band.limit || Infinity;
    const taxableInBand = Math.min(taxableIncome, bandEnd) - bandStart;

    if (taxableInBand > 0) {
      const taxForBand = taxableInBand * band.rate;
      incomeTax += taxForBand;
      incomeTaxBreakdown.push({
        band: band.name,
        amount: taxableInBand,
        tax: taxForBand,
      });
    }
  }

  // Calculate National Insurance (UK specific)
  let class2NI = 0;
  let class4NI = 0;
  const class4NIBreakdown: Array<{ band: string; amount: number; ni: number }> = [];

  if (schema.nationalInsurance) {
    // Class 2 NI
    if (
      schema.nationalInsurance.class2 &&
      adjustedProfit >= schema.nationalInsurance.class2.annualThreshold
    ) {
      class2NI = schema.nationalInsurance.class2.weeklyRate * 52;
    }

    // Class 4 NI
    if (schema.nationalInsurance.class4) {
      for (const band of schema.nationalInsurance.class4.bands) {
        if (adjustedProfit <= band.threshold) break;

        const bandStart = band.threshold;
        const bandEnd = band.limit || Infinity;
        const profitInBand = Math.min(adjustedProfit, bandEnd) - bandStart;

        if (profitInBand > 0) {
          const niForBand = profitInBand * band.rate;
          class4NI += niForBand;
          class4NIBreakdown.push({
            band: band.name,
            amount: profitInBand,
            ni: niForBand,
          });
        }
      }
    }
  }

  const totalNI = class2NI + class4NI;

  // Calculate student loan repayment
  let studentLoan = 0;
  if (inputs.studentLoanPlan && schema.studentLoan) {
    const plan = schema.studentLoan[inputs.studentLoanPlan];
    if (plan && totalIncome > plan.threshold) {
      studentLoan = (totalIncome - plan.threshold) * plan.rate;
    }
  }

  const totalTax = incomeTax + totalNI + studentLoan;
  const takeHome = profit - totalTax;
  const effectiveTaxRate = profit > 0 ? (totalTax / profit) * 100 : 0;

  return {
    profit,
    adjustedProfit,
    personalAllowance,
    taxableIncome,
    incomeTax,
    incomeTaxBreakdown,
    class2NI,
    class4NI,
    class4NIBreakdown,
    totalNI,
    studentLoan,
    totalTax,
    takeHome,
    effectiveTaxRate,
  };
}

/**
 * CLI-specific helper to format tax calculation output
 */
export function formatTaxOutput(result: TaxCalculation, currency: string = '£'): string {
  const lines: string[] = [];

  lines.push('Tax Calculation (UK 2024/25)');
  lines.push('═'.repeat(50));
  lines.push('');
  lines.push('Income:');
  lines.push(`  Profit:                ${currency}${result.profit.toFixed(2)}`);
  lines.push(`  Adjusted Profit:       ${currency}${result.adjustedProfit.toFixed(2)}`);
  lines.push(`  Personal Allowance:    ${currency}${result.personalAllowance.toFixed(2)}`);
  lines.push(`  Taxable Income:        ${currency}${result.taxableIncome.toFixed(2)}`);
  lines.push('');

  if (result.incomeTaxBreakdown.length > 0) {
    lines.push('Income Tax:');
    for (const breakdown of result.incomeTaxBreakdown) {
      lines.push(`  ${breakdown.band}: ${currency}${breakdown.tax.toFixed(2)}`);
    }
    lines.push(`  Total Income Tax:      ${currency}${result.incomeTax.toFixed(2)}`);
    lines.push('');
  }

  if (result.totalNI > 0) {
    lines.push('National Insurance:');
    lines.push(`  Class 2 NI:            ${currency}${result.class2NI.toFixed(2)}`);
    if (result.class4NIBreakdown.length > 0) {
      for (const breakdown of result.class4NIBreakdown) {
        lines.push(`  Class 4 (${breakdown.band}): ${currency}${breakdown.ni.toFixed(2)}`);
      }
    }
    lines.push(`  Total NI:              ${currency}${result.totalNI.toFixed(2)}`);
    lines.push('');
  }

  if (result.studentLoan > 0) {
    lines.push(`Student Loan:           ${currency}${result.studentLoan.toFixed(2)}`);
    lines.push('');
  }

  lines.push('Summary:');
  lines.push('─'.repeat(50));
  lines.push(`Total Tax:              ${currency}${result.totalTax.toFixed(2)}`);
  lines.push(`Take Home:              ${currency}${result.takeHome.toFixed(2)}`);
  lines.push(`Effective Tax Rate:     ${result.effectiveTaxRate.toFixed(2)}%`);

  return lines.join('\n');
}

/**
 * CLI entry point
 */
export function taxCalculator(options: {
  income: number;
  expenses?: number;
  pension?: number;
  studentLoan?: 'plan1' | 'plan2' | 'plan4' | 'postgrad';
  year?: string;
}): string {
  const inputs: TaxInputs = {
    grossIncome: options.income,
    expenses: options.expenses || 0,
    pensionContributions: options.pension,
    studentLoanPlan: options.studentLoan || null,
  };

  // Currently only UK 2024/25 supported
  const schema = UK_2024_25_SCHEMA;
  const result = calculateTax(schema, inputs);

  return formatTaxOutput(result, schema.currencySymbol);
}
