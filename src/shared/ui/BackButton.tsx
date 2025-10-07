import React from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { SvgIcon } from './SvgIcon';

const BackButton = ({ className, onPress }: any) => {
  return (
    <View className={twMerge(`z-10 w-full ${className}`)}>
      <Pressable onPress={onPress}>
        <SvgIcon name="arrowleft" size={24} />
      </Pressable>
    </View>
  );
};

export default BackButton;
