import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type UserProgressResponse, type UserResponse } from '@/entities/user/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type UserValues = {
  profile: Partial<UserResponse> | null;
};

interface UserState extends UserValues {
  setUserProfile: (user: Partial<UserResponse>) => void;
  setUserProgress: (userProgress: Partial<UserProgressResponse>) => void;
  resetUserProfile: () => void;
  resetPremium: () => void;
}

// giá trị mặc định cho premium
const defaultPremium = { isActive: false, expiresAt: 0 };

export const useUserStore = create<UserState>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        profile: {},
        setUserProfile: (user) => {
          set((state) => {
            const mergedProfile = state.profile ? { ...state.profile, ...user } : { ...user };

            // nếu server không trả về premium → gán mặc định
            if (!mergedProfile.premium) {
              mergedProfile.premium = defaultPremium;
            }

            return { profile: mergedProfile };
          });
        },
        setUserProgress: (progress) =>
          set((state) => {
            const mergedProfile = state.profile ? { ...state.profile, progress } : { progress };

            // giữ premium mặc định nếu chưa có
            if (!mergedProfile.premium) {
              mergedProfile.premium = defaultPremium;
            }

            return { profile: mergedProfile };
          }),
        resetUserProfile: () => {
          set({
            profile: {
              premium: defaultPremium,
            },
          });
        },
        resetPremium: () =>
          set((state) => {
            if (!state.profile) return { profile: { premium: defaultPremium } };
            return {
              profile: {
                ...state.profile,
                premium: defaultPremium,
              },
            };
          }),
      })),
      {
        name: 'user', // khoá lưu trong MMKV
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
  console.tron?.trackZustand?.(useUserStore);
}
