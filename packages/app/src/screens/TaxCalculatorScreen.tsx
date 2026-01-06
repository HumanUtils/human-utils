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
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';
import { Container, ToolHeader } from '../components';
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
        <ScrollView showsVerticalScrollIndicator={false}>
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

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text, fontFamily: typography.body }]}>
                Gross Income (Annual)
              </Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.currency, { color: colors.textMuted, fontFamily: typography.mono }]}>
                  {ukSchema.currencySymbol}
                </Text>
                <TextInput
                  style={[styles.input, { color: colors.text, fontFamily: typography.mono }]}
                  value={income}
                  onChangeText={setIncome}
                  placeholder="50000"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text, fontFamily: typography.body }]}>
                Business Expenses (Annual)
              </Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.currency, { color: colors.textMuted, fontFamily: typography.mono }]}>
                  {ukSchema.currencySymbol}
                </Text>
                <TextInput
                  style={[styles.input, { color: colors.text, fontFamily: typography.mono }]}
                  value={expenses}
                  onChangeText={setExpenses}
                  placeholder="5000"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text, fontFamily: typography.body }]}>
                Pension Contributions (Optional)
              </Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.currency, { color: colors.textMuted, fontFamily: typography.mono }]}>
                  {ukSchema.currencySymbol}
                </Text>
                <TextInput
                  style={[styles.input, { color: colors.text, fontFamily: typography.mono }]}
                  value={pension}
                  onChangeText={setPension}
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text, fontFamily: typography.body }]}>
                Student Loan Plan (Optional)
              </Text>
              <View style={styles.planSelector}>
                {STUDENT_LOAN_PLANS.map((plan) => (
                  <TouchableOpacity
                    key={plan.label}
                    style={[
                      styles.planButton,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                      studentLoanPlan === plan.value && { borderColor: colors.primary, backgroundColor: `${colors.primary}20` },
                    ]}
                    onPress={() => setStudentLoanPlan(plan.value)}
                  >
                    <Text
                      style={[
                        styles.planButtonText,
                        { color: colors.text, fontFamily: typography.body },
                        studentLoanPlan === plan.value && { color: colors.primary },
                      ]}
                    >
                      {plan.label}
                    </Text>
                  </TouchableOpacity>
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

              <View style={[styles.resultCard, { backgroundColor: colors.surface }]}>
                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                    Taxable Profit
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                    {formatCurrency(calculations.profit)}
                  </Text>
                </View>

                {calculations.adjustedProfit !== calculations.profit && (
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                      After Pension Contributions
                    </Text>
                    <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                      {formatCurrency(calculations.adjustedProfit)}
                    </Text>
                  </View>
                )}

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                    Income Tax
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                    {formatCurrency(calculations.incomeTax)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                    Class 2 NI
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                    {formatCurrency(calculations.class2NI)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                    Class 4 NI
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                    {formatCurrency(calculations.class4NI)}
                  </Text>
                </View>

                {calculations.studentLoan > 0 && (
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                      Student Loan Repayment
                    </Text>
                    <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                      {formatCurrency(calculations.studentLoan)}
                    </Text>
                  </View>
                )}

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.text, fontFamily: typography.bodySemiBold }]}>
                    Total Tax & NI
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.primary, fontFamily: typography.mono }]}>
                    {formatCurrency(calculations.totalTax)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.text, fontFamily: typography.bodySemiBold }]}>
                    Take-Home Pay
                  </Text>
                  <Text style={[styles.resultValueLarge, { color: colors.primary, fontFamily: typography.mono }]}>
                    {formatCurrency(calculations.takeHome)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                    Effective Tax Rate
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                    {formatPercentage(calculations.effectiveTaxRate)}
                  </Text>
                </View>
              </View>

              <Text style={[styles.disclaimer, { color: colors.textMuted, fontFamily: typography.body }]}>
                Based on UK {ukSchema.taxYear} tax year rates. Last updated: {ukSchema.lastUpdated}.{'\n'}
                This is an estimate only. Consult a qualified accountant for accurate tax advice.{'\n'}
                Source: {ukSchema.source}
              </Text>
            </View>
          )}
        </ScrollView>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.m,
  },
  currency: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: spacing.m,
    outlineStyle: 'none' as any,
  },
  resultCard: {
    borderRadius: 12,
    padding: spacing.l,
    marginBottom: spacing.m,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  resultLabel: {
    fontSize: 14,
  },
  resultValue: {
    fontSize: 16,
  },
  resultValueLarge: {
    fontSize: 20,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: spacing.s,
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
  planButton: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderWidth: 2,
  },
  planButtonText: {
    fontSize: 14,
  },
});
