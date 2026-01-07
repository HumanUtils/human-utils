import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text as SvgText, G } from 'react-native-svg';

interface LogoProps {
  height?: number;
  iconColor?: string;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  height = 40,
  iconColor = '#10B981',
  textColor = '#F9FAFB',
}) => {
  // Define a canonical design space
  const VB_W = 280;
  const VB_H = 100;

  // Keep your aspect ratio, but derive it from the canonical space
  const width = Math.round((height * VB_W) / VB_H);

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${VB_W} ${VB_H}`}>
        <G>
          {/* Baseline around midline to avoid font metric differences */}
          <SvgText
            x="10"
            y="58"
            fontSize="48"
            fontFamily="ShareTechMono_400Regular, monospace"
            fill={iconColor}
            fontWeight="400"
          >
            &gt;_
          </SvgText>

          <SvgText
            x="80"
            y="58"
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
