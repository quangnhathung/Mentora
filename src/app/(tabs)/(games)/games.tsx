import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { View } from '@/shared/ui';
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { TextGradient } from '@/shared/ui/TextGradient/TextGradient';
import { GameList } from '@/widgets/games/GameList';
import { PremiumBanner } from '@/widgets/profile/ProfilePremiumBanner';

const GamesScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--c-125': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={['top']}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <View className={`items-center justify-between pb-2`}>
          <TextGradient
            className={`from-primary via-white to-primary py-2 text-center font-baloo text-2xl tracking-widest`}
            content={'Games'}
            colors={['primary', 'white', 'primary']}
            locations={[0, 0.47, 1]}
          />
        </View>
      }
      Body={
        <View pointerEvents="box-none" className="relative flex-1 items-center justify-start">
          <GameList />
          <View className="mt-3 w-full">
            <AdBanner
              adClient="ca-pub-3940256099942544"
              adSlot="6300978111"
              adFormat="auto"
              adTest={true}
              style={{ width: '100%', height: '50px' }}
              className="border-2"
            />
          </View>

          <PremiumBanner
            onPress={() => {
              router.push('/(tabs)/(premium)/benefit');
            }}
          />
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(GamesScreen));
