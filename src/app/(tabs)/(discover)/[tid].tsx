import { useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { mockTopics } from '@/entities/topic/mock';
import { useTopics } from '@/entities/topic/useTopic';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { TopicScreen } from '@/widgets/topic/topic';

const DiscoverInfoScreen = () => {
  useHideTabBar();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  const { data: topics, isLoading, isError, error, isFetching } = useTopics();

  console.log('isLoading:', isLoading, 'isFetching:', isFetching);
  console.log('isError:', isError, 'error:', error);

  const TopicData = topics ?? mockTopics;
  const { tid } = useLocalSearchParams();
  const topic = TopicData.find((t) => t.id === tid);

  if (!topic) return <Text>Không tìm thấy topic</Text>;

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={<></>}
      Body={
        <View className={`items-center pt-11`}>
          <TopicScreen data={topic} />
        </View>
      }
    />
  );
};

export default withErrorBoundary(withDeviceLayout(DiscoverInfoScreen));
