import axios, { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import {
  type OauthLoginCallbackRequest,
  type OauthLoginCallbackResponse,
  type OauthLoginRequest,
  type OauthLoginResponse,
  type RefreshTokenRequest,
  type RefreshTokenResponse,
} from '@/features/auth/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

const useAuthData = {
  doOauthLogin: createMutation<OauthLoginResponse, OauthLoginRequest, AxiosError>({
    throwOnError: (error) => error.response?.status! >= 500,
    mutationFn: async (payload) => {
      try {
        const res = await client.post<ApiResponse<OauthLoginResponse>>(
          '/api-profile/v1/public/auth/oauth/google',
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
    // mutationFn: async (payload) =>
    //   client
    //     .post<ApiResponse<OauthLoginResponse>>(
    //       '/api-profile/v1/public/auth/oauth/gogole', // endpoint
    //       payload // body JSON
    //     )
    //     .then((r) => r.data.data),
  }),
  doOauthLoginCallback: createMutation<
    OauthLoginCallbackResponse,
    OauthLoginCallbackRequest,
    AxiosError
  >({
    mutationFn: async (payload) => {
      try {
        const res = await client.post<ApiResponse<OauthLoginCallbackResponse>>(
          '/api-profile/v1/public/auth/oauth/google/callback', // endpoint
          payload // body JSON
        );

        const data = res.data;

        // Nếu API custom trả về error field
        if (data.code !== ErrorCode.SUCCESS) {
          throw new Error(data.message);
        }
        return camelizeKeys<OauthLoginCallbackResponse>(data.data);
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
  }),
  doRefreshToken: createMutation<RefreshTokenResponse, RefreshTokenRequest, AxiosError>({
    mutationFn: async (payload) =>
      client
        .post<ApiResponse<RefreshTokenResponse>>(
          '/api-profile/v1/public/auth/refresh_token', // endpoint
          payload // body JSON
        )
        .then((r) => camelizeKeys<OauthLoginCallbackResponse>(r.data.data)),
  }),
};

export default useAuthData;
