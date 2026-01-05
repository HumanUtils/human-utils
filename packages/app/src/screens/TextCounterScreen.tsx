/**
 * Text Counter Screen
 *
 * Provides text analysis with counts for characters, words, lines, sentences,
 * and paragraphs, along with reading time estimates.
 *
 * @module screens/TextCounterScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FileBarChart } from 'lucide-react-native';
import { countText, TextStats } from '@human-utils/cli';
import { useTheme } from '../theme/ThemeContext';
import { Container } from '../components/Container';
import { ToolHeader } from '../components/ToolHeader';

/**
 * Text Counter Screen Component
 */
export default function TextCounterScreen() {
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const stats = useMemo(() => countText(text), [text]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputSection: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: isFocused ? colors.primary : colors.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.card,
      minHeight: 150,
      textAlignVertical: 'top',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      outlineStyle: 'none' as any,
    },
    statsContainer: {
      gap: 16,
    },
    statCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastStatRow: {
      borderBottomWidth: 0,
    },
    statLabel: {
      fontSize: 15,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    statValue: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primary,
    },
  });

  const renderStat = (label: string, value: number | string, isLast = false) => (
    <View style={[styles.statRow, isLast && styles.lastStatRow]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <Container>
      <ToolHeader
        icon={FileBarChart}
        title="Text Counter"
        description="Count characters, words, lines, sentences, and paragraphs"
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.inputSection}>
          <Text style={styles.label}>Enter Text</Text>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type or paste your text here..."
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            {renderStat('Characters', stats.characters)}
            {renderStat('Characters (no spaces)', stats.charactersNoSpaces)}
            {renderStat('Words', stats.words)}
            {renderStat('Lines', stats.lines)}
            {renderStat('Sentences', stats.sentences)}
            {renderStat('Paragraphs', stats.paragraphs)}
            {renderStat('Average Word Length', stats.averageWordLength.toFixed(1))}
            {renderStat(
              'Reading Time',
              stats.readingTime < 1
                ? '< 1 min'
                : `${Math.ceil(stats.readingTime)} min`,
              true
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
