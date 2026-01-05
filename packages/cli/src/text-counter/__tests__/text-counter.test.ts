/**
 * Text Counter Tests
 * 
 * This file contains unit tests for the Text Counter tool, covering text analysis
 *
 * @module tools/text-counter/__tests__
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { countText } from '../index';

describe('Text Counter', () => {
  describe('countText', () => {
    it('should count characters correctly', () => {
      const result = countText('Hello World!');
      expect(result.characters).toBe(12);
    });

    it('should count characters without spaces', () => {
      const result = countText('Hello World!');
      expect(result.charactersNoSpaces).toBe(11);
    });

    it('should count words correctly', () => {
      const result = countText('Hello World! This is a test.');
      expect(result.words).toBe(6);
    });

    it('should count lines correctly', () => {
      const result = countText('Line 1\nLine 2\nLine 3');
      expect(result.lines).toBe(3);
    });

    it('should count sentences correctly', () => {
      const result = countText('First sentence. Second sentence! Third sentence?');
      expect(result.sentences).toBe(3);
    });

    it('should count paragraphs correctly', () => {
      const result = countText('Paragraph 1\n\nParagraph 2\n\nParagraph 3');
      expect(result.paragraphs).toBe(3);
    });

    it('should calculate average word length', () => {
      const result = countText('Hi there world');
      expect(result.averageWordLength).toBe(4);
    });

    it('should calculate reading time', () => {
      const text = 'word '.repeat(200);
      const result = countText(text);
      expect(result.readingTime).toBe(1);
    });

    it('should handle empty input', () => {
      const result = countText('');
      expect(result.characters).toBe(0);
      expect(result.words).toBe(0);
      expect(result.lines).toBe(0);
      expect(result.sentences).toBe(0);
      expect(result.paragraphs).toBe(0);
    });

    it('should handle whitespace-only input', () => {
      const result = countText('   ');
      expect(result.characters).toBe(3);
      expect(result.words).toBe(0);
      expect(result.sentences).toBe(0);
      expect(result.paragraphs).toBe(0);
    });

    it('should handle single word', () => {
      const result = countText('Hello');
      expect(result.words).toBe(1);
      expect(result.sentences).toBe(1);
      expect(result.paragraphs).toBe(1);
    });

    it('should handle multiple spaces between words', () => {
      const result = countText('Hello    World');
      expect(result.words).toBe(2);
      expect(result.charactersNoSpaces).toBe(10);
    });

    it('should handle mixed line endings', () => {
      const result = countText('Line 1\r\nLine 2\rLine 3\nLine 4');
      expect(result.lines).toBe(4);
    });
  });
});
