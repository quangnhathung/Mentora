import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Text } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';

type HeaderWithBackProps = {
  title?: string;
  children?: React.ReactNode;
};

export const HeaderWithBack = ({ title, children }: HeaderWithBackProps) => {
  const router = useRouter();

  const routeBack = () => {
    router.back();
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-20': `${moderateScale(20)}px`,
      }),
    []
  );

  return (
    <View className={`w-full flex-row items-center justify-center py-2`} style={moderateSize}>
      <BackButton
        size={`--h-20`}
        iconSize={20}
        color={colors.white.DEFAULT}
        className={`absolute left-0 w-12`}
        onPress={routeBack}
      />
      <View className={`w-full items-center justify-center`}>
        <Text className="font-baloo text-2xl dark:text-navbar-active">{title}</Text>
      </View>
      {children}
    </View>
  );
};
