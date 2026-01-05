/**
 * Text Counter Core Functions
 *
 * Provides text analysis functionality including character, word, line,
 * sentence, and paragraph counting.
 *
 * @module tools/text-counter
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { TextStats } from './types';
import {
    countWords,
    countLines,
    countSentences,
    countParagraphs,
    calculateReadingTime,
    getWords,
    stripPunctuation,
} from '../utils/text';

// Re-export types
export type { TextStats, TextCounterHistoryEntry } from './types';

/**
 * Counts various text statistics.
 *
 * Analyzes text and returns counts for characters, words, lines, sentences,
 * paragraphs, and other metrics.
 *
 * @param input - The text to analyze
 * @returns Text statistics
 *
 * @example
 * ```ts
 * const stats = countText('Hello world!\nThis is a test.');
 * console.log(stats.words); // 6
 * console.log(stats.lines); // 2
 * ```
 */
export function countText(input: string): TextStats {
    const characters: number = input.length;
    const charactersNoSpaces = countCharactersNoSpaces(input);
    const words = countWords(input);
    const lines = countLines(input);
    const sentences = countSentences(input);
    const paragraphs = countParagraphs(input);
    const wordArray = getWords(input);
    const averageWordLength = calculateAverageWordLength(wordArray);
    const readingTime = calculateReadingTime(words);
    
    return {
        characters,
        charactersNoSpaces,
        words,
        lines,
        sentences,
        paragraphs,
        averageWordLength,
        readingTime,
    };
}

/**
 * Counts characters excluding spaces.
 *
 * @param input - The text to analyse
 * @returns Character count without spaces
 */
function countCharactersNoSpaces(input: string): number {
    let charactersNoSpaces = 0;
    for (let i = 0, len = input.length; i < len; i++)
    {
        if (input[i] !== ' ')
        {
            charactersNoSpaces++;
        }
    }
    return charactersNoSpaces;
}

/**
 * Calculates average word length.
 *
 * Strips punctuation from words before calculating the average.
 *
 * @param words - Array of words to analyse
 * @returns Average word length
 */
function calculateAverageWordLength(words: string[]): number {
    if (words.length === 0) return 0;
    
    const totalLength = words.reduce((sum, word) => {
        const cleanWord = stripPunctuation(word);
        return sum + cleanWord.length;
    }, 0);
    
    return totalLength / words.length;
}