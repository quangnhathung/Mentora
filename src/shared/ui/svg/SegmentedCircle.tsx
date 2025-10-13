// SegmentedCircle.tsx
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { moderateScale } from '@/shared/lib/helpers/scale';

type Props = {
  size: number; // đường kính
  uri?: string; // đường kính
  strokeWidth?: number;
  segments: number; // số đoạn (== số khoảng trống)
  gapAngle?: number; // độ rộng khoảng trống (độ)
  startAngle?: number; // góc bắt đầu, mặc định -90 (đỉnh trên)
  color?: string; // màu mặc định
  highlightIndex?: number; // index đoạn cần đổi màu (0..segments-1)
  highlightColor?: string;
  direction?: 'cw' | 'ccw';
  children?: React.ReactNode;
};

export const SegmentedCircle: React.FC<Props> = ({
  size,
  strokeWidth = 12,
  segments,
  gapAngle = 24,
  startAngle = -100,
  color = '#F7A51A',
  highlightIndex,
  highlightColor = '#8F75FF',
  direction = 'ccw',
  children,
}) => {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-image': `${moderateScale(size)}px`,
        '--p-circle-image': `${moderateScale(Platform.OS === 'android' ? 10 : 15)}px`,
      }),
    []
  );

  // mỗi cung có góc:
  const totalGap = segments * gapAngle;
  const segAngle = (360 - totalGap) / segments;
  const sign = direction === 'cw' ? 1 : -1;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const polar = (angle: number) => {
    const a = toRad(angle);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const arcPath = (a0: number, a1: number) => {
    const p0 = polar(a0);
    const p1 = polar(a1);
    const delta = a1 - a0;
    const largeArc = Math.abs(delta) > 180 ? 1 : 0;
    const sweepFlag = direction === 'cw' ? 1 : 0; // 1: clockwise, 0: counterclockwise
    return [`M ${p0.x} ${p0.y}`, `A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${p1.x} ${p1.y}`].join(
      ' '
    );
  };

  const items = Array.from({ length: segments }).map((_, i) => {
    const s = startAngle + sign * i * (segAngle + gapAngle);
    const e = s + sign * segAngle;
    const stroke = i === highlightIndex ? highlightColor : color;
    return (
      <Path
        key={i}
        d={arcPath(s, e)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    );
  });

  return (
    <View className={`items-center justify-center`} style={moderateSize}>
      <View className={`z-999 overflow-hidden`}>
        <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          {items}
        </Svg>
      </View>
      <View className={`absolute size-[--s-circle-image] rounded-full p-[--p-circle-image]`}>
        {children}
      </View>
    </View>
  );
};
