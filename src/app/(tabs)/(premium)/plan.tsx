import { router, useFocusEffect, useNavigation } from 'expo-router';
import { vars } from 'nativewind';
import React, { useCallback, useMemo, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';

import { type Premium } from '@/entities/user/types';
import { useUserStore } from '@/entities/user/useUserStore';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { View } from '@/shared/ui';
import { PremiumSection } from '@/shared/ui/layouts/sections/PremiumSection';
import PlanList from '@/shared/ui/premium/PlanList';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

export function PremiumPlanScreen() {
  const navigation = useNavigation();
  const profile = useUserStore().profile;
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation])
  );

  // useEffect(() => {
  //   const ExpireAt = Date.now() + selectedPlan;
  // }, [selectedPlan]);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-60': `${moderateScale(60)}px`,
        '--s-270': `${moderateScale(270)}px`,
      }),
    []
  );

  const handleGetPremium = () => {
    if (!selectedPlan) return;
    const PremiumPackage: Premium = { isActive: true, expiresAt: Date.now() + selectedPlan };
    console.log('Premium: ', PremiumPackage);
    useUserStore.setState({
      profile: {
        ...profile,
        premium: PremiumPackage,
      },
    });
    router.replace('/(tabs)/(premium)/congratulation');
  };

  return (
    <PremiumSection
      title="Choose a subscription plan"
      scrollable
      style={moderateSize}
      Body={
        <View className="p-4">
          <PlanList onChange={setSelectedPlan} />
        </View>
      }
      Bottom={
        <View className="w-full flex-row justify-between gap-2">
          <PrimaryButton
            title={'Get Premium'}
            className={`my-1 flex-1`}
            textStyle={`uppercase text-base`}
            onPress={handleGetPremium}
          />
        </View>
      }
    />
  );
}

export default withDeviceLayout(PremiumPlanScreen);
