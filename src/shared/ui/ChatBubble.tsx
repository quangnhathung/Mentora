// ExactPathBubble.tsx
import React, { useCallback, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type Props = {
  children?: React.ReactNode;
  paddingH?: number;
  paddingV?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string | 'none' | 'url';
  gradient?: [string, string]; // nếu muốn nền gradient
  style?: ViewStyle;
};

const ORIG_W = 311;
const ORIG_H = 60;

// path GỐC của bạn (giữ nguyên)
const D =
  'M305.983 0.519531C308.475 0.510312 310.5 2.52696 310.5 5.01855V53C310.5 55.4853 308.485 57.5 306 57.5H9.14355C6.65836 57.4999 4.64355 55.4852 4.64355 53V8.80859C4.64355 7.35726 3.63207 6.1022 2.21387 5.79395C-0.221945 5.26464 0.155912 1.68054 2.64844 1.6709L305.983 0.519531Z';

export default function ExactPathBubble({
  children,
  paddingH = 16,
  paddingV = 12,
  stroke = '#FFFFFF',
  strokeWidth = 1.5,
  fill = 'none',
  gradient,
}: Props) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  const onInnerLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      // SVG kích thước = content + padding
      setSize({ w: Math.ceil(width) + paddingH * 2, h: Math.ceil(height) + paddingV * 2 });
    },
    [paddingH, paddingV]
  );

  const W = Math.max(1, size.w);
  const H = Math.max(1, size.h);
  const useGrad = fill === 'url' && gradient;

  return (
    <View className={`w-full`}>
      {/* SVG background – giữ nguyên path, scale theo viewBox */}
      {W > 1 && H > 1 && (
        <Svg
          width={'100%'}
          height={'100%'}
          viewBox={`0 0 ${ORIG_W} ${ORIG_H}`}
          preserveAspectRatio="none" // cho phép scale độc lập W/H
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        >
          {useGrad && (
            <Defs>
              <LinearGradient id="bubbleGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={gradient[0]} />
                <Stop offset="1" stopColor={gradient[1]} />
              </LinearGradient>
            </Defs>
          )}
          <Path
            d={D}
            fill={useGrad ? 'url(#bubbleGrad)' : fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke" // giữ độ dày viền khi scale
          />
        </Svg>
      )}

      {/* container để đo kích thước children */}
      <View
        // style={{ paddingHorizontal: paddingH, paddingVertical: paddingV }}
        className={`px-4 py-3`}
        onLayout={onInnerLayout}
      >
        {children}
      </View>
    </View>
  );
}
