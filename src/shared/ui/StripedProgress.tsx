// StripedProgress.tsx
import React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Pattern,
  Rect,
  Stop,
} from 'react-native-svg';

import colors from '@/shared/ui/colors';

type Props = {
  value: number; // 0..1
  height?: number; // chỉ đổi cái này
  style?: StyleProp<ViewStyle>;
  trackColor?: string;
  startColor?: string;
  endColor?: string;
  stripeOpacity?: number;
  animatedStripes?: boolean; // giữ prop cho compatibility (không dùng)
};

export default function StripedProgress({
  value,
  height = 12,
  style,
  trackColor = colors.white.DEFAULT,
  startColor = colors.white.dark,
  endColor = colors.white.dark,
  stripeOpacity = 1,
}: Props) {
  const v = Math.max(0, Math.min(1, value));
  const r = height / 2;

  const STRIPE_SIZE = 12;
  const percent = `${v * 100}%`;

  // iOS fix: xoay quanh tâm tile -> không bị "mũi tên"/hở mép
  const cx = STRIPE_SIZE / 2;
  const cy = STRIPE_SIZE / 2;
  const patternTransform = `rotate(45 ${cx} ${cy})`;

  return (
    <View style={[{ width: '100%' }, style]}>
      <Svg width="100%" height={height}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={startColor} />
            <Stop offset="100%" stopColor={endColor} />
          </LinearGradient>

          <Pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            width={STRIPE_SIZE}
            height={STRIPE_SIZE}
            patternTransform={patternTransform}
          >
            {/* Kéo dài theo trục dọc để tile lặp không hở mép trên iOS */}
            <Rect
              x={0}
              y={-STRIPE_SIZE} // đẩy lên 1 tile
              width={STRIPE_SIZE / 2}
              height={STRIPE_SIZE * 3} // đủ dài để xoay + lặp
              fill={`rgba(255,255,255,${stripeOpacity})`}
            />
          </Pattern>
        </Defs>

        {/* Track full width */}
        <Rect width="100%" height={height} rx={r} ry={r} fill={trackColor} />

        {/* Progress + stripes (giữ nguyên style/kiểu) */}
        <Rect width={percent} height={height} rx={r} ry={r} fill="url(#grad)" />
        <Rect
          width={percent}
          height={height}
          rx={r}
          ry={r}
          fill="url(#stripes)"
        />
      </Svg>
    </View>
  );
}
