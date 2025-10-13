import React from 'react';
import { Pressable, View } from 'react-native';

import { moderateScale } from '@/shared/lib/helpers/scale';

export type PagingDotsProps = {
  count: number;
  index: number; // active index (0-based)
  onPress?: (i: number) => void;
  disabled?: boolean;
  scrollableThreshold?: number; // default: 8
  className?: string;
};

const Dot = ({ active, pass }: { active: boolean; pass: boolean }) => (
  <View
    className={`${active ? 'bg-primary' : pass ? 'bg-secondary' : 'bg-gray'} w-full rounded-full`}
    style={{ height: moderateScale(10) }}
  />
);

const PagingDots = ({ count, index, onPress, disabled = false, className }: PagingDotsProps) => {
  if (!count || count <= 1) return null;

  const content = (
    <View className={`w-full flex-row items-center justify-center gap-2 pt-3 ${className ?? ''}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Pressable
          key={`dot-${i}`}
          accessibilityRole="button"
          accessibilityLabel={`Step ${i + 1} of ${count}`}
          onPress={() => onPress?.(i)}
          disabled={disabled}
          className={`flex-1 items-center justify-center`}
        >
          <Dot pass={i < index} active={i === index} />
        </Pressable>
      ))}
    </View>
  );

  return <View className="w-full items-start justify-center px-4">{content}</View>;
};

export default PagingDots;
