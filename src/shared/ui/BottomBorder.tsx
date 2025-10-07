import React from 'react';
import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface BottomBorderProps extends ViewProps {
  borderColor?: string;
  rounded?: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-[30px]';
  borderWidth?: number;
  offset?: number; // khoảng cách "outside" tính bằng px
  children?: React.ReactNode;
}

export default function BottomBorder({
  children,
  rounded = 'rounded-xl',
  className,
  ...rest
}: BottomBorderProps) {
  // if (Platform.OS === 'android') {
  //   return (
  //     <View className={`overflow-hidden ${rounded}`}>
  //       <View className={twMerge(``, className)} {...rest}>
  //         {children}
  //       </View>
  //     </View>
  //   );
  // }
  return (
    <View className={twMerge(`${rounded}`, className)} {...rest}>
      {children}
    </View>
  );
}
