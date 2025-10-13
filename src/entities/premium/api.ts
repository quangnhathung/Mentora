import axios from 'axios';

import { type ApiResponse, ErrorCode } from '@/shared/api';
import client from '@/shared/api/common/client';
import { translate } from '@/shared/lib';
import { camelizeKeys } from '@/shared/lib/camelize';

import { type BenefitListResponse } from './types';
import { type PlanListResponse } from './types';

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
const THREE_MONTHS = ONE_MONTH * 3;
const SIX_MONTHS = ONE_MONTH * 6;
const ONE_YEAR = ONE_MONTH * 12;

const benefit: BenefitListResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: [
    {
      id: 1,
      title: 'Ads Free',
      desc: 'No Ads, No Interruptions',
      img: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/AdFree.svg',
      content: [],
    },
    {
      id: 2,
      title: 'Unlock Exclusive Content',
      desc: 'More lessons, more fun, more rewards',
      img: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/ExclusiveContent.svg',
      content: [
        'Extra lesson content with rewards',
        'Extra role-play content',
        'Extra voices accents (India, Singapore)',
        'And more...',
      ],
    },
    {
      id: 3,
      title: 'AI-powered Partner.',
      desc: 'Deeper Insights Into Your Learning',
      img: 'https://storage.googleapis.com/static.saoladigital.com/public/mtt-mobile-app/images/demo/AI.svg',
      content: [
        'AI-Powered pronunciation feedback',
        'AI-Powered Assistant',
        'AI-Generated Content Based on Your Interests',
      ],
    },
  ],
};

const plan: PlanListResponse = {
  offset: 1,
  limit: 10,
  count: 100,
  data: [
    {
      id: 1,
      expireTime: '1 month',
      sale: 'Get over 10% off',
      value: ONE_MONTH,
      oldPrice: '60.000 VND',
      newPrice: '55.000 VND',
    },
    {
      id: 2,
      expireTime: '3 months',
      outstanding: true,
      sale: 'Get over 20% off',
      value: THREE_MONTHS,
      oldPrice: '180.000 VND',
      newPrice: '170.000 VND',
    },
    {
      id: 3,
      expireTime: '6 months',
      sale: 'Get over 30% off',
      value: SIX_MONTHS,
      oldPrice: '360.000 VND',
      newPrice: '320.000 VND',
    },
    {
      id: 4,
      expireTime: '1 year',
      sale: 'Get over 30% off',
      value: ONE_YEAR,
      oldPrice: '720.000 VND',
      newPrice: '680.000 VND',
    },
  ],
};

export const PremiumApi = {
  getBenefit: async (): Promise<BenefitListResponse> => {
    try {
      const res = await client.get<ApiResponse<BenefitListResponse>>(
        `/api-profile/v1/private/premium/benefit`
      );

      let result = res.data;
      result.data = benefit;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<BenefitListResponse>(result.data);
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
  getPlan: async (): Promise<PlanListResponse> => {
    try {
      const res = await client.get<ApiResponse<PlanListResponse>>(
        `/api-profile/v1/private/premium/plan`
      );

      let result = res.data;
      result.data = plan;
      // Nếu API custom trả về error field
      if (result.code !== ErrorCode.SUCCESS) {
        throw new Error(result.message);
      }
      return camelizeKeys<PlanListResponse>(result.data);
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
