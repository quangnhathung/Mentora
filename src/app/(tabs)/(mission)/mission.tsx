import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text } from '@/shared/ui';
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { ThreeSection } from '@/shared/ui/layouts/sections/ThreeSection';
import { Checkin } from '@/widgets/misson/checkin';
import { Daily } from '@/widgets/misson/DaillyMisson';
import { PremiumBanner } from '@/widgets/profile/ProfilePremiumBanner';

const MissionScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <ThreeSection
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <View className="W-full items-center pt-[2rem]">
          <Text className="font-baloo text-2xl dark:text-navbar-active">Mission</Text>
        </View>
      }
      Body={
        <View className="flex-1">
          <Checkin />
          <Daily />
          <View className="mb-4 mt-5 h-[100px] w-full">
            <Text> </Text>
          </View>
          <View className="mb-4 mt-5 h-[20px] w-full">
            <Text> </Text>
          </View>
          <AdBanner />
          <PremiumBanner />
          <View className="mb-4 mt-5 h-[20px] w-full">
            <Text> </Text>
          </View>
        </View>
      }
      Bottom={<></>}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(MissionScreen));
