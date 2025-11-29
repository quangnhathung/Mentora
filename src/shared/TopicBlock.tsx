import React from 'react';

import { type TopicDifficulty } from '@/entities/topic/type';
import { Image, ProgressBar, Text, TouchableOpacity, View } from '@/shared/ui';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

import { Badge } from './ui/badge/Badge';

export type TopicBlockData = {
  title: string;
  difficulty: TopicDifficulty;
  progress: number;
  reward: number;
  image?: string;
};

export type TopicBlockProps = {
  topic?: TopicBlockData;
  isScale?: boolean;
  onPress?: () => void;
};

export const TopicBlock = ({
  isScale,
  topic = {
    title: 'Transport',
    difficulty: 'Hard',
    progress: 10,
    reward: 30,
    image:
      'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
  },
  onPress,
}: TopicBlockProps) => {
  const { title, difficulty, progress, reward, image } = topic;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className={`${isScale ? 'w-full' : 'w-[343px]'} shadow-sm`}
    >
      <GradientView
        colors={['#8789EF', '#25B9D2']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        containerClassName="relative w-full items-center overflow-hidden rounded-2xl border"
        className="w-full flex-row p-3"
      >
        <View className="mr-4 size-24 items-center justify-center rounded-full bg-white/20 p-1">
          <View className="size-full overflow-hidden rounded-full bg-white">
            <Image
              source={{
                uri: image,
              }}
              className="size-full"
            />
          </View>
        </View>

        <View className="flex-1 justify-center">
          {/* Title */}
          <Text className="font-baloo text-2xl font-bold shadow-sm dark:text-white">{title}</Text>

          <Text className="mb-2 text-sm font-semibold dark:text-white/90">{difficulty}</Text>

          <View className="w-full">
            <Text className="mb-1 text-xs font-bold dark:text-[#fcf2a5]">{progress}%</Text>
            <ProgressBar initialProgress={progress} />
          </View>
        </View>
        <Badge title={`${reward} coins`} icon="plus" className="absolute right-1 top-2" />
      </GradientView>
    </TouchableOpacity>
  );
};
