import axios from 'axios';

import { type TopicVariables } from '@/entities/topic/model';
import {
  type TopicLevelFilter,
  type TopicListResponse,
  type TopicResponse,
} from '@/entities/topic/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

const topics: TopicListResponse = {
  offset: 0,
  limit: 10,
  count: 10,
  nextCursor: null,
  data: [
    {
      id: 1,
      name: 'Transportation',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'beginner',
    },
    {
      id: 2,
      name: 'Mạng di động Việt Nam vào top 3 toàn cầu về tốc độ',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'intermediate',
    },
    {
      id: 3,
      name: 'Food',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'beginner',
    },
    {
      id: 4,
      name: 'Health',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'intermediate',
    },
    {
      id: 5,
      name: 'Technology',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'elementary',
    },
    {
      id: 6,
      name: 'Education',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'beginner',
    },
    {
      id: 7,
      name: 'Environment',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'advanced',
    },
    {
      id: 8,
      name: 'Sports',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'beginner',
    },
    {
      id: 9,
      name: 'Culture',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'intermediate',
    },
    {
      id: 10,
      name: 'Science',
      image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
      level: 'advanced',
    },
  ],
};

const topic: TopicResponse = {
  data: {
    id: 1,
    name: 'Transportation',
    image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
    units: [
      {
        id: 1,
        name: 'Abjectives',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 3,
        lessons: [
          {
            id: 1,
            name: 'Abjectives Part I',
            state: 'complete',
          },
          {
            id: 2,
            name: 'Abjectives Part II',
            state: 'complete',
          },
          {
            id: 33,
            name: 'Abjectives Part III',
            state: 'complete',
          },
        ],
      },
      {
        id: 2,
        name: 'Simple Present',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          {
            id: 3,
            name: 'Simple Present',
            state: 'complete',
          },
          {
            id: 55,
            name: 'Simple Present II',
            state: 'complete',
          },
        ],
      },
      {
        id: 3,
        name: 'How are you?',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          {
            id: 4,
            name: 'Greating',
            state: 'complete',
          },
          {
            id: 5,
            name: 'How old are you?',
            state: 'inprogress',
          },
        ],
      },
      {
        id: 4,
        name: 'How are you?',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          {
            id: 6,
            name: 'Greating',
            state: 'locked',
          },
          {
            id: 7,
            name: 'How old are you?',
            state: 'locked',
          },
        ],
      },
      {
        id: 5,
        name: 'Ordering Food',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          { id: 8, name: 'At a Restaurant', state: 'locked' },
          { id: 9, name: 'Asking for the Bill', state: 'locked' },
        ],
      },
      {
        id: 6,
        name: 'Present Continuous',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          { id: 10, name: 'Present Continuous', state: 'locked' },
          {
            id: 55,
            name: 'Present Continuous Present II',
            state: 'locked',
          },
        ],
      },
      {
        id: 7,
        name: 'Numbers 1-100',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          { id: 11, name: 'Basic Numbers', state: 'locked' },
          { id: 12, name: 'Giving Your Phone Number', state: 'locked' },
        ],
      },
      {
        id: 8,
        name: 'In the City',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          { id: 13, name: 'Finding the Bus Stop', state: 'locked' },
          { id: 14, name: 'Buying a Ticket', state: 'locked' },
        ],
      },
      {
        id: 9,
        name: 'Pronouncing /th/',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          { id: 15, name: 'Voiced & Voiceless /th/', state: 'locked' },
          { id: 152, name: 'Voiced & Voiceless II /th/', state: 'locked' },
        ],
      },
      {
        id: 10,
        name: 'Small Talk',
        desc: 'The interview is about to begin as everyone gets ready.',
        tags: ['easy', 'daily life', 'vocabulary'],
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        lessonsCount: 2,
        lessons: [
          { id: 16, name: 'Talking About Weather', state: 'locked' },
          { id: 17, name: 'Compliments & Responses', state: 'locked' },
        ],
      },
    ],
  },
};

type TopicFeedParams = {
  level?: TopicLevelFilter;
  cursor?: number;
  limit?: number;
};

export const topicApi = {
  getTopicHighlight: async (): Promise<TopicListResponse> => {
    try {
      const res = await client.get<ApiResponse<TopicListResponse>>(
        '/api-profile/v1/private/topics/highlight'
      );

      let result = res.data;
      result.data = topics;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<TopicListResponse>(result.data);
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

  getTopics: async ({
    level = 'all',
    cursor = 0,
    limit = 5,
  }: TopicFeedParams): Promise<TopicListResponse> => {
    try {
      const filtered =
        level === 'all' ? topics.data : topics.data.filter((item) => item.level === level);
      const slice = filtered.slice(cursor, cursor + limit);
      const nextCursor = cursor + limit < filtered.length ? cursor + limit : null;

      const response: TopicListResponse = {
        data: slice,
        offset: cursor,
        limit,
        count: filtered.length,
        nextCursor,
      };

      return camelizeKeys<TopicListResponse>(response);
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

  getTopic: async (variables: TopicVariables): Promise<TopicResponse> => {
    try {
      const res = await client.get<ApiResponse<TopicResponse>>(
        `/api-profile/v1/private/topics/${variables.id}`
      );

      let result = res.data;
      result.data = topic;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<TopicResponse>(result.data);
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
};
