import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type TopicLevelFilter } from '@/entities/topic/types';
import { zustandMMKVStorage } from '@/shared/lib/storage';

type State = { level: TopicLevelFilter };
type Actions = { setLevel: (level: TopicLevelFilter) => void };

export const useTopicFeedStore = create<State & Actions>()(
  subscribeWithSelector(
    persist(
      immer((set) => ({
        level: 'all',
        setLevel: (level) => {
          set({ level });
        },
      })),
      {
        name: 'topic-feed-filter',
        storage: createJSONStorage(() => zustandMMKVStorage),
        version: 1,
      }
    )
  )
);

if (__DEV__) {
  // @ts-ignore
  console.tron?.trackZustand?.(useTopicFeedStore);
}
