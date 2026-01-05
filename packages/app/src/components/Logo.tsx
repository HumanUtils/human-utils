/**
 * Full Logo Component
 *
 * Horizontal full logo with ">_ Human Utils" text.
 * Theme-aware and fully scalable.
 *
 * @module components/Logo
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text as SvgText, G } from 'react-native-svg';

interface LogoProps {
  height?: number;
  iconColor?: string;
  textColor?: string;
}

/**
 * Full horizontal logo component
 *
 * @param {number} height - Height of the logo (width auto-scales)
 * @param {string} iconColor - Color for the ">_" icon
 * @param {string} textColor - Color for the "Human Utils" text
 *
 * @example
 * <Logo height={40} iconColor={colors.primary} textColor={colors.text} />
 */
export const Logo: React.FC<LogoProps> = ({
  height = 40,
  iconColor = '#10B981',
  textColor = '#F9FAFB',
}) => {
  // Compact aspect ratio - text immediately after icon
  const width = height * 2.8;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 280 100">
        <G>
          {/* >_ icon */}
          <SvgText
            x="10"
            y="35"
            fontSize="48"
            fontFamily="ShareTechMono_400Regular, monospace"
            fill={iconColor}
            fontWeight="400"
          >
            &gt;_
          </SvgText>

          {/* Human Utils text - immediately after icon */}
          <SvgText
            x="40"
            y="35"
            fontSize="42"
            fontFamily="ShareTech_400Regular, sans-serif"
            fill={textColor}
            fontWeight="400"
          >
            Human Utils
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
