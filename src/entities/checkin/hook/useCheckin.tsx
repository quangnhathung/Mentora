import { useMutation, useQuery } from '@tanstack/react-query';

import { type CheckinReq, getCheckins, postCheckin } from '../api';
import { type DailyCheckinResponse } from '../type';

export const useCheckin = () => {
  return useMutation<DailyCheckinResponse, unknown, CheckinReq>({
    mutationFn: postCheckin,
  });
};

export const useCheckins = (userId: number) => {
  return useQuery({
    queryKey: ['checkins', userId],
    queryFn: () => getCheckins(userId),
    enabled: !!userId,
  });
};
