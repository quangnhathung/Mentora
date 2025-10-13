import { type Unit } from '@/entities/unit/types';
import { type UserLevel } from '@/entities/user/types';

export type Topic = {
  id?: number;
  name?: string;
  level?: UserLevel;
  image?: string;
  percent?: number;
  units?: Unit[];
};

export type TopicResponse = { data: Topic };

export type TopicLevelFilter = 'all' | Exclude<UserLevel, 'master'>;

export type TopicListResponse = {
  data: Topic[];
  offset: number;
  limit: number;
  count: number;
  nextCursor?: number | null;
};
