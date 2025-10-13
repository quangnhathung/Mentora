import { useRef } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

import { usePostData } from '@/entities/post/model';
import { type Post } from '@/entities/post/types';
import { PostCard } from '@/entities/post/ui/PostCard';
import { usePostStore } from '@/entities/post/useFeedStore';
import { colors, EmptyList, List } from '@/shared/ui';

type CommunityFeedProps = {
  header?: React.ReactNode;
  onOpenMenu?: (post: Post) => void;
};

export const CommunityFeed = ({ header, onOpenMenu }: CommunityFeedProps) => {
  const { filter } = usePostStore();
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostData.getCommunityFeed({
    variables: { filter, limit: 5 },
  });
  const allowRef = useRef(false); // chỉ bật sau khi user bắt đầu cuộn
  const vhRef = useRef(0);
  const chRef = useRef(0);

  const markInteracted = () => {
    allowRef.current = true;
  };

  const { mutate: doToggleSavePost } = usePostData.doToggleSavePost();

  const items = posts?.pages.flatMap((p) => p.data) ?? [];

  const onToggleSave = (id: number) => doToggleSavePost({ id });

  return (
    <View className="flex-1">
      <List
        key={`feed-${filter}`}
        keyExtractor={(p) => `post-feed-${p?.id}`}
        data={items}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostCard post={item} onToggleSave={onToggleSave} onOpenMenu={onOpenMenu} />
        )}
        contentContainerClassName={``}
        onLayout={(e) => {
          vhRef.current = e.nativeEvent.layout.height;
        }}
        onContentSizeChange={(_, h) => {
          chRef.current = h;
        }}
        // Native: hai event này đáng tin
        onScrollBeginDrag={markInteracted}
        onMomentumScrollBegin={markInteracted}
        // Web: RNW không bắn beginDrag ⇒ dùng onScroll
        onScroll={(e) => {
          if (Platform.OS === 'web' && e.nativeEvent.contentOffset?.y > 0) markInteracted();
        }}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          const hasInteracted = allowRef.current;
          const canScroll = chRef.current > vhRef.current; // nội dung dài hơn viewport
          if (!hasInteracted || !canScroll) return;

          if (hasNextPage && !isFetchingNextPage) {
            console.log('debug trigger');
            allowRef.current = false; // chặn spam; sẽ bật lại khi user kéo tiếp
            fetchNextPage();
          }
        }}
        contentContainerStyle={{ paddingBottom: 8 }} // dùng style thay vì *ClassName* cho chắc
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={() => header}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className={`py-4`}>
              <ActivityIndicator
                color={colors.secondary.DEFAULT}
                className={`min-h-[150px] w-screen`}
              />
            </View>
          ) : (
            <View className="min-h-[70px]" />
          )
        }
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
      />
    </View>
  );
};
