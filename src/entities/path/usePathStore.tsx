import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type PathResponse } from '@/entities/path/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type PathValues = {
  path: Partial<PathResponse> | null;
};

interface PathState extends PathValues {
  setPath: (path: Partial<PathResponse>) => void;
  resetPath: () => void;
}

export const usePathStore = create<PathState>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        path: {},
        setPath: (path) => {
          set({ path });
        },
        resetPath: () => {
          set({ path: {} });
        },
      })),
      {
        name: 'path', // khoá lưu trong MMKV
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
  console.tron?.trackZustand?.(usePathStore);
}
