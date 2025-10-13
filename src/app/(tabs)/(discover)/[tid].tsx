import { useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { useTopicData } from '@/entities/topic/model';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { HeaderWithImage } from '@/widgets/common/HeaderWithImage';
import { TopicList } from '@/widgets/topic/TopicList';

const DiscoverInfoScreen = () => {
  const { tid } = useLocalSearchParams<{ tid: string }>();
  const { data: topicData } = useTopicData.getTopic({
    variables: { id: Number(tid) },
    enabled: !!tid,
  });
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
      Header={<HeaderWithImage title={topicData?.data.name} data={topicData?.data} />}
      Body={
        <View className={`items-center justify-center pb-6`}>
          <TopicList data={topicData?.data} />
        </View>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(DiscoverInfoScreen));
