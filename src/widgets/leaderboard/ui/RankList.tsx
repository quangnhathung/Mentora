import { Image, View } from 'react-native';

import type { RankUser } from '@/entities/leaderboard/types';
import { translate } from '@/shared/lib';
import { List, Text } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

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

export const RankList = ({ data }: { data: RankUser[] }) => {
  return (
    <View className={`mt-2 flex-1`}>
      <GradientView
        colors={['primary-dark', 'primary', 'primary-light']}
        containerClassName={`rounded-xl`}
        start={{ x: 0.5, y: 0 }} // top
        end={{ x: 0.5, y: 1 }} // bottom
        className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
      >
        <List
          data={data}
          keyExtractor={(it) => `leaderboard-rank-${it.id}`}
          renderItem={({ item }) => <Row data={item} />}
          ItemSeparatorComponent={() => <View className="h-px border-b border-white-dark" />}
          contentContainerClassName={`px-4`}
          showsVerticalScrollIndicator={false}
        />
      </GradientView>
    </View>
  );
};
