import CreateSvg from '@assets/images/svgs/create.svg';
import { vars } from 'nativewind';
import React, { useCallback, useMemo, useRef } from 'react';

import { type Post } from '@/entities/post/types';
import CreatePostModal, { type CreatePostModalRef } from '@/features/community/ui/CreatePostModal';
import PostOverflowModal, {
  type PostOverflowModalRef,
} from '@/features/community/ui/PostOverflowModal';
import { translate } from '@/shared/lib';
import { moderateScale } from '@/shared/lib/helpers/scale';
import { colors, Pressable, Text, View } from '@/shared/ui';
import { TwoSectionHeader } from '@/shared/ui/layouts/sections/TwoSectionHeader';
import { HeaderThreeColumn } from '@/widgets/common/HeaderThreeColumn';
import { CommunityFeed } from '@/widgets/community/ui/CommunityFeed';
import { CommunityFilters } from '@/widgets/community/ui/CommunityFilters';
import { CommunityPostHighlight } from '@/widgets/community/ui/CommunityPostHighlight';

export default function Community() {
  const createPostModalRef = useRef<CreatePostModalRef>(null);
  const overflowRef = useRef<PostOverflowModalRef>(null);
  const moderateSize = useMemo(
    () =>
      vars({
        '--s-circle-progress': `${moderateScale(125)}px`,
      }),
    []
  );

  const handlePress = () => {
    createPostModalRef.current?.modal.present();
  };

  const onOpenMenu = useCallback((post: Post) => {
    overflowRef.current?.present(post);
  }, []);

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
          <CommunityFeed
            onOpenMenu={onOpenMenu}
            header={
              <View className={`min-h-[100px]`}>
                <CommunityPostHighlight onOpenMenu={onOpenMenu} />
                <CommunityFilters />
              </View>
            }
          />
          <CreatePostModal ref={createPostModalRef} />
          <PostOverflowModal ref={overflowRef} />
        </View>
      }
    />
  );
}
