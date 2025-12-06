//import { Redirect } from 'expo-router';
//import { Redirect } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { mockTopics } from '@/entities/topic/mock';
import { useTopics } from '@/entities/topic/useTopic';
import { useAutoAppProgress } from '@/entities/user/hook/useAutoAppProgress';
//import { InteractionManager } from 'react-native';
//import { useLeaderboardData } from '@/entities/leaderboard/model';
//import { useLeaderboardStore } from '@/entities/leaderboard/useLeaderboardStore';
//import { useMissionData } from '@/entities/mission/model';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import HomeHeader from '@/widgets/common/HomeHeader';
import { TopicLessonList } from '@/widgets/topic/component/LessonList';

export default function Home() {
  //const home = usePathData.getCurrentPath();
  const { data: topics } = useTopics();

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  const TopicData = topics ?? mockTopics;
  const randomTopic = TopicData[Math.floor(Math.random() * TopicData.length)];
  useAutoAppProgress();

  // Chỉ redirect khi đang dev
  if (__DEV__) {
    //return <Redirect href="/(tabs)/(discover)" />;
    //return <Redirect href="/(tabs)/(mission)/congra" />;
    //return <Redirect href="/(tabs)/(premium)/plan" />;
  }

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={true}
      style={moderateSize}
      Header={
        <>
          <HomeHeader />
          <View className="flex-col items-center pt-2">
            <Text className="mb-[-3px] text-center font-baloo text-2xl">Topic:</Text>
            <Text className="my-[-5px] text-center font-baloo text-3xl">{randomTopic.title}</Text>
            <Text className="text-center text-lg">
              Learn essential English for {randomTopic.title.toLowerCase()} with ease.
            </Text>
          </View>
        </>
      }
      Body={
        <View className={`px-1 pt-3`}>
          <View>
            <TopicLessonList data={randomTopic} />
          </View>
        </View>
      }
    />
  );
}
