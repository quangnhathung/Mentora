//daily mission update!

import React from 'react';

import { useLeaderboardData } from '@/entities/leaderboard/model';
import { type RankUser } from '@/entities/leaderboard/types';
import { useLeaderboardStore } from '@/entities/leaderboard/useLeaderboardStore';
import { translate } from '@/shared/lib';
import { EmptyList, Image, List, Text, View } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';
import { SvgIcon } from '@/shared/ui/SvgIcon';

const Row = ({ data }: { data: RankUser }) => (
  <View className="flex-row items-center justify-between rounded-2xl py-3">
    <View className="flex-row items-center">
      <Text className={`w-5`}>{data?.rank}</Text>
      <Image
        source={{ uri: data?.user.avatar }}
        className="mx-3 size-14 rounded-full border-2 border-white"
      />
      <View className={`flex-col gap-1`}>
        <Text className="text-white">{data?.user.name}</Text>
        <Text className="text-xs dark:text-secondary">
          {translate('common.level')}: {data?.level}
        </Text>
      </View>
    </View>
    <Text className="font-baloo text-white">{data?.score} KN</Text>
  </View>
);

const Current = ({ data, up }: { up: string; data: RankUser }) => (
  <View className="flex-row items-center justify-between rounded-2xl px-4 py-3">
    <View className="flex-row items-center">
      <Text className={`w-5 dark:text-cyan`}>{data?.rank}</Text>
      <Image
        source={{ uri: data?.user.avatar }}
        className="mx-3 size-14 rounded-full border-2 border-white"
      />
      <View className={`flex-col gap-1`}>
        <Text className="text-white">{data?.user.name}</Text>
        <Text className="text-xs">
          {translate('common.level')}: {data?.level}
        </Text>
      </View>
    </View>

    <View className="flex-row items-center justify-center gap-3">
      <Text className="font-baloo text-white">{data?.score} KN</Text>
      <View className="flex-row items-center justify-center gap-1">
        <SvgIcon name="increase" size={16} />
        <Text className="font-bevietnampro-bold dark:text-cyan">{up}</Text>
      </View>
    </View>
  </View>
);

export const RankUpdate = () => {
  const { period } = useLeaderboardStore();
  const { data, isLoading } = useLeaderboardData.getLeaderboardByPeriod({
    variables: { period },
  });

  const LastRank = data?.data.rest[data.data.rest.length - 1];

  return isLoading ? (
    <EmptyList isLoading={isLoading} />
  ) : (
    <View className={``}>
      <View className="items-center justify-center p-3 px-6">
        <Text className="text-center font-baloo text-2xl dark:text-cyan">
          Cool! Your rank goes up!
        </Text>
        <Text className="text-center font-bevietnampro text-base">
          The journey is long, but you're already soaring
        </Text>
      </View>
      <BottomBorder className={`border-custom-5 mt-2 flex-1`}>
        <GradientView
          colors={['primary-dark', 'primary', 'primary-light']}
          containerClassName={`relative rounded-xl`}
          start={{ x: 0.5, y: 0 }} // top
          end={{ x: 0.5, y: 1 }} // bottom
          className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
        >
          <List
            data={data?.data.top3}
            keyExtractor={(it) => `leaderboard-rank-${it.id}`}
            renderItem={({ item }) => <Row data={item} />}
            ItemSeparatorComponent={() => <View className="h-px border-b border-white-dark" />}
            contentContainerClassName={`px-4`}
            showsVerticalScrollIndicator={false}
          />
          {[...Array(3)].map((_, i) => (
            <View key={i} className="px-4">
              <View className="h-px border-b border-white-dark" />
              <View className="flex-row items-center justify-between rounded-2xl py-3">
                <Text className="w-full text-center text-3xl"> --- </Text>
              </View>
            </View>
          ))}
          <View className="px-4">
            <View className="h-px border-b border-white-dark" />
            <View className="flex-row items-center justify-between rounded-2xl py-3">
              <View className="flex-row items-center">
                <Text className={`w-5`}>{LastRank?.rank}</Text>
                <Image
                  source={{ uri: LastRank?.user.avatar }}
                  className="mx-3 size-14 rounded-full border-2 border-white"
                />
                <View className={`flex-col gap-1`}>
                  <Text className="text-white">{LastRank?.user.name}</Text>
                  <Text className="text-xs dark:text-secondary">
                    {translate('common.level')}: {LastRank?.level}
                  </Text>
                </View>
              </View>
              <Text className="font-baloo text-white">{LastRank?.score} KN</Text>
            </View>
          </View>

          {data?.data.rest[4] && (
            <GradientView
              colors={['secondary-dark', 'secondary', 'secondary-light']}
              containerClassName={`absolute top-[57%] w-full rounded-xl`}
              className={`w-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light`}
            >
              <Current data={data.data.rest[4]} up={'2'} />
            </GradientView>
          )}
        </GradientView>
      </BottomBorder>
    </View>
  );
};
