/**
 * Input Demo Screen
 *
 * Showcase all input components and variants for design approval.
 * Temporary file - will be deleted after refactoring existing screens.
 *
 * @module screens/InputDemoScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { spacing } from '../theme/spacing';
import { Container, ToolHeader, Input, Button, Heading, Body, Caption, Label } from '../components';
import { Settings } from 'lucide-react-native';

export const InputDemoScreen = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [income, setIncome] = useState('');
  const [rate, setRate] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [errorField, setErrorField] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ToolHeader
            icon={Settings}
            title="Input Components"
            description="Design system input showcase"
          />

          {/* Basic Inputs */}
          <View style={styles.section}>
            <Heading variant="h3">Basic Inputs</Heading>
            <Caption color="textMuted">Standard text inputs with labels</Caption>

            <View style={styles.demoGroup}>
              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="user@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Full Name"
                value={email}
                onChangeText={setEmail}
                placeholder="John Smith"
              />

              <Input
                label="Optional Field"
                value={email}
                onChangeText={setEmail}
                placeholder="Leave blank if not applicable"
              />
            </View>
          </View>

          {/* Currency Inputs */}
          <View style={styles.section}>
            <Heading variant="h3">Currency Inputs</Heading>
            <Caption color="textMuted">Inputs with currency prefix</Caption>

            <View style={styles.demoGroup}>
              <Input
                label="Gross Income (Annual)"
                prefix="£"
                value={income}
                onChangeText={setIncome}
                placeholder="50000"
                keyboardType="numeric"
                mono
              />

              <Input
                label="Business Expenses"
                prefix="$"
                value={income}
                onChangeText={setIncome}
                placeholder="10000.00"
                keyboardType="numeric"
                mono
              />

              <Input
                label="Net Amount"
                prefix="€"
                value={income}
                onChangeText={setIncome}
                placeholder="100.00"
                keyboardType="numeric"
                mono
              />
            </View>
          </View>

          {/* Percentage & Unit Inputs */}
          <View style={styles.section}>
            <Heading variant="h3">Percentage & Unit Inputs</Heading>
            <Caption color="textMuted">Inputs with suffix indicators</Caption>

            <View style={styles.demoGroup}>
              <Input
                label="VAT Rate"
                suffix="%"
                value={rate}
                onChangeText={setRate}
                placeholder="20"
                keyboardType="numeric"
                mono
              />

              <Input
                label="Product Weight"
                suffix="kg"
                value={weight}
                onChangeText={setWeight}
                placeholder="2.5"
                keyboardType="numeric"
                mono
              />

              <Input
                label="Discount"
                suffix="%"
                value={rate}
                onChangeText={setRate}
                placeholder="10"
                keyboardType="numeric"
                mono
              />
            </View>
          </View>

          {/* Error States */}
          <View style={styles.section}>
            <Heading variant="h3">Error States</Heading>
            <Caption color="textMuted">Inputs with validation errors</Caption>

            <View style={styles.demoGroup}>
              <Input
                label="Amount"
                prefix="£"
                value={errorField}
                onChangeText={setErrorField}
                placeholder="0.00"
                keyboardType="numeric"
                mono
                error="Amount must be greater than zero"
              />

              <Input
                label="Email"
                value={errorField}
                onChangeText={setErrorField}
                placeholder="user@example.com"
                error="Please enter a valid email address"
              />

              <Input
                label="Required Field"
                value={errorField}
                onChangeText={setErrorField}
                placeholder="Cannot be empty"
                error="This field is required"
              />
            </View>
          </View>

          {/* Multiline Inputs */}
          <View style={styles.section}>
            <Heading variant="h3">Multiline Inputs</Heading>
            <Caption color="textMuted">Text areas for longer content</Caption>

            <View style={styles.demoGroup}>
              <Input
                label="Notes"
                value={notes}
                onChangeText={setNotes}
                placeholder="Enter additional notes..."
                multiline
                rows={4}
              />

              <Input
                label="Description"
                value={notes}
                onChangeText={setNotes}
                placeholder="Describe your product or service..."
                multiline
                rows={6}
              />
            </View>
          </View>

          {/* Monospace vs Regular */}
          <View style={styles.section}>
            <Heading variant="h3">Font Variants</Heading>
            <Caption color="textMuted">Monospace for numbers, regular for text</Caption>

            <View style={styles.demoGroup}>
              <Label size="large">Regular Font</Label>
              <Input
                value="The quick brown fox"
                onChangeText={() => {}}
                placeholder="Standard text input"
              />

              <Label size="large">Monospace Font</Label>
              <Input
                value="1234567890"
                onChangeText={() => {}}
                placeholder="Numbers and code"
                mono
              />
            </View>
          </View>

          {/* Real-world Example */}
          <View style={styles.section}>
            <Heading variant="h3">Real-world Example</Heading>
            <Caption color="textMuted">VAT Calculator form</Caption>

            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Heading variant="h3" color="primary">VAT Calculator</Heading>
              <Body color="textSecondary" style={{ marginBottom: spacing.l }}>
                Calculate VAT on amounts
              </Body>

              <Input
                label="Net Amount"
                prefix="£"
                value={income}
                onChangeText={setIncome}
                placeholder="100.00"
                keyboardType="numeric"
                mono
              />

              <Input
                label="VAT Rate"
                suffix="%"
                value={rate}
                onChangeText={setRate}
                placeholder="20"
                keyboardType="numeric"
                mono
              />

              <Button variant="primary" fullWidth onPress={() => {}}>
                Calculate
              </Button>
            </View>
          </View>
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
  demoGroup: {
    marginTop: spacing.m,
  },
  card: {
    padding: spacing.l,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: spacing.m,
  },
});
