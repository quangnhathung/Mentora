import { router } from 'expo-router';
import { vars } from 'nativewind';
import { useMemo } from 'react';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { Text, View } from '@/shared/ui';
import { TwoSection } from '@/shared/ui/layouts/sections/TwoSection';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import CatWithFlagSvg from '@/shared/ui/svg/CatWithFlagSvg';
import Logo from '@/shared/ui/svg/Logo';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';

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
        <View className="flex-1 items-center justify-center">
          <View className={`h-[--s-60] w-full`}>
            <Logo className="size-full" />
          </View>
          <CatWithFlagSvg className={`h-[--s-270] w-full`} />
          <View className={`items-center justify-center`}>
            {/* <Text className={`py-2 font-baloo text-xl text-white`}>From Basics to Brilliance</Text> */}
            <TextGradient
              className={`from-primary via-white/70 to-secondary py-2 text-center font-baloo text-xl uppercase tracking-widest`}
              content="From Basics to Brilliance"
              colors={['primary', 'white/70', 'secondary']}
              // colors={[Colors.primary.DEFAULT, Colors.white.DEFAULT, Colors.primary.DEFAULT]}
              locations={[0, 0.47, 1]}
            />
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
