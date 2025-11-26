import React from 'react';

import { colors, Pressable, Text } from '@/shared/ui';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

type BadgeProps = {
  icon?: IconName;
  title?: string;
  className?: string;
  onPress?: () => void;
};

export const Badge = ({ icon, title, className, onPress }: BadgeProps) => {
  return (
    <Pressable
      className={`h-[35px] flex-row items-center justify-center gap-1 rounded-full border border-white bg-gray-500 px-2 ${className}}`}
      onPress={onPress}
    >
      <SvgIcon name={icon!} size={12} color={colors.white.DEFAULT} />
      {title && <Text className={`font-bevietnampro-bold text-sm dark:text-white`}>{title}</Text>}
    </Pressable>
  );
};
