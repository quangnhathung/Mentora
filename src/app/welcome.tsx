import { router } from 'expo-router';
import { vars } from 'nativewind';
import { useMemo } from 'react';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { Image, Text, View } from '@/shared/ui';
import { TwoSection } from '@/shared/ui/layouts/sections/TwoSection';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

const WelcomeScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-60': `${moderateScale(60)}px`,
        '--s-270': `${moderateScale(270)}px`,
      }),
    []
  );

  return (
    <TwoSection
      edges={['bottom']}
      className={``}
      style={moderateSize}
      Body={
        <View className="flex-1 items-center justify-center gap-5">
          <Image
            source={require('@assets/images/pngs/mentora_removebg.png')}
            className="h-[260px] w-[220px]"
          />
          <View className={`items-center justify-center`}>
            <Text className="text-[48px] font-bold">WELCOME!</Text>
          </View>
        </View>
      }
      Bottom={
        <>
          <Text className={`text-center font-bevietnampro text-sm text-white`}>It’s for free!</Text>
          <PrimaryButton
            title="Get started"
            className={`my-1`}
            textStyle={`uppercase`}
            onPress={() => {
              router.navigate('/onboarding');
            }}
          />
          <View className={`mb-2 items-center justify-center`}>
            <Text className={`font-bevietnampro text-sm text-white`}>
              Already have an account?{' '}
              <Text
                className={`font-bevietnampro-semibold text-sm text-white underline`}
                onPress={() => {
                  router.navigate('/login');
                }}
              >
                Log in
              </Text>
            </Text>
          </View>
        </>
      }
    />
  );
};

export default withDeviceLayout(WelcomeScreen);
