/**
 * Typography Components
 *
 * Standardised text components with proper theme integration.
 * Uses the three-font hierarchy: Share Tech (structure), Overpass (readability), Share Tech Mono (precision).
 *
 * @module components/Typography
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme, typography } from '../theme';

interface BaseTextProps extends TextProps {
  color?: 'text' | 'textSecondary' | 'textMuted' | 'primary';
  align?: 'left' | 'center' | 'right';
}

/**
 * Heading Component
 * 
 * Uses Share Tech font for structural hierarchy.
 * Variants: h1 (32px), h2 (24px), h3 (20px)
 * 
 * @example
 * <Heading variant="h1">Tax Calculator</Heading>
 * <Heading variant="h2" color="primary">Results</Heading>
 */
interface HeadingProps extends BaseTextProps {
  variant?: 'h1' | 'h2' | 'h3';
}

export const Heading: React.FC<HeadingProps> = ({
  variant = 'h2',
  color = 'text',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const colorMap = {
    text: colors.textOnLight,
    textSecondary: colors.textMutedOnLight,
    textMuted: '#9CA3AF',
    primary: colors.primary,
  };

  const variantStyles = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
  };

  return (
    <Text
      style={[
        styles.heading,
        variantStyles[variant],
        { color: colorMap[color], textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

/**
 * Label Component
 * 
 * Uses Share Tech for form labels and UI labels.
 * Sizes: small (14px), medium (16px), large (18px)
 * 
 * @example
 * <Label>Gross Income</Label>
 * <Label size="large">Primary</Label>
 * <Label color="textMuted">Optional</Label>
 */
interface LabelProps extends BaseTextProps {
  size?: 'small' | 'medium' | 'large';
}

export const Label: React.FC<LabelProps> = ({
  size = 'small',
  color = 'text',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors, theme } = useTheme();

  const colorMap = {
    text: theme === 'dark' ? colors.textOnDark : colors.textOnLight,
    textSecondary: theme === 'dark' ? colors.textMutedOnDark : colors.textMutedOnLight,
    textMuted: theme === 'dark' ? '#D1D5DB' : '#9CA3AF',
    primary: colors.primary,
  };

  const sizeStyles = {
    small: styles.labelSmall,
    medium: styles.labelMedium,
    large: styles.labelLarge,
  };

  return (
    <Text
      style={[
        styles.label,
        sizeStyles[size],
        { color: colorMap[color], textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

/**
 * Body Component
 * 
 * Uses Overpass for readable body text.
 * Variants: regular (400), medium (500), semibold (600), bold (700)
 * 
 * @example
 * <Body>This is a description</Body>
 * <Body variant="semibold" color="primary">Important text</Body>
 */
interface BodyProps extends BaseTextProps {
  variant?: 'regular' | 'medium' | 'semibold' | 'bold';
  size?: 'small' | 'regular' | 'large';
}

export const Body: React.FC<BodyProps> = ({
  variant = 'regular',
  size = 'regular',
  color = 'text',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors, theme } = useTheme();

  const colorMap = {
    text: theme === 'dark' ? colors.textOnDark : colors.textOnLight,
    textSecondary: theme === 'dark' ? colors.textMutedOnDark : colors.textMutedOnLight,
    textMuted: theme === 'dark' ? '#D1D5DB' : '#9CA3AF',
    primary: colors.primary,
  };

  const variantFonts = {
    regular: typography.body,
    medium: typography.bodyMedium,
    semibold: typography.bodySemiBold,
    bold: typography.bodyBold,
  };

  const sizeStyles = {
    small: styles.bodySmall,
    regular: styles.body,
    large: styles.bodyLarge,
  };

  return (
    <Text
      style={[
        sizeStyles[size],
        { fontFamily: variantFonts[variant], color: colorMap[color], textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

/**
 * Mono Component
 * 
 * Uses Share Tech Mono for code, numbers, and technical content.
 * 
 * @example
 * <Mono>£1,234.56</Mono>
 * <Mono size="large" color="primary">550e8400-e29b-41d4-a716-446655440000</Mono>
 */
interface MonoProps extends BaseTextProps {
  size?: 'small' | 'regular' | 'large';
}

export const Mono: React.FC<MonoProps> = ({
  size = 'regular',
  color = 'text',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors, theme } = useTheme();

  const colorMap = {
    text: theme === 'dark' ? colors.textOnDark : colors.textOnLight,
    textSecondary: theme === 'dark' ? colors.textMutedOnDark : colors.textMutedOnLight,
    textMuted: theme === 'dark' ? '#D1D5DB' : '#9CA3AF',
    primary: colors.primary,
  };

  const sizeStyles = {
    small: styles.monoSmall,
    regular: styles.mono,
    large: styles.monoLarge,
  };

  return (
    <Text
      style={[
        sizeStyles[size],
        { color: colorMap[color], textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

/**
 * Caption Component
 * 
 * Uses Overpass for small supplementary text (12px).
 * 
 * @example
 * <Caption color="textMuted">Last updated: 2025-01-05</Caption>
 */
export const Caption: React.FC<BaseTextProps> = ({
  color = 'textSecondary',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors, theme } = useTheme();

  const colorMap = {
    text: theme === 'dark' ? colors.textOnDark : colors.textOnLight,
    textSecondary: theme === 'dark' ? colors.textMutedOnDark : colors.textMutedOnLight,
    textMuted: theme === 'dark' ? '#D1D5DB' : '#9CA3AF',
    primary: colors.primary,
  };

  return (
    <Text
      style={[
        styles.caption,
        { color: colorMap[color], textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // Headings (Share Tech)
  heading: {
    fontFamily: typography.heading,
  },
  h1: {
    fontSize: 40,
    lineHeight: 48,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
  },

  // Labels (Share Tech)
  label: {
    fontFamily: typography.heading,
  },
  labelSmall: {
    fontSize: 16,
    lineHeight: 22,
  },
  labelMedium: {
    fontSize: 18,
    lineHeight: 24,
  },
  labelLarge: {
    fontSize: 20,
    lineHeight: 28,
  },

  // Body text (Overpass)
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
  },

  // Mono text (Share Tech Mono)
  monoSmall: {
    fontFamily: typography.mono,
    fontSize: 14,
    lineHeight: 20,
  },
  mono: {
    fontFamily: typography.mono,
    fontSize: 16,
    lineHeight: 24,
  },
  monoLarge: {
    fontFamily: typography.mono,
    fontSize: 20,
    lineHeight: 28,
  },

  // Caption (Overpass)
  caption: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
});
