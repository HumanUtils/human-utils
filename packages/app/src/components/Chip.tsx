/**
 * Chip Component
 *
 * Selectable chip/tag component for single or multi-select groups.
 * Commonly used for filters, options, and toggles.
 *
 * @module components/Chip
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme, typography } from '../theme';

interface ChipProps {
  /** Chip label text */
  label: string;
  /** Optional subtitle/secondary text */
  subtitle?: string;
  /** Whether chip is selected */
  selected?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Container style override */
  style?: ViewStyle;
  /** Label style override */
  labelStyle?: TextStyle;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Chip component for selection and filtering.
 *
 * @example
 * ```tsx
 * // Rate selector
 * <Chip label="20%" subtitle="Standard" selected={rate === 20} onPress={() => setRate(20)} />
 *
 * // Operation toggle
 * <Chip label="Add VAT" selected={operation === 'add'} onPress={() => setOperation('add')} />
 *
 * // Small filter chip
 * <Chip label="Active" selected size="small" onPress={handleFilter} />
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  subtitle,
  selected = false,
  onPress,
  size = 'medium',
  style,
  labelStyle,
  disabled = false,
}) => {
  const { colors, spacing } = useTheme();

  const sizeStyles = {
    small: {
      container: styles.containerSmall,
      label: styles.labelSmall,
      subtitle: styles.subtitleSmall,
    },
    medium: {
      container: styles.containerMedium,
      label: styles.labelMedium,
      subtitle: styles.subtitleMedium,
    },
    large: {
      container: styles.containerLarge,
      label: styles.labelLarge,
      subtitle: styles.subtitleLarge,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        currentSize.container,
        {
          backgroundColor: selected ? `${colors.primary}20` : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      <Text
        style={[
          currentSize.label,
          {
            color: selected ? colors.primary : colors.text,
            fontFamily: typography.bodyBold,
          },
          !subtitle && { marginBottom: 0 },
          labelStyle,
        ]}
      >
        {label}
      </Text>
      {subtitle && (
        <Text
          style={[
            currentSize.subtitle,
            {
              color: colors.textMuted,
              fontFamily: typography.body,
            },
          ]}
        >
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Small size
  containerSmall: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 60,
  },
  labelSmall: {
    fontSize: 13,
    marginBottom: 2,
  },
  subtitleSmall: {
    fontSize: 10,
    textAlign: 'center',
  },
  // Medium size
  containerMedium: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 90,
  },
  labelMedium: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitleMedium: {
    fontSize: 11,
    textAlign: 'center',
  },
  // Large size
  containerLarge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 110,
  },
  labelLarge: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitleLarge: {
    fontSize: 12,
    textAlign: 'center',
  },
});
