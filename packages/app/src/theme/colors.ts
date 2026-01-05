/**
 * Colour Palette
 *
 * Philosophy:
 * - Accent restraint: Green + cyan for emphasis
 * - High contrast for accessibility
 * - Warm, inviting neutrals over pure greys
 * - Subtle depth through elevation
 *
 * @module theme/colors
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

/**
 * Available accent colour presets for user customisation
 */
export const accentPresets = {
  emerald: {
    primary: '#10B981',
    primaryDark: '#059669',
  },
  blue: {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
  },
  purple: {
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
  },
  pink: {
    primary: '#EC4899',
    primaryDark: '#DB2777',
  },
  orange: {
    primary: '#F97316',
    primaryDark: '#EA580C',
  },
  cyan: {
    primary: '#06B6D4',
    primaryDark: '#0891B2',
  },
  indigo: {
    primary: '#6366F1',
    primaryDark: '#4F46E5',
  },
  rose: {
    primary: '#F43F5E',
    primaryDark: '#E11D48',
  },
} as const;

export type AccentPreset = keyof typeof accentPresets;

/**
 * Generate colour palette with specified accent
 */
export const getColors = (accent: AccentPreset = 'emerald') => {
  const accentColors = accentPresets[accent];

  return {
    // Brand & Core UI
    primary: accentColors.primary,
    primaryDark: accentColors.primaryDark,
    info: '#3B82F6', // Bright blue: Clear, confident

    // Status / Feedback
    secondary: '#6B7280', // Neutral UI elements
    warning: '#F59E0B', // Warnings
    danger: '#EF4444', // Errors, destructive actions
    success: accentColors.primary, // Success states (uses primary)

    // Dark Theme - Warmer, less harsh
    dark: '#111827', // Rich charcoal with slight warmth
    darkSurface: '#1F2937', // Elevated surfaces with contrast
    darkSurfaceHover: '#374151', // Hover state
    darkBorder: '#374151', // Clear but subtle borders

    // Light Theme - Softer, more inviting
    light: '#F9FAFB', // Soft cool grey background
    lightSurface: '#FFFFFF', // Pure white cards
    lightSurfaceHover: '#F3F4F6', // Hover state
    lightBorder: '#E5E7EB', // Gentle borders

    // Text Colours - Higher contrast
    textOnDark: '#F9FAFB', // Very high contrast
    textMutedOnDark: '#9CA3AF', // Muted but readable
    textOnLight: '#111827', // Deep charcoal
    textMutedOnLight: '#6B7280', // Clear secondary text
  };
};

// Default colour export for backward compatibility
export const colors = getColors('emerald');
