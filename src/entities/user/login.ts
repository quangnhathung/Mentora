import { client } from '@/shared/api/common/client';

export type LoginReq = {
  email: string;
  password: string;
};

export async function login(req: LoginReq) {
  const res = await client.post('/auth/login', req);
  return res.data; // backend trả về user
}
