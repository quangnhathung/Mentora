//import { Redirect } from 'expo-router';
//import { Redirect } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';

//import { InteractionManager } from 'react-native';
//import { useLeaderboardData } from '@/entities/leaderboard/model';
//import { useLeaderboardStore } from '@/entities/leaderboard/useLeaderboardStore';
//import { useMissionData } from '@/entities/mission/model';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import HomeHeader from '@/widgets/common/HomeHeader';

export default function Home() {
  //const home = usePathData.getCurrentPath();
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

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
    //return <Redirect href="/(tabs)/(lesson)/1" />;
    //return <Redirect href="/(tabs)/(mission)/congra" />;
  }

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={<HomeHeader />}
      Body={<View className={`flex-1 items-center justify-center py-2`}></View>}
    />
  );
}
