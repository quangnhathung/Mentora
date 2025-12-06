//import { Redirect } from 'expo-router';
//import { Redirect } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

import { mockTopics } from '@/entities/topic/mock';
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
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  const randomTopic = mockTopics[Math.floor(Math.random() * mockTopics.length)];
  useAutoAppProgress();
  //const qc = useQueryClient();

  // useMissionData.getMissionList();
  // useMissionData.getChallengeList();
  // useMissionData.getAchievementList();

  // useEffect(() => {
  //   if (!home.isSuccess) return;
  //   const t = InteractionManager.runAfterInteractions(() => {
  //     qc.prefetchQuery({
  //       ...useMissionData.getMissionList.getFetchOptions(),
  //     });
  //     qc.prefetchQuery({
  //       ...useMissionData.getChallengeList.getFetchOptions(),
  //     });

  //     qc.prefetchQuery({
  //       ...useMissionData.getAchievementList.getFetchOptions(),
  //     });
  //     qc.prefetchQuery({
  //       ...useLeaderboardData.getLeaderboardByPeriod.getFetchOptions({
  //         period: useLeaderboardStore.getState().period,
  //       }),
  //     });
  //   });
  //   return () => t.cancel();
  // }, [home.isSuccess, qc]);

  // return <Redirect href="/(tabs)/(exercise)/1" />;

  // Chỉ redirect khi đang dev
  if (__DEV__) {
    //return <Redirect href="/(tabs)/(discover)" />;
    //return <Redirect href="/(tabs)/(mission)/congra" />;
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
