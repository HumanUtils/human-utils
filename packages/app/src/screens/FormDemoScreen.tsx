/**
 * Form Demo Screen
 *
 * Demonstrates form validation with react-hook-form and zod.
 * Shows best practices for form handling in React Native.
 *
 * @module screens/FormDemoScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { Heading, Body, Label } from '../components/Typography';
import { ControlledInput } from '../components/ControlledInput';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

// Form validation schema
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const registrationSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    income: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function FormDemoScreen() {
  const { colors } = useTheme();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      income: '',
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    Alert.alert('Login Success', `Email: ${data.email}`);
  };

  const onRegistrationSubmit = (data: RegistrationFormData) => {
    Alert.alert('Registration Success', `Welcome, ${data.fullName}!`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Heading variant="h1" style={{ color: colors.text, marginBottom: spacing.xl }}>Form Demo</Heading>

          <Body variant="medium" style={{ color: colors.textSecondary, marginBottom: spacing.xl }}>
            Demonstrates react-hook-form with zod validation, KeyboardAvoidingView, and proper
            form patterns.
          </Body>

          {/* Login Form */}
          <View style={[styles.section, { borderColor: colors.border }]}>
            <Heading variant="h3" style={{ color: colors.text, marginBottom: spacing.m }}>Login Form</Heading>

            <Body style={{ color: colors.textSecondary, marginBottom: spacing.l }}>
              Email validation and minimum password length (8 characters).
            </Body>

            <View style={styles.form}>
              <ControlledInput
                control={loginForm.control}
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <ControlledInput
                control={loginForm.control}
                name="password"
                label="Password"
                placeholder="Enter password"
                secureTextEntry
              />

              <Button
                onPress={loginForm.handleSubmit(onLoginSubmit)}
                variant="primary"
                style={{ marginTop: spacing.s }}
              >
                Sign In
              </Button>
            </View>
          </View>

          {/* Registration Form */}
          <View style={[styles.section, { borderColor: colors.border }]}>
            <Heading variant="h3" style={{ color: colors.text, marginBottom: spacing.m }}>Registration Form</Heading>

            <Body style={{ color: colors.textSecondary, marginBottom: spacing.l }}>
              Complex validation: email format, password match, numeric currency input with prefix.
            </Body>

            <View style={styles.form}>
              <ControlledInput
                control={registrationForm.control}
                name="fullName"
                label="Full Name"
                placeholder="John Smith"
                autoCapitalize="words"
              />

              <ControlledInput
                control={registrationForm.control}
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <ControlledInput
                control={registrationForm.control}
                name="password"
                label="Password"
                placeholder="Minimum 8 characters"
                secureTextEntry
              />

              <ControlledInput
                control={registrationForm.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter password"
                secureTextEntry
              />

              <ControlledInput
                control={registrationForm.control}
                name="income"
                label="Annual Income"
                placeholder="50000"
                prefix="£"
                keyboardType="decimal-pad"
                mono
              />

              <Button
                onPress={registrationForm.handleSubmit(onRegistrationSubmit)}
                variant="primary"
                style={{ marginTop: spacing.s }}
              >
                Create Account
              </Button>
            </View>
          </View>

          {/* Form State Info */}
          <View style={[styles.section, { borderColor: colors.border }]}>
            <Heading variant="h3" style={{ color: colors.text, marginBottom: spacing.m }}>Form State</Heading>

            <View style={styles.stateRow}>
              <Label style={{ color: colors.textSecondary }}>Login Valid:</Label>
              <Body
                variant="semibold"
                style={{ color: loginForm.formState.isValid ? colors.success : '#DC2626' }}
              >
                {loginForm.formState.isValid ? 'Yes' : 'No'}
              </Body>
            </View>

            <View style={styles.stateRow}>
              <Label style={{ color: colors.textSecondary }}>Registration Valid:</Label>
              <Body
                variant="semibold"
                style={{
                  color: registrationForm.formState.isValid ? colors.success : '#DC2626',
                }}
              >
                {registrationForm.formState.isValid ? 'Yes' : 'No'}
              </Body>
            </View>

            <View style={styles.stateRow}>
              <Label style={{ color: colors.textSecondary }}>Login Dirty:</Label>
              <Body style={{ color: colors.text }}>
                {loginForm.formState.isDirty ? 'Yes' : 'No'}
              </Body>
            </View>

            <View style={styles.stateRow}>
              <Label style={{ color: colors.textSecondary }}>Registration Dirty:</Label>
              <Body style={{ color: colors.text }}>
                {registrationForm.formState.isDirty ? 'Yes' : 'No'}
              </Body>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
    padding: spacing.l,
    borderWidth: 1,
    borderRadius: 8,
  },
  form: {
    gap: spacing.l,
  },
  stateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
});
