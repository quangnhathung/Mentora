import React from 'react';
import { Image, View } from 'react-native';

import { type Comment } from '@/entities/comment/types';
import { timeLabel } from '@/shared/lib/helpers/convertTime';
import { Text } from '@/shared/ui';
import BottomBorder from '@/shared/ui/BottomBorder';
import { Chip } from '@/shared/ui/Chip/Chip';

type Props = {
  comment: Comment;
  isCredit?: boolean; // per-user overlay state, not part of cached feed
  onToggleCredit?: (id: number, next: boolean) => void;
  score?: number; // display score overlay (optimistic updates)
};

export const CommentItem = ({ comment, isCredit = false, onToggleCredit, score }: Props) => {
  return (
    <BottomBorder className={`border-custom-5 flex-1 rounded-2xl`}>
      <View className="flex-col rounded-xl bg-background-dark-light p-3">
        <View>
          <View className="mb-2 flex-row items-center">
            <Image
              source={{ uri: comment.author.avatar }}
              className="mr-2 size-10 rounded-full border border-white"
            />
            <View className="flex-1">
              <Text className="font-bevietnampro text-white">{comment.author.name}</Text>
              <Text className="text-xs dark:text-white-dark">{timeLabel(comment.createdAt)}</Text>
            </View>
            <Chip
              value={comment.id}
              title={String(score ?? comment.score)}
              icon="credit"
              dark
              active={!!isCredit}
              size={18}
              onPress={(_val) => onToggleCredit?.(comment.id, !isCredit)}
            />
          </View>
        </View>
        <View className="w-full">
          <Text className="font-bevietnampro">{comment.text}</Text>
        </View>
      </View>
    </BottomBorder>
  );
};

export default CommentItem;
