import { type Lesson } from '@/entities/lesson/types';

export type Unit = {
  id?: number;
  name?: string;
  desc?: string;
  image?: string;
  tags?: string[];
  state?: string;
  lessonsCount?: number;
  lessons?: Lesson[];
};
