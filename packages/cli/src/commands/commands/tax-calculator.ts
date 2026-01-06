/**
 * Tax Calculator CLI Command
 *
 * Command-line interface for UK self-employed tax calculations.
 *
 * @module cli/commands/tax-calculator
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { Command } from 'commander';
import { taxCalculator } from '../../tax-calculator';

export const taxCalculatorCommand = new Command('tax')
  .description('Calculate UK self-employed tax and National Insurance')
  .requiredOption('-i, --income <amount>', 'Gross annual income', parseFloat)
  .option('-e, --expenses <amount>', 'Annual expenses', parseFloat)
  .option('-p, --pension <amount>', 'Pension contributions', parseFloat)
  .option(
    '-s, --student-loan <plan>',
    'Student loan plan (plan1, plan2, plan4, postgrad)'
  )
  .option('-y, --year <year>', 'Tax year (currently only 2024/25 supported)')
  .addHelpText(
    'after',
    `
Examples:
  $ hu tax -i 50000                         # Calculate tax on £50,000 income
  $ hu tax -i 50000 -e 5000                 # With £5,000 expenses
  $ hu tax -i 50000 -e 5000 -p 2000         # With pension contributions
  $ hu tax -i 50000 -s plan2                # With student loan Plan 2
  $ hu tax -i 75000 -e 10000 -p 5000 -s plan2  # Full calculation
`
  )
  .action((options) => {
    try {
      // Validate inputs
      if (options.income < 0) {
        console.error('Error: Income must be non-negative');
        process.exit(1);
      }

      if (options.expenses && options.expenses < 0) {
        console.error('Error: Expenses must be non-negative');
        process.exit(1);
      }

      if (options.pension && options.pension < 0) {
        console.error('Error: Pension contributions must be non-negative');
        process.exit(1);
      }

      if (options.studentLoan) {
        const validPlans = ['plan1', 'plan2', 'plan4', 'postgrad'];
        if (!validPlans.includes(options.studentLoan)) {
          console.error(
            `Error: Invalid student loan plan. Must be one of: ${validPlans.join(', ')}`
          );
          process.exit(1);
        }
      }

      // Run calculation
      const result = taxCalculator({
        income: options.income,
        expenses: options.expenses,
        pension: options.pension,
        studentLoan: options.studentLoan,
        year: options.year,
      });

      console.log(result);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });
