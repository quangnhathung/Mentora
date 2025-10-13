// WiggleIcon.reanimated.tsx
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

export function WiggleIcon({
  name,
  color,
  size = 28,
  focused,
}: {
  name: IconName;
  color: string;
  size?: number;
  focused: boolean;
}) {
  const rot = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      rot.value = withSequence(
        withTiming(-12, { duration: 80 }),
        withTiming(12, { duration: 160 }),
        withTiming(-8, { duration: 120 }),
        withTiming(0, { duration: 100 })
      );
      scale.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 120 })
      );
      // hoặc lắc nhẹ liên tục:
      // rot.value   = withRepeat(withTiming(6, { duration: 600 }), -1, true);
      // scale.value = withRepeat(withTiming(1.05, { duration: 600 }), -1, true);
    } else {
      rot.value = withTiming(0, { duration: 80 });
      scale.value = withTiming(1, { duration: 80 });
    }
  }, [focused, rot, scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rot.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={style}>
      <SvgIcon name={name} color={color} size={size} />
    </Animated.View>
  );
}
