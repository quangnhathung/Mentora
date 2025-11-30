import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserStore } from '@/entities/user/useUserStore';
import { ProgressBanner } from '@/features/home/ProgessBanner';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { SvgIcon } from '@/shared/ui/SvgIcon';

interface HomeHeaderProps {
  bottomContent?: React.ReactNode;
}

const HomeHeader = ({ bottomContent }: HomeHeaderProps) => {
  const insets = useSafeAreaInsets();
  const profile = useUserStore((state) => state.user);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-20': `${moderateScale(20)}px`,
      }),
    []
  );

  return (
    <BottomBorder className={`rounded-b-3xl`}>
      <View
        className={`w-full flex-col gap-4 border p-4`}
        style={{ ...moderateSize, paddingTop: insets.top + (Platform.OS === 'web' ? 20 : 10) }}
      >
        {/* Top content */}
        <View className="flex-row items-center">
          <View className="flex-1 flex-row items-center justify-start">
            <Image
              source={{
                uri:
                  profile?.avatar ??
                  'https://quangnhathung.github.io/public/mentora/png/olw-ava.png',
              }}
              className="mr-2 size-12 rounded-full border border-border"
            />

            <View>
              <Text className="font-bevietnampro-bold text-base text-white">
                {profile?.name ?? 'Guest'}
              </Text>
              <View className="flex-row items-center gap-1.5">
                <Text className="font-bevietnampro-bold text-base text-white">
                  {profile?.streak ?? 'NaN'}
                </Text>
                <SvgIcon name="flame" />
              </View>
            </View>
          </View>

          {/* Right */}
          <View className="flex-row gap-5">
            <View className={`flex-row items-center gap-1.5`}>
              <SvgIcon name="coin" />
              <Text className={`font-bevietnampro-bold text-base text-white`}>
                {profile?.coins ?? 'NaN'}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom content */}
        {bottomContent}
      </View>
      <View className="mt-3 h-auto w-full px-4">
        <ProgressBanner />
      </View>
    </BottomBorder>
  );
};

export default HomeHeader;
