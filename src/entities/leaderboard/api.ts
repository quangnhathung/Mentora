import axios from 'axios';

import { type LeaderboardResponse, type Period, type RankUser } from '@/entities/leaderboard/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

const rankUser: RankUser = {
  id: 3,
  user: {
    id: 1,
    email: 'kiddyphan@gmail.com',
    name: 'Thang Phan 3',
    avatar: 'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
  },
  level: 20,
  score: 10,
  rank: 3,
};

const leaderboard: LeaderboardResponse = {
  data: {
    period: 'monthly',
    top3: [
      {
        id: 1,
        user: {
          id: 1,
          email: 'kiddyphan@gmail.com',
          name: 'Thang Phan',
          avatar:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        },
        level: 10,
        score: 7000,
        rank: 1,
      },
      {
        id: 2,
        user: {
          id: 1,
          email: 'kiddyphan@gmail.com',
          name: 'Thang Phan 2',
          avatar:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        },
        level: 50,
        score: 5000,
        rank: 2,
      },
      {
        id: 3,
        user: {
          id: 1,
          email: 'kiddyphan@gmail.com',
          name: 'Thang Phan 3 2232',
          avatar:
            'https://static.saoladigital.com/public/mtt-mobile-app/images/demo/image-demo.jpg',
        },
        level: 20,
        score: 4000,
        rank: 3,
      },
    ],
    rest: [
      {
        ...rankUser,
        id: 4,
        rank: 4,
      },
      {
        ...rankUser,
        id: 5,
        rank: 5,
      },
      {
        ...rankUser,
        id: 6,
        rank: 6,
      },
      {
        ...rankUser,
        id: 7,
        rank: 7,
      },
      {
        ...rankUser,
        id: 8,
        rank: 8,
      },
      {
        ...rankUser,
        id: 9,
        rank: 9,
      },
      {
        ...rankUser,
        id: 10,
        rank: 10,
      },
    ],
  },
};

export const leaderboardApi = {
  getLeaderboardByPeriod: async (period: Period): Promise<LeaderboardResponse> => {
    try {
      const res = await client.get<ApiResponse<LeaderboardResponse>>(
        `/api-profile/v1/private/leaderboards?period=${period}`
      );

      let result = res.data;
      result.data = leaderboard;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<LeaderboardResponse>(result.data);
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
