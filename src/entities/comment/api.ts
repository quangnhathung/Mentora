import axios from 'axios';

import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

import { type Comment, type CommentListResponse, type CommentSort } from './types';

export type GetCommentsVariables = {
  postId: number;
  sort: CommentSort;
  cursor?: number;
  limit?: number;
};

const makeMockComments = (postId: number, cursor = 0, limit = 10): Comment[] => {
  const base = cursor * limit;
  return Array.from({ length: limit }, (_, i) => {
    const id = base + i + 1;
    return {
      id,
      postId,
      author: {
        id: id % 5,
        name: `User ${id}`,
        avatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
      },
      createdAt: Date.now() - id * 3600_000,
      text: `Mock comment #${id} for post ${postId}. This is placeholder content for development.`,
      score: Math.floor(Math.random() * 50),
    } satisfies Comment;
  });
};

export const commentApi = {
  getComments: async (variables: GetCommentsVariables): Promise<CommentListResponse> => {
    try {
      const res = await client.get<ApiResponse<CommentListResponse>>(
        `/api-profile/v1/private/posts/${variables.postId}/comments`,
        { params: { variables } }
      );

      let result = res.data;
      // mock data page
      const pageData = makeMockComments(
        variables.postId,
        variables.cursor ?? 0,
        variables.limit ?? 10
      );
      result.data = {
        data:
          variables.sort === 'popular'
            ? [...pageData].sort((a, b) => b.score - a.score)
            : [...pageData].sort((a, b) => b.createdAt - a.createdAt),
        nextCursor: (variables.cursor ?? 0) + 1 < 5 ? (variables.cursor ?? 0) + 1 : null,
        count: 50,
      };

      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<CommentListResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      throw err;
    }
  },
  getCreditStatus: async (ids: number[]): Promise<Record<number, boolean>> => {
    // Real impl example:
    // const res = await client.get<ApiResponse<Record<number, boolean>>>(
    //   `/api-profile/v1/private/comments/credit-status`,
    //   { params: { ids: ids.join(',') } }
    // );
    // if (res.data.code !== ErrorCode.SUCCESS) throw new Error(res.data.message);
    // return camelizeKeys<Record<number, boolean>>(res.data.data);

    // Mock: deterministic per-user-ish status, lightweight and short-lived
    const result: Record<number, boolean> = {};
    for (const id of ids) {
      // simple deterministic rule so UI is stable in dev
      result[id] = id % 3 === 0;
    }
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 80));
    return result;
  },
  doToggleCreditComment: async (id: number): Promise<void> => {
    try {
      const res = await client.post<ApiResponse<unknown>>(
        `/api-profile/v1/private/comments/${id}/credit`
      );
      const result = res.data;
      if (result.code !== ErrorCode.SUCCESS) throw new Error(result.message);
      return;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) throw new Error(translate('noti.error.network'));
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      throw err;
    }
  },
};
