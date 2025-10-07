import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandMMKVStorage } from '../../storage';

type ConfigValues = {
  language: number;
  iam: number;
  goal: number;
  level: number;
};

interface ConfigState extends ConfigValues {
  setConfig: (cfg: Partial<ConfigValues>) => void;
  setLanguage: (id: number) => void;
  setIam: (id: number) => void;
  setGoal: (id: number) => void;
  setLevel: (id: number) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    immer((set) => ({
      language: 0,
      iam: 0,
      goal: 0,
      level: 0,
      setConfig: (cfg) => {
        set((state) => {
          Object.assign(state, cfg); // mutate draft (immer)
        });
      },
      setLanguage: (id: number) => {
        set({ language: id });
      },
      setIam: (id: number) => {
        set({ iam: id });
      },
      setGoal: (id: number) => {
        set({ goal: id });
      },
      setLevel: (id: number) => {
        set({ level: id });
      },
    })),
    {
      name: 'configs', // khoá lưu trong MMKV
      storage: createJSONStorage(() => zustandMMKVStorage),
      version: 1,
      // migrate, partialize, onRehydrateStorage ... tuỳ nhu cầu
    }
  )
);

if (__DEV__) {
  // track toàn bộ store, hoặc từng slice
  // @ts-ignore
  console.tron?.trackZustand?.(useConfigStore);
}
