/**
 * Breakpoints Hook
 *
 * Provides responsive breakpoint detection based on window dimensions.
 * Use this to create responsive layouts that adapt to device size.
 *
 * @module hooks/useBreakpoints
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import { useWindowDimensions } from 'react-native';

/**
 * Breakpoint thresholds (in dp)
 * - SM: < 360 (small phones)
 * - MD: 360-768 (standard phones)
 * - LG: >= 768 (tablets, foldables, desktop)
 */
const BREAKPOINTS = {
  SM: 360,
  LG: 768,
} as const;

export interface Breakpoints {
  /** Small devices (< 360dp) */
  isSM: boolean;
  /** Medium devices (360-768dp) - standard phones */
  isMD: boolean;
  /** Large devices (>= 768dp) - tablets, foldables, desktop */
  isLG: boolean;
  /** Current window width in dp */
  width: number;
  /** Current window height in dp */
  height: number;
}

/**
 * Hook for responsive breakpoint detection.
 *
 * Returns breakpoint flags based on current window dimensions.
 * Use to conditionally apply styles or logic based on screen size.
 *
 * @returns Breakpoint flags and dimensions
 *
 * @example
 * ```tsx
 * const { isLG, isMD } = useBreakpoints();
 *
 * // Conditional rendering
 * {isLG && <TabletSidebar />}
 *
 * // Conditional styling
 * <View style={[styles.container, isLG && styles.containerWide]} />
 *
 * // Different layouts
 * {isLG ? <TwoColumnLayout /> : <SingleColumnLayout />}
 * ```
 */
export function useBreakpoints(): Breakpoints {
  const { width, height } = useWindowDimensions();

  return {
    isSM: width < BREAKPOINTS.SM,
    isMD: width >= BREAKPOINTS.SM && width < BREAKPOINTS.LG,
    isLG: width >= BREAKPOINTS.LG,
    width,
    height,
  };
}
