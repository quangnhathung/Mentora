import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import LeftArrowSvg from './svg/LeftArrowSvg';

const BackButton = ({ className, onPress }: any) => {
  return (
    <View className={twMerge(`z-10 w-full ${className}`)}>
      <Pressable onPress={onPress}>
        <LeftArrowSvg />
      </Pressable>
    </View>
  );
};

export default BackButton;
