import { client } from '@/shared/api/common/client';

export type RegisterReq = {
  name: string;
  email: string;
  password: string;
  dob?: string; // ISO date string yyyy-mm-dd
};

export async function register(req: RegisterReq) {
  const res = await client.post('/auth/register', req);
  return res.data;
}
