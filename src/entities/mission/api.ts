import axios from 'axios';

import { type MissionVariables } from '@/entities/mission/model';
import {
  type AchievementListResponse,
  type ChallengeListResponse,
  type MissionActionResponse,
  type MissionListResponse,
  type MissionResponse,
} from '@/entities/mission/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

const missions: MissionListResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: {
    checkIn: [
      { key: 'Mon', done: true },
      { key: 'Tue', done: true },
      { key: 'Wed', done: true },
      { key: 'Thu', done: true },
      { key: 'Fri', done: false },
      { key: 'Sat', done: false },
      { key: 'Sun', done: false },
    ],
    missions: [
      {
        id: 1,
        name: 'Collect 30 stars',
        status: 'inprogress',
        level: 'easy',
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        progress: {
          target: 30,
          current: 10,
        },
        reward: {
          amount: 30,
          type: 'xp',
        },
      },
      {
        id: 2,
        name: 'Achieve 90% accuracy with 2 exercises',
        status: 'claimed',
        level: 'medium',
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        progress: {
          target: 10,
          current: 2,
        },
        reward: {
          amount: 10,
          type: 'xp',
        },
      },
      {
        id: 3,
        name: 'Complete 2 Listening exercises',
        status: 'failed',
        level: 'hard',
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        progress: {
          target: 2,
          current: 1,
        },
        reward: {
          amount: 20,
          type: 'xp',
        },
      },
      {
        id: 4,
        name: 'Get 40 XP',
        status: 'available',
        level: 'easy',
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        progress: {
          target: 2,
          current: 0,
        },
        reward: {
          amount: 20,
          type: 'xp',
        },
      },
    ],
  },
};

const mission: MissionResponse = {
  data: {
    id: 1,
    name: 'Collect 30 stars',
    level: 'hard',
    image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
    status: 'inprogress',
    progress: {
      target: 30,
      current: 10,
    },
    reward: {
      amount: 30,
      type: 'xp',
    },
  },
};

const challenges: ChallengeListResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: {
    title: 'Bloomy August',
    challenges: [
      {
        id: 1,
        name: 'Streak Keeper of the month',
        status: 'inprogress',
        desc: 'Trong tháng 8 này hãy giữ chuỗi 7 ngày điểm danh liên tục để nhận huy hiệu <CustomLink className="text-cyan no-underline">Streak Keeper</CustomLink> và nhận thêm 50 sao',
        descImg:
          'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/challenge-1.png',
        level: 'easy',
        image: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        completeDate: 1757923748,
        progress: {
          target: 30,
          current: 10,
        },
        reward: {
          amount: 50,
          type: 'star',
        },
      },
    ],
  },
};

const achievements: AchievementListResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: [
    {
      title: 'Your achievements in 2025',
      achievements: [
        // @ts-ignore
        ...challenges.data.challenges,
        // @ts-ignore
        {
          ...challenges.data.challenges[0],
          id: 2,
          completeDate: 1760515748,
        },
        // @ts-ignore
        {
          ...challenges.data.challenges[0],
          id: 3,
          completeDate: 1760515748,
        },
        // @ts-ignore
        {
          ...challenges.data.challenges[0],
          id: 4,
          completeDate: 1760515748,
        },
        // @ts-ignore
        {
          ...challenges.data.challenges[0],
          id: 5,
          completeDate: 1760515748,
        },
        // @ts-ignore
        {
          ...challenges.data.challenges[0],
          id: 6,
          completeDate: 1760515748,
        },
        // @ts-ignore
        {
          ...challenges.data.challenges[0],
          id: 7,
          completeDate: 1760515748,
        },
      ],
    },
    {
      title: 'Your achievements in 2024',
      achievements: [],
    },
  ],
};

export const missionApi = {
  getMissions: async (): Promise<MissionListResponse> => {
    try {
      const res = await client.get<ApiResponse<MissionListResponse>>(
        '/api-profile/v1/private/missions'
      );

      let result = res.data;
      result.data = missions;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<MissionListResponse>(result.data);
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

  getChallengeList: async (): Promise<ChallengeListResponse> => {
    try {
      const res = await client.get<ApiResponse<ChallengeListResponse>>(
        '/api-profile/v1/private/missions/challenges/monthly'
      );

      let result = res.data;
      result.data = challenges;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<ChallengeListResponse>(result.data);
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

  getMissionInfo: async (variables: MissionVariables): Promise<MissionResponse> => {
    try {
      const res = await client.get<ApiResponse<MissionResponse>>(
        `/api-profile/v1/private/missions/${variables.id}`
      );

      let result = res.data;
      result.data = mission;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<MissionResponse>(result.data);
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

  getAchievementList: async (): Promise<AchievementListResponse> => {
    try {
      const res = await client.get<ApiResponse<AchievementListResponse>>(
        '/api-profile/v1/private/achievements'
      );

      let result = res.data;
      result.data = achievements;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<AchievementListResponse>(result.data);
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

  doClaimMission: async (variables: MissionVariables): Promise<MissionActionResponse> => {
    try {
      const res = await client.post<ApiResponse<MissionActionResponse>>(
        `/api-profile/v1/private/missions/${variables.id}/claim`
      );

      let result = res.data;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<MissionActionResponse>(result.data);
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
