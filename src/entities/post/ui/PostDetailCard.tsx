import ThreeDotSvg from '@assets/images/svgs/threedot.svg';
import React, { useRef, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostData } from '@/entities/post/model';
import { type Post } from '@/entities/post/types';
import { CommentModal, type CommentModalRef } from '@/features/community/ui/CommentModal';
import { timeLabel } from '@/shared/lib/helpers/convertTime';
import { colors, Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { Chip } from '@/shared/ui/Chip/Chip';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

type Props = {
  post: Post;
  expanded: boolean;
  onToggleExpand: () => void;
  onOpenMenu: (post: Post) => void;
};

export const PostDetailCard = ({ post, expanded, onToggleExpand, onOpenMenu }: Props) => {
  const [liked, setLiked] = useState(false);
  const [credited, setCredited] = useState(false);
  const [likes, setLikes] = useState<number>(post?.likes ?? 0);
  const [credits, setCredits] = useState<number>(post?.credits ?? 0);
  const [commentsCount, setCommentsCount] = useState<number>(post?.comments ?? 0);
  const commentRef = useRef<CommentModalRef>(null);
  const { mutate: doToggleLikePost } = usePostData.doToggleLikePost();
  const { mutate: doToggleCreditPost } = usePostData.doToggleCreditPost();
  const { mutate: doSubmitComment } = usePostData.doSubmitComment();
  const lastActionRef = useRef<{ like?: number; credit?: number; comment?: number }>({});

  // const likeLabel = useMemo(() => (liked ? 'Unlike' : 'Like'), [liked]);
  // const creditLabel = useMemo(() => (credited ? 'Remove credit' : 'Give credit'), [credited]);

  const toggleLike = () => {
    const now = Date.now();
    if (lastActionRef.current.like && now - lastActionRef.current.like < 400) return;
    lastActionRef.current.like = now;
    const next = !liked;
    setLiked(next);
    setLikes((n) => Math.max(0, n + (next ? 1 : -1)));
    doToggleLikePost({ id: post.id });
  };

  const toggleCredit = () => {
    const now = Date.now();
    if (lastActionRef.current.credit && now - lastActionRef.current.credit < 400) return;
    lastActionRef.current.credit = now;
    const next = !credited;
    setCredited(next);
    setCredits((n) => Math.max(0, n + (next ? 1 : -1)));
    doToggleCreditPost({ id: post.id });
  };

  const openComment = () => {
    commentRef.current?.modal.present();
  };

  const submitComment = async (text: string) => {
    if (!text?.trim()) return;
    setCommentsCount((n) => n + 1);
    doSubmitComment({ postId: post.id, text });
    Toast.show({ type: 'success', text1: 'Comment posted' });
  };

  return (
    <View className="overflow-hidden rounded-2xl">
      <BottomBorder className={`border-custom-5 flex-1 rounded-2xl`}>
        <View className={`rounded-xl bg-background-dark-light`}>
          <GradientView
            colors={['primary-dark', 'primary', 'primary-light']}
            containerClassName="w-full rounded-xl"
            className="bg-gradient-to-r from-primary-dark via-primary to-primary-light"
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            pointerEvents="box-none"
          >
            <View className="flex-row items-center justify-center px-3 py-2">
              <Image
                source={{ uri: post?.author?.avatar }}
                className="mr-3 size-12 rounded-full border border-white"
              />
              <View className="flex-1">
                <Text className="">{post?.author?.name}</Text>
                <Text className="text-xs dark:text-white-dark">{timeLabel(post?.createdAt!)}</Text>
              </View>
              <Pressable
                onPress={() => onOpenMenu(post)}
                className={`items-center justify-center px-1 py-2 pl-4`}
                accessibilityRole="button"
                accessibilityLabel="Open post menu"
              >
                <ThreeDotSvg color={colors.white.DEFAULT} />
              </Pressable>
            </View>
          </GradientView>

          {/* Post Body */}
          <View className="p-3">
            <Text className="mb-2 font-bevietnampro-bold dark:text-secondary">{post?.title}</Text>
            <Text className="" numberOfLines={expanded ? undefined : 5}>
              {post?.content}
            </Text>
            {post?.content && post.content.length > 200 && (
              <Pressable
                onPress={onToggleExpand}
                className="mt-2"
                accessibilityRole="button"
                accessibilityLabel={expanded ? 'Show less content' : 'Show more content'}
              >
                <Text className="text-secondary">{expanded ? 'Show less' : 'More'}</Text>
              </Pressable>
            )}
          </View>
          {/* Post Body */}

          {/* Post Actions */}
          <View className="mx-3 flex-row items-center gap-3 rounded-2xl py-2 pb-4">
            {/* Like */}
            <Chip
              value={post.id}
              title={String(likes)}
              icon="like"
              dark
              active={!!liked}
              size={18}
              onPress={toggleLike}
            />

            {/* Comment */}
            <Chip
              value={post.id}
              title={String(commentsCount)}
              icon="comment"
              dark
              active={false}
              size={18}
              onPress={openComment}
            />

            {/* Credit */}
            <Chip
              value={post.id}
              title={String(credits)}
              icon="credit"
              dark
              active={!!credited}
              size={18}
              onPress={toggleCredit}
            />
          </View>
        </View>
        <CommentModal ref={commentRef} onSubmit={submitComment} />
      </BottomBorder>
    </View>
  );
};

export default PostDetailCard;
