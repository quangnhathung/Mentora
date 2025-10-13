import { vars } from 'nativewind';
import React, { useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserStore } from '@/entities/user/useUserStore';
import { HomeHeaderModal, type HomeModalRef } from '@/features/home/ui/PathProgressModal';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Image, Pressable, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { SvgIcon } from '@/shared/ui/SvgIcon';

interface HomeHeaderProps {
  bottomContent?: React.ReactNode;
}

const HomeHeader = ({ bottomContent }: HomeHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { profile } = useUserStore();
  const ModalRef = useRef<HomeModalRef>(null);

  const handleSelect = () => {
    ModalRef.current!.modal!.present();
  };
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-20': `${moderateScale(20)}px`,
      }),
    []
  );

  return (
    <BottomBorder className={`border-custom-7-light rounded-b-3xl`}>
      <View
        className={`w-full flex-col gap-4 rounded-b-3xl bg-primary p-4`}
        style={{ ...moderateSize, paddingTop: insets.top + (Platform.OS === 'web' ? 20 : 10) }}
      >
        {/* Top content */}
        <View className="flex-row items-center">
          {/* Left */}
          <View className="flex-1 flex-row items-center justify-start">
            <Image
              source={{ uri: profile?.avatar! }}
              className="mr-2 size-12 rounded-full border-2 border-white"
            />

            <View>
              <Text className="font-bevietnampro-bold text-base text-white">{profile?.name}</Text>
              <Text className="font-bevietnampro text-sm dark:text-primary">Beginner</Text>
            </View>
          </View>

          {/* Right */}
          <View className="flex-row gap-5">
            <View className="flex-row items-center justify-center gap-1.5">
              <SvgIcon name="flame" />
              <Text className="font-bevietnampro-bold text-base text-white">
                {profile?.stats?.streak || 0}
              </Text>
            </View>

            <View className={`flex-row items-center gap-1.5`}>
              <SvgIcon name="heart" />
              <Text className={`font-bevietnampro-bold text-base text-white`}>
                {profile?.progress?.currentHealth || 0}
              </Text>
            </View>
          </View>
        </View>

        <Pressable className="relative" onPress={() => handleSelect()}></Pressable>
        <HomeHeaderModal ref={ModalRef} />
        {/* Bottom content */}
        {bottomContent}
      </View>
    </BottomBorder>
  );
};

export default HomeHeader;
