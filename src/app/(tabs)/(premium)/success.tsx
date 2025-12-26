// Thêm useRef, useCallback
import { router } from 'expo-router';

import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { Image, Text, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

export default function PremiumSuccessScreen() {
  useHideTabBar();

  return (
    <View className="m-0 flex-1 p-0">
      <GradientView
        colors={['#F8AAD3', '#CAB9FC']}
        containerClassName="h-full w-full rounded-xl"
        className="h-full pt-4"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <TextGradient
          content="CONGRATULATION!"
          colors={['#C68900', '#FFFFFF', '#FFD36B']}
          className="mt-6 text-center font-baloo text-2xl shadow-sm"
        />
        <View className="flex-1 justify-between">
          <View className="f-full mt-3 items-center justify-center pt-4">
            <Image
              className="h-[300px] w-[250px]"
              source={require('@assets/images/pngs/mera-congra.png')}
            />
            <Text className="mt-5 text-center text-2xl font-bold dark:text-white">
              You are now subcribed to Premium!
            </Text>
          </View>
        </View>
        <View className="px-3 pb-4">
          <SecondaryButton
            title="Back to leanring!"
            onPress={() => {
              router.replace('/(tabs)/index');
            }}
          />
        </View>
      </GradientView>
    </View>
  );
}
