import axios from 'axios';

import {
  type PostCommunityFeedVariables,
  type PostCreateVariables,
  type PostVariables,
} from '@/entities/post/model';
import {
  type PostActionResponse,
  type PostListResponse,
  type PostResponse,
} from '@/entities/post/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

const post: PostResponse = {
  data: {
    id: 1,
    title: '10 Ways to Learn Vocabulary Ranked from Worst to Best 🚀🚀🚀',
    content:
      'Here are 10 ways to learn vocabulary, ranked from what is generally considered less effective to more effective. This ranking is based on how well they help with retention and application of new words',
    createdAt: 1757923748,
    author: {
      id: 1,
      name: 'Thang Phan',
      avatar: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
    },
    likes: 12,
    shares: 11,
    comments: 10,
    credits: 10,
    isSave: false,
    highlight: true,
    extras: [
      {
        id: 1,
        type: 'star',
        value: 50,
      },
    ],
  },
};

const posts: PostListResponse = {
  nextCursor: 1,
  count: 100,
  data: [
    {
      ...post.data,
      id: 1,
      createdAt: 1756171762,
      isSave: true,
      tags: ['feed', 'news'],
    },
    {
      ...post.data,
      id: 2,
      createdAt: 1760515748,
      tags: ['feed', 'news'],
    },
    {
      ...post.data,
      id: 3,
      createdAt: 1760515748,
      isSave: true,
      extras: [{ id: 1, value: 5, type: 'star' }],
      tags: ['feed', 'news', 'reward'],
    },
    {
      ...post.data,
      id: 4,
      createdAt: 1760515748,
      extras: [{ id: 1, value: 10, type: 'xp' }],
      tags: ['feed', 'news', 'reward'],
    },
    {
      ...post.data,
      id: 5,
      createdAt: 1760515748,
      extras: [
        { id: 1, value: 5, type: 'xp' },
        { id: 1, value: 10, type: 'star' },
      ],
      tags: ['feed', 'news', 'reward'],
    },
    {
      ...post.data,
      id: 6,
      createdAt: 1760515748,
      tags: ['feed', 'news'],
    },
    {
      ...post.data,
      id: 7,
      createdAt: 1760515748,
      tags: ['feed', 'news'],
    },
    {
      ...post.data,
      id: 8,
      createdAt: 1760515748,
      tags: ['feed'],
    },
    {
      ...post.data,
      id: 9,
      createdAt: 1760515748,
      tags: ['feed'],
    },
    {
      ...post.data,
      id: 10,
      createdAt: 1760515748,
      tags: ['feed'],
    },
    {
      ...post.data,
      id: 11,
      createdAt: 1760515748,
      tags: ['feed'],
    },
    {
      ...post.data,
      id: 12,
      createdAt: 1760515748,
      tags: ['feed'],
    },
  ],
};

function getCommunityFeedMock({
  cursor,
  limit = 3,
  filter = [],
  match = 'any',
}: {
  cursor?: number;
  limit?: number;
  filter?: string[];
  match?: string;
}): PostListResponse {
  // 1) Lọc theo tags (nếu có)
  const filtered = posts.data.filter((p) => {
    if (!filter.length) return true;
    const ptags = p.tags ?? [];
    return match === 'all'
      ? filter.every((t) => ptags.includes(t))
      : filter.some((t) => ptags.includes(t));
  });

  // 2) Phân trang bằng offset sau khi đã filter
  const start = cursor ?? 0;
  const end = Math.min(start + limit, filtered.length);
  const page = filtered.slice(start, end);
  const nextCursor = end < filtered.length ? end : null;

  return {
    data: page,
    count: filtered.length,
    nextCursor,
  };
}

