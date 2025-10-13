import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandMMKVStorage } from '@/shared/lib/storage';

import { type SingleChoiceQuizListResponse } from './types';

type SingleChoiceValues = {
  singleChoiceQuizzes: Partial<SingleChoiceQuizListResponse> | null;
};

interface SingleChoiceState extends SingleChoiceValues {
  set: (path: Partial<SingleChoiceQuizListResponse>) => void;
  reset: () => void;
}

// NOTE: chưa dùng tới
export const useSingleChoiceStore = create<SingleChoiceState>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        singleChoiceQuizzes: {},
        set: (singleChoiceQuizzes) => {
          set({ singleChoiceQuizzes: singleChoiceQuizzes });
        },
        reset: () => {
          set({ singleChoiceQuizzes: {} });
        },
      })),
      {
        name: 'singleChoiceQuizzes', // khoá lưu trong MMKV
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
  console.tron?.trackZustand?.(useSingleChoiceStore);
}
