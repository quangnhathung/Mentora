import { client } from '@/shared/api/common/client';

import { type User } from './types';

export type UpdateProfileReq = {
  name?: string;
  dob?: string;
  avatar?: string;
  streak?: number;
  coins?: number;
};

export async function updateProfile(userId: number, req: UpdateProfileReq): Promise<User> {
  const res = await client.patch(`/auth/profile/${userId}`, req);
  return res.data;
}
