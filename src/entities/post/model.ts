import { type AxiosError } from 'axios';
import { createInfiniteQuery, createMutation, createQuery } from 'react-query-kit';

import { postApi } from '@/entities/post/api';
import {
  type Paging,
  type Post,
  type PostActionResponse,
  type PostFilter,
  type PostListResponse,
  type PostResponse,
} from '@/entities/post/types';
import { logger, loggerMutation } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

type Variables = void; //
export type PostVariables = { id: number };
export type PostCommunityFeedVariables = { filter: PostFilter; cursor?: number; limit?: number };
export type PostCreateVariables = { payload: Post };

export const usePostData = {
  getCommunityHighLightPost: createQuery<PostListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/posts/highlight'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => postApi.getCommunityHighLightPost(),
    use: [logger],
    staleTime: 1000 * 60 * 60,
    retry: 1,
  }),
  getCommunityFeed: createInfiniteQuery<PostListResponse, PostCommunityFeedVariables, AxiosError>({
    queryKey: ['/api-profile/v1/private/posts/feed'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: (variables, { pageParam }) =>
      postApi.getCommunityFeed({
        filter: variables.filter,
        cursor: (pageParam as number | undefined) ?? 0,
        limit: variables.limit ?? 3,
      }),
    getNextPageParam: (lastPage: Paging<Post>) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    use: [logger],
    staleTime: 1000 * 60 * 60,
    retry: 1, // thử lại 1 lần
  }),
  getPostInfo: createQuery<PostResponse, PostVariables, AxiosError>({
    queryKey: [`/api-profile/v1/private/posts`], // -> cache key
    fetcher: (variables) => postApi.getPostInfo(variables),
    use: [logger],
    staleTime: 1000 * 60 * 60, // stale after 1 hours
    retry: 1, // thử lại 1 lần
  }),
  doToggleSavePost: createMutation<PostActionResponse, PostVariables, AxiosError>({
    // throwOnError: (error) => error.response?.status! >= 500,
    mutationFn: (payload) => postApi.doToggleSavePost(payload),
    use: [loggerMutation],
    retry: 1, // thử lại 1 lần
  }),
  doPostCreateVariables: createMutation<PostActionResponse, PostCreateVariables, AxiosError>({
    // throwOnError: (error) => error.response?.status! >= 500,
    mutationFn: (payload) => postApi.doCreatePost(payload),
    use: [loggerMutation],
    retry: 1, // thử lại 1 lần
  }),
  doToggleLikePost: createMutation<PostActionResponse, PostVariables, AxiosError>({
    mutationFn: (payload) => postApi.doToggleLikePost(payload),
    use: [loggerMutation],
    retry: 0,
  }),
  doToggleCreditPost: createMutation<PostActionResponse, PostVariables, AxiosError>({
    mutationFn: (payload) => postApi.doToggleCreditPost(payload),
    use: [loggerMutation],
    retry: 0,
  }),
  doSubmitComment: createMutation<PostActionResponse, { postId: number; text: string }, AxiosError>(
    {
      mutationFn: (payload) => postApi.doSubmitComment(payload),
      use: [loggerMutation],
      retry: 0,
    }
  ),
};
