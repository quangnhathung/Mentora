import { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { leaderboardApi } from '@/entities/leaderboard/api';
import { type LeaderboardResponse, type Period } from '@/entities/leaderboard/types';
import { logger } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

export type LeaderboardVariables = { period: Period };

export const useLeaderboardData = {
  getLeaderboardByPeriod: createQuery<LeaderboardResponse, LeaderboardVariables, AxiosError>({
    queryKey: ['/api-profile/v1/private/leaderboards'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: (variables) => leaderboardApi.getLeaderboardByPeriod(variables.period),
    use: [logger], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    retry: 1, // thử lại 1 lần
  }),
};
