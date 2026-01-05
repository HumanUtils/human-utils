/**
 * Custom Header Component for React Navigation
 *
 * Provides a minimal header with back button and Settings icon.
 * Simple, clean navigation for all screens.
 *
 * @module navigation/CustomHeader
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Settings, ArrowLeft } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { RootStackParamList } from './RootNavigator';

/**
 * Custom header component for navigation screens
 *
 * Shows back button (except Home) and Settings icon
 */
export const CustomHeader: React.FC<NativeStackHeaderProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { colors, spacing } = useTheme();

  const isHomeScreen = route.name === 'Home';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingHorizontal: spacing.l, paddingTop: spacing.m },
      ]}
    >
      <View style={styles.content}>
        {/* Left Side: Back Button */}
        <View style={styles.leftSection}>
          {!isHomeScreen && (
            <Pressable
              style={({ hovered }: any) => [
                styles.iconButton,
                hovered && { backgroundColor: `${colors.primary}20` },
              ]}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <ArrowLeft size={20} color={colors.text} />
            </Pressable>
          )}
        </View>

        {/* Right Side: Settings Icon */}
        <View style={styles.rightSection}>
          <Pressable
            style={({ hovered }: any) => [
              styles.iconButton,
              hovered && { backgroundColor: `${colors.primary}20` },
            ]}
            onPress={() => navigation.navigate('Settings')}
            accessibilityLabel="Open settings"
            accessibilityRole="button"
          >
            <Settings size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});
