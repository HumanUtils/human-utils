/**
 * Divider Component
 *
 * Visual separator for dividing content sections.
 * Provides consistent spacing and styling.
 *
 * @module components/Divider
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { spacing } from '../theme/spacing';

export interface DividerProps {
  /** Visual style */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Spacing above and below the divider */
  spacing?: 'none' | 'xs' | 's' | 'm' | 'l';
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Divider component for visual separation.
 *
 * @param variant - Visual style (solid, dashed, dotted) (default: 'solid')
 * @param spacing - Vertical spacing around divider (default: 'm')
 * @param style - Additional custom styles
 * @returns Divider component
 *
 * @example
 * ```tsx
 * // Solid divider (default)
 * <Divider />
 *
 * // Dashed divider for subsections
 * <Divider variant="dashed" spacing="s" />
 *
 * // Dotted divider
 * <Divider variant="dotted" />
 * ```
 */
export const Divider: React.FC<DividerProps> = ({ 
  variant = 'solid',
  spacing: spacingProp = 'm',
  style,
}) => {
  const { colors } = useTheme();

  const spacingMap = {
    none: 0,
    xs: spacing.xs,
    s: spacing.s,
    m: spacing.m,
    l: spacing.l,
  };

  const borderStyleMap = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  } as const;

  return (
    <View
      style={[
        styles.divider,
        {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          borderStyle: borderStyleMap[variant],
          marginVertical: spacingMap[spacingProp],
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
