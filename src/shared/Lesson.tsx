import React from 'react';

import { type Lesson, type LessonStatus } from '@/entities/topic/type';
import { Image, Text, TouchableOpacity, View } from '@/shared/ui';

import { SvgIcon } from './ui/SvgIcon';

const getStatusConfig = (status: LessonStatus) => {
  switch (status) {
    case 'claimed':
    case 'completed':
      return {
        containerBg: 'bg-[#ECE5FF]',
        textColor: 'dark:text-[#FFB800]',
        statusLabel: 'Completed',
        showBadge: status === 'claimed',
        showCoin: true,
        isLocked: false,
      };
    case 'in_progress':
      return {
        containerBg: 'bg-[#FDE2EE]',
        textColor: 'dark:text-[#5D7CFA]',
        statusLabel: 'In progress',
        showBadge: false,
        showCoin: true,
        isLocked: false,
      };
    case 'locked':
      return {
        containerBg: 'bg-[#E6E9EF]',
        textColor: 'dark:text-gray-700 font-bold',
        statusLabel: 'Complete the previous lesson to unlock.',
        showBadge: false,
        showCoin: false,
        isLocked: true,
      };
    case 'coming_soon':
      return {
        containerBg: 'bg-[#E6E9EF]',
        statusLabel: 'Coming soon!',
        isComingSoon: true,
      };
    default:
      return { containerBg: 'bg-white', textColor: 'text-gray-500' };
  }
};

interface LessonItemProps {
  lesson: Lesson;
  onPress: (lesson: Lesson) => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({ lesson, onPress }) => {
  const { status, title, description, reward, thumbnail } = lesson;
  const config = getStatusConfig(status);

  if (config.isComingSoon) {
    return (
      <View className="mb-4 flex-row items-center px-4">
        <View className="mr-3">
          <Image
            source={{
              uri:
                thumbnail ||
                'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
            }}
            className="size-[60px] rounded-full border border-gray-200 bg-white"
            resizeMode="contain"
          />
        </View>

        <View
          className={`min-h-[90px] flex-1 items-center justify-center rounded-2xl ${config.containerBg}`}
        >
          <Text className="text-lg font-bold text-gray-500">Coming soon!</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-4 flex-row items-center px-4">
      <View className="mr-3 rounded-full border">
        <Image
          source={{
            uri:
              thumbnail ||
              'https://quangnhathung.github.io/public/mentora/png/BCO.51f13dc1-9c9d-417f-8da7-3d291fcc16f6.png',
          }}
          className="size-[60px] rounded-full border border-gray-200 bg-white"
        />
      </View>

      <TouchableOpacity
        className={`min-h-[90px] flex-1 justify-between rounded-2xl p-3 ${config.containerBg}`}
        onPress={() => onPress(lesson)}
        disabled={config.isLocked}
        activeOpacity={0.7}
      >
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="mr-2 flex-1 text-base font-bold" numberOfLines={1}>
            {title}
          </Text>

          {config.showBadge && (
            <View className="rounded-full bg-yellow-400 px-2 py-1">
              <Text className="text-[10px] font-bold dark:text-white">Claimed!</Text>
            </View>
          )}

          {config.isLocked && <SvgIcon name="lock" size={18} />}
        </View>

        <Text className="mb-2 text-xs font-bold leading-4 dark:text-gray-600" numberOfLines={2}>
          {description}
        </Text>

        <View className="flex-row items-end justify-between">
          <Text className={`text-xs ${config.textColor} mr-2 flex-1`}>{config.statusLabel}</Text>

          {config.showCoin && reward && (
            <View className="flex-row items-center">
              <Text className="mr-1 text-sm font-extrabold text-yellow-500">{reward}</Text>
              <SvgIcon name="coin" size={18} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
