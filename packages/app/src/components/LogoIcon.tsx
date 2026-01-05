/**
 * Logo Icon Component
 *
 * Square icon-only version of the Human Utils logo.
 * Displays ">_" in Share Tech Mono font as SVG.
 * Theme-aware and fully scalable.
 *
 * @module components/LogoIcon
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text as SvgText, G } from 'react-native-svg';

interface LogoIconProps {
  size?: number;
  color?: string;
  /** If true, renders as a square (useful for compact spaces). Default: false (wide aspect ratio) */
  square?: boolean;
}

/**
 * Icon-only logo component
 *
 * @param {number} size - Size of the icon (width/height)
 * @param {string} color - Color for the logo
 *
 * @example
 * <LogoIcon size={64} color={colors.primary} />
 */
export const LogoIcon: React.FC<LogoIconProps> = ({ size = 48, color = '#10B981', square = false }) => {
  // ViewBox dimensions: 70 width × 36 height (aspect ratio ~1.94:1)
  const aspectRatio = 70 / 36;
  const width = square ? size : size * aspectRatio;
  const height = size;
  
  return (
    <View style={[styles.container, { width, height, alignItems: 'center', justifyContent: 'center' }]}>
      <Svg width={width} height={height} viewBox="15 32 70 36">
        <G>
          {/* >_ text tightly cropped */}
          <SvgText
            x="50"
            y="62"
            fontSize="48"
            fontFamily="ShareTechMono_400Regular, monospace"
            fill={color}
            textAnchor="middle"
            fontWeight="400"
          >
            &gt;_
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
