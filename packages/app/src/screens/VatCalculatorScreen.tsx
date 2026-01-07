/**
 * VAT Calculator Screen
 *
 * Calculate VAT (Value Added Tax) - add, remove, or calculate VAT amounts.
 * Supports multiple VAT rates for different countries.
 *
 * @module screens/VatCalculatorScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';
import { Card, Chip, Container, Divider, Input, ListItem, ToolHeader } from '../components';
import { Calculator } from 'lucide-react-native';
import { vatCalculator, VATOperation, COMMON_VAT_RATES } from '@human-utils/cli';

const OPERATIONS = [
  { value: 'add' as VATOperation, label: 'Add VAT', description: 'Add VAT to net amount' },
  { value: 'remove' as VATOperation, label: 'Remove VAT', description: 'Remove VAT from gross' },
];

export const VatCalculatorScreen = () => {
  const { colors } = useTheme();
  const [operation, setOperation] = useState<VATOperation>('add');
  const [amount, setAmount] = useState('');
  const [customRate, setCustomRate] = useState('20');
  const [selectedRateIndex, setSelectedRateIndex] = useState(0);

  const currentRate = useMemo(() => {
    if (selectedRateIndex === -1) {
      return parseFloat(customRate) || 0;
    }
    return COMMON_VAT_RATES[selectedRateIndex]?.rate || 20;
  }, [selectedRateIndex, customRate]);

  const calculations = useMemo(() => {
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum < 0) return null;
    if (currentRate < 0 || currentRate > 100) return null;

    try {
      return vatCalculator(operation, amountNum, currentRate);
    } catch {
      return null;
    }
  }, [amount, currentRate, operation]);

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
          <ToolHeader
            icon={Calculator}
            title="VAT Calculator"
            description="Calculate VAT - add or remove VAT"
          />

          {/* Operation Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.heading }]}>
              Operation
            </Text>
            <View style={styles.operationButtons}>
              {OPERATIONS.map((op) => (
                <Chip
                  key={op.value}
                  label={op.label}
                  subtitle={op.description}
                  selected={operation === op.value}
                  onPress={() => setOperation(op.value)}
                  size="large"
                  style={{ flex: 1 }}
                />
              ))}
            </View>
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Input
              label={operation === 'add' ? 'Net Amount' : 'Gross Amount'}
              prefix="£"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="100.00"
              mono
            />
          </View>

          {/* VAT Rate Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.heading }]}>
              VAT Rate
            </Text>
            <View style={styles.rateButtons}>
              {COMMON_VAT_RATES.slice(0, 6).map((rate, index) => (
                <Chip
                  key={index}
                  label={`${rate.rate}%`}
                  subtitle={rate.name}
                  selected={selectedRateIndex === index}
                  onPress={() => setSelectedRateIndex(index)}
                />
              ))}
              <Chip
                label="Custom"
                selected={selectedRateIndex === -1}
                onPress={() => setSelectedRateIndex(-1)}
              />
            </View>

            {selectedRateIndex === -1 && (
              <Input
                value={customRate}
                onChangeText={setCustomRate}
                keyboardType="decimal-pad"
                placeholder="20"
                suffix="%"
                mono
                containerStyle={{ marginTop: spacing.s }}
              />
            )}
          </View>

          {/* Results */}
          {calculations && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.heading }]}>
                Calculation
              </Text>

              <Card style={{ marginBottom: spacing.m }}>
                {operation === 'add' ? (
                  <>
                    <View style={styles.resultRow}>
                      <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                        Net Amount
                      </Text>
                      <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                        {formatCurrency(calculations.netAmount)}
                      </Text>
                    </View>

                    <View style={styles.resultRow}>
                      <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                        VAT ({currentRate}%)
                      </Text>
                      <Text style={[styles.resultValue, { color: colors.primary, fontFamily: typography.mono }]}>
                        {formatCurrency(calculations.vatAmount)}
                      </Text>
                    </View>

                    <Divider spacing="s" />

                    <View style={styles.resultRow}>
                      <Text style={[styles.resultLabel, { color: colors.text, fontFamily: typography.bodySemiBold }]}>
                        Gross Amount
                      </Text>
                      <Text style={[styles.resultValueLarge, { color: colors.primary, fontFamily: typography.mono }]}>
                        {formatCurrency(calculations.grossAmount)}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.resultRow}>
                      <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                        Gross Amount
                      </Text>
                      <Text style={[styles.resultValue, { color: colors.text, fontFamily: typography.mono }]}>
                        {formatCurrency(calculations.grossAmount)}
                      </Text>
                    </View>

                    <View style={styles.resultRow}>
                      <Text style={[styles.resultLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                        VAT ({currentRate}%)
                      </Text>
                      <Text style={[styles.resultValue, { color: colors.primary, fontFamily: typography.mono }]}>
                        {formatCurrency(calculations.vatAmount)}
                      </Text>
                    </View>

                    <Divider spacing="s" />

                    <View style={styles.resultRow}>
                      <Text style={[styles.resultLabel, { color: colors.text, fontFamily: typography.bodySemiBold }]}>
                        Net Amount
                      </Text>
                      <Text style={[styles.resultValueLarge, { color: colors.primary, fontFamily: typography.mono }]}>
                        {formatCurrency(calculations.netAmount)}
                      </Text>
                    </View>
                  </>
                )}
              </Card>

              {/* Formula */}
              <Card>
                <Text style={[styles.formulaLabel, { color: colors.textMuted, fontFamily: typography.body }]}>
                  Formula:
                </Text>
                <Text style={[styles.formulaText, { color: colors.text, fontFamily: typography.mono }]}>
                  {operation === 'add'
                    ? `Gross = Net × (1 + ${currentRate}/100)`
                    : `Net = Gross ÷ (1 + ${currentRate}/100)`}
                </Text>
                <Text style={[styles.formulaCalculation, { color: colors.textMuted, fontFamily: typography.mono }]}>
                  {operation === 'add'
                    ? `= Net × ${(1 + currentRate / 100).toFixed(2)}`
                    : `= Gross ÷ ${(1 + currentRate / 100).toFixed(2)}`}
                </Text>
              </Card>
            </View>
          )}

          {/* Info Card */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.heading }]}>
              Common VAT Rates
            </Text>
            <Card>
              {COMMON_VAT_RATES.slice(0, 8).map((rate, index) => (
                <ListItem
                  key={index}
                  title={rate.name}
                  rightContent={
                    <Text style={{ color: colors.textMuted, fontFamily: typography.mono, fontSize: 14 }}>
                      {rate.rate}%
                    </Text>
                  }
                />
              ))}
            </Card>
          </View>
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
  operationButtons: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  rateButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
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
  formulaLabel: {
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  formulaText: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  formulaCalculation: {
    fontSize: 14,
  },
});