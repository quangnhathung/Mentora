import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useEffect, useMemo, useState } from 'react';
import { InteractionManager, Keyboard } from 'react-native';

import { useTopicData } from '@/entities/topic/model';
import { type Topic } from '@/entities/topic/types';
import { TopicItemVertical } from '@/entities/topic/ui/TopicItemVertical';
import { useRecentTopicsStore } from '@/entities/topic/useRecentTopicStore';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { ActivityIndicator, EmptyList, Text, View } from '@/shared/ui';

import { LevelFilter } from './LevelFilter';
import { SearchLabel } from './LevelFilter';

type TopicSearchProps = {
  onSelect?: (topic: Topic) => void;
  q?: string; // query từ parent
};

export const TopicSearch = ({ onSelect, q = '' }: TopicSearchProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [level, setLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const { data: highlights, isLoading } = useTopicData.getTopicHighlight();

  /* A. Lấy chi tiết topic đã chọn – hook luôn ở top-level */
  const { data: topicInfo, isLoading: isLoadingTopic } = useTopicData.getTopic({
    variables: { id: selectedId! },
    enabled: !!selectedId && !!useAuthStore.getState().token?.access,
  });
  const addRecent = useRecentTopicsStore((state) => state.addTopic);

  const handleSelect = (topic: Topic) => {
    Keyboard.dismiss();

    InteractionManager.runAfterInteractions(() => {
      setSelectedId(topic?.id ?? null);
      addRecent(topic);
      router.push(`/(discover)/${topic.id}`);
    });
  };

  /* B. Filter */
  const normalizedQ = (q ?? '').trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!highlights?.data) return [];

    let result = highlights.data;

    // Nếu có query thì filter theo tên
    if (normalizedQ) {
      result = result.filter((item) => (item.name ?? '').toLowerCase().includes(normalizedQ));
    }

    // Nếu đang ở topic search (có q) và level khác 'all' thì filter tiếp theo level
    if (normalizedQ && level !== 'all') {
      result = result.filter((item) => item.level?.toLowerCase() === level);
    }

    return result;
  }, [highlights?.data, normalizedQ, level]);

  /* D. Gửi data cho parent khi fetch topicInfo xong */
  useEffect(() => {
    if (!isLoadingTopic && topicInfo && onSelect) {
      onSelect(topicInfo.data);
    }
  }, [isLoadingTopic, onSelect, topicInfo]);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-topic': `${moderateScale(190)}px`,
        '--h-topic': `${moderateScale(110)}px`,
        '--s-topic-image': `${moderateScale(70)}px`,
      }),
    []
  );

  // Nếu có query mà filtered rỗng => hiện message "không tìm thấy"
  const ListEmpty = () =>
    normalizedQ ? (
      <View className="w-full items-center px-4 py-6">
        <Text className="text-white">
          {translate('search.result')} “{q}”
        </Text>
      </View>
    ) : (
      <EmptyList isLoading={isLoading} />
    );

  return (
    <>
      <View className={`w-full pb-4`} style={moderateSize}>
        <View className={`w-full py-2`}>
          <LevelFilter data={SearchLabel} value={level} onChange={setLevel} className="w-full" />
        </View>
        {isLoading ? (
          <ActivityIndicator className={`h-[50px] flex-1`} />
        ) : (
          <>
            <FlashList
              keyExtractor={(item) => `topic-highlight-${item.id}`}
              data={filtered}
              className={`w-full`}
              contentContainerClassName={``}
              keyboardShouldPersistTaps="always"
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="h-[8px]" />}
              ListEmptyComponent={<ListEmpty />}
              renderItem={({ item, index }) => (
                <TopicItemVertical
                  first={index === 0}
                  last={filtered.length - 1 === index}
                  data={item}
                  handleSelect={() => handleSelect(item)}
                />
              )}
            />
          </>
        )}
      </View>
    </>
  );
};
