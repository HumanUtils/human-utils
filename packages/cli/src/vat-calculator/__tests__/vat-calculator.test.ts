/**
 * VAT Calculator CLI Tests
 *
 * Test suite for VAT calculation functionality.
 *
 * @module cli/vat-calculator/__tests__
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { addVAT, removeVAT, calculateVAT, vatCalculator } from '../index';

describe('addVAT', () => {
  it('should add 20% VAT to £100', () => {
    const result = addVAT(100, 20);

    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(20);
    expect(result.grossAmount).toBe(120);
    expect(result.rate).toBe(20);
    expect(result.operation).toBe('add');
  });

  it('should add 5% VAT correctly', () => {
    const result = addVAT(100, 5);

    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(5);
    expect(result.grossAmount).toBe(105);
  });

  it('should handle decimal amounts', () => {
    const result = addVAT(99.99, 20);

    expect(result.netAmount).toBe(99.99);
    expect(result.vatAmount).toBe(20);
    expect(result.grossAmount).toBe(119.99);
  });

  it('should handle zero VAT rate', () => {
    const result = addVAT(100, 0);

    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(0);
    expect(result.grossAmount).toBe(100);
  });

  it('should round to 2 decimal places', () => {
    const result = addVAT(33.33, 20);

    expect(result.vatAmount).toBe(6.67);
    expect(result.grossAmount).toBe(40);
  });
});

describe('removeVAT', () => {
  it('should remove 20% VAT from £120', () => {
    const result = removeVAT(120, 20);

    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(20);
    expect(result.grossAmount).toBe(120);
    expect(result.rate).toBe(20);
    expect(result.operation).toBe('remove');
  });

  it('should remove 5% VAT correctly', () => {
    const result = removeVAT(105, 5);

    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(5);
    expect(result.grossAmount).toBe(105);
  });

  it('should handle decimal amounts', () => {
    const result = removeVAT(119.99, 20);

    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(19.99);
    expect(result.grossAmount).toBe(119.99);
  });

  it('should be inverse of addVAT', () => {
    const added = addVAT(100, 20);
    const removed = removeVAT(added.grossAmount, 20);

    expect(removed.netAmount).toBeCloseTo(100, 2);
    expect(removed.grossAmount).toBeCloseTo(120, 2);
  });

  it('should round to 2 decimal places', () => {
    const result = removeVAT(40, 20);

    expect(result.netAmount).toBe(33.33);
    expect(result.vatAmount).toBe(6.67);
  });
});

describe('calculateVAT', () => {
  it('should calculate VAT component', () => {
    const result = calculateVAT(120, 20);

    expect(result.vatAmount).toBe(20);
    expect(result.netAmount).toBe(100);
  });

  it('should be equivalent to removeVAT', () => {
    const calculated = calculateVAT(120, 20);
    const removed = removeVAT(120, 20);

    expect(calculated).toEqual(removed);
  });
});

describe('vatCalculator', () => {
  it('should perform add operation', () => {
    const result = vatCalculator('add', 100, 20);

    expect(result.operation).toBe('add');
    expect(result.grossAmount).toBe(120);
  });

  it('should perform remove operation', () => {
    const result = vatCalculator('remove', 120, 20);

    expect(result.operation).toBe('remove');
    expect(result.netAmount).toBe(100);
  });

  it('should throw error for negative amount', () => {
    expect(() => vatCalculator('add', -100, 20)).toThrow('Amount must be non-negative');
  });

  it('should throw error for invalid VAT rate', () => {
    expect(() => vatCalculator('add', 100, -5)).toThrow(
      'VAT rate must be between 0 and 100'
    );
    expect(() => vatCalculator('add', 100, 101)).toThrow(
      'VAT rate must be between 0 and 100'
    );
  });

  it('should throw error for unknown operation', () => {
    expect(() => vatCalculator('invalid' as any, 100, 20)).toThrow('Unknown operation');
  });
});

describe('Real-world scenarios', () => {
  it('should handle UK standard VAT (20%)', () => {
    const net = 250;
    const withVAT = addVAT(net, 20);

    expect(withVAT.grossAmount).toBe(300);
    expect(withVAT.vatAmount).toBe(50);
  });

  it('should handle EU VAT (19%)', () => {
    const gross = 119;
    const withoutVAT = removeVAT(gross, 19);

    expect(withoutVAT.netAmount).toBe(100);
    expect(withoutVAT.vatAmount).toBe(19);
  });

  it('should handle reduced rate (5%)', () => {
    const net = 1000;
    const withVAT = addVAT(net, 5);

    expect(withVAT.grossAmount).toBe(1050);
    expect(withVAT.vatAmount).toBe(50);
  });

  it('should handle Swiss VAT (8.1%)', () => {
    const net = 100;
    const withVAT = addVAT(net, 8.1);

    expect(withVAT.vatAmount).toBe(8.1);
    expect(withVAT.grossAmount).toBe(108.1);
  });
});
