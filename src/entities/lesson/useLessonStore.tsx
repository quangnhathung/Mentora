import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type Lesson } from '@/entities/lesson/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type LessonValues = {
  lesson: Partial<Lesson> | null;
};

interface Lessontate extends LessonValues {
  setLesson: (lesson: Partial<Lesson>) => void;
  resetLesson: () => void;
}

// TODOL Chưa dùng store này
export const useLessonStore = create<Lessontate>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        lesson: {},
        setLesson: (lesson) => {
          set({ lesson });
        },
        resetLesson: () => {
          set({ lesson: {} });
        },
      })),
      {
        name: 'lesson', // khoá lưu trong MMKV
        storage: createJSONStorage(() => zustandMMKVStorage),
        version: 1,
        // migrate, partialize, onRehydrateStorage ... tuỳ nhu cầu

        // Only persist certain parts of the store
        // partialize: (state) => ({
        //   profile: state.profile,
        // }),
      }
    )
  )
);

if (__DEV__) {
  // track toàn bộ store, hoặc từng slice
  // @ts-ignore
  console.tron?.trackZustand?.(useLessonStore);
}
