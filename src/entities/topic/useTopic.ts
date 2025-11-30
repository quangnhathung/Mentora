import { useQuery } from '@tanstack/react-query';

import { fetchTopics } from './api';
import { type Topic } from './type';

export function useTopics(enabled = true) {
  return useQuery<Topic[], Error>({
    queryKey: ['topics'],
    queryFn: fetchTopics,
    enabled,
  });
}
