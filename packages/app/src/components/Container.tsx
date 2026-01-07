/**
 * Container Component
 *
 * Provides consistent layout container with responsive max-width and padding.
 * Centres content on web when narrower than max width.
 * Adapts padding based on screen size.
 *
 * @module components/Container
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, Platform } from 'react-native';
import { spacing } from '../theme/spacing';
import { useBreakpoints } from '../hooks/useBreakpoints';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
  scrollable?: boolean;
}

/**
 * Container component for consistent layout structure.
 *
 * @param children - Child components to render
 * @param style - Optional additional styles
 * @param maxWidth - Maximum width for content (default: 800)
 * @param scrollable - Enable built-in scrolling (default: true). Wraps content in ScrollView.
 * @returns Container component
 *
 * @example
 * ```tsx
 * <Container maxWidth={1200}>
 *   <YourContent />
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({ 
  children, 
  style, 
  maxWidth = 800,
  scrollable = true,
}) => {
  const { isSM, isLG } = useBreakpoints();

  const content = (
    <View
      style={[
        styles.inner,
        { maxWidth },
        isSM && styles.innerSM,
        isLG && styles.innerLG,
      ]}
    >
      {children}
    </View>
  );

  return (
    <View style={[styles.outer, style]}>
      {scrollable ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    flexGrow: 1,
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
  innerSM: {
    paddingHorizontal: spacing.s,
    paddingTop: spacing.m,
  },
  innerLG: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
});
