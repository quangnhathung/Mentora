import { useMutation } from '@tanstack/react-query';

import { type PremiumResponse } from '../types';
import { activatePremium, type ActivatePremiumReq } from '../update';

export const useActivatePremium = () => {
  return useMutation<PremiumResponse, unknown, ActivatePremiumReq>({
    mutationFn: activatePremium,
  });
};
