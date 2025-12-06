import { useMutation } from '@tanstack/react-query';

import { updateProfile, type UpdateProfileReq } from '@/entities/user/update';

import { type PremiumResponse, type User } from '../types';

export const useUpdateProfile = () => {
  return useMutation<User, unknown, { userId: number; data: UpdateProfileReq }>({
    mutationFn: ({ userId, data }) => updateProfile(userId, data),
  });
};

export function isPremiumActive(premium?: PremiumResponse | null): boolean {
  if (!premium || !premium.expires_at) return false;

  const now = new Date();
  const expires = new Date(premium.expires_at);

  return expires.getTime() > now.getTime();
}
