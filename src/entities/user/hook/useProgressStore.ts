import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UserProgress = {
  checkin: number;
  app: number;
  lesson: number;
  game: number;
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

      // Cập nhật progress theo userId
      setProgress: (userId, data) =>
        set((state) => {
          const current = state.progress[userId] ?? emptyProgress;

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

      // Reset toàn bộ user về 0
      resetAll: () =>
        set(() => ({
          progress: {},
          lastResetDate: new Date().toISOString().substring(0, 10), // YYYY-MM-DD
        })),

      // Reset nếu qua ngày mới
      ensureDailyReset: () => {
        const today = new Date().toISOString().substring(0, 10);
        const last = get().lastResetDate;

        // lần đầu chạy app → set ngày hiện tại, KHÔNG reset
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

//dung

// useEffect(() => {
//   useProgressStore.getState().ensureDailyReset();
// }, []);

// const { setProgress } = useProgressStore();

// setProgress(userId, { checkin: 5 });

// const progress = useProgressStore((s) => s.progress[userId]);

// Nếu user chưa có, bạn sẽ nhận undefined → bạn có thể fallback:

// const p = progress ?? emptyProgress;
