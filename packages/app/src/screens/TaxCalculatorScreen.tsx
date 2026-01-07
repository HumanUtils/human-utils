/**
 * Self-Employed Tax Calculator Screen
 *
 * Calculate self-employed tax using schema-driven calculation engine
 * Supports multiple countries and tax years via JSON schemas
 * 
 * @module screens/TaxCalculatorScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';
import { Card, Chip, Container, Divider, Input, ListItem, ToolHeader } from '../components';
import { Receipt } from 'lucide-react-native';
import { calculateTax, TaxInputs, TaxSchema } from '@human-utils/cli';

// UK 2024/25 Tax Schema
const ukSchema: TaxSchema = {
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

const STUDENT_LOAN_PLANS = [
  { value: null, label: 'None' },
  { value: 'plan1', label: 'Plan 1' },
  { value: 'plan2', label: 'Plan 2' },
  { value: 'plan4', label: 'Plan 4 (Scotland)' },
  { value: 'postgrad', label: 'Postgraduate' },
] as const;

export const TaxCalculatorScreen = () => {
  const { colors } = useTheme();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [pension, setPension] = useState('');
  const [studentLoanPlan, setStudentLoanPlan] = useState<'plan1' | 'plan2' | 'plan4' | 'postgrad' | null>(null);

  const calculations = useMemo(() => {
    const inputs: TaxInputs = {
      grossIncome: parseFloat(income) || 0,
      expenses: parseFloat(expenses) || 0,
      pensionContributions: parseFloat(pension) || 0,
      studentLoanPlan,
    };

    if (inputs.grossIncome === 0) return null;

    return calculateTax(ukSchema, inputs);
  }, [income, expenses, pension, studentLoanPlan]);

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
          <ToolHeader
            icon={Receipt}
            title="Self-Employed Tax Calculator"
            description="Calculate UK self-employed tax, National Insurance, and take-home pay"
          />

          {/* Input Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.heading }]}>
              Income & Expenses ({ukSchema.taxYear})
            </Text>

            <Input
              label="Gross Income (Annual)"
              prefix={ukSchema.currencySymbol}
              value={income}
              onChangeText={setIncome}
              placeholder="50000"
              keyboardType="decimal-pad"
              mono
            />

            <Input
              label="Business Expenses (Annual)"
              prefix={ukSchema.currencySymbol}
              value={expenses}
              onChangeText={setExpenses}
              placeholder="5000"
              keyboardType="decimal-pad"
              mono
            />

            <Input
              label="Pension Contributions (Optional)"
              prefix={ukSchema.currencySymbol}
              value={pension}
              onChangeText={setPension}
              placeholder="0"
              keyboardType="decimal-pad"
              mono
            />

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text, fontFamily: typography.body }]}>
                Student Loan Plan (Optional)
              </Text>
              <View style={styles.planSelector}>
                {STUDENT_LOAN_PLANS.map((plan) => (
                  <Chip
                    key={plan.label}
                    label={plan.label}
                    selected={studentLoanPlan === plan.value}
                    onPress={() => setStudentLoanPlan(plan.value)}
                    size="small"
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Results Section */}
          {calculations && calculations.profit > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.heading }]}>
                Tax Breakdown
              </Text>

              <Card>
                <ListItem
                  title="Taxable Profit"
                  titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                      {formatCurrency(calculations.profit)}
                    </Text>
                  }
                />

                {calculations.adjustedProfit !== calculations.profit && (
                  <ListItem
                    title="After Pension Contributions"
                    titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                    rightContent={
                      <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                        {formatCurrency(calculations.adjustedProfit)}
                      </Text>
                    }
                  />
                )}

                <Divider spacing="s" />

                <ListItem
                  title="Income Tax"
                  titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                      {formatCurrency(calculations.incomeTax)}
                    </Text>
                  }
                />

                <ListItem
                  title="Class 2 NI"
                  titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                      {formatCurrency(calculations.class2NI)}
                    </Text>
                  }
                />

                <ListItem
                  title="Class 4 NI"
                  titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                      {formatCurrency(calculations.class4NI)}
                    </Text>
                  }
                />

                {calculations.studentLoan > 0 && (
                  <ListItem
                    title="Student Loan Repayment"
                    titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                    rightContent={
                      <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                        {formatCurrency(calculations.studentLoan)}
                      </Text>
                    }
                  />
                )}

                <Divider spacing="s" />

                <ListItem
                  title="Total Tax & NI"
                  titleStyle={{ color: colors.text, fontFamily: typography.bodySemiBold, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.primary, fontFamily: typography.mono, fontSize: 16 }}>
                      {formatCurrency(calculations.totalTax)}
                    </Text>
                  }
                />

                <ListItem
                  title="Take-Home Pay"
                  titleStyle={{ color: colors.text, fontFamily: typography.bodySemiBold, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.primary, fontFamily: typography.mono, fontSize: 20, fontWeight: '600' }}>
                      {formatCurrency(calculations.takeHome)}
                    </Text>
                  }
                />

                <ListItem
                  title="Effective Tax Rate"
                  titleStyle={{ color: colors.textMuted, fontFamily: typography.body, fontSize: 14 }}
                  rightContent={
                    <Text style={{ color: colors.text, fontFamily: typography.mono, fontSize: 16 }}>
                      {formatPercentage(calculations.effectiveTaxRate)}
                    </Text>
                  }
                />
              </Card>

              <Text style={[styles.disclaimer, { color: colors.textMuted, fontFamily: typography.body }]}>
                Based on UK {ukSchema.taxYear} tax year rates. Last updated: {ukSchema.lastUpdated}.{'\n'}
                This is an estimate only. Consult a qualified accountant for accurate tax advice.{'\n'}
                Source: {ukSchema.source}
              </Text>
            </View>
          )}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: spacing.m,
  },
  inputContainer: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
  planSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
});
