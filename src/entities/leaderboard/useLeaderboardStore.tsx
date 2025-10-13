import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type Period } from '@/entities/leaderboard/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type State = { period: Period };
type Actions = { setPeriod: (p: Period) => void };

export const useLeaderboardStore = create<State & Actions>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        period: 'monthly',
        setPeriod: (period) => {
          set({ period });
        },
      })),
      {
        name: 'mission', // khoá lưu trong MMKV
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
  console.tron?.trackZustand?.(useLeaderboardStore);
}
