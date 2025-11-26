import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { withErrorBoundary } from '@/shared/lib/hocs/withErrorBoundary';
import { type Topic, TopicBlock } from '@/shared/TopicBlock'; // Đảm bảo import đúng
import AdBanner from '@/shared/ui/Ads/AdBanner';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { MissionBlock } from '@/shared/ui/mission/MissonBlock';
import HeaderWithSearch from '@/widgets/common/HeaderWithSearch';
import { MockMisson } from '@/widgets/misson/DaillyMisson';

export const mockTopics: Topic[] = [
  {
    id: 't1',
    title: 'Transport',
    difficulty: 'Hard',
    progress: 10,
    reward: 30,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't2',
    title: 'Travel',
    difficulty: 'Easy',
    progress: 80,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't3',
    title: 'Food & Drinks',
    difficulty: 'Medium',
    progress: 55,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't4',
    title: 'Shopping',
    difficulty: 'Medium',
    progress: 30,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't5',
    title: 'Daily Life',
    difficulty: 'Easy',
    progress: 5,
    reward: 5,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },

  // 20 mock thêm
  {
    id: 't6',
    title: 'Health',
    difficulty: 'Medium',
    progress: 45,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't7',
    title: 'Fitness',
    difficulty: 'Hard',
    progress: 60,
    reward: 35,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't8',
    title: 'Education',
    difficulty: 'Easy',
    progress: 20,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't9',
    title: 'Entertainment',
    difficulty: 'Medium',
    progress: 35,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't10',
    title: 'Technology',
    difficulty: 'Hard',
    progress: 70,
    reward: 40,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't11',
    title: 'Science',
    difficulty: 'Medium',
    progress: 50,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't12',
    title: 'Music',
    difficulty: 'Easy',
    progress: 15,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't13',
    title: 'Movies',
    difficulty: 'Medium',
    progress: 40,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't14',
    title: 'Gaming',
    difficulty: 'Hard',
    progress: 65,
    reward: 35,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't15',
    title: 'Art',
    difficulty: 'Easy',
    progress: 25,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't16',
    title: 'Photography',
    difficulty: 'Medium',
    progress: 30,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't17',
    title: 'Fashion',
    difficulty: 'Easy',
    progress: 10,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't18',
    title: 'Travel Tips',
    difficulty: 'Medium',
    progress: 55,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't19',
    title: 'Books',
    difficulty: 'Easy',
    progress: 20,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't20',
    title: 'History',
    difficulty: 'Medium',
    progress: 35,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't21',
    title: 'Geography',
    difficulty: 'Hard',
    progress: 60,
    reward: 35,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't22',
    title: 'Languages',
    difficulty: 'Easy',
    progress: 15,
    reward: 10,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't23',
    title: 'Culture',
    difficulty: 'Medium',
    progress: 40,
    reward: 20,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't24',
    title: 'Nature',
    difficulty: 'Easy',
    progress: 25,
    reward: 15,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  {
    id: 't25',
    title: 'Pets',
    difficulty: 'Medium',
    progress: 50,
    reward: 25,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
];

const DiscoverScreen = () => {
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const handlePress = () => {
    router.push('/(discover)/search');
  };

  const topicChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < mockTopics.length; i += 2) {
      chunks.push(mockTopics.slice(i, i + 2));
    }
    return chunks;
  }, []);

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={true}
      style={moderateSize}
      Header={<HeaderWithSearch title={translate('nav.discover.label')} onPress={handlePress} />}
      Body={
        <View className="w-full py-4 pb-5">
          <Text className="mb-3 ml-4 text-xl font-bold">Daily mission</Text>
          <View className="h-[110px]">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              className="w-full"
            >
              {MockMisson.map((item) => (
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
                      onPress={() => console.log('Pressed topic', topic.title)}
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          <AdBanner />

          <Pressable
            className="mt-3 w-full px-3 pb-5"
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
