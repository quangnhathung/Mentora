import { useMutation } from '@tanstack/react-query';

import { updateProfile, type UpdateProfileReq } from '@/entities/user/update';

import { type User } from '../types';

export const useUpdateProfile = () => {
  return useMutation<User, unknown, { userId: number; data: UpdateProfileReq }>({
    mutationFn: ({ userId, data }) => updateProfile(userId, data),
  });
};
