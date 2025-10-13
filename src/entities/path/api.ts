import axios from 'axios';

import { type PathResponse } from '@/entities/path/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

const path: PathResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: {
    id: 1,
    name: 'Tiếng Anh thông dụng hằng ngày',
    image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
    topics: [
      {
        id: 1,
        name: 'Khởi động',
        units: [
          {
            id: 1,
            name: 'Abjectives',
            desc: 'The interview is about to begin as everyone gets ready.',
            tags: ['easy', 'daily life', 'vocabulary'],
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
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
            image:
              'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
            lessonsCount: 2,
            lessons: [
              { id: 16, name: 'Talking About Weather', state: 'locked' },
              { id: 17, name: 'Compliments & Responses', state: 'locked' },
            ],
          },
        ],
      },
    ],
  },
};

export const pathApi = {
  getCurrentPath: async (): Promise<PathResponse> => {
    try {
      const res = await client.get<ApiResponse<PathResponse>>('/api-profile/v1/private/user/path');

      let result = res.data;
      result.data = path;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PathResponse>(result.data);
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
