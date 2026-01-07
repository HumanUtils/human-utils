/**
 * Button Components
 *
 * Standardised button components with proper theme integration.
 * Configurable via props rather than separate components.
 *
 * @module components/Button
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';
import type { LucideIcon } from 'lucide-react-native';

/**
 * Button Component
 * 
 * Flexible button component that adapts to different use cases via props.
 * 
 * @example
 * // Standard button
 * <Button onPress={handleSave}>Save Changes</Button>
 * 
 * // With icon
 * <Button icon={Download} onPress={download}>Download</Button>
 * 
 * // Icon-only
 * <Button iconOnly icon={X} onPress={close} />
 * 
 * // Pill/chip button
 * <Button pill selected onPress={select}>Plan 1</Button>
 * 
 * // Segmented control option
 * <Button segmented selected={operation === 'add'} onPress={() => setOp('add')}>
 *   Add VAT
 * </Button>
 */
interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button text */
  children?: string;
  /** Icon component from lucide-react-native */
  icon?: LucideIcon;
  /** Icon position (ignored if iconOnly=true) */
  iconPosition?: 'left' | 'right';
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon-only button (square, no text) */
  iconOnly?: boolean;
  /** Pill/chip style (rounded, compact) */
  pill?: boolean;
  /** Selected state (for pill/segmented) */
  selected?: boolean;
  /** Segmented control style (rectangular cards) */
  segmented?: boolean;
  /** Description text (for segmented buttons) */
  description?: string;
  /** Custom styles */
  style?: TouchableOpacityProps['style'];
}

export const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  variant = 'primary',
  size = 'medium',
  iconOnly = false,
  pill = false,
  selected = false,
  segmented = false,
  description,
  disabled,
  style,
  ...props
}) => {
  const { colors, theme } = useTheme();

  // Variant styles
  const getVariantStyles = () => {
    // Pill button (chips/tags)
    if (pill) {
      return {
        container: {
          backgroundColor: selected ? `${colors.primary}20` : colors.surface,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
        },
        text: {
          color: selected ? colors.primary : colors.text,
        },
      };
    }

    // Segmented control
    if (segmented) {
      return {
        container: {
          backgroundColor: selected ? `${colors.primary}20` : colors.surface,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
        },
        text: {
          color: selected ? colors.primary : colors.text,
        },
      };
    }

    // Standard variants
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: colors.primary,
          },
          text: {
            color: '#FFFFFF',
          },
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          },
          text: {
            color: colors.text,
          },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.primary,
          },
          text: {
            color: colors.primary,
          },
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: colors.primary,
          },
        };
      default:
        return {
          container: {},
          text: {},
        };
    }
  };

  // Size styles
  const getSizeStyles = () => {
    if (pill) {
      return {
        container: styles.pillButton,
        text: styles.pillText,
        icon: 16,
      };
    }

    if (iconOnly) {
      const sizes = {
        small: { size: 40, icon: 20 },
        medium: { size: 48, icon: 24 },
        large: { size: 56, icon: 28 },
      };
      return {
        container: { width: sizes[size].size, height: sizes[size].size },
        text: {},
        icon: sizes[size].icon,
      };
    }

    if (segmented) {
      return {
        container: styles.segmentedButton,
        text: styles.segmentedText,
        icon: 20,
      };
    }

    const sizeMap = {
      small: {
        container: styles.buttonSmall,
        text: styles.buttonTextSmall,
        icon: 16,
      },
      medium: {
        container: styles.buttonMedium,
        text: styles.buttonTextMedium,
        icon: 20,
      },
      large: {
        container: styles.buttonLarge,
        text: styles.buttonTextLarge,
        icon: 24,
      },
    };

    return sizeMap[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Border radius
  const borderRadius = pill ? 20 : segmented ? 8 : iconOnly ? 8 : 8;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles.container,
        sizeStyles.container,
        { borderRadius },
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconButton,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} size="small" />
      ) : iconOnly && Icon ? (
        <Icon size={sizeStyles.icon} color={variantStyles.text.color} />
      ) : (
        <View style={segmented ? styles.segmentedContent : styles.content}>
          {Icon && iconPosition === 'left' && !iconOnly && (
            <Icon size={sizeStyles.icon} color={variantStyles.text.color} style={styles.iconLeft} />
          )}
          {children && (
            <View style={segmented ? styles.segmentedTextContainer : undefined}>
              <Text style={[styles.buttonText, sizeStyles.text, variantStyles.text]}>
                {children}
              </Text>
              {segmented && description && (
                <Text
                  style={[
                    styles.segmentedDescription,
                    {
                      color: theme === 'dark' ? '#D1D5DB' : '#9CA3AF',
                    },
                  ]}
                >
                  {description}
                </Text>
              )}
            </View>
          )}
          {Icon && iconPosition === 'right' && !iconOnly && (
            <Icon size={sizeStyles.icon} color={variantStyles.text.color} style={styles.iconRight} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Standard button sizes
  buttonSmall: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    minHeight: 32,
  },
  buttonMedium: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    minHeight: 44,
  },
  buttonLarge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.l,
    minHeight: 52,
  },

  // Icon-only button
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Pill button
  pillButton: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontFamily: typography.bodyMedium,
    fontSize: 14,
  },

  // Segmented button
  segmentedButton: {
    padding: spacing.m,
    alignItems: 'flex-start',
  },
  segmentedContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  segmentedTextContainer: {
    width: '100%',
  },
  segmentedText: {
    fontFamily: typography.bodySemiBold,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  segmentedDescription: {
    fontFamily: typography.body,
    fontSize: 14,
  },

  // Common
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.bodySemiBold,
    fontSize: 16,
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextMedium: {
    fontSize: 16,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: spacing.s,
  },
  iconRight: {
    marginLeft: spacing.s,
  },
});

/**
 * ButtonGroup Component
 * 
 * Container for pill buttons (chip groups) or segmented controls.
 * 
 * @example
 * <ButtonGroup>
 *   <Button pill selected={plan === '1'}>Plan 1</Button>
 *   <Button pill selected={plan === '2'}>Plan 2</Button>
 * </ButtonGroup>
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  /** Segmented style (vertical stack) vs pill style (horizontal wrap) */
  segmented?: boolean;
  style?: TouchableOpacityProps['style'];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  segmented = false,
  style,
}) => {
  return (
    <View
      style={[
        segmented ? groupStyles.segmented : groupStyles.pills,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const groupStyles = StyleSheet.create({
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
  segmented: {
    gap: spacing.m,
  },
});
