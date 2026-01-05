/**
 * Accent Colour Picker Component
 *
 * Allows users to select their preferred accent colour from available presets.
 * Displays colour swatches with visual feedback for the current selection.
 *
 * @module components/AccentPicker
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { accentPresets, AccentPreset } from '../theme/colors';

/**
 * Metadata for accent colour presets.
 * Maps each preset to a human-readable label.
 */
const accentLabels: Record<AccentPreset, string> = {
  emerald: 'Emerald',
  blue: 'Blue',
  purple: 'Purple',
  pink: 'Pink',
  orange: 'Orange',
  cyan: 'Cyan',
  indigo: 'Indigo',
  rose: 'Rose',
};

/**
 * Accent Picker Component.
 *
 * Renders a grid of colour swatches for available accent presets.
 * Highlights the currently selected accent with a border.
 *
 * @returns Accent picker component
 */
export const AccentPicker: React.FC = () => {
  const { accent, setAccent, colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Accent Colour</Text>
      <View style={styles.grid}>
        {(Object.keys(accentPresets) as AccentPreset[]).map((presetKey) => {
          const preset = accentPresets[presetKey];
          const isSelected = accent === presetKey;

          return (
            <TouchableOpacity
              key={presetKey}
              style={[
                styles.swatch,
                {
                  backgroundColor: preset.primary,
                  borderColor: isSelected ? colors.text : colors.border,
                  borderWidth: isSelected ? 3 : 2,
                },
              ]}
              onPress={() => setAccent(presetKey)}
              accessibilityLabel={`Select ${accentLabels[presetKey]} accent colour`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {isSelected && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {accentLabels[accent]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: typography.heading,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    maxWidth: 320,
  },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 18,
    fontFamily: typography.heading,
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontFamily: typography.body,
    marginTop: 12,
  },
});
