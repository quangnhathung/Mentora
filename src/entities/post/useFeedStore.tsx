import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type PostFilter } from '@/entities/post/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type State = { filter: PostFilter };
type Actions = { setFilter: (p: PostFilter) => void };

export const usePostStore = create<State & Actions>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        filter: 'feed',
        setFilter: (filter) => {
          set({ filter });
        },
      })),
      {
        name: 'post', // khoá lưu trong MMKV
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
  console.tron?.trackZustand?.(usePostStore);
}
