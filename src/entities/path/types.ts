import { type Topic } from '@/entities/topic/types';

export type Path = {
  id?: number;
  name?: string;
  image?: string;
  active?: boolean;
  currentTopic?: Topic;
  topics?: Topic[];
};

export type PathResponse = { data: Path } & {
  offset: 1;
  limit: 10;
  count: 100;
};
