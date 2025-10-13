import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { vars } from 'nativewind';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { type ViewToken } from 'react-native';

import { useTopicData } from '@/entities/topic/model';
import { type Topic } from '@/entities/topic/types';
import { TopicItemHorizontal } from '@/entities/topic/ui/TopicItemHorizontal';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
import { ActivityIndicator, colors, EmptyList, View } from '@/shared/ui';

type TopicHighlightProps = {
  onSelect?: (topic: Topic) => void;
};

export const TopicHighlight = ({ onSelect }: TopicHighlightProps) => {
  const [dot, setDot] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: highlights, isLoading } = useTopicData.getTopicHighlight();

  /* A. Lấy chi tiết topic đã chọn – hook luôn ở top-level */
  const { data: topicInfo, isLoading: isLoadingTopic } = useTopicData.getTopic({
    variables: { id: selectedId! }, // dấu ! vì đã enable có điều kiện
    enabled: !!selectedId && !!useAuthStore.getState().token?.access, // chỉ chạy khi có id
  });

  const handleSelect = (topic: Topic) => {
    router.push(`/(discover)/${topic?.id!}`); //selected topic
  };

  /* B. Khi có danh sách, gán sẵn id đầu tiên */
  useEffect(() => {
    if (highlights?.data.length) {
      setSelectedId(highlights?.data[0].id!);
    }
  }, [highlights?.data]);

  /* D. Gửi data cho parent khi fetch xong */
  useEffect(() => {
    if (!isLoadingTopic && topicInfo && onSelect) {
      onSelect(topicInfo.data);
    }
  }, [isLoadingTopic, onSelect, topicInfo]);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-topic': `${moderateScale(290)}px`,
        '--h-topic': `${moderateScale(160)}px`,
        '--s-topic-image': `${moderateScale(85)}px`,
      }),
    []
  );
  /** Khi ≥ 50 % item xuất hiện, cập nhật chỉ số */
  const viewConfig = useRef({
    itemVisiblePercentThreshold: 80, // thử 25, 15… nếu muốn
    waitForInteraction: false,
  }).current;
  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setDot(viewableItems[0].index!);
    }
  }).current;

  return (
    <View className={`w-full pt-2`} style={moderateSize}>
      {isLoading ? (
        <ActivityIndicator color={colors.secondary.DEFAULT} className={`h-[50px] flex-1`} />
      ) : (
        <>
          <FlashList
            // key={`topic-highlight`}
            keyExtractor={(item) => `topic-highlight-${item.id}`} // ĐỪNG đặt key trong TopicItemHorizontal!
            data={highlights?.data}
            horizontal
            className={`w-full`}
            contentContainerClassName={``}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-[8px]" />}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
            // pagingEnabled={true}
            renderItem={({ item, index }) => (
              <TopicItemHorizontal
                // key={`topic-grid-${index}`}
                first={index === 0}
                last={highlights?.data?.length! - 1 === index}
                data={item}
                handleSelect={() => handleSelect(item)}
              />
            )}
            onViewableItemsChanged={onViewable}
            viewabilityConfig={viewConfig}
          />

          {/* DOTS */}
          <View className="flex-row justify-center gap-1 pt-2">
            {highlights?.data?.map((_, i) => (
              <View
                key={`dot-${i}`}
                className={`rounded-full ${i === dot ? 'h-[7px] w-[30px] bg-secondary' : 'size-[7px] bg-white'}`}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};
