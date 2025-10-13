import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

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
        <TextGradient
          className={`from-primary via-white to-primary pt-1 text-center font-baloo text-xl uppercase`}
          content={title!}
          colors={['primary', 'white', 'primary']}
          locations={[0, 0.47, 1]}
        />
      </View>
      {children}
    </View>
  );
};
