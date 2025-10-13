import { router, useFocusEffect, useNavigation } from 'expo-router';
import { vars } from 'nativewind';
import React, { useCallback, useMemo, useState } from 'react';
import { Share } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { Text, View } from '@/shared/ui';
import { DarkButton } from '@/shared/ui/DarkButton';
import { TwoSection } from '@/shared/ui/layouts/sections/TwoSection';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { AchievementUnlocked } from '@/widgets/mission/AchievementsUnlocked';
import { MissionUpdate } from '@/widgets/mission/DailyMissions';
import { RankUpdate } from '@/widgets/mission/RankUpdate';
import { StreakAchievemente } from '@/widgets/mission/StreakAchievement';

export default function Mission() {
  const [currentStep, setStep] = useState<number>(1);
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-7': `${moderateScale(7)}px`,
        '--s-20': `${moderateScale(20)}px`,
        '--s-150': `${moderateScale(150)}px`,
      }),
    []
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'share now!',
        title: 'Sharing content',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Ẩn tab bar khi vào
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

      // Reset khi rời
      return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation])
  );

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="flex-1 justify-center">
            <MissionUpdate />
          </View>
        );
      case 2:
        return (
          <View className="flex-1 justify-center">
            <StreakAchievemente />
          </View>
        );
      case 3:
        return (
          <View className="flex-1 justify-center">
            <AchievementUnlocked />
          </View>
        );
      case 4:
        return (
          <View className="flex-1 justify-center">
            <RankUpdate />
          </View>
        );
      default:
        return (
          <View className="items-center justify-center">
            <Text>Error</Text>
          </View>
        );
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setStep(currentStep + 1);
      return;
    }
    router.replace('/(tabs)/index');
  };

  return (
    <TwoSection
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Body={<>{renderContent()}</>}
      Bottom={
        <View className={`pb-5`}>
          {currentStep > 1 && (
            <DarkButton
              title={'share'}
              className={`my-1`}
              textStyle={`uppercase`}
              onPress={onShare}
            />
          )}
          <PrimaryButton
            title={'next'}
            className={`my-1`}
            textStyle={`uppercase`}
            onPress={() => {
              handleNext();
            }}
          />
        </View>
      }
    />
  );
}
