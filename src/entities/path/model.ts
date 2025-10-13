import { type AxiosError } from 'axios';
import { useEffect } from 'react';
import { createQuery, type Middleware, type QueryHook } from 'react-query-kit';

import { pathApi } from '@/entities/path/api';
import { type PathResponse } from '@/entities/path/types';
import { usePathStore } from '@/entities/path/usePathStore';
import { logger } from '@/shared/api';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';
type Variables = void; //

export const syncPathMiddleware: Middleware<QueryHook<PathResponse, Variables, AxiosError>> =
  (useQueryNext) => (options) => {
    const result = useQueryNext(options);

    // khi có data mới, đồng bộ vào store
    useEffect(() => {
      if (result.data) usePathStore.getState().setPath(result.data);
    }, [result.data]);
    return result;
  };

export const usePathData = {
  getCurrentPath: createQuery<PathResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/user/path'], // -> cache key
    enabled: () => !!useAuthStore.getState().token?.access,
    fetcher: () => pathApi.getCurrentPath(),
    use: [logger, syncPathMiddleware], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours
    retry: 1, // thử lại 1 lần
  }),
};
