import { useQuery } from '@tanstack/react-query';

import { getMissions } from '../api';
import type { Misson } from '../types';

export const useMissionsStore = () => {
  return useQuery<Misson[]>({
    queryKey: ['missions'],
    queryFn: getMissions,
  });
};
