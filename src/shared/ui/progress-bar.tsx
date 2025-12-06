import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

type Props = {
  initialProgress?: number;
  height?: number;
  className?: string;
  empty?: boolean;
  marker?: React.ReactNode;
};

export type ProgressBarRef = {
  setProgress: (value: number) => void;
};

export const ProgressBar = forwardRef<ProgressBarRef, Props>(
  ({ initialProgress = 0, height = 7, className = '', marker, empty }, ref) => {
    const progress = useSharedValue<number>(initialProgress ?? 0);

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (value: number) => {
          progress.value = withTiming(value, {
            duration: 250,
            easing: Easing.inOut(Easing.quad),
          });
        },
      }),
      [progress]
    );

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scaleX: progress.value / 100 }],
      };
    });

    return (
      <View
        className={twMerge(`rounded-full ${empty ? 'bg-white' : 'bg-white'}`, className)}
        style={{ width: '100%', overflow: 'hidden' }}
      >
        <Animated.View
          style={[{ height, transformOrigin: 'left' }, animatedStyle]}
          className="rounded-full bg-navbar-active"
        />
        {marker}
      </View>
    );
  }
);
