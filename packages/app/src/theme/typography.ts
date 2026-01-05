/**
 * Typography System
 *
 * Three-font hierarchy for optimal readability and technical identity:
 * - Share Tech: UI headings, labels, structural elements
 * - Overpass: Body text, descriptions, readable copy
 * - Share Tech Mono: Code blocks, CLI output, monospace needs
 *
 * @module theme/typography
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

export const typography = {
  // Share Tech = structure (UI Headings, page titles, section headings, labels)
  heading: 'ShareTech_400Regular',
  
  // Overpass = readability (paragraphs, descriptions, longer copy)
  body: 'Overpass_400Regular',
  bodyMedium: 'Overpass_500Medium',
  bodySemiBold: 'Overpass_600SemiBold',
  bodyBold: 'Overpass_700Bold',
  
  // Share Tech Mono = precision (code blocks, CLI output, validators, formatted text)
  mono: 'ShareTechMono_400Regular',
};
