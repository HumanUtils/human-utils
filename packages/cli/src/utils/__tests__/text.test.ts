/**
 * Text Utilities Tests
 *
 * Unit tests for shared text parsing utilities.
 *
 * @module utils/__tests__/text
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import {
    isValidInput,
    normaliseTextInput,
    capitaliseWord,
    countWords,
    getWords,
    countLines,
    countSentences,
    countParagraphs,
    calculateReadingTime,
    stripPunctuation,
} from '../text';

describe('Text Utilities', () => {
    describe('isValidInput', () => {
        it('should return true for valid input', () => {
            expect(isValidInput('hello')).toBe(true);
        });

        it('should return false for empty string', () => {
            expect(isValidInput('')).toBe(false);
        });

        it('should return false for whitespace-only string', () => {
            expect(isValidInput('   ')).toBe(false);
        });

        it('should return true for string with content', () => {
            expect(isValidInput('  hello  ')).toBe(true);
        });
    });

    describe('normaliseTextInput', () => {
        it('should trim whitespace', () => {
            expect(normaliseTextInput('  hello  ')).toBe('hello');
        });

        it('should handle empty string', () => {
            expect(normaliseTextInput('')).toBe('');
        });

        it('should handle whitespace-only string', () => {
            expect(normaliseTextInput('   ')).toBe('');
        });
    });

    describe('capitaliseWord', () => {
        it('should capitalise first letter', () => {
            expect(capitaliseWord('hello')).toBe('Hello');
        });

        it('should lowercase rest of word', () => {
            expect(capitaliseWord('HELLO')).toBe('Hello');
        });

        it('should handle single character', () => {
            expect(capitaliseWord('a')).toBe('A');
        });

        it('should handle empty string', () => {
            expect(capitaliseWord('')).toBe('');
        });

        it('should handle mixed case', () => {
            expect(capitaliseWord('hELLo')).toBe('Hello');
        });
    });

    describe('countWords', () => {
        it('should count words correctly', () => {
            expect(countWords('Hello world')).toBe(2);
        });

        it('should handle empty string', () => {
            expect(countWords('')).toBe(0);
        });

        it('should handle multiple spaces', () => {
            expect(countWords('Hello    world')).toBe(2);
        });
    });

    describe('getWords', () => {
        it('should split text into words', () => {
            expect(getWords('Hello world')).toEqual(['Hello', 'world']);
        });

        it('should handle empty string', () => {
            expect(getWords('')).toEqual([]);
        });

        it('should handle multiple spaces', () => {
            expect(getWords('Hello    world')).toEqual(['Hello', 'world']);
        });
    });

    describe('countLines', () => {
        it('should count lines with LF', () => {
            expect(countLines('Line 1\nLine 2')).toBe(2);
        });

        it('should count lines with CRLF', () => {
            expect(countLines('Line 1\r\nLine 2')).toBe(2);
        });

        it('should handle empty string', () => {
            expect(countLines('')).toBe(0);
        });

        it('should handle single line', () => {
            expect(countLines('Single line')).toBe(1);
        });
    });

    describe('countSentences', () => {
        it('should count sentences with periods', () => {
            expect(countSentences('First. Second.')).toBe(2);
        });

        it('should count sentences with different punctuation', () => {
            expect(countSentences('First! Second? Third.')).toBe(3);
        });

        it('should handle empty string', () => {
            expect(countSentences('')).toBe(0);
        });

        it('should handle text without punctuation', () => {
            expect(countSentences('No punctuation')).toBe(1);
        });

        it('should handle ellipses', () => {
            expect(countSentences('Wait... What?')).toBe(2);
        });
    });

    describe('countParagraphs', () => {
        it('should count paragraphs separated by double newlines', () => {
            expect(countParagraphs('Para 1\n\nPara 2')).toBe(2);
        });

        it('should handle single paragraph', () => {
            expect(countParagraphs('Single paragraph')).toBe(1);
        });

        it('should handle empty string', () => {
            expect(countParagraphs('')).toBe(0);
        });

        it('should ignore single newlines', () => {
            expect(countParagraphs('Line 1\nLine 2')).toBe(1);
        });

        it('should handle multiple empty lines', () => {
            expect(countParagraphs('Para 1\n\n\nPara 2')).toBe(2);
        });
    });

    describe('calculateReadingTime', () => {
        it('should calculate reading time for 200 words', () => {
            expect(calculateReadingTime(200)).toBe(1);
        });

        it('should calculate reading time for 400 words', () => {
            expect(calculateReadingTime(400)).toBe(2);
        });

        it('should handle zero words', () => {
            expect(calculateReadingTime(0)).toBe(0);
        });

        it('should calculate fractional minutes', () => {
            expect(calculateReadingTime(100)).toBe(0.5);
        });
    });

    describe('stripPunctuation', () => {
        it('should remove punctuation', () => {
            expect(stripPunctuation('hello!')).toBe('hello');
        });

        it('should remove multiple punctuation marks', () => {
            expect(stripPunctuation('hello!!!')).toBe('hello');
        });

        it('should handle text without punctuation', () => {
            expect(stripPunctuation('hello')).toBe('hello');
        });

        it('should handle empty string', () => {
            expect(stripPunctuation('')).toBe('');
        });

        it('should remove all special characters', () => {
            expect(stripPunctuation('hello@world#test')).toBe('helloworldtest');
        });
    });
});
