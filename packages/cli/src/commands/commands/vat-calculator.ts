/**
 * VAT Calculator CLI Command
 *
 * Command-line interface for VAT calculations.
 *
 * @module cli/commands/vat-calculator
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { Command } from 'commander';
import { vatCalculator, VATOperation } from '../../vat-calculator';

export const vatCalculatorCommand = new Command('vat')
  .description('Calculate VAT (Value Added Tax)')
  .argument('<operation>', 'Operation: add, remove, or calculate')
  .argument('<amount>', 'Amount to calculate', parseFloat)
  .option('-r, --rate <rate>', 'VAT rate percentage (default: 20 for UK)', '20')
  .addHelpText(
    'after',
    `
Operations:
  add         Add VAT to a net amount
  remove      Remove VAT from a gross amount

Examples:
  $ hu vat add 100                          # Add 20% VAT to £100 → £120
  $ hu vat add 100 -r 19                    # Add 19% VAT (Germany/France)
  $ hu vat remove 120                       # Remove 20% VAT from £120 → £100
  $ hu vat add 250 -r 5                     # Add 5% reduced rate VAT

Common VAT Rates:
  UK:        20% (standard), 5% (reduced), 0% (zero)
  Germany:   19% (standard), 7% (reduced)
  France:    20% (standard), 10% (reduced)
  Spain:     21% (standard)
  Ireland:   23% (standard)
  Australia: 10% (GST)
`
  )
  .action((operation: string, amount: number, options) => {
    try {
      const rate = parseFloat(options.rate);

      // Validate operation
      const validOps = ['add', 'remove'];
      if (!validOps.includes(operation)) {
        console.error(
          `Error: Invalid operation '${operation}'. Must be: add or remove`
        );
        process.exit(1);
      }

      // Validate amount
      if (isNaN(amount) || amount < 0) {
        console.error('Error: Amount must be a non-negative number');
        process.exit(1);
      }

      // Validate rate
      if (isNaN(rate) || rate < 0 || rate > 100) {
        console.error('Error: VAT rate must be between 0 and 100');
        process.exit(1);
      }

      // Perform calculation
      const result = vatCalculator(operation as VATOperation, amount, rate);

      // Format output
      console.log(`VAT Calculation (${rate}% rate)`);
      console.log('═'.repeat(40));
      console.log(`Operation:      ${operation.toUpperCase()}`);
      console.log('');
      console.log(`Net Amount:     £${result.netAmount.toFixed(2)}`);
      console.log(`VAT Amount:     £${result.vatAmount.toFixed(2)}`);
      console.log(`Gross Amount:   £${result.grossAmount.toFixed(2)}`);
      console.log('');
      console.log(`Formula: ${getFormula(operation as VATOperation, rate)}`);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

function getFormula(operation: VATOperation, rate: number): string {
  switch (operation) {
    case 'add':
      return `Gross = Net × (1 + ${rate}/100) = Net × ${(1 + rate / 100).toFixed(2)}`;
    case 'remove':
      return `Net = Gross ÷ (1 + ${rate}/100) = Gross ÷ ${(1 + rate / 100).toFixed(2)}`;
    default:
      return '';
  }
}
