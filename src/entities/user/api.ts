import axios from 'axios';

import {
  type UserProgress,
  type UserProgressResponse,
  type UserResponse,
  type UserUpdateProfileRequest,
  type UserUpdateProfileResponse,
} from '@/entities/user/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

import { type PathProgressResponse } from './types';

const currentPath: UserProgress = {
  currentPath: {
    id: 1,
    name: 'Tiếng Anh thông dụng hằng ngày',
    image: '',
    currentTopic: {
      id: 1,
      name: 'Simple Present',
    },
  },
  currentHealth: 5,
  currentPathProgress: 60,
  currentLevelProgress: 30,
  currentLevelMaxExp: 2000,
  currentLevelExp: 1500,
  currentLevel: 'beginner',
  currentLevelNumber: 10,
};

const PathProgress: PathProgressResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: [
    {
      id: 1,
      title: 'Getting Started',
      description:
        '“Getting Started” is the familiarization phase, helping you master the basics and build a foundation for your English learning journey.',
      status: 1,
      content: [
        {
          id: 1,
          title: 'Basic Pronunciation and Listening',
          description: 'Lessons on basic English sounds',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/voice.svg',
        },
        {
          id: 2,
          title: 'Common Vocabulary',
          description:
            'Learn vocabulary through familiar topics like family, friends, numbers, colors, time...',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/book.svg',
        },
        {
          id: 3,
          title: 'Simple Sentence Structures',
          description:
            'Introduction to basic sentence structures: affirmative, negative, and interrogative.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/structure.svg',
        },
        {
          id: 4,
          title: 'Basic Interaction and Communication',
          description:
            'Practice through interactive exercises, allowing learners to improve reflexes and pronunciation naturally.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/talk.svg',
        },
        {
          id: 5,
          title: 'Assessment and Feedback',
          description: 'Short quizzes after each lesson to assess progress.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/feedback.svg',
        },
      ],
    },
    {
      id: 2,
      title: 'Boost',
      description:
        '“Getting Started” is the familiarization phase, helping you master the basics and build a foundation for your English learning journey.',
      status: 0,
      content: [
        {
          id: 1,
          title: 'Basic Pronunciation and Listening',
          description: 'Lessons on basic English sounds',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/voice.svg',
        },
        {
          id: 2,
          title: 'Common Vocabulary',
          description:
            'Learn vocabulary through familiar topics like family, friends, numbers, colors, time...',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/book.svg',
        },
        {
          id: 3,
          title: 'Simple Sentence Structures',
          description:
            'Introduction to basic sentence structures: affirmative, negative, and interrogative.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/structure.svg',
        },
        {
          id: 4,
          title: 'Basic Interaction and Communication',
          description:
            'Practice through interactive exercises, allowing learners to improve reflexes and pronunciation naturally.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/talk.svg',
        },
        {
          id: 5,
          title: 'Assessment and Feedback',
          description: 'Short quizzes after each lesson to assess progress.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/feedback.svg',
        },
      ],
    },
    {
      id: 3,
      title: 'Finish Line',
      description:
        '“Getting Started” is the familiarization phase, helping you master the basics and build a foundation for your English learning journey.',
      status: -1,
      content: [
        {
          id: 1,
          title: 'Basic Pronunciation and Listening',
          description: 'Lessons on basic English sounds',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/voice.svg',
        },
        {
          id: 2,
          title: 'Common Vocabulary',
          description:
            'Learn vocabulary through familiar topics like family, friends, numbers, colors, time...',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/book.svg',
        },
        {
          id: 3,
          title: 'Simple Sentence Structures',
          description:
            'Introduction to basic sentence structures: affirmative, negative, and interrogative.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/structure.svg',
        },
        {
          id: 4,
          title: 'Basic Interaction and Communication',
          description:
            'Practice through interactive exercises, allowing learners to improve reflexes and pronunciation naturally.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/talk.svg',
        },
        {
          id: 5,
          title: 'Assessment and Feedback',
          description: 'Short quizzes after each lesson to assess progress.',
          icon: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/feedback.svg',
        },
      ],
    },
  ],
};

export const userApi = {
  getProfile: async (): Promise<UserResponse> => {
    try {
      const res = await client.get<ApiResponse<UserResponse>>(
        '/api-profile/v1/private/auth/user/profile'
      );

      const data = res.data;

      // Nếu API custom trả về error field
      if (data.code !== ErrorCode.SUCCESS) {
        throw new Error(data.message);
      }
      return data.data;
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
  doUpdateProfile: async (
    payload: UserUpdateProfileRequest
  ): Promise<UserUpdateProfileResponse> => {
    try {
      const res = await client.put<ApiResponse<UserUpdateProfileResponse>>(
        '/api-profile/v1/private/auth/user/profile',
        payload
      );

      const data = res.data;

      // Nếu API custom trả về error field
      if (data.code !== ErrorCode.SUCCESS) {
        throw new Error(data.message);
      }
      return data.data;
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
  getUserCurrentProgress: async (): Promise<UserProgressResponse> => {
    try {
      const res = await client.get<ApiResponse<UserProgressResponse>>(
        '/api-profile/v1/private/user/progress'
      );

      const data = res.data;
      data.data = currentPath;

      // Nếu API custom trả về error field
      if (data.code !== ErrorCode.SUCCESS) {
        throw new Error(data.message);
      }
      return data.data;
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
  getCurrentPathInfo: async (): Promise<PathProgressResponse> => {
    try {
      const res = await client.get<ApiResponse<PathProgressResponse>>(
        '/api-profile/v1/private/user/path/current-progress'
      );

      let result = res.data;
      result.data = PathProgress;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PathProgressResponse>(result.data);
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
