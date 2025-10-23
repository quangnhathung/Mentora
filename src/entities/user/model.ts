import { type AxiosError } from 'axios';
import { useEffect } from 'react';
import { createMutation, createQuery, type Middleware, type QueryHook } from 'react-query-kit';

import { userApi } from '@/entities/user/api';
import {
  type UserProgressResponse,
  type UserResponse,
  type UserUpdateProfileRequest,
  type UserUpdateProfileResponse,
} from '@/entities/user/types';
import { type PathProgressResponse } from '@/entities/user/types';
import { useUserStore } from '@/entities/user/useUserStore';
import { logger, loggerMutation } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

import { useProgressStore } from './useProgressStore';

type Variables = void; //

export const syncProfileMiddleware: Middleware<QueryHook<UserResponse, Variables, AxiosError>> =
  (useQueryNext) => (options) => {
    const result = useQueryNext(options);
    // khi có data mới, đồng bộ vào store
    useEffect(() => {
      if (result.data) useUserStore.getState().setUserProfile(result.data);
    }, [result.data]);
    return result;
  };

export const syncUserProgressMiddleware: Middleware<
  QueryHook<UserProgressResponse, Variables, AxiosError>
> = (useQueryNext) => (options) => {
  const result = useQueryNext(options);

  useEffect(() => {
    if (result.data) {
      useUserStore.getState().setUserProgress(result.data);
    }
  }, [result.data]);

  return result;
};

export const syncProgressMiddleware: Middleware<
  QueryHook<PathProgressResponse, Variables, AxiosError>
> = (useQueryNext) => (options) => {
  const result = useQueryNext(options);

  useEffect(() => {
    const d: unknown = result.data;

    if (!d) return;

    // case A: proper object { data: [...] }
    if (typeof d === 'object' && d !== null && Array.isArray((d as any).data)) {
      useProgressStore.getState().setProgress(d as Partial<PathProgressResponse>);
      return;
    }

    // case B: API/lib returned the array directly (result.data is an array)
    if (Array.isArray(d)) {
      const arr = d as any[];
      const normalized: Partial<PathProgressResponse> = {
        data: arr,
        offset: 0,
        limit: arr.length,
        count: arr.length,
      };
      useProgressStore.getState().setProgress(normalized);
      return;
    }

    // else: không hợp lệ -> ignore hoặc log
    // console.warn('Unexpected path-progress response shape', d);
  }, [result.data]);

  return result;
};

export const useUserData = {
  getUserProfile: createQuery<UserResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/auth/user/profile'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => userApi.getProfile(),
    use: [logger, syncProfileMiddleware], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours
    retry: 1, // thử lại 1 lần
  }),

  doUpdateProfile: createMutation<UserUpdateProfileResponse, UserUpdateProfileRequest, AxiosError>({
    // throwOnError: (error) => error.response?.status! >= 500,
    mutationFn: (payload) => userApi.doUpdateProfile(payload),
    use: [loggerMutation], // side-effect
    retry: 1, // thử lại 1 lần
  }),
};
