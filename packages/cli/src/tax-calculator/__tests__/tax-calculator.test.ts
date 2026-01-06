/**
 * Tax Calculator CLI Tests
 *
 * Test suite for tax calculation functionality.
 *
 * @module cli/tax-calculator/__tests__
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { calculateTax, formatTaxOutput, taxCalculator } from '../index';
import { TaxSchema, TaxInputs } from '../types';

// Test schema (simplified UK 2024/25)
const testSchema: TaxSchema = {
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
      { name: 'Basic Rate', threshold: 12570, limit: 50270, rate: 0.2 },
      { name: 'Higher Rate', threshold: 50270, limit: 125140, rate: 0.4 },
      { name: 'Additional Rate', threshold: 125140, limit: null, rate: 0.45 },
    ],
  },
  nationalInsurance: {
    class2: { weeklyRate: 3.45, annualThreshold: 12570 },
    class4: {
      bands: [
        { name: 'Lower Band', threshold: 12570, limit: 50270, rate: 0.09 },
        { name: 'Upper Band', threshold: 50270, limit: null, rate: 0.02 },
      ],
    },
  },
  studentLoan: {
    plan1: { threshold: 24990, rate: 0.09 },
    plan2: { threshold: 27295, rate: 0.09 },
    plan4: { threshold: 31395, rate: 0.09 },
    postgrad: { threshold: 21000, rate: 0.06 },
  },
};

describe('calculateTax', () => {
  it('should calculate basic rate tax correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 30000,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.profit).toBe(30000);
    expect(result.personalAllowance).toBe(12570);
    expect(result.taxableIncome).toBe(17430);
    expect(result.incomeTax).toBeCloseTo(17430 * 0.2, 2);
  });

  it('should handle expenses correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 30000,
      expenses: 5000,
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.profit).toBe(25000);
    expect(result.adjustedProfit).toBe(25000);
  });

  it('should calculate pension relief correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 50000,
      expenses: 0,
      pensionContributions: 5000,
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.profit).toBe(50000);
    expect(result.adjustedProfit).toBe(45000);
    expect(result.taxableIncome).toBe(45000 - 12570);
  });

  it('should calculate Class 2 NI for profits above threshold', () => {
    const inputs: TaxInputs = {
      grossIncome: 20000,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.class2NI).toBeCloseTo(3.45 * 52, 2);
  });

  it('should not charge Class 2 NI below threshold', () => {
    const inputs: TaxInputs = {
      grossIncome: 10000,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.class2NI).toBe(0);
  });

  it('should calculate Class 4 NI correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 30000,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    const profitAboveThreshold = 30000 - 12570;
    const expectedClass4 = profitAboveThreshold * 0.09;

    expect(result.class4NI).toBeCloseTo(expectedClass4, 2);
  });

  it('should calculate student loan repayment for Plan 2', () => {
    const inputs: TaxInputs = {
      grossIncome: 40000,
      expenses: 0,
      studentLoanPlan: 'plan2',
    };

    const result = calculateTax(testSchema, inputs);

    const repayableIncome = 40000 - 27295;
    const expectedRepayment = repayableIncome * 0.09;

    expect(result.studentLoan).toBeCloseTo(expectedRepayment, 2);
  });

  it('should not charge student loan below threshold', () => {
    const inputs: TaxInputs = {
      grossIncome: 25000,
      expenses: 0,
      studentLoanPlan: 'plan2',
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.studentLoan).toBe(0);
  });

  it('should calculate personal allowance taper correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 110000,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    const excess = 110000 - 100000;
    const reduction = excess * 0.5;
    const expectedAllowance = 12570 - reduction;

    expect(result.personalAllowance).toBeCloseTo(expectedAllowance, 2);
  });

  it('should handle zero income correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 0,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    expect(result.profit).toBe(0);
    expect(result.incomeTax).toBe(0);
    expect(result.totalNI).toBe(0);
    expect(result.totalTax).toBe(0);
    expect(result.effectiveTaxRate).toBe(0);
  });

  it('should calculate higher rate tax correctly', () => {
    const inputs: TaxInputs = {
      grossIncome: 60000,
      expenses: 0,
    };

    const result = calculateTax(testSchema, inputs);

    const basicRateTax = (50270 - 12570) * 0.2;
    const higherRateTax = (60000 - 50270) * 0.4;

    expect(result.incomeTax).toBeCloseTo(basicRateTax + higherRateTax, 2);
  });
});

describe('formatTaxOutput', () => {
  it('should format output with correct structure', () => {
    const inputs: TaxInputs = {
      grossIncome: 50000,
      expenses: 5000,
    };

    const result = calculateTax(testSchema, inputs);
    const output = formatTaxOutput(result, '£');

    expect(output).toContain('Tax Calculation (UK 2024/25)');
    expect(output).toContain('Profit:');
    expect(output).toContain('Income Tax:');
    expect(output).toContain('National Insurance:');
    expect(output).toContain('Take Home:');
  });

  it('should include student loan section when applicable', () => {
    const inputs: TaxInputs = {
      grossIncome: 40000,
      expenses: 0,
      studentLoanPlan: 'plan2',
    };

    const result = calculateTax(testSchema, inputs);
    const output = formatTaxOutput(result, '£');

    expect(output).toContain('Student Loan:');
  });
});

describe('taxCalculator', () => {
  it('should return formatted string output', () => {
    const result = taxCalculator({
      income: 50000,
      expenses: 5000,
    });

    expect(typeof result).toBe('string');
    expect(result).toContain('Tax Calculation');
    expect(result).toContain('£');
  });

  it('should handle pension contributions', () => {
    const result = taxCalculator({
      income: 50000,
      expenses: 5000,
      pension: 3000,
    });

    expect(result).toContain('Adjusted Profit:');
  });

  it('should handle student loan plans', () => {
    const result = taxCalculator({
      income: 40000,
      studentLoan: 'plan2',
    });

    expect(result).toContain('Student Loan:');
  });
});
