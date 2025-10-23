import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';

const DiscoverInfoScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={<></>}
      Body={
        <View className={`items-center justify-center pb-6`}>
          {/* <TopicList data={topicData?.data} /> */}
        </View>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(DiscoverInfoScreen));
