import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import * as reactQueryKit from 'react-query-kit';

import { translate } from '@/shared/lib';
import { rqkPrefix } from '@/shared/lib/helpers/convertTime';

function keyToString(key: readonly unknown[]) {
  try {
    return JSON.stringify(key);
  } catch {
    return String(key);
  }
}

export const logger: reactQueryKit.Middleware<reactQueryKit.QueryHook<any, any, any>> =
  (useQueryNext) => (options) => {
    const res = useQueryNext(options);
    const mounted = useRef(false);

    const key = (options as any).queryKey as readonly unknown[];
    const kstr = keyToString(key);

    // Mount lần đầu
    useEffect(() => {
      if (mounted.current) return;
      mounted.current = true;
      const fromCache =
        !!res.data && res.dataUpdatedAt > 0 && res.fetchStatus === 'idle' && !res.isFetching;

      console.log(rqkPrefix(), 'mount', kstr, { fromCache, hasData: !!res.data });
    }, [kstr, res.data, res.dataUpdatedAt, res.fetchStatus, res.isFetching]);

    // Log thay đổi fetch/status
    useEffect(() => {
      console.log(rqkPrefix(), 'status', kstr, {
        status: res.status,
        fetchStatus: res.fetchStatus,
        isFetching: res.isFetching,
        isRefetching: res.isRefetching,
        isStale: res.isStale,
      });
    }, [kstr, res.status, res.fetchStatus, res.isFetching, res.isRefetching, res.isStale]);

    // Log khi có data mới
    useEffect(() => {
      if (!res.dataUpdatedAt) return;
      console.log(rqkPrefix(), 'data updated', kstr, {
        updatedAt: res.dataUpdatedAt,
        isStale: res.isStale,
      });
    }, [kstr, res.dataUpdatedAt, res.isStale]);

    // Log error
    useEffect(() => {
      if (!res.error) return;
      console.log(rqkPrefix(), 'error', kstr, res.error);
    }, [kstr, res.error]);

    return res;
  };

/**
 * Ghi log vòng đời của một useMutation được tạo bằng React-Query-Kit
 */
export const loggerMutation: reactQueryKit.Middleware<
  //   TData,      TError,     TVariables,   TContext
  reactQueryKit.MutationHook<any, any, any, any>
> = (useMutationNext) => (options) => {
  // gọi next middleware / hook gốc
  const res = useMutationNext(options);

  const mounted = useRef(false);
  const key = (options as any).mutationKey as readonly unknown[] | undefined;
  const kstr = keyToString(key ?? []);

  // mount
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    console.log(rqkPrefix(), 'mutation mount', kstr);
  }, [kstr]);

  // trạng thái thay đổi
  useEffect(() => {
    console.log(rqkPrefix(), 'mutation status', kstr, {
      status: res.status, // 'idle' | 'pending' | 'success' | 'error'
      isPending: res.isPending,
      isSuccess: res.isSuccess,
      isError: res.isError,
      isPaused: res.isPaused,
    });
  }, [kstr, res.status, res.isPending, res.isSuccess, res.isError, res.isPaused]);

  // dữ liệu / lỗi mới
  useEffect(() => {
    if (res.data !== undefined) {
      console.log(rqkPrefix(), 'mutation data', kstr, res.data);
    }
  }, [kstr, res.data]);

  useEffect(() => {
    if (res.error !== null) {
      console.log(rqkPrefix(), 'mutation error', kstr, res.error);
    }
  }, [kstr, res.error]);

  return res;
};

export const queryMiddleware: reactQueryKit.Middleware<reactQueryKit.QueryHook<any, any, any>> = (
  useQueryNext
) => {
  return (options) => {
    // u can also get queryKey via function getKey
    const fullKey = reactQueryKit.getKey(options.queryKey, options.variables);
    console.log('fullKey', fullKey);

    // ...
    return useQueryNext(options);
  };
};

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error && error.message) {
        Toast.show({
          type: 'error',
          text1: translate('noti.error.title'),
          text2: error.message,
        });
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error && query.meta?.errorMessage) {
        Toast.show({
          type: 'error',
          text1: translate('noti.error.title'),
          text2: query.meta?.errorMessage as string,
        });
      }
    },
  }),
});

export function APIProvider({ children }: { children: React.ReactNode }) {
  useReactQueryDevTools(queryClient);
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
