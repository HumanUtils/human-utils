/**
 * Settings Screen
 *
 * Provides user preferences including theme toggle and accent colour selection.
 * Persists settings automatically using ThemeContext.
 *
 * @module screens/SettingsScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Moon, Sun, Palette } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { Container } from '../components/Container';
import { AccentPicker } from '../components/AccentPicker';

/**
 * Settings Screen Component.
 *
 * Displays user preference controls including:
 * - Theme mode toggle (light/dark)
 * - Accent colour picker
 *
 * All changes are persisted automatically via ThemeContext.
 *
 * @returns Settings screen component
 */
export const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme, colors, spacing } = useTheme();

  return (
    <Container>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>

          {/* Theme Toggle */}
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                {theme === 'light' ? (
                  <Sun size={24} color={colors.primary} />
                ) : (
                  <Moon size={24} color={colors.primary} />
                )}
                <View style={styles.cardText}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>Theme Mode</Text>
                  <Text style={[styles.cardDescription, { color: colors.textMuted }]}>
                    {theme === 'light' ? 'Light' : 'Dark'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  {
                    backgroundColor: theme === 'dark' ? colors.primary : colors.border,
                  },
                ]}
                onPress={toggleTheme}
                accessibilityLabel="Toggle theme mode"
                accessibilityRole="switch"
                accessibilityState={{ checked: theme === 'dark' }}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    {
                      backgroundColor: colors.surface,
                      transform: [{ translateX: theme === 'dark' ? 22 : 2 }],
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Accent Colour Picker */}
          <View
            style={[
              styles.card,
              styles.accentCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <AccentPicker />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Changes are saved automatically
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: typography.heading,
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accentCard: {
    paddingVertical: 24,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: typography.heading,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: typography.body,
  },
  toggle: {
    width: 52,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    fontFamily: typography.body,
    fontStyle: 'italic',
  },
});
