import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Image, Text } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

const MissionExerciseScreen = () => {
  useHideTabBar();
  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      Header={<></>}
      Body={
        <View className="flex-1 items-center justify-center px-5">
          <View className="mt-5 w-[280px] pt-5">
            <Text className="text-center font-baloo text-3xl">Awesome!!</Text>
            <Text className="text-center text-base">
              Your journey to master English starts here.
            </Text>
          </View>
          <View className="flex-1">
            <Image
              style={{ width: 360, height: 600 }}
              source={require('@assets/images/pngs/mento-dance-removebg.png')}
            />
          </View>
        </View>
      }
      Bottom={
        <>
          <View className="px-3 pb-2">
            <PrimaryButton
              title={'Start Your Journey Now !'}
              className={`my-2`}
              textStyle={`uppercase`}
              onPress={() => {
                router.replace('/login');
              }}
            />
          </View>
        </>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(MissionExerciseScreen));
