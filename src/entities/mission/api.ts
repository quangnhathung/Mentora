import { client } from '@/shared/api/common/client';

import type { Misson } from './types';

export async function getMissions(): Promise<Misson[]> {
  const res = await client.get('/missions');
  return res.data;
}
