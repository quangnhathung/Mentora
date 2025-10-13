import { router, useFocusEffect, useNavigation } from 'expo-router';
import { vars } from 'nativewind';
import React, { useCallback, useMemo } from 'react';
import { moderateScale } from 'react-native-size-matters';

import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { PremiumSection } from '@/shared/ui/layouts/sections/PremiumSection';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { SvgIcon } from '@/shared/ui/SvgIcon';

const benefit = [
  'Extra lesson content with rewards',
  'Extra role-play content',
  'Extra voices accents (India, Singapore)',
  'And more...',
];

export function CongratulationScreen() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Ẩn tab bar khi vào
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

      // Reset khi rời
      return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation])
  );
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-60': `${moderateScale(60)}px`,
        '--s-270': `${moderateScale(270)}px`,
      }),
    []
  );

  return (
    <PremiumSection
      className={``}
      title="Congratulations!"
      note={"You're Now a Premium Member!"}
      scrollable
      style={moderateSize}
      Body={
        <View className="rounded-xl p-4">
          <BottomBorder className={`border-custom-5 flex-1 rounded-xl`}>
            <View className="items-center justify-center rounded-xl bg-background-dark-light p-4 py-7">
              <SvgIcon name="CatWithCup" size={150} />
              <Text className="font-baloo text-2xl">All Benefits Unlocked</Text>
              <View className="w-full gap-2 px-3 pt-4">
                {benefit.map((c, i) => (
                  <View className="flex-row gap-3" key={i}>
                    <SvgIcon name="checked" />
                    <Text className="flex-1">{c}</Text>
                  </View>
                ))}
              </View>
              <Text className="pt-5 text-center font-bevietnampro text-sm">
                Your subscription will automatically renew
                <Text className="dark:text-cyan"> 3 months</Text> unless canceled. Manage your
                subscription in your account settings.
              </Text>
            </View>
          </BottomBorder>
        </View>
      }
      Bottom={
        <View className="w-full flex-row justify-between gap-2">
          <PrimaryButton
            title={'Back to learning!'}
            className={`my-1 flex-1`}
            textStyle={`uppercase text-base`}
            onPress={() => {
              router.replace('/(tabs)/index');
            }}
          />
        </View>
      }
    />
  );
}

export default withDeviceLayout(CongratulationScreen);
