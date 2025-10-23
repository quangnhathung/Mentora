import axios from 'axios';

import {
  type UserResponse,
  type UserUpdateProfileRequest,
  type UserUpdateProfileResponse,
} from '@/entities/user/types';
import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';

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
};
