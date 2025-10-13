import SortSvg from '@assets/images/svgs/sort.svg';
import { useRouter } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo, useRef } from 'react';

import { useLeaderboardData } from '@/entities/leaderboard/model';
import { useLeaderboardStore } from '@/entities/leaderboard/useLeaderboardStore';
import { SortModal, type SortModalRef } from '@/features/leaderboard/ui/SortModal';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, EmptyList, Pressable, Text, View } from '@/shared/ui';
import BackButton from '@/shared/ui/BackButton';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { RankList } from '@/widgets/leaderboard/ui/RankList';
import { TopPodium } from '@/widgets/leaderboard/ui/TopPodium';

export default function BadgeScreen() {
  const { period } = useLeaderboardStore();
  const router = useRouter();
  const { data, isLoading } = useLeaderboardData.getLeaderboardByPeriod({
    variables: { period },
  });
  const sortModalRef = useRef<SortModalRef>(null);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-7': `${moderateScale(7)}px`,
        '--s-20': `${moderateScale(20)}px`,
        '--s-150': `${moderateScale(150)}px`,
      }),
    []
  );

  const handlePress = () => {
    sortModalRef.current?.modal.present();
  };

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('leaderboard.title')}
          left={
            <BackButton
              size={`--h-20`}
              iconSize={20}
              color={colors.white.DEFAULT}
              className={`absolute left-0 w-12`}
              onPress={() => router.back()}
            />
          }
          right={
            <Pressable
              className={`absolute right-0 flex-1 items-center justify-center`}
              onPress={() => handlePress()}
            >
              <View className={`flex-row gap-1`}>
                <Text className={`text-xs capitalize`}>{translate(`sorted.${period}`)}</Text>
                <SortSvg color={colors.white.DEFAULT} />
              </View>
            </Pressable>
          }
        />
      }
      Body={
        isLoading ? (
          <EmptyList isLoading={isLoading} />
        ) : (
          <View className={`p-4`}>
            <TopPodium data={data?.data.top3!} />
            <RankList data={data?.data.rest!} />
            <SortModal ref={sortModalRef} />
          </View>
        )
      }
    />
  );
}
