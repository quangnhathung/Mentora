import { useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { mockTopics } from '@/entities/topic/mock';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { TopicScreen } from '@/widgets/topic/topic';

const DiscoverInfoScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  const { tid } = useLocalSearchParams();
  const topic = mockTopics.find((t) => t.id === tid);

  if (!topic) return <Text>Không tìm thấy topic</Text>;

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={<></>}
      Body={
        <View className={`items-center py-8`}>
          <TopicScreen data={topic} />
        </View>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(DiscoverInfoScreen));
