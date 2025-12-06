import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { useMissionsStore } from '@/entities/mission/hook/useMissionStore';
import { mockTopics } from '@/entities/topic/mock';
import { useTopics } from '@/entities/topic/useTopic';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { TopicBlock } from '@/shared/TopicBlock'; // Đảm bảo import đúng
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { MissionBlock } from '@/shared/ui/mission/MissonBlock';
import HeaderWithSearch from '@/widgets/common/HeaderWithSearch';
import { MockMisson } from '@/widgets/misson/DaillyMisson';

const DiscoverScreen = () => {
  const { data: topics, isLoading, isError, error, isFetching } = useTopics();
  const { data } = useMissionsStore();
  const TopicData = topics ?? mockTopics;
  const topicChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < TopicData.length; i += 2) {
      chunks.push(TopicData.slice(i, i + 2));
    }
    return chunks;
  }, [TopicData]);
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );
  if (isLoading) return <ActivityIndicator />;

  // fallback nếu API lỗi / không có dữ liệu
  const missions = !data || data.length === 0 || isError ? MockMisson : data;

  console.log(
    'Topic: isLoading:',
    isLoading,
    'isFetching:',
    isFetching,
    'isError:',
    isError,
    'error:',
    error
  );
  const handlePress = () => {
    router.push('/(discover)/search');
  };

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={true}
      style={moderateSize}
      Header={<HeaderWithSearch title={translate('nav.discover.label')} onPress={handlePress} />}
      Body={
        <View className="w-full pt-4">
          <Text className="mb-3 ml-4 text-xl font-bold">Daily mission</Text>
          <View className="h-[110px]">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              className="w-full"
            >
              {missions.map((item) => (
                <View key={item.id} className="w-[340px]">
                  <MissionBlock misson={item} />
                </View>
              ))}
            </ScrollView>
          </View>

          <Text className="my-3 ml-4 text-xl font-bold">Topics</Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            className="w-full pb-3"
          >
            {topicChunks.map((chunk, index) => (
              <View key={index} className="flex-col gap-3">
                {chunk.map((topic) => (
                  <View key={topic.id} className="">
                    <TopicBlock
                      topic={topic}
                      onPress={() => {
                        router.push({
                          pathname: '/(tabs)/(discover)/[tid]',
                          params: { tid: topic.id ?? '' },
                        });
                      }}
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          <AdBanner />

          <Pressable
            className="mt-3 w-full px-3"
            onPress={() => {
              router.push('/(tabs)/(games)/games');
            }}
          >
            <View className="w-full">
              <Image source={require('@assets/images/pngs/game-banner.png')} className="w-full" />
            </View>
          </Pressable>
        </View>
      }
    />
  );
};

export default withErrorBoundary(DiscoverScreen);
