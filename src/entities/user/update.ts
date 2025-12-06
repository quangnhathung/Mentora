import { client } from '@/shared/api/common/client';

import { type PremiumResponse, type User } from './types';

export type UpdateProfileReq = {
  name?: string;
  dob?: string;
  avatar?: string;
  streak?: number;
  coins?: number;
};

export type CancelPremiumReq = {
  userId: number;
};

export async function updateProfile(userId: number, req: UpdateProfileReq): Promise<User> {
  const res = await client.patch(`/auth/profile/${userId}`, req);
  return res.data;
}

export type ActivatePremiumReq = {
  userId: number;
  days: number;
};

export async function activatePremium(data: ActivatePremiumReq): Promise<PremiumResponse> {
  const res = await client.post('/premium/activate', data);
  return res.data;
}

export async function cancelPremium(data: CancelPremiumReq): Promise<{ message: string }> {
  const res = await client.post('/premium/cancel', data);
  return res.data;
}
