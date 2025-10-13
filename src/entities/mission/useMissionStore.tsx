import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  type AchievementListResponse,
  type ChallengeListResponse,
  type MissionListResponse,
} from '@/entities/mission/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type MissionValues = {
  missions: Partial<MissionListResponse> | null;
  challenges: Partial<ChallengeListResponse> | null;
  achievements: Partial<AchievementListResponse> | null;
};

interface MissionState extends MissionValues {
  setMissions: (Mission: Partial<MissionListResponse>) => void;
  setChallenges: (Mission: Partial<ChallengeListResponse>) => void;
  setAchievements: (Mission: Partial<AchievementListResponse>) => void;
  resetMission: () => void;
}

export const useMissionStore = create<MissionState>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        missions: [],
        challenges: [],
        achievements: [],
        setMissions: (missions) => {
          set({ missions });
        },
        setChallenges: (challenges) => {
          set({ challenges });
        },
        setAchievements: (achievements) => {
          set({ achievements });
        },
        resetMission: () => {
          set({ missions: null });
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
  console.tron?.trackZustand?.(useMissionStore);
}
