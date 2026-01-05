/**
 * Category Screen
 *
 * Displays tools within a selected category
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, typography } from '../theme';
import { spacing } from '../theme/spacing';
import { TOOLS } from '../constants';
import { CategoryCard, Container, LogoIcon, SearchBar } from '../components';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CategoryScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { categoryId, categoryName } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const tools = TOOLS.filter((tool) => tool.categories.includes(categoryId));

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!searchQuery) {
      return tools;
    }

    const query = searchQuery.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery, tools]);

  const handleToolPress = (toolRoute: Exclude<keyof RootStackParamList, 'Category'>) => {
    // @ts-ignore - toolRoute is guaranteed to not be 'Category'
    navigation.navigate(toolRoute);
  };

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
        <FlatList
          data={filteredTools}
          keyExtractor={(item) => `${item.id}-${searchQuery}`}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              {/* Hero Section */}
              <View style={styles.hero}>
                <TouchableOpacity onPress={handleLogoPress} accessibilityLabel="Go to home" accessibilityRole="button">
                  <LogoIcon size={160} color={colors.primary} />
                </TouchableOpacity>
                <Text
                  style={[styles.title, { color: colors.text, fontFamily: typography.heading }]}
                >
                  {categoryName}
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    { color: colors.textMuted, fontFamily: typography.body },
                  ]}
                >
                  {tools.length} {tools.length === 1 ? 'tool' : 'tools'} available
                </Text>
              </View>

              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search tools..."
                style={styles.searchBar}
              />
            </View>
          }
          renderItem={({ item }) => (
            <CategoryCard
              title={item.title}
              icon={item.icon}
              onPress={() => handleToolPress(item.route as Exclude<keyof RootStackParamList, 'Category'>)}
              style={styles.card}
            />
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.m,
  },
  headerContainer: {
    marginBottom: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: spacing.xs,
    marginTop: spacing.m,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  searchBar: {
    marginTop: spacing.m,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.m,
  },
  card: {
    width: '48%',
  },
});
