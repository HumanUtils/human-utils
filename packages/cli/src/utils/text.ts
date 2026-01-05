/**
 * Text Parsing Utilities
 *
 * Shared text analysis and parsing functions used across multiple tools.
 *
 * @module utils/text
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

/**
 * Validates that input text is not empty.
 *
 * @param input - The text to validate
 * @returns True if text is valid (non-empty after trimming)
 */
export function isValidInput(input: string): boolean {
    return input !== undefined && input !== null && input.trim().length > 0;
}

/**
 * Normalises text input by trimming whitespace.
 *
 * @param input - The text to normalise
 * @returns Trimmed text or empty string
 */
export function normaliseTextInput(input: string): string {
    return input.trim();
}

/**
 * Capitalises the first letter of a word.
 *
 * @param word - The word to capitalise
 * @returns Word with first letter uppercase, rest lowercase
 */
export function capitaliseWord(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Counts words in the text.
 *
 * @param input - The text to analyse
 * @returns Word count
 */
export function countWords(input: string): number {
    const trimmed = normaliseTextInput(input);
    if (trimmed === '') return 0;
    return trimmed.split(/\s+/).length;
}

/**
 * Splits text into an array of words.
 *
 * @param input - The text to split
 * @returns Array of words
 */
export function getWords(input: string): string[] {
    const trimmed = normaliseTextInput(input);
    if (trimmed === '') return [];
    return trimmed.split(/\s+/);
}

/**
 * Counts lines in the text.
 *
 * Handles CRLF, CR, and LF line endings.
 *
 * @param input - The text to analyse
 * @returns Line count
 */
export function countLines(input: string): number {
    if (input === '') return 0;
    return input.split(/\r\n|\r|\n/).length;
}

/**
 * Counts sentences in the text.
 *
 * Uses Intl.Segmenter when available, otherwise falls back to
 * regex-based detection of sentence-ending punctuation.
 *
 * @param input - The text to analyse
 * @returns Sentence count
 */
export function countSentences(input: string): number {
    const trimmed = normaliseTextInput(input);
    if (trimmed === '') return 0;

    const AnyIntl: any = (Intl as any);
    if (typeof AnyIntl.Segmenter === 'function') {
        const seg = new AnyIntl.Segmenter(undefined, { granularity: 'sentence' });
        let count = 0;
        for (const segItem of seg.segment(trimmed)) {
            if (typeof segItem === 'string') {
                if (segItem.trim()) count++;
            } else if (segItem && typeof segItem.segment === 'string') {
                if (segItem.segment.trim()) count++;
            }
        }
        return count;
    }

    // Fallback: collapse whitespace, treat ellipses as single terminator,
    // match chunks ending with sentence punctuation (., !, ?)
    const text = trimmed.replace(/\s+/g, ' ');
    const matches = text.match(/[^.!?]+(?:\.\.\.|[.!?])+(?=\s|$)/g);
    const matchedCount = matches ? matches.length : 0;

    const endsWithPunct = /[.!?]\s*$/.test(text);
    return matchedCount + (matchedCount === 0 && !endsWithPunct ? 1 : (!endsWithPunct && matchedCount > 0 ? 1 : 0));
}

/**
 * Counts paragraphs in the text.
 *
 * Paragraphs are separated by two or more consecutive newlines.
 *
 * @param input - The text to analyse
 * @returns Paragraph count
 */
export function countParagraphs(input: string): number {
    const trimmed = normaliseTextInput(input);
    if (trimmed === '') return 0;
    
    const paragraphs = trimmed.split(/(?:\r\n|\r|\n){2,}/);
    return paragraphs.filter(p => p.trim().length > 0).length;
}

/**
 * Calculates estimated reading time in minutes.
 *
 * Based on average reading speed of 200 words per minute.
 *
 * @param wordCount - Number of words in the text
 * @returns Reading time in minutes
 */
export function calculateReadingTime(wordCount: number): number {
    const wordsPerMinute = 200;
    return wordCount / wordsPerMinute;
}

/**
 * Strips punctuation from a word.
 *
 * @param word - The word to clean
 * @returns Word without punctuation
 */
export function stripPunctuation(word: string): string {
    return word.replace(/[^\w]/g, '');
}
