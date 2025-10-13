import { router, useFocusEffect, useNavigation } from 'expo-router';
import { vars } from 'nativewind';
import React, { useCallback, useMemo } from 'react';
import { moderateScale } from 'react-native-size-matters';

import { usePremiumData } from '@/entities/premium/model';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { DarkButton } from '@/shared/ui/DarkButton';
import { PremiumSection } from '@/shared/ui/layouts/sections/PremiumSection';
import { BenefitPackage } from '@/shared/ui/premium/BenefitItem';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

export function PremiumScreen() {
  const { data } = usePremiumData.getBenefit();
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
      title="Get a better and super fast learning up to 5x with Premium"
      scrollable
      style={moderateSize}
      Body={
        <View className="rounded-xl px-4">
          <BottomBorder className={`border-custom-5 relative flex-1 rounded-xl`}>
            <View className="rounded-xl">
              <View className="rounded-xl bg-background-dark-light p-4">
                <View className="gap-1">
                  {data?.data?.map((item, index) => (
                    <View key={index}>
                      <BenefitPackage item={item} />
                      {index < data.data.length - 1 && <View className="my-3 h-px bg-white" />}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </BottomBorder>
        </View>
      }
      Bottom={
        <View className="w-full flex-row justify-between gap-2">
          <DarkButton
            title={'No, thanks!'}
            className={`my-1 flex-1`}
            textStyle={`uppercase text-base`}
            onPress={() => {
              router.back();
            }}
          />
          <PrimaryButton
            title={'Get Premium'}
            className={`my-1 flex-1`}
            textStyle={`uppercase text-base`}
            onPress={() => {
              router.push('/(tabs)/(premium)/plan');
            }}
          />
        </View>
      }
    />
  );
}

export default withDeviceLayout(PremiumScreen);
