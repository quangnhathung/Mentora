import CreateSvg from '@assets/images/svgs/create.svg';
import { useLocalSearchParams } from 'expo-router';
import { vars } from 'nativewind';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { usePostData } from '@/entities/post/model';
import { type Post } from '@/entities/post/types';
import PostDetailCard from '@/entities/post/ui/PostDetailCard';
import CreatePostModal, { type CreatePostModalRef } from '@/features/community/ui/CreatePostModal';
import PostOverflowModal, {
  type PostOverflowModalRef,
} from '@/features/community/ui/PostOverflowModal';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Text } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import Comments from '@/widgets/community/ui/Comments';

export default function PostDetail() {
  const createPostModalRef = useRef<CreatePostModalRef>(null);
  const { id } = useLocalSearchParams();
  const overflowRef = useRef<PostOverflowModalRef>(null);
  const [expanded, setExpanded] = useState(false);

  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const { data: postResponse, isLoading } = usePostData.getPostInfo({
    variables: { id: Number(id) },
  });

  const post = postResponse?.data;

  const handleOpenMenu = useCallback((post: Post) => {
    overflowRef.current?.present(post);
  }, []);

  const handlePress = () => {
    createPostModalRef.current?.modal.present();
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-dark">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View className="flex-1 items-center justify-center bg-background-dark">
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <TwoSectionHeader
      edges={[]}
      className={``}
      scrollable={false}
      style={moderateSize}
      Header={
        <HeaderThreeColumn
          title={translate('community.title')}
          right={
            <Pressable className={``} onPress={() => handlePress()}>
              <View className={`flex-row items-center justify-center gap-1`}>
                <CreateSvg color={colors.white.DEFAULT} />
                <Text className={`text-xs capitalize`}>{translate(`common.create`)}</Text>
              </View>
            </Pressable>
          }
        />
      }
      Body={
        <View className={`flex-1`}>
          <Comments
            postId={Number(id)}
            header={
              <PostDetailCard
                post={post}
                expanded={expanded}
                onToggleExpand={() => setExpanded(!expanded)}
                onOpenMenu={handleOpenMenu}
              />
            }
          />

          <PostOverflowModal ref={overflowRef} />
          <CreatePostModal ref={createPostModalRef} />
        </View>
      }
    />
  );
}
