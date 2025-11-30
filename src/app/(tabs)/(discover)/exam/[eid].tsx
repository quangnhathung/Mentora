import { router, useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { mockTopics } from '@/entities/topic/mock';
import { useTopics } from '@/entities/topic/useTopic';
import { useHideTabBar } from '@/shared/hook/useHideTabBar';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withDeviceLayout } from '@/shared/lib/hocs/withDeviceLayout';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { Pressable, Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import LessonDetailScreen from '@/widgets/topic/exercise';

const ExerciseScreen = () => {
  useHideTabBar();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const { data: topics, isLoading, isError, error, isFetching } = useTopics();

  console.log('topics:', topics);
  console.log('isLoading:', isLoading, 'isFetching:', isFetching);
  console.log('isError:', isError, 'error:', error);

  const TopicData = topics ?? mockTopics;
  const { eid, tid } = useLocalSearchParams();
  const topic = TopicData.find((t) => t.id === tid);
  const lesson = topic?.lessons.find((l) => l.id === eid);
  if (!lesson) {
    return <Text>Lesson không tồn tại</Text>;
  }
  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={false}
      style={moderateSize}
      Header={
        <View className="w-full flex-row justify-between px-3 pt-7">
          <Pressable
            className="pt-3"
            onPress={() => {
              router.back();
            }}
          >
            <SvgIcon name="arrowleft" size={24} color="black" />
          </Pressable>
          <Text className="ml-[-20px] text-center font-baloo text-3xl dark:text-navbar-active">
            Lesson
          </Text>
          <View />
        </View>
      }
      Body={<LessonDetailScreen lesson={lesson} onComplete={() => {}} />}
    />
  );
};

export default withErrorBoundary(withDeviceLayout(ExerciseScreen));
