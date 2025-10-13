import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

import { type Topic } from '@/entities/topic/types';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Image, ProgressBar, Text } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import BottomBorder from '@/shared/ui/BottomBorder';

type HeaderWithImageProps = {
  data?: Topic;
  title?: string;
  children?: React.ReactNode;
};

export const HeaderWithImage = ({ title, data, children }: HeaderWithImageProps) => {
  const insets = useSafeAreaInsets();
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
    <View
      style={{
        height: moderateScale(Platform.OS === 'web' ? 230 : 210),
      }}
      className={twMerge(`w-full flex-col overflow-hidden rounded-b-3xl`)}
    >
      <View className={`absolute size-full`}>
        <BottomBorder className={`border-custom-7 flex-1`}>
          <Image source={data?.image} contentFit="cover" className={`size-full rounded-b-3xl`} />
        </BottomBorder>
      </View>
      <View className={`absolute size-full bg-black/70`}>
        <View className={`flex-1 flex-col justify-end`}>
          <View className="w-full flex-col gap-3 p-4">
            <View className="w-full flex-row items-center">
              <Image
                source={data?.image}
                contentFit="cover"
                className={`size-[26px] rounded-full border border-white`}
              />
              <Image
                source={data?.image}
                contentFit="cover"
                className={`z-10 -ml-[13px] size-[26px] rounded-full border border-white`}
              />
              <Image
                source={data?.image}
                contentFit="cover"
                className={`z-20 -ml-[13px] size-[26px] rounded-full border border-white`}
              />
              <View
                className={`z-30 -ml-[13px] size-[26px] items-center justify-center rounded-full border border-white bg-gray`}
              >
                <Text className={`text-[8px]`}>+99</Text>
              </View>
              <Text className={`pl-1 text-xs`}> completed this topic</Text>
            </View>
            <View className={`flex-col`}>
              <View className={`flex-row justify-between`}>
                <Text className="mb-1 text-xs dark:text-white">3 / 12 lessons</Text>
                <Text className="mb-1 text-end text-xs dark:text-white">40%</Text>
              </View>
              <ProgressBar initialProgress={40} />
            </View>
          </View>
        </View>
      </View>
      <View
        className={`flex-1 px-4`}
        style={{ paddingTop: Platform.OS === 'web' ? 20 : insets.top + 5 }}
      >
        <View className={`w-full flex-row items-center justify-center`} style={moderateSize}>
          <BackButton
            size={`--h-20`}
            iconSize={20}
            color={colors.white.DEFAULT}
            className={`absolute left-0 w-12`}
            onPress={routeBack}
          />
          <View className={`w-full items-center justify-center`}>
            <Text className={`pt-1 text-center font-baloo text-xs uppercase`} tx={'entity.topic'} />
            <Text className={`text-center font-baloo text-xl uppercase`}>{title}</Text>
          </View>
          {children}
        </View>
      </View>
    </View>
  );
};
