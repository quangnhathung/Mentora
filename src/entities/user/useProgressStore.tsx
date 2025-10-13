import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandMMKVStorage } from '@/shared/lib/storage';

import { type PathProgressResponse } from './types';

type ProgressValues = {
  progress: PathProgressResponse | null;
};

interface ProgressState extends ProgressValues {
  // chấp nhận Partial để an toàn khi merge dữ liệu chưa đầy đủ
  setProgress: (progress: Partial<PathProgressResponse>) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        progress: null,
        setProgress: (progress: Partial<PathProgressResponse>) => {
          set((state) => {
            state.progress = { ...(state.progress ?? {}), ...progress } as PathProgressResponse;
          });
        },
        resetProgress: () => {
          set({ progress: null });
        },
      })),
      {
        name: 'path-progress',
        storage: createJSONStorage(() => zustandMMKVStorage),
        version: 1,
      }
    )
  )
);

if (__DEV__) {
  // @ts-ignore
  console.tron?.trackZustand?.(useProgressStore);
}
