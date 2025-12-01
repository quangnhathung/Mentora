import { client } from '@/shared/api/common/client';

import { type DailyCheckinResponse } from './type';

export type CheckinReq = {
  userId: number;
};

export async function postCheckin(data: CheckinReq): Promise<DailyCheckinResponse> {
  const res = await client.post('/checkin', data);
  return res.data;
}

export async function getCheckins(userId: number): Promise<DailyCheckinResponse[]> {
  const res = await client.get(`/checkin/${userId}`);
  return res.data;
}
