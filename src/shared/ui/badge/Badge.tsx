import React from 'react';

import { colors, Pressable, Text } from '@/shared/ui';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

type BadgeProps = {
  icon?: IconName;
  title?: string;
  onPress?: () => void;
};

export const Badge = ({ icon, title, onPress }: BadgeProps) => {
  return (
    <Pressable
      className={`h-[35px] flex-row items-center justify-center gap-1 rounded-full border border-white bg-secondary px-2`}
      onPress={onPress}
    >
      <SvgIcon name={icon!} size={22} color={colors.white.DEFAULT} />
      {title && <Text className={`font-bevietnampro-bold text-sm`}>{title}</Text>}
    </Pressable>
  );
};
