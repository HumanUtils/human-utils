/**
 * ToolHeader Component
 *
 * Displays tool icon, name, and description at the top of tool screens.
 * Provides visual context for the current tool.
 *
 * @module components/ToolHeader
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { useTheme, typography } from '../theme';

interface ToolHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Header component for tool screens with icon, title, and description
 *
 * @param {LucideIcon} icon - The icon component for the tool
 * @param {string} title - The name of the tool
 * @param {string} description - Brief description of the tool's purpose
 *
 * @example
 * <ToolHeader 
 *   icon={Hash} 
 *   title="UUID Generator" 
 *   description="Generate universally unique identifiers" 
 * />
 */
export const ToolHeader: React.FC<ToolHeaderProps> = ({ icon: Icon, title, description }) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.xl }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
        <Icon size={32} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textMuted }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: typography.heading,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
});
