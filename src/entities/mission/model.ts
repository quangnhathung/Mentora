import { type AxiosError } from 'axios';
import { useEffect } from 'react';
import { createMutation, createQuery, type Middleware, type QueryHook } from 'react-query-kit';

import { missionApi } from '@/entities/mission/api';
import {
  type AchievementListResponse,
  type ChallengeListResponse,
  type MissionActionResponse,
  type MissionListResponse,
  type MissionResponse,
} from '@/entities/mission/types';
import { useMissionStore } from '@/entities/mission/useMissionStore';
import { logger, loggerMutation } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

type Variables = void; //
export type MissionVariables = { id: number };

export const syncMissionMiddleware: Middleware<
  QueryHook<MissionListResponse, Variables, AxiosError>
> = (useQueryNext) => (options) => {
  const result = useQueryNext(options);

  // khi có data mới, đồng bộ vào store
  useEffect(() => {
    if (result.data) useMissionStore.getState().setMissions(result.data);
  }, [result.data]);
  return result;
};

export const syncChallengeMiddleware: Middleware<
  QueryHook<ChallengeListResponse, Variables, AxiosError>
> = (useQueryNext) => (options) => {
  const result = useQueryNext(options);

  // khi có data mới, đồng bộ vào store
  useEffect(() => {
    if (result.data) useMissionStore.getState().setChallenges(result.data);
  }, [result.data]);
  return result;
};

export const syncAchievementMiddleware: Middleware<
  QueryHook<AchievementListResponse, Variables, AxiosError>
> = (useQueryNext) => (options) => {
  const result = useQueryNext(options);

  // khi có data mới, đồng bộ vào store
  useEffect(() => {
    if (result.data) useMissionStore.getState().setAchievements(result.data);
  }, [result.data]);
  return result;
};

export const useMissionData = {
  getMissionList: createQuery<MissionListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/missions/today'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => missionApi.getMissions(),
    use: [logger, syncMissionMiddleware], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    // refetchInterval: 1000 * 60 * 2, // sẽ tự refetch mỗi 1h
    // refetchIntervalInBackground: true, // tùy nhu cầu
    // refetchOnMount: 'always',
    // refetchOnWindowFocus: true, // (trở lại app thì refresh nếu stale)
    // refetchOnReconnect: true, // (có mạng lại thì refresh)
    retry: 1, // thử lại 1 lần
  }),
  getChallengeList: createQuery<ChallengeListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/missions/challenges/monthly'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => missionApi.getChallengeList(),
    use: [logger, syncChallengeMiddleware], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    retry: 1, // thử lại 1 lần
  }),
  getMissionInfo: createQuery<MissionResponse, MissionVariables, AxiosError>({
    queryKey: [`/api-profile/v1/private/missions`], // -> cache key
    fetcher: (variables) => missionApi.getMissionInfo(variables),
    use: [logger], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours
    retry: 1, // thử lại 1 lần
  }),
  getAchievementList: createQuery<AchievementListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/achievements'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => missionApi.getAchievementList(),
    use: [logger, syncAchievementMiddleware], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    retry: 1, // thử lại 1 lần
  }),
  doClaimMission: createMutation<MissionActionResponse, MissionVariables, AxiosError>({
    // throwOnError: (error) => error.response?.status! >= 500,
    mutationFn: (payload) => missionApi.doClaimMission(payload),
    use: [loggerMutation], // side-effect
    retry: 1, // thử lại 1 lần
  }),
};
