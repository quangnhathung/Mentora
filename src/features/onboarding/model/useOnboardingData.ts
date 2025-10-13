import axios, { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type Onboarding } from '@/features/onboarding/types';
import { type ApiResponse } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';
type Variables = void; //

// mock data
const stepsData: Onboarding[] = [
  {
    id: 1,
    screenName: 'Choose your native language',
    title: '',
    description: 'Choose your native language',
    choices: [
      {
        id: 1,
        value: 'vi',
        description: 'Vietnamese',
        iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/vn.svg',
      },
      {
        id: 2,
        value: 'jp',
        description: 'Japanese',
        iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/vn.svg',
      },
      {
        id: 3,
        value: 'ge',
        description: 'German',
        iconUrl: 'https://static.saoladigital.com/public/mtt-mobile-app/images/svgs/vn.svg',
      },
    ],
  },
  {
    id: 2,
    screenName: 'Tôi muốn hiểu bạn',

    title: 'Bạn là:',
    description: 'Chọn nghề nghiệp hiện tại của bạn',
    choices: [
      { id: 1, description: 'Sinh viên, học sinh' },
      { id: 2, description: 'Lập trình viên' },
      { id: 3, description: 'Nhân viên văn phòng' },
      { id: 4, description: 'Giáo viên, trợ giảng' },
      { id: 5, description: 'Người lao động' },
      { id: 6, description: 'Khác' },
    ],
  },
  {
    id: 3,
    screenName: 'Mục tiêu học tập',
    title: 'Tôi muốn:',
    description: 'Chọn mục tiêu học tập',
    choices: [
      { id: 1, description: 'Tiếng Anh thông dụng hằng ngày' },
      { id: 2, description: 'Chuẩn bị cho kì thi' },
      { id: 3, description: 'Phát triển bản thân' },
      { id: 4, description: 'Chuẩn bị cho việc du học' },
      { id: 5, description: 'Các mục tiêu khác' },
    ],
  },
  {
    id: 4,
    screenName: 'Thiết lập trình độ',
    title: 'Trình độ hiện tại của tôi:',
    description: 'Chọn trình độ hiện tại của bạn',
    choices: [
      {
        id: 1,
        description:
          '<p class="justify-start"><span class="text-primary text-sm">Beginner</span></p><p class="justify-start"><span class="text-white text-sm">Mới tiếp cận Tiếng Anh</span></p>',
      },
      {
        id: 2,
        description:
          '<p class="justify-start"><span class="text-primary text-sm">Elementary</span></p><p class="justify-start"><span class="text-white text-sm">Hiểu biết từ vựng, ngữ pháp cơ bản</span></p>',
      },
      {
        id: 3,
        description:
          '<p class="justify-start"><span class="text-secondary text-sm">Intermediate</span></p><p class="justify-start"><span class="text-white text-sm">Có thể nghe nói cơ bản</span></p>',
      },
      {
        id: 4,
        description:
          '<p class="justify-start"><span class="text-secondary text-sm">Advanced</span></p><p class="justify-start"><span class="text-white text-sm">Thành thạo 4 kĩ năng</span></p>',
      },
    ],
  },
];

const useOnboardingData = {
  getOnboardingData: createQuery<Onboarding[], Variables, AxiosError>({
    queryKey: ['/api-profile/v1/public/onboarding'],
    // fetcher: ({ id }) => userApi.getById(id),  // replaces queryFn
    fetcher: async () => {
      try {
        const res = await client.get<ApiResponse<Onboarding[]>>(
          '/api-profile/v1/public/onboarding'
        );

        const data = res.data;
        data.data = stepsData;

        // Nếu API custom trả về error field
        // if (data.code !== ErrorCode.SUCCESS) {
        //   throw new Error(data.message);
        // }
        return camelizeKeys<Onboarding[]>(data.data);
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
    staleTime: 1000 * 60 * 60, // cache 1 hours
    retry: 1, // thử lại 1 lần
    meta: {
      errorMessage: 'Failed to getOnboardingData',
    },
  }),
};

export default useOnboardingData;
