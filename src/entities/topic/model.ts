import { type AxiosError } from 'axios';
import { useEffect } from 'react';
import { createInfiniteQuery, createQuery, type Middleware, type QueryHook } from 'react-query-kit';

import { type Paging } from '@/entities/comment/types';
import { topicApi } from '@/entities/topic/api';
import {
  type Topic,
  type TopicLevelFilter,
  type TopicListResponse,
  type TopicResponse,
} from '@/entities/topic/types';
import { useTopicStore } from '@/entities/topic/useTopicStore';
import { logger } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

type Variables = void; //
export type TopicVariables = { id: number };
export type TopicFeedVariables = { level: TopicLevelFilter; limit?: number };

export const syncTopicMiddleware: Middleware<
  QueryHook<TopicResponse, TopicVariables, AxiosError>
> = (useQueryNext) => (options) => {
  const result = useQueryNext(options);

  // khi có data mới, đồng bộ vào store
  useEffect(() => {
    if (result.data) useTopicStore.getState().setTopic(result.data);
  }, [result.data]);
  return result;
};

export const useTopicData = {
  getTopicHighlight: createQuery<TopicListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/topics/highlight'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => topicApi.getTopicHighlight(),
    use: [logger], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    // refetchInterval: 1000 * 60 * 2, // sẽ tự refetch mỗi 1h
    // refetchIntervalInBackground: true, // tùy nhu cầu
    // refetchOnMount: 'always',
    // refetchOnWindowFocus: true, // (trở lại app thì refresh nếu stale)
    // refetchOnReconnect: true, // (có mạng lại thì refresh)
    retry: 1, // thử lại 1 lần
  }),
  getTopics: createInfiniteQuery<TopicListResponse, TopicFeedVariables, AxiosError>({
    queryKey: ['/api-profile/v1/private/topics/feed'],
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: (variables, { pageParam }) =>
      topicApi.getTopics({
        level: variables.level,
        cursor: (pageParam as number | undefined) ?? 0,
        limit: variables.limit ?? 5,
      }),
    getNextPageParam: (lastPage: Paging<Topic>) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    use: [logger],
    staleTime: 1000 * 60 * 60,
    retry: 1,
  }),
  getTopic: createQuery<TopicResponse, TopicVariables, AxiosError>({
    queryKey: [`/api-profile/v1/private/topics`], // -> cache key
    fetcher: (variables) => topicApi.getTopic(variables),
    use: [logger, syncTopicMiddleware], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours
    retry: 1, // thử lại 1 lần
  }),
};
