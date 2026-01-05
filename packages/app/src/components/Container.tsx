/**
 * Container Component
 *
 * Provides consistent layout container with responsive max-width and padding.
 * Centres content on web when narrower than max width.
 *
 * @module components/Container
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { spacing } from '../theme/spacing';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
}

/**
 * Container component for consistent layout structure.
 *
 * @param children - Child components to render
 * @param style - Optional additional styles
 * @param maxWidth - Maximum width for content (default: 800)
 * @returns Container component
 *
 * @example
 * ```tsx
 * <Container maxWidth={1200}>
 *   <YourContent />
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({ children, style, maxWidth = 800 }) => {
  return (
    <View style={[styles.outer, style]}>
      <View style={[styles.inner, { maxWidth }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  inner: {
    width: '100%',
    paddingHorizontal: spacing.m,
    paddingTop: spacing.xl,
    flex: 1,
    ...Platform.select({
      web: {
        marginHorizontal: 'auto',
      },
    }),
  },
});
