import { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { logger } from '@/shared/api';

import { PremiumApi } from './api';
import { type BenefitListResponse, type PlanListResponse } from './types';

type Variables = void;

export const usePremiumData = {
  getBenefit: createQuery<BenefitListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/premium/benefit'], // -> cache key
    fetcher: () => PremiumApi.getBenefit(),
    use: [logger], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    retry: 1, // thử lại 1 lần
  }),
  getPlan: createQuery<PlanListResponse, Variables, AxiosError>({
    queryKey: ['/api-profile/v1/private/premium/plan'], // -> cache key
    fetcher: () => PremiumApi.getPlan(),
    use: [logger], // side-effect
    staleTime: 1000 * 60 * 60, // stale after 1 hours # het cache ko dong nghia re-render
    retry: 1, // thử lại 1 lần
  }),
};
