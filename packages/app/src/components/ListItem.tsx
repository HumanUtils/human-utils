/**
 * ListItem Component
 *
 * Flexible list item for displaying rows of content with optional actions.
 * Commonly used for results, history, and info displays.
 *
 * @module components/ListItem
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';

export interface ListItemProps {
  /** Primary text */
  title: string;
  /** Secondary text (optional) */
  subtitle?: string;
  /** Left icon/content */
  leftContent?: React.ReactNode;
  /** Right icon/content */
  rightContent?: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Use monospace font for title */
  mono?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional title styles */
  titleStyle?: TextStyle;
}

/**
 * ListItem component for displaying rows.
 *
 * @param title - Primary text content
 * @param subtitle - Optional secondary text
 * @param leftContent - Optional left icon or content
 * @param rightContent - Optional right icon or content
 * @param onPress - Optional press handler (makes item touchable)
 * @param mono - Use monospace font for title
 * @param style - Additional container styles
 * @param titleStyle - Additional title text styles
 * @returns ListItem component
 *
 * @example
 * ```tsx
 * // Simple list item
 * <ListItem title="Item 1" />
 *
 * // With subtitle
 * <ListItem 
 *   title="UUID"
 *   subtitle="Tap to copy"
 * />
 *
 * // With icons and press handler
 * <ListItem
 *   title="550e8400-e29b-41d4-a716-446655440000"
 *   subtitle="Tap to copy"
 *   leftContent={<Hash size={20} color={colors.primary} />}
 *   rightContent={<CheckCircle size={20} color="#10B981" />}
 *   onPress={() => console.log('pressed')}
 *   mono
 * />
 *
 * // Label-value pair
 * <ListItem
 *   title="Net Amount"
 *   rightContent={<Text style={{ fontFamily: typography.mono }}>£100.00</Text>}
 * />
 * ```
 */
export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftContent,
  rightContent,
  onPress,
  mono = false,
  style,
  titleStyle,
}) => {
  const { colors } = useTheme();

  const content = (
    <View style={[styles.container, style]}>
      {leftContent && <View style={styles.leftContent}>{leftContent}</View>}
      
      <View style={styles.textContent}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontFamily: mono ? typography.mono : typography.body,
            },
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              { color: colors.textMuted, fontFamily: typography.body },
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressable,
          { backgroundColor: colors.surface, borderColor: colors.border },
          pressed && { opacity: 0.7 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.row, { backgroundColor: colors.surface }]}>{content}</View>;
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: spacing.s,
  },
  row: {
    paddingVertical: spacing.s,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
  },
  leftContent: {
    marginRight: spacing.m,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: spacing.xxs,
  },
  subtitle: {
    fontSize: 14,
  },
  rightContent: {
    marginLeft: spacing.m,
  },
});
