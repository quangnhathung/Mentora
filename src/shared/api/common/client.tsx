import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { type RefreshTokenRequest, type RefreshTokenResponse } from '@/features/auth/types';
import { type ApiResponse, ErrorCode } from '@/shared/api/types';
import { type ToSnake } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';
import { Env } from '@/shared/lib/env';
import { useAuthStore } from '@/shared/lib/storage/auth/useAuthStore';

const client = axios.create({
  baseURL: Env.API_URL,
});

// ---- Shared refresh promise to avoid multiple refreshes ----
let refreshPromise: Promise<string | null> | null = null;

async function refreshToken() {
  const { token, doSignOut, doSignIn } = useAuthStore.getState();
  if (!token?.refresh) return null;

  // Nếu đã có refreshPromise chạy, dùng lại
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await client.post<
          ApiResponse<RefreshTokenResponse>,
          AxiosResponse<ApiResponse<RefreshTokenResponse>>,
          ToSnake<RefreshTokenRequest>
        >(
          '/api-profile/v1/public/auth/refresh_token', // endpoint
          { refresh_token: token?.refresh } // body JSON
        );

        const data = res.data;

        // Nếu API custom trả về error field
        if (data.code !== ErrorCode.SUCCESS) {
          throw new Error(data.message);
        }

        const finalData = camelizeKeys<RefreshTokenResponse>(data.data);

        const newToken = {
          access: finalData.accessToken,
          refresh: finalData.refreshToken ?? token.refresh,
        };

        doSignIn(newToken); // cập nhật token ở store
        return newToken.access;
      } catch (err) {
        doSignOut(); // refresh fail -> signOut
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

// ---- Request Interceptor ----
client.interceptors.request.use((config) => {
  const access = useAuthStore.getState().token?.access;
  if (access && config.headers) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// ---- Response Interceptor ----
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Trường hợp 401 và có refresh token
    if (
      error.response?.status === 401 &&
      !originalConfig?._retry &&
      useAuthStore.getState().token?.refresh
    ) {
      originalConfig._retry = true;

      const newAccess = await refreshToken();
      if (newAccess) {
        // Gán token mới lên header
        originalConfig.headers = {
          ...originalConfig.headers,
          Authorization: `Bearer ${newAccess}`,
        };
        return client(originalConfig); // retry request
      }
    }

    // Các lỗi khác hoặc refresh failed
    return Promise.reject(error);
  }
);

export default client;
