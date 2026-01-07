/**
 * Typography Demo Screen
 *
 * Showcase of all typography components for design approval.
 * DELETE THIS FILE after finalizing typography system.
 *
 * @module screens/TypographyDemoScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { spacing } from '../theme/spacing';
import { Container, Heading, Label, Body, Mono, Caption } from '../components';

export const TypographyDemoScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Headings */}
          <View style={styles.section}>
            <Heading variant="h2" color="primary">Headings (Share Tech)</Heading>
            <Caption>Structural hierarchy for page titles and sections</Caption>
            
            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Heading variant="h1">Heading 1 - 32px</Heading>
              <Heading variant="h2">Heading 2 - 24px</Heading>
              <Heading variant="h3">Heading 3 - 20px</Heading>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Heading variant="h2" color="primary">Primary Color</Heading>
              <Heading variant="h2" color="textSecondary">Secondary Color</Heading>
              <Heading variant="h2" color="textMuted">Muted Color</Heading>
            </View>
          </View>

          {/* Labels */}
          <View style={styles.section}>
            <Heading variant="h2" color="primary">Labels (Share Tech)</Heading>
            <Caption>Form labels and UI labels - 14px</Caption>
            
            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Label>Default Label</Label>
              <Label color="textMuted">Muted Label (Optional)</Label>
              <Label color="primary">Primary Label (Active)</Label>
            </View>
          </View>

          {/* Body Text */}
          <View style={styles.section}>
            <Heading variant="h2" color="primary">Body Text (Overpass)</Heading>
            <Caption>Readable copy with multiple weights</Caption>
            
            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Body size="small">Small Body - 12px</Body>
              <Body size="regular">Regular Body - 14px (default)</Body>
              <Body size="large">Large Body - 16px</Body>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Body variant="regular">Regular Weight (400)</Body>
              <Body variant="medium">Medium Weight (500)</Body>
              <Body variant="semibold">Semibold Weight (600)</Body>
              <Body variant="bold">Bold Weight (700)</Body>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Body color="text">Text Color</Body>
              <Body color="textSecondary">Secondary Text</Body>
              <Body color="textMuted">Muted Text</Body>
              <Body color="primary">Primary Color</Body>
            </View>
          </View>

          {/* Mono Text */}
          <View style={styles.section}>
            <Heading variant="h2" color="primary">Mono Text (Share Tech Mono)</Heading>
            <Caption>Numbers, code, UUIDs, and technical content</Caption>
            
            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Mono size="small">550e8400-e29b-41d4-a716</Mono>
              <Mono size="regular">£1,234.56</Mono>
              <Mono size="large">console.log("Hello")</Mono>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Mono color="text">Default Mono</Mono>
              <Mono color="primary">Primary Mono</Mono>
              <Mono color="textMuted">Muted Mono</Mono>
            </View>
          </View>

          {/* Caption */}
          <View style={styles.section}>
            <Heading variant="h2" color="primary">Caption (Overpass)</Heading>
            <Caption>Small supplementary text - 12px</Caption>
            
            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Caption>Default caption (muted by default)</Caption>
              <Caption color="text">Standard text caption</Caption>
              <Caption color="textSecondary">Secondary caption</Caption>
            </View>
          </View>

          {/* Real-world Examples */}
          <View style={styles.section}>
            <Heading variant="h2" color="primary">Real-world Examples</Heading>
            
            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Heading variant="h3">VAT Calculator</Heading>
              <Body color="textSecondary" style={{ marginTop: spacing.xs }}>
                Calculate VAT - add or remove VAT
              </Body>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Label>Gross Income (Annual)</Label>
              <Mono size="large" color="primary" style={{ marginTop: spacing.xs }}>
                £50,000.00
              </Mono>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <View style={styles.row}>
                <Body color="textMuted">Net Amount</Body>
                <Mono>£100.00</Mono>
              </View>
              <View style={styles.row}>
                <Body color="textMuted">VAT (20%)</Body>
                <Mono color="primary">£20.00</Mono>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.row}>
                <Body variant="semibold">Gross Amount</Body>
                <Mono size="large" color="primary">£120.00</Mono>
              </View>
            </View>

            <View style={[styles.demo, { backgroundColor: colors.surface }]}>
              <Caption align="center">
                Based on UK 2024/25 tax year rates. Last updated: 2025-01-05.{'\n'}
                This is an estimate only. Consult a qualified accountant for accurate tax advice.
              </Caption>
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
  demo: {
    padding: spacing.m,
    borderRadius: 8,
    marginTop: spacing.s,
    gap: spacing.s,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: spacing.s,
  },
});
