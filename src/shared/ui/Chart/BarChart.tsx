import React from 'react';

import { Pressable, Text, View } from '@/shared/ui';

type BarProps = {
  value: number;
  best: number;
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
};

export default function BarChart({
  value,
  best,
  label,
  isSelected,
  onPress,
}: BarProps) {
  const height = (value / 100) * 120;
  const barColor =
    isSelected || value === best ? 'bg-secondary' : 'bg-background-dark';

  return (
    <Pressable className="flex-col-reverse items-center" onPress={onPress}>
      <Text className="mt-2 font-bevietnampro text-xs text-white">{label}</Text>
      <View className={`w-12 rounded-lg ${barColor}`} style={{ height }} />
      <Text className="mb-1 font-baloo text-sm text-white">{value}</Text>
    </Pressable>
  );
}
