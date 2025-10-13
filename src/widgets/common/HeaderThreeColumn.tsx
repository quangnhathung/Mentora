import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { Text } from '@/shared/ui';

type HeaderThreeColumnProps = {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const HeaderThreeColumn = ({ title, left, right }: HeaderThreeColumnProps) => {
  const insets = useSafeAreaInsets();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-20': `${moderateScale(20)}px`,
      }),
    []
  );

  return (
    <View
      className={`flex-row bg-background p-4`}
      style={{ ...moderateSize, paddingTop: insets.top + (Platform.OS === 'web' ? 20 : 10) }}
    >
      <View className={`flex-1`}>{left}</View>
      <View className={`w-3/5 items-center justify-center`}>
        <Text className={`font-baloo text-xl uppercase dark:text-navbar-active`}>{title}</Text>
      </View>
      <View className={`flex-1`}>{right}</View>
    </View>
  );
};
