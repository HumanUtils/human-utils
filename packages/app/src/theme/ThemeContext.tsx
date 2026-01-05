/**
 * Theme Context
 *
 * Provides theme management with light and dark mode support.
 * Automatically detects system colour scheme on initialisation.
 *
 * @module theme/ThemeContext
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getColors, AccentPreset } from './colors';
import { spacing } from './spacing';

/**
 * Supported theme modes.
 */
export type Theme = 'light' | 'dark';

/**
 * Theme context type.
 *
 * Provides current theme state, accent colour selection, and dynamic colours.
 */
export interface ThemeContextType {
  /** Current active theme mode */
  theme: Theme;
  /** Toggles between light and dark modes */
  toggleTheme: () => void;
  /** Current accent colour preset */
  accent: AccentPreset;
  /** Sets the accent colour preset */
  setAccent: (accent: AccentPreset) => void;
  /** Dynamic colour palette based on current theme and accent */
  colors: ReturnType<typeof getColors> & {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    card: string;
    border: string;
    textSecondary: string;
  };
  /** Spacing constants for consistent layout */
  spacing: typeof spacing;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component.
 *
 * Wraps the application to provide theme state and dynamic colours.
 * Detects system colour scheme on initial load.
 * Persists theme and accent preferences to AsyncStorage.
 *
 * @param props - Component props
 * @returns Provider component
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemScheme === 'dark' ? 'dark' : 'light');
  const [accent, setAccentState] = useState<AccentPreset>('emerald');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [savedTheme, savedAccent] = await Promise.all([
          AsyncStorage.getItem('theme'),
          AsyncStorage.getItem('accent'),
        ]);

        if (savedTheme === 'light' || savedTheme === 'dark') {
          setTheme(savedTheme);
        }

        if (savedAccent && ['emerald', 'blue', 'purple', 'pink', 'orange', 'cyan', 'indigo', 'rose'].includes(savedAccent)) {
          setAccentState(savedAccent as AccentPreset);
        }
      } catch (error) {
        console.warn('Failed to load theme preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const setAccent = async (newAccent: AccentPreset) => {
    setAccentState(newAccent);
    try {
      await AsyncStorage.setItem('accent', newAccent);
    } catch (error) {
      console.warn('Failed to save accent preference:', error);
    }
  };

  const baseColors = getColors(accent);

  const themeColors = {
    ...baseColors,
    background: theme === 'light' ? baseColors.light : baseColors.dark,
    surface: theme === 'light' ? baseColors.lightSurface : baseColors.darkSurface,
    text: theme === 'light' ? baseColors.textOnLight : baseColors.textOnDark,
    textMuted: theme === 'light' ? baseColors.textMutedOnLight : baseColors.textMutedOnDark,
    card: theme === 'light' ? baseColors.lightSurface : baseColors.darkSurface,
    border: theme === 'light' ? baseColors.lightBorder : baseColors.darkBorder,
    textSecondary: theme === 'light' ? baseColors.textMutedOnLight : baseColors.textMutedOnDark,
  };

  // Don't render children until preferences are loaded to avoid flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent, colors: themeColors, spacing }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access the theme context.
 *
 * @returns The current theme context
 * @throws Error if used outside of a ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, colors, toggleTheme } = useTheme();
 * ```
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
