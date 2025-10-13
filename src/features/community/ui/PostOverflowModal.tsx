import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Pressable, Share, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostData } from '@/entities/post/model';
import { type Post } from '@/entities/post/types';
import { colors, Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import SelectableList, {
  type ChoiceBase,
  type SelectableItemRender,
} from '@/shared/ui/List/SelectableList';
import { Modal, useModal } from '@/shared/ui/modal';
import { type IconName, SvgIcon } from '@/shared/ui/SvgIcon';

export type PostOverflowModalProps = {
  // onSave?: (postId: number) => Promise<void> | void;
  // onShare?: (postId: number) => Promise<void> | void;
  // onReport?: (postId: number) => Promise<void> | void;
};

export type PostOverflowModalRef = {
  modal: BottomSheetModal;
  present: (post: Post) => void;
};

type ActionKey = 'save' | 'share' | 'report';

type ActionChoice = ChoiceBase & { key: ActionKey; icon?: IconName };

export const PostOverflowModal = forwardRef<PostOverflowModalRef, PostOverflowModalProps>(
  ({}, fwRef) => {
    const modal = useModal();
    const postIdRef = useRef<Post | null>(null);

    const { mutate: doToggleSavePost } = usePostData.doToggleSavePost();

    const options = useMemo<ActionChoice[]>(
      () => [
        { id: 1, key: 'save', icon: 'saved', description: '<p class="text-white">Save</p>' },
        { id: 2, key: 'share', icon: 'share', description: '<p class="text-white">Share</p>' },
        { id: 3, key: 'report', icon: 'report', description: '<p class="text-white">Report</p>' },
      ],
      []
    );

    const handleSave = useCallback(
      async (id: number) => {
        try {
          await doToggleSavePost({ id });
          Toast.show({ type: 'success', text1: 'Saved' });
        } catch (e) {
          Toast.show({ type: 'error', text1: 'Try again' });
        }
      },
      [doToggleSavePost]
    );

    const handleShare = useCallback(async (post: Post) => {
      const p = post;
      if (!p) return;
      try {
        await Share.share({ message: p.title || 'Share post' });
      } catch {
        Toast.show({ type: 'error', text1: 'Share failed' });
      }
    }, []);

    const handleReport = useCallback(async (post: Post) => {
      const p = post;
      if (!p) return;
      try {
        await doToggleSavePost({ id: p.id });
        Toast.show({ type: 'success', text1: 'Reported Success' });
      } catch {
        Toast.show({ type: 'error', text1: 'Reported failed' });
      }
    }, []);

    const handleSelect = useCallback(
      async (idx: number) => {
        const selected = options[idx];
        const post = postIdRef.current;
        if (post?.id == null) return;

        try {
          switch (selected.key) {
            case 'save':
              await handleSave?.(post?.id);
              break;
            case 'share':
              await handleShare?.(post);
              break;
            case 'report':
              await handleReport?.(post);
              break;
          }
        } finally {
          modal.dismiss();
        }
      },
      [options, handleSave, handleShare, handleReport, modal]
    );

    useImperativeHandle(fwRef, () => ({
      modal: modal.ref.current!,
      present: (post: Post) => {
        postIdRef.current = post;
        modal.present();
      },
    }));

    const itemRender: SelectableItemRender<ActionChoice> = ({ item, onChoose }) => (
      <BottomBorder className={`border-custom-5 flex-1 rounded-2xl`}>
        <Pressable onPress={onChoose} className="overflow-hidden rounded-xl bg-background-dark">
          <View className="flex-row items-center gap-3 p-3">
            <View className={`absolute left-4 w-full`}>
              {item.icon ? (
                <SvgIcon name={item.icon} size={22} color={colors.white.DEFAULT as string} />
              ) : null}
            </View>
            <Text className="flex-1 items-center text-center text-base text-white">
              {item.key === 'save' ? 'Save' : item.key === 'share' ? 'Share' : 'Report'}
            </Text>
          </View>
        </Pressable>
      </BottomBorder>
    );

    return (
      <Modal
        ref={modal.ref}
        index={0}
        snapPoints={[300]}
        backgroundStyle={{ backgroundColor: colors.background.dark.light as string }}
      >
        <View className="flex-1 px-4">
          <SelectableList
            data={{ choices: options }}
            scrollEnabled={false}
            isLoading={false}
            dark
            itemRender={itemRender}
            handleSelect={handleSelect}
            contentContainerClassName={``}
            itemClassName={`flex-1 justify-center`}
          />
        </View>
      </Modal>
    );
  }
);

export default PostOverflowModal;
