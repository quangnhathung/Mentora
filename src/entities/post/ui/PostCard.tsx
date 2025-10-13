import CommentSvg from '@assets/images/svgs/comment.svg';
import CreditSvg from '@assets/images/svgs/credit-1.svg';
import LikeSvg from '@assets/images/svgs/like.svg';
import SaveSvg from '@assets/images/svgs/save.svg';
import ShareSvg from '@assets/images/svgs/share.svg';
import ThreeDotSvg from '@assets/images/svgs/threedot.svg';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Platform, Pressable, View } from 'react-native';

import { type Post } from '@/entities/post/types';
import { timeLabel } from '@/shared/lib/helpers/convertTime';
import { colors, Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { GradientView } from '@/shared/ui/GradientView/GradientView';

type PostCardProps = {
  post: Post;
  onToggleSave?: (id: number) => void;
  onOpenMenu?: (post: Post) => void;
};

export function PostCard({ post, onToggleSave, onOpenMenu }: PostCardProps) {
  return (
    <View className={`px-4 ${Platform.OS === 'web' ? 'w-screen md:max-w-screen-md' : 'w-screen'}`}>
      <Link
        href={{ pathname: '/(tabs)/(community)/post/[id]', params: { id: String(post.id) } }}
        asChild
      >
        <Pressable className="w-full">
          <BottomBorder className={`border-custom-5 flex-1 rounded-2xl`}>
            <View className="overflow-hidden rounded-xl bg-background-dark-light">
              <View className={`rounded-2xl`}>
                <GradientView
                  colors={['primary-dark', 'primary', 'primary-light']}
                  containerClassName={`rounded-2xl`}
                  className={`w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light`}
                >
                  <View className="flex-row items-center justify-center px-3 py-2">
                    <Image
                      source={{ uri: post?.author?.avatar }}
                      className="mr-3 size-12 rounded-full border border-white"
                    />
                    <View className="flex-1">
                      <Text className="">{post?.author?.name}</Text>
                      <Text className="text-xs dark:text-white-dark">
                        {timeLabel(post?.createdAt!)}
                      </Text>
                    </View>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onOpenMenu?.(post);
                      }}
                      className={`items-center justify-center px-1 py-2 pl-4`}
                      accessibilityRole="button"
                      accessibilityLabel="Open post menu"
                    >
                      <ThreeDotSvg color={colors.white.DEFAULT} />
                    </Pressable>
                  </View>
                </GradientView>
              </View>
              <View className={`p-3`}>
                <Text numberOfLines={2} className="">
                  {post?.title}
                </Text>
                {/* meta nhỏ */}
                <View className="mt-2 flex-row justify-between">
                  <View className="flex-row gap-4">
                    <View className={`flex-row items-center justify-center gap-1`}>
                      <LikeSvg color={colors.white.DEFAULT} />
                      <Text className="">{post?.likes}</Text>
                    </View>
                    <View className={`flex-row items-center justify-center gap-1`}>
                      <CommentSvg color={colors.white.DEFAULT} />
                      <Text className="">{post?.comments}</Text>
                    </View>
                    <View className={`flex-row items-center justify-center gap-1`}>
                      <CreditSvg color={colors.white.DEFAULT} />
                      <Text className="">{post?.id}</Text>
                    </View>
                    <View className={`flex-row items-center justify-center gap-1`}>
                      <ShareSvg color={colors.white.DEFAULT} />
                      <Text className="">{post?.shares}</Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onToggleSave?.(post?.id);
                    }}
                    className={`flex-row items-center justify-center gap-1`}
                    accessibilityRole="button"
                    accessibilityLabel={post?.isSave ? 'Unsave post' : 'Save post'}
                  >
                    <SaveSvg
                      color={colors.white.DEFAULT}
                      fill={post?.isSave ? colors.secondary.DEFAULT : 'none'}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </BottomBorder>
        </Pressable>
      </Link>
    </View>
  );
}
