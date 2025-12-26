import { create } from 'zustand';

import { type UserLessonsListResponse } from './type';

type LessonProgressState = {
  items: UserLessonsListResponse;
  mapByLessonId: Record<string, UserLessonsListResponse[number]>;
  isLoading: boolean;
  error: unknown;

  setData: (data: UserLessonsListResponse) => void;
  setLoading: (v: boolean) => void;
  setError: (e: unknown) => void;
};

export const useLessonProgressStore = create<LessonProgressState>((set) => ({
  items: [],
  mapByLessonId: {},
  isLoading: false,
  error: null,

  setData: (data) =>
    set(() => {
      const map: Record<string, UserLessonsListResponse[number]> = {};
      data.forEach((item) => {
        map[item.lesson.id] = item;
      });

      return {
        items: data,
        mapByLessonId: map,
      };
    }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
