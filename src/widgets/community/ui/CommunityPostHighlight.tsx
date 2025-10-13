import { vars } from 'nativewind';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Platform, View, type ViewToken } from 'react-native';

import { usePostData } from '@/entities/post/model';
import { type Post } from '@/entities/post/types';
import { PostCard } from '@/entities/post/ui/PostCard';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, EmptyList, List, Text } from '@/shared/ui';
import { Dots } from '@/shared/ui/Dots';

type CommunityPostHighlightProps = {
  onOpenMenu?: (post: Post) => void;
};

export const CommunityPostHighlight = ({ onOpenMenu }: CommunityPostHighlightProps) => {
  const [active, setActive] = useState(0);
  const { data: posts, isLoading } = usePostData.getCommunityHighLightPost();

  /** Khi ≥ 50 % item xuất hiện, cập nhật chỉ số */
  const viewConfig = useRef({
    itemVisiblePercentThreshold: 80, // thử 25, 15… nếu muốn
    waitForInteraction: false,
  }).current;
  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].index!);
    }
  }).current;

  const moderateSize = useMemo(
    () =>
      vars({
        '--h-item': `${moderateScale(190)}px`,
      }),
    []
  );

  return (
    <View className={`py-2`} style={moderateSize}>
      <Text className="px-4 pb-2">Highlight Post</Text>
      {isLoading ? (
        <ActivityIndicator
          color={colors.secondary.DEFAULT}
          className={`min-h-[250px] ${Platform.OS === 'web' ? 'w-screen md:w-full md:max-w-screen-md' : 'w-screen'}`}
        />
      ) : (
        <>
          <List
            keyExtractor={(p) => `post-highlight-${p?.id}`}
            data={posts?.data}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PostCard post={item} onOpenMenu={onOpenMenu} />}
            // ItemSeparatorComponent={() => <View className="w-3" />}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
            contentContainerClassName={``}
            onViewableItemsChanged={onViewable}
            viewabilityConfig={viewConfig}
          />
          <Dots count={posts?.data.length} active={active} />
        </>
      )}
    </View>
  );
};
