// Underline.tsx
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  active: boolean; // truyền focused của tab vào đây
  width?: number; // px, mặc định 24 ~ w-6
  duration?: number;
};

export function Underline({ active, width = 24, duration = 260 }: Props) {
  const progress = useSharedValue(0); // 0..1

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1), // ease-in-out kiểu Material
    });
  }, [active, duration, progress]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scaleX: progress.value }], // nở từ center
  }));

  return (
    <Animated.View
      // NativeWind vẫn OK trên Reanimated.View
      className="mt-1 h-1 rounded-full bg-secondary"
      style={[{ width, alignSelf: 'center' }, animStyle]}
      pointerEvents="none"
    />
  );
}
