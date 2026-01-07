/**
 * VAT Calculator Tool
 *
 * Provides utilities for calculating Value Added Tax (VAT).
 * Supports adding VAT, removing VAT, and calculating VAT amounts.
 *
 * @module tools/vat-calculator
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { VATOperation, VATCalculation } from './types';

// Re-export types and constants
export type { VATOperation, VATCalculation, VATHistoryEntry, VATRate } from './types';
export { COMMON_VAT_RATES, VAT_INFO } from './metadata';

/**
 * addVAT
 *
 * Adds VAT to a net amount.
 * Formula: gross = net * (1 + rate/100)
 *
 * @param netAmount - The net amount (excluding VAT)
 * @param rate - VAT rate as percentage (e.g., 20 for 20%)
 * @returns Calculation result with net, VAT, and gross amounts
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 *
 * @example
 * ```typescript
 * const result = addVAT(100, 20);
 * // Returns: { netAmount: 100, vatAmount: 20, grossAmount: 120 }
 * ```
 */
export const addVAT = (netAmount: number, rate: number): VATCalculation => {
  const vatAmount = netAmount * (rate / 100);
  const grossAmount = netAmount + vatAmount;

  return {
    operation: 'add',
    netAmount: Number(netAmount.toFixed(2)),
    vatAmount: Number(vatAmount.toFixed(2)),
    grossAmount: Number(grossAmount.toFixed(2)),
    rate,
  };
};

/**
 * removeVAT
 *
 * Removes VAT from a gross amount.
 * Formula: net = gross / (1 + rate/100)
 *
 * @param grossAmount - The gross amount (including VAT)
 * @param rate - VAT rate as percentage (e.g., 20 for 20%)
 * @returns Calculation result with net, VAT, and gross amounts
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 *
 * @example
 * ```typescript
 * const result = removeVAT(120, 20);
 * // Returns: { netAmount: 100, vatAmount: 20, grossAmount: 120 }
 * ```
 */
export const removeVAT = (grossAmount: number, rate: number): VATCalculation => {
  const netAmount = grossAmount / (1 + rate / 100);
  const vatAmount = grossAmount - netAmount;

  return {
    operation: 'remove',
    netAmount: Number(netAmount.toFixed(2)),
    vatAmount: Number(vatAmount.toFixed(2)),
    grossAmount: Number(grossAmount.toFixed(2)),
    rate,
  };
};

/**
 * calculateVAT
 *
 * Calculates the VAT component of a gross amount.
 * Formula: vat = gross - (gross / (1 + rate/100))
 *
 * @param grossAmount - The gross amount (including VAT)
 * @param rate - VAT rate as percentage (e.g., 20 for 20%)
 * @returns Calculation result with net, VAT, and gross amounts
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 *
 * @example
 * ```typescript
 * const result = calculateVAT(120, 20);
 * // Returns: { netAmount: 100, vatAmount: 20, grossAmount: 120 }
 * ```
 */
export const calculateVAT = (grossAmount: number, rate: number): VATCalculation => {
  return removeVAT(grossAmount, rate);
};

/**
 * vatCalculator
 *
 * Main VAT calculator function that performs the requested operation.
 *
 * @param operation - Operation to perform ('add', 'remove', 'calculate')
 * @param amount - Input amount
 * @param rate - VAT rate as percentage
 * @returns Calculation result
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 *
 * @example
 * ```typescript
 * vatCalculator('add', 100, 20);    // Add 20% VAT to £100
 * vatCalculator('remove', 120, 20); // Remove 20% VAT from £120
 * ```
 */
export const vatCalculator = (
  operation: VATOperation,
  amount: number,
  rate: number
): VATCalculation => {
  if (amount < 0) {
    throw new Error('Amount must be non-negative');
  }

  if (rate < 0 || rate > 100) {
    throw new Error('VAT rate must be between 0 and 100');
  }

  switch (operation) {
    case 'add':
      return addVAT(amount, rate);
    case 'remove':
      return removeVAT(amount, rate);
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};
