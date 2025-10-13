import React from 'react';

import { Pressable } from '@/shared/ui';

import { type IconName, SvgIcon } from './SvgIcon';

type IconButtonProps = {
  iconName: IconName;
  color?: string;
  size?: number;
  onPress?: () => void;
  onHold?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

const IconButton = ({
  iconName,
  color,
  size = 24,
  onPress,
  onHold,
  onPressIn,
  // delayPressIn,
  onPressOut,
}: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onHold}
      delayLongPress={1000}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={(pressed) => {
        return { opacity: pressed ? 0.7 : 1 };
      }}
    >
      <SvgIcon name={iconName} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;
