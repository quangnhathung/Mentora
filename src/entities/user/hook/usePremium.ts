import { useMutation } from '@tanstack/react-query';

import { type PremiumResponse } from '../types';
import { activatePremium, type ActivatePremiumReq } from '../update';
import { cancelPremium, type CancelPremiumReq } from '../update';

export const useActivatePremium = () => {
  return useMutation<PremiumResponse, unknown, ActivatePremiumReq>({
    mutationFn: activatePremium,
  });
};

export const useCancelPremium = () => {
  return useMutation<{ message: string }, unknown, CancelPremiumReq>({
    mutationFn: cancelPremium,
  });
};
