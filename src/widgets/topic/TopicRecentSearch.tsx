import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useMemo } from 'react';
import { InteractionManager, Keyboard } from 'react-native';

import { type Topic } from '@/entities/topic/types';
import { TopicItemVertical } from '@/entities/topic/ui/TopicItemVertical';
import { useRecentTopicsStore } from '@/entities/topic/useRecentTopicStore';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { Text, View } from '@/shared/ui';

type TopicRecentSearchProps = {
  onSelect?: (topic: Topic) => void;
};

export const TopicRecentSearch = ({ onSelect }: TopicRecentSearchProps) => {
  const recentTopics = useRecentTopicsStore((state) => state.recentTopics);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-topic': `${moderateScale(190)}px`,
        '--h-topic': `${moderateScale(110)}px`,
        '--s-topic-image': `${moderateScale(70)}px`,
      }),
    []
  );

  const handleSelect = (topic: Topic) => {
    // Dismiss keyboard immediately
    Keyboard.dismiss();

    InteractionManager.runAfterInteractions(() => {
      onSelect?.(topic);
      router.push(`/(discover)/${topic.id}`);
    });
  };

  return (
    <View className={`w-full pb-4`} style={moderateSize}>
      <Text tx="search.heading.recent_search" className={`w-full px-4 py-2`} />

      {recentTopics.length === 0 ? (
        <View className="w-full items-center justify-center py-8">
          <Text className="text-sm text-gray-400">
            {translate('search.heading.recent_search_not_found')}
          </Text>
        </View>
      ) : (
        <FlashList
          data={recentTopics}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item) => `recent-${item.id}`}
          renderItem={({ item }) => (
            <TopicItemVertical data={item} handleSelect={() => handleSelect(item)} />
          )}
        />
      )}
    </View>
  );
};
