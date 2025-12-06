import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Image, Text } from '@/shared/ui';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';

const CongraLesson = () => {
  useHideTabBar();
  const { topicId } = useLocalSearchParams();

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      Header={<></>}
      Body={
        <View className="flex-1 items-center justify-center px-5">
          <View className="mt-5 w-[280px] pt-5">
            <Text className="text-center font-baloo text-3xl">CONGRATULATION!</Text>
            <Text className="text-center text-base">You have completed the lesson!!</Text>
          </View>
          <View className="flex-1">
            <Image
              style={{ width: 360, height: 600 }}
              source={require('@assets/images/pngs/MeraLesson.png')}
            />
          </View>
        </View>
      }
      Bottom={
        <>
          <View className="px-3 pb-2">
            <SecondaryButton
              title={'BACK TO LEARNING'}
              className={`my-2`}
              textStyle={`uppercase`}
              onPress={() => {
                router.replace({
                  pathname: '/(tabs)/(discover)/[tid]',
                  params: { tid: String(topicId) },
                });
              }}
            />
          </View>
        </>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(CongraLesson));
