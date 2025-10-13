import { type AxiosError } from 'axios';
import { createInfiniteQuery, createMutation, createQuery } from 'react-query-kit';

import { commentApi, type GetCommentsVariables } from '@/entities/comment/api';
import { type Comment, type CommentListResponse, type Paging } from '@/entities/comment/types';
import { logger } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

export const useCommentsData = {
  getComments: createInfiniteQuery<CommentListResponse, GetCommentsVariables, AxiosError>({
    queryKey: ['/api-profile/v1/private/comments'],
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: (variables, { pageParam }) =>
      commentApi.getComments({ ...variables, cursor: (pageParam as number | undefined) ?? 0 }),
    getNextPageParam: (lastPage: Paging<Comment>) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    use: [logger],
    staleTime: 1000 * 60 * 60,
    retry: 1,
  }),
  getCreditStatus: createQuery<Record<number, boolean>, { ids: number[] }, AxiosError>({
    queryKey: ['/api-profile/v1/private/comments/credit-status'],
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: (variables) => {
      if (!variables.ids?.length) return Promise.resolve({});
      return commentApi.getCreditStatus(variables.ids);
    },
    use: [logger],
    staleTime: 1000 * 60,
    retry: 0,
  }),
  doToggleCreditComment: createMutation<void, { id: number }, AxiosError>({
    mutationFn: (payload) => commentApi.doToggleCreditComment(payload.id),
  }),
};