export const postApi = {
  getCommunityHighLightPost: async (): Promise<PostListResponse> => {
    try {
      const res = await client.get<ApiResponse<PostListResponse>>(
        '/api-profile/v1/private/posts/highlight'
      );

      let result = res.data;
      result.data = posts;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PostListResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // 1. Network Error: không có response
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        // 2. HTTP Error với response: ưu tiên lấy message từ server
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      // Những lỗi khác, cứ throw tiếp
      throw err;
    }
  },

  getCommunityFeed: async (variables: PostCommunityFeedVariables): Promise<PostListResponse> => {
    try {
      const res = await client.get<ApiResponse<PostListResponse>>(
        '/api-profile/v1/private/posts/feed',
        { params: { variables } }
      );

      let result = res.data;
      result.data = getCommunityFeedMock({
        cursor: variables.cursor,
        limit: variables.limit,
        filter: [variables.filter],
      });

      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PostListResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // 1. Network Error: không có response
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        // 2. HTTP Error với response: ưu tiên lấy message từ server
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      // Những lỗi khác, cứ throw tiếp
      throw err;
    }
  },

  getPostInfo: async (variables: PostVariables): Promise<PostResponse> => {
    try {
      const res = await client.get<ApiResponse<PostResponse>>(
        `/api-profile/v1/private/posts/${variables.id}`
      );

      let result = res.data;
      result.data = post;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PostResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // 1. Network Error: không có response
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        // 2. HTTP Error với response: ưu tiên lấy message từ server
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      // Những lỗi khác, cứ throw tiếp
      throw err;
    }
  },

  doToggleSavePost: async (variables: PostVariables): Promise<PostActionResponse> => {
    try {
      const res = await client.post<ApiResponse<PostActionResponse>>(
        `/api-profile/v1/private/posts/${variables.id}/save`
      );

      let result = res.data;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PostActionResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // 1. Network Error: không có response
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        // 2. HTTP Error với response: ưu tiên lấy message từ server
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      // Những lỗi khác, cứ throw tiếp
      throw err;
    }
  },

  doCreatePost: async (variables: PostCreateVariables): Promise<PostActionResponse> => {
    try {
      const res = await client.post<ApiResponse<PostActionResponse>>(
        `/api-profile/v1/private/posts`,
        variables.payload
      );

      let result = res.data;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PostActionResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // 1. Network Error: không có response
        if (!err.response) {
          throw new Error(translate('noti.error.network'));
        }
        // 2. HTTP Error với response: ưu tiên lấy message từ server
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      // Những lỗi khác, cứ throw tiếp
      throw err;
    }
  },

  doToggleLikePost: async (variables: PostVariables): Promise<PostActionResponse> => {
    try {
      const res = await client.post<ApiResponse<PostActionResponse>>(
        `/api-profile/v1/private/posts/${variables.id}/like`
      );
      const result = res.data;
      if (result.code !== ErrorCode.SUCCESS) throw new Error(result.message);
      return camelizeKeys<PostActionResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) throw new Error(translate('noti.error.network'));
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      throw err;
    }
  },

  doToggleCreditPost: async (variables: PostVariables): Promise<PostActionResponse> => {
    try {
      const res = await client.post<ApiResponse<PostActionResponse>>(
        `/api-profile/v1/private/posts/${variables.id}/credit`
      );
      const result = res.data;
      if (result.code !== ErrorCode.SUCCESS) throw new Error(result.message);
      return camelizeKeys<PostActionResponse>(result.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) throw new Error(translate('noti.error.network'));
        const serverMsg = err.response.data?.message;
        throw new Error(serverMsg ?? err.message);
      }
      throw err;
    }
  },

  doSubmitComment: async (payload: {
    postId: number;
    text: string;
  }): Promise<PostActionResponse> => {
    try {
      const res = await client.post<ApiResponse<PostActionResponse>>(
        `/api-profile/v1/private/posts/${payload.postId}/comments`,
        { text: payload.text }
      );
      const result = res.data;
      if (result.code !== ErrorCode.SUCCESS) throw new Error(result.message);
      return camelizeKeys<PostActionResponse>(result.data);
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
