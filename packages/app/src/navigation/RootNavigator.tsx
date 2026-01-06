import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { HomeScreen, UuidGeneratorScreen, SettingsScreen, TaxCalculatorScreen } from '../screens';
import { CategoryScreen } from '../screens/CategoryScreen';
import { Base64EncoderScreen } from '../screens/Base64EncoderScreen';
import { JsonFormatterScreen } from '../screens/JsonFormatterScreen';
import { LoremIpsumScreen } from '../screens/LoremIpsumScreen';
import { CaseConverterScreen } from '../screens/CaseConverterScreen';
import { UrlEncoderScreen } from '../screens/UrlEncoderScreen';
import { TextCounterScreen } from '../screens';
import { CustomHeader } from './CustomHeader';

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string; categoryName: string };
  Settings: undefined;
  UuidGenerator: undefined;
  Base64Encoder: undefined;
  JsonFormatter: undefined;
  LoremIpsum: undefined;
  CaseConverter: undefined;
  UrlEncoder: undefined;
  TextCounter: undefined;
  TaxCalculator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { theme, colors } = useTheme();

  const customTheme = {
    dark: theme === 'dark',
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '900' as const,
      },
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Human Utils' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Category - Human Utils' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings - Human Utils' }} />
        <Stack.Screen name="UuidGenerator" component={UuidGeneratorScreen} options={{ title: 'UUID Generator - Human Utils' }} />
        <Stack.Screen name="Base64Encoder" component={Base64EncoderScreen} options={{ title: 'Base64 Encoder - Human Utils' }} />
        <Stack.Screen name="JsonFormatter" component={JsonFormatterScreen} options={{ title: 'JSON Formatter - Human Utils' }} />
        <Stack.Screen name="LoremIpsum" component={LoremIpsumScreen} options={{ title: 'Lorem Ipsum Generator - Human Utils' }} />
        <Stack.Screen name="CaseConverter" component={CaseConverterScreen} options={{ title: 'Case Converter - Human Utils' }} />
        <Stack.Screen name="UrlEncoder" component={UrlEncoderScreen} options={{ title: 'URL Encoder - Human Utils' }} />
        <Stack.Screen name="TextCounter" component={TextCounterScreen} options={{ title: 'Text Counter - Human Utils' }} />
        <Stack.Screen name="TaxCalculator" component={TaxCalculatorScreen} options={{ title: 'Self-Employed Tax Calculator - Human Utils' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
