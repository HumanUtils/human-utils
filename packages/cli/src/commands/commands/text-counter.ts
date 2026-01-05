/**
 * Text Counter CLI Command
 *
 * Command-line interface for text analysis and counting.
 *
 * @module cli/commands/text-counter
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { Command } from 'commander';
import { countText } from '../../text-counter';
import * as fs from 'fs';
import * as path from 'path';

export const textCounterCommand = new Command('count')
  .description('Analyse and count text statistics')
  .argument('[text]', 'Text to analyse (reads from stdin if not provided)')
  .option('-f, --file <path>', 'Read text from file')
  .option('-j, --json', 'Output results as JSON')
  .addHelpText(
    'after',
    `
Examples:
  $ hu count "Hello World"                  # Analyse text
  $ hu count -f document.txt                # Analyse file
  $ echo "Hello World" | hu count           # Analyse from stdin
  $ hu count "Lorem ipsum" --json           # JSON output
`
  )
  .action(async (text: string | undefined, options) => {
    try {
      let input = text || '';

      // Read from file if specified
      if (options.file) {
        const filePath = path.resolve(options.file);
        if (!fs.existsSync(filePath)) {
          console.error(`Error: File not found: ${filePath}`);
          process.exit(1);
        }
        input = fs.readFileSync(filePath, 'utf-8');
      }
      // Read from stdin if no text or file provided
      else if (!text && !process.stdin.isTTY) {
        const chunks: Buffer[] = [];
        for await (const chunk of process.stdin) {
          chunks.push(chunk);
        }
        input = Buffer.concat(chunks).toString('utf-8');
      }

      if (!input) {
        console.error('Error: No text provided. Use --help for usage information.');
        process.exit(1);
      }

      const stats = countText(input);

      if (options.json) {
        console.log(JSON.stringify(stats, null, 2));
      } else {
        console.log('Text Statistics:');
        console.log('─────────────────────────────────');
        console.log(`Characters:           ${stats.characters.toLocaleString()}`);
        console.log(`Characters (no space): ${stats.charactersNoSpaces.toLocaleString()}`);
        console.log(`Words:                ${stats.words.toLocaleString()}`);
        console.log(`Lines:                ${stats.lines.toLocaleString()}`);
        console.log(`Sentences:            ${stats.sentences.toLocaleString()}`);
        console.log(`Paragraphs:           ${stats.paragraphs.toLocaleString()}`);
        console.log(`Avg. Word Length:     ${stats.averageWordLength.toFixed(1)}`);
        console.log(`Reading Time:         ${stats.readingTime.toFixed(1)} min`);
      }
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  });
