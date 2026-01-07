/**
 * Card Component
 *
 * Flexible container component for grouping related content.
 * Supports variants for different visual styles.
 *
 * @module components/Card
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { spacing } from '../theme/spacing';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Card component for grouping content.
 *
 * @param children - Content to display inside the card
 * @param variant - Visual style (default, outlined, elevated)
 * @param style - Additional custom styles
 * @returns Card component
 *
 * @example
 * ```tsx
 * // Default card
 * <Card>
 *   <Text>Content here</Text>
 * </Card>
 *
 * // Outlined card
 * <Card variant="outlined">
 *   <Text>Content with border</Text>
 * </Card>
 *
 * // Elevated card with shadow
 * <Card variant="elevated">
 *   <Text>Raised content</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface },
        variant === 'outlined' && {
          borderWidth: 1,
          borderColor: colors.border,
        },
        variant === 'elevated' && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing.l,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
