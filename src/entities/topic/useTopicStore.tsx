import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type TopicResponse } from '@/entities/topic/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type TopicValues = {
  topic: Partial<TopicResponse> | null;
};

interface TopicState extends TopicValues {
  setTopic: (topic: Partial<TopicResponse>) => void;
  resetTopic: () => void;
}

export const useTopicStore = create<TopicState>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        topic: {},
        setTopic: (topic) => {
          set({ topic });
        },
        resetTopic: () => {
          set({ topic: {} });
        },
      })),
      {
        name: 'topic', // khoá lưu trong MMKV
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
  console.tron?.trackZustand?.(useTopicStore);
}
