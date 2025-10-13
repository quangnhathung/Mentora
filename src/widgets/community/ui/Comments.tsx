import SortSvg from '@assets/images/svgs/sort.svg';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';

import { commentApi } from '@/entities/comment/api';
import { useCommentsData } from '@/entities/comment/model';
import { type CommentSort } from '@/entities/comment/types';
import CommentItem from '@/entities/comment/ui/Comment';
import SortCommentsModal, {
  type SortCommentsModalRef,
} from '@/features/community/ui/SortCommentsModal';
import { colors, Text } from '@/shared/ui';

export const Comments = ({ postId, header }: { postId: number; header?: React.ReactNode }) => {
  const [sortOption, setSortOption] = useState<CommentSort>('popular');
  const sortRef = useRef<SortCommentsModalRef>(null);

  const query = useCommentsData.getComments({
    variables: { postId, sort: sortOption, limit: 10 },
  });

  const items = query.data?.pages.flatMap((p) => p.data) ?? [];
  const ids = useMemo(
    () => Array.from(new Set(items.map((c) => c.id))).sort((a, b) => a - b),
    [items]
  );
  const baseScoreById = useMemo(() => {
    const map: Record<number, number> = {};
    for (const c of items) if (!(c.id in map)) map[c.id] = c.score;
    return map;
  }, [items]);
  const { mutate: doToggleCreditComment } = useCommentsData.doToggleCreditComment();
  const [creditMap, setCreditMap] = useState<Record<number, boolean>>({});
  const [creditOverride, setCreditOverride] = useState<Record<number, boolean>>({});
  const [scoreOverride, setScoreOverride] = useState<Record<number, number>>({});
  const lastToggleRef = useRef<Record<number, number>>({});

  // Incrementally fetch per-user credit status to avoid flicker on pagination
  useEffect(() => {
    const missing = ids.filter((id) => !(id in creditMap));
    if (missing.length === 0) return;
    let cancelled = false;
    commentApi
      .getCreditStatus(missing)
      .then((map) => {
        if (cancelled) return;
        setCreditMap((m) => ({ ...m, ...map }));
      })
      .catch(() => {
        // ignore errors; keep prior known state
      });
    return () => {
      cancelled = true;
    };
  }, [ids, creditMap]);

  const resolveCredit = (id: number) =>
    Object.prototype.hasOwnProperty.call(creditOverride, id)
      ? creditOverride[id]
      : Boolean(creditMap[id]);

  const resolveScore = (id: number) =>
    Object.prototype.hasOwnProperty.call(scoreOverride, id)
      ? scoreOverride[id]
      : (baseScoreById[id] ?? 0);

  const onToggleCredit = (id: number, next: boolean) => {
    const now = Date.now();
    const last = lastToggleRef.current[id] ?? 0;
    if (now - last < 350) return; // simple debounce like post actions
    lastToggleRef.current[id] = now;
    const prevCredited = resolveCredit(id);
    const prevScore = resolveScore(id);
    const delta = next === prevCredited ? 0 : next ? 1 : -1;
    setCreditOverride((m) => ({ ...m, [id]: next }));
    if (delta !== 0) setScoreOverride((m) => ({ ...m, [id]: prevScore + delta }));
    doToggleCreditComment(
      { id },
      {
        onSuccess: () => {
          setCreditMap((m) => ({ ...m, [id]: next }));
          setCreditOverride((m) => {
            const { [id]: _, ...rest } = m;
            return rest;
          });
        },
        onError: () => {
          // revert on failure
          setCreditOverride((m) => ({ ...m, [id]: !next }));
          if (delta !== 0) setScoreOverride((m) => ({ ...m, [id]: prevScore }));
        },
      }
    );
  };
  const hasNext = Boolean(query.hasNextPage);

  const openSort = () => sortRef.current?.modal.present();
  const handleSortChange = (next: CommentSort) => {
    setSortOption(next);
    console.log('analytics: comments_sort_change', { post_id: postId, sort: next });
    query.refetch();
  };

  return (
    <View className="min-h-0 flex-1 px-4 pt-4">
      <FlatList
        className={`flex-1`}
        contentContainerClassName={``}
        data={items}
        keyExtractor={(c) => String(c.id)}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            isCredit={resolveCredit(item.id)}
            score={resolveScore(item.id)}
            onToggleCredit={onToggleCredit}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-[8px]" />}
        ListHeaderComponent={() => (
          <View className="flex-col">
            {header}
            <View className="mb-2 mt-4 flex-row items-center justify-between">
              <Text className="font-bevietnampro text-base text-white">Comments</Text>
              <Pressable onPress={openSort} className="flex-row items-center gap-1">
                <Text className="text-xs capitalize text-white">{sortOption}</Text>
                <SortSvg color={colors.white.DEFAULT} />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          !query.isLoading ? (
            <View className="items-center justify-center py-8">
              <Text className="text-gray-400">No comments yet</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          query.isFetchingNextPage ? (
            <View className="py-3">
              <ActivityIndicator color={colors.secondary.DEFAULT} />
            </View>
          ) : (
            <View className="py-3" />
          )
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (hasNext && !query.isFetchingNextPage) query.fetchNextPage();
        }}
        showsVerticalScrollIndicator={false}
      />
      <SortCommentsModal ref={sortRef} value={sortOption} onChange={handleSortChange} />
    </View>
  );
};

export default Comments;
