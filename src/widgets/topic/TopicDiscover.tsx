import { router } from 'expo-router';
import { vars } from 'nativewind';
import { useMemo, useRef } from 'react';
import { ActivityIndicator, Platform, useWindowDimensions, View } from 'react-native';

import { useTopicData } from '@/entities/topic/model';
import { type Topic } from '@/entities/topic/types';
import { TopicItemHorizontal } from '@/entities/topic/ui/TopicItemHorizontal';
import { useTopicFeedStore } from '@/entities/topic/useTopicFeedStore';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, EmptyList, List } from '@/shared/ui';

type TopicDiscoverProps = {
  header?: React.ReactNode;
};

export const TopicDiscover = ({ header }: TopicDiscoverProps) => {
  const { level } = useTopicFeedStore();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTopicData.getTopics({
      variables: { level, limit: 5 },
    });

  const allowRef = useRef(false);
  const viewportHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  const topics = data?.pages.flatMap((page) => page.data) ?? [];

  const { width } = useWindowDimensions();
  const isMdUp = width >= 768;

  const END_OFFSET_PX = 120;

  const tryFetchNext = (canScrollNow: boolean) => {
    if (!allowRef.current || !canScrollNow) return;
    if (hasNextPage && !isFetchingNextPage) {
      allowRef.current = false;
      fetchNextPage();
    }
  };

  const markInteracted = () => {
    allowRef.current = true;
  };

  const handleSelect = (topic: Topic) => {
    if (!topic?.id) return;
    router.push(`/(discover)/${topic.id}`);
  };

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-topic': `${moderateScale(290)}px`,
        '--h-topic': `${moderateScale(160)}px`,
        '--s-topic-image': `${moderateScale(85)}px`,
      }),
    []
  );

  return (
    <View className="flex-1" style={moderateSize}>
      <List
        key={`topic-feed-${level}`}
        data={topics}
        numColumns={isMdUp ? 2 : 1}
        // columnWrapperClassName={isMdUp ? 'gap-3' : undefined}
        keyExtractor={(item) => `topic-feed-${item?.id}`}
        renderItem={({ item, index }) => (
          <View className={isMdUp ? 'flex-1' : undefined}>
            <TopicItemHorizontal
              first={!isMdUp && index === 0}
              last={!isMdUp && topics.length - 1 === index}
              data={item}
              handleSelect={() => handleSelect(item)}
            />
          </View>
        )}
        contentContainerClassName={isMdUp ? 'pb-6 px-1' : 'pb-6'}
        onLayout={(event) => {
          viewportHeightRef.current = event.nativeEvent.layout.height;
        }}
        onContentSizeChange={(_, height) => {
          contentHeightRef.current = height;
        }}
        onScrollBeginDrag={markInteracted}
        onMomentumScrollBegin={markInteracted}
        onScroll={(event) => {
          const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

          if (Platform.OS === 'web' && contentOffset?.y > 0) {
            markInteracted();
          }

          const canScrollNow = (contentSize?.height ?? 0) > (layoutMeasurement?.height ?? 0);
          const distanceFromEnd =
            (contentSize?.height ?? 0) -
            ((contentOffset?.y ?? 0) + (layoutMeasurement?.height ?? 0));

          if (distanceFromEnd <= END_OFFSET_PX) {
            tryFetchNext(canScrollNow);
          }
        }}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          const canScroll = contentHeightRef.current > viewportHeightRef.current;
          tryFetchNext(canScroll);
        }}
        // ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={header ? () => header : undefined}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="min-h-[180px] py-4">
              <ActivityIndicator color={colors.secondary.DEFAULT} className="min-h-[180px]" />
            </View>
          ) : (
            <View className="min-h-[70px]" />
          )
        }
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
