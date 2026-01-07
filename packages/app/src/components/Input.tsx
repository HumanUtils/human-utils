/**
 * Input Components
 *
 * Standardised input components with proper theme integration.
 * Configurable via props for different use cases.
 *
 * @module components/Input
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { useState } from 'react';
import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, Text, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';
import { Label } from './Typography';

/**
 * Input Component
 * 
 * Flexible input component with label, prefix/suffix support, and error states.
 * 
 * @example
 * // Basic input
 * <Input label="Email" value={email} onChangeText={setEmail} />
 * 
 * // Currency input
 * <Input label="Gross Income" prefix="£" value={income} onChangeText={setIncome} keyboardType="numeric" />
 * 
 * // Percentage input
 * <Input label="VAT Rate" suffix="%" value={rate} onChangeText={setRate} keyboardType="numeric" />
 * 
 * // With error
 * <Input label="Amount" value={amount} onChangeText={setAmount} error="Amount must be positive" />
 * 
 * // Multiline
 * <Input label="Notes" value={notes} onChangeText={setNotes} multiline rows={4} />
 */
export interface InputProps extends Omit<RNTextInputProps, 'style'> {
  /** Input label */
  label?: string;
  /** Prefix text (e.g., £, $) */
  prefix?: string;
  /** Suffix text (e.g., %, kg) */
  suffix?: string;
  /** Error message */
  error?: string;
  /** Use monospace font (for numbers, code) */
  mono?: boolean;
  /** Number of rows for multiline input */
  rows?: number;
  /** Container style */
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  prefix,
  suffix,
  error,
  mono = false,
  rows,
  multiline,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasAffix = Boolean(prefix || suffix);
  const isMultiline = Boolean(multiline || (rows && rows > 1));
  const isPassword = Boolean(secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Label style={styles.label}>{label}</Label>}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : isFocused ? colors.primary : colors.border,
          },
          isMultiline ? styles.multilineWrapper : null,
        ]}
      >
        {prefix && (
          <Text
            style={[
              styles.affix,
              styles.prefix,
              {
                color: colors.textMuted,
                fontFamily: mono ? typography.mono : typography.body,
              },
            ]}
          >
            {prefix}
          </Text>
        )}
        
        <RNTextInput
          {...props}
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: mono ? typography.mono : typography.body,
            },
            hasAffix ? styles.inputWithAffix : null,
            isPassword ? styles.inputWithPassword : null,
            isMultiline ? styles.multilineInput : null,
            isMultiline && rows ? { height: rows * 24 + spacing.m * 2 } : null,
          ]}
          placeholderTextColor={colors.textMuted}
          multiline={isMultiline}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
        
        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.passwordToggle}
            hitSlop={8}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={colors.textMuted} />
            ) : (
              <Eye size={20} color={colors.textMuted} />
            )}
          </Pressable>
        )}
        
        {suffix && (
          <Text
            style={[
              styles.affix,
              styles.suffix,
              {
                color: colors.textMuted,
                fontFamily: mono ? typography.mono : typography.body,
              },
            ]}
          >
            {suffix}
          </Text>
        )}
      </View>
      
      {error && (
        <Text style={[styles.error, { color: colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.m,
    minHeight: 48,
  },
  multilineWrapper: {
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.m,
    outlineStyle: 'none' as any,
  },
  inputWithAffix: {
    paddingHorizontal: spacing.s,
  },
  inputWithPassword: {
    paddingRight: spacing.xs,
  },
  multilineInput: {
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
    textAlignVertical: 'top',
  },
  affix: {
    fontSize: 16,
  },
  prefix: {
    paddingRight: 0,
  },
  suffix: {
    paddingLeft: 0,
  },
  error: {
    fontFamily: typography.body,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  passwordToggle: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
});
