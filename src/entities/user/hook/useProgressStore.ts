import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type Premium } from '../types';

export type UserProgress = {
  checkin: number;
  app: number;
  lesson: number;
  game: number;
  premium?: Premium;
};

type ProgressDict = Record<string, UserProgress>;

type ProgressState = {
  progress: ProgressDict;
  lastResetDate: string | null;

  setProgress: (userId: string, data: Partial<UserProgress>) => void;
  resetAll: () => void;
  ensureDailyReset: () => void;
};

const emptyProgress: UserProgress = {
  checkin: 0,
  app: 0,
  lesson: 0,
  game: 0,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      lastResetDate: null,

      setProgress: (userId, data) =>
        set((state) => {
          const current = state.progress[userId] ?? { ...emptyProgress };

          return {
            progress: {
              ...state.progress,
              [userId]: {
                ...current,
                ...data,
              },
            },
          };
        }),

      resetAll: () =>
        set(() => ({
          progress: {},
          lastResetDate: new Date().toISOString().substring(0, 10),
        })),

      ensureDailyReset: () => {
        const today = new Date().toISOString().substring(0, 10);
        const last = get().lastResetDate;

        if (last === null) {
          set({ lastResetDate: today });
          return;
        }

        if (last !== today) {
          console.log('Progress store → Reset vì sang ngày mới');
          get().resetAll();
        }
      },
    }),
    {
      name: 'progress-store',
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: false,
    }
  )
);

export const useUserProgress = (userId: string | undefined) =>
  useProgressStore((s) => {
    if (!userId) return { ...emptyProgress };
    return s.progress[userId] ?? { ...emptyProgress };
  });
